/**
 * Stripe webhook: writes to Supabase subscriptions + subscription_history
 * when checkout.session.completed, customer.subscription.updated/deleted fire.
 *
 * If nothing appears in DB after a test payment:
 * 1. Local: Stripe cannot reach localhost. Run:
 *    stripe listen --forward-to localhost:3000/api/webhooks/stripe
 *    and set STRIPE_WEBHOOK_SECRET to the signing secret the CLI prints (whsec_...).
 * 2. Set SUPABASE_SERVICE_ROLE_KEY in .env (Supabase Dashboard → Settings → API).
 * 3. Production: add endpoint in Stripe Dashboard → Webhooks with URL
 *    https://yourdomain.com/api/webhooks/stripe and events checkout.session.completed,
 *    customer.subscription.updated, customer.subscription.deleted.
 */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

function unixToISO(unixSeconds: number | undefined | null): string | null {
  if (unixSeconds == null || typeof unixSeconds !== "number" || !Number.isFinite(unixSeconds)) {
    return null;
  }
  const date = new Date(unixSeconds * 1000);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (
      session.mode !== "subscription" ||
      !session.subscription ||
      !session.client_reference_id
    ) {
      return NextResponse.json({ received: true });
    }
    const sub = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const priceId = sub.items.data[0]?.price?.id;
    const productId = sub.items.data[0]?.price?.product as string;
    let productName = "";
    try {
      const product = await stripe.products.retrieve(productId);
      productName = product.name ?? "";
    } catch {
      // ignore
    }
    await supabase.from("subscriptions").upsert(
      {
        user_id: session.client_reference_id,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: sub.id,
        stripe_price_id: priceId,
        product_name: productName,
        status: sub.status,
        current_period_start: unixToISO(sub.current_period_start),
        current_period_end: unixToISO(sub.current_period_end),
        cancel_at_period_end: sub.cancel_at_period_end ?? false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
    await supabase.from("subscription_history").insert({
      user_id: session.client_reference_id,
      stripe_subscription_id: sub.id,
      event_type: "subscription_created",
      status: sub.status,
      metadata: { price_id: priceId, product_name: productName },
    });
  } else if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription;
    const priceId = sub.items.data[0]?.price?.id;
    const productId = sub.items.data[0]?.price?.product as string;
    let productName = "";
    try {
      const product = await stripe.products.retrieve(productId);
      productName = product.name ?? "";
    } catch {
      // ignore
    }
    const { data: row } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", sub.id)
      .single();
    if (row?.user_id) {
      await supabase.from("subscriptions").upsert(
        {
          user_id: row.user_id,
          stripe_subscription_id: sub.id,
          stripe_price_id: priceId,
          product_name: productName,
          status: sub.status,
          current_period_start: unixToISO(sub.current_period_start),
          current_period_end: unixToISO(sub.current_period_end),
          cancel_at_period_end: sub.cancel_at_period_end ?? false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
      await supabase.from("subscription_history").insert({
        user_id: row.user_id,
        stripe_subscription_id: sub.id,
        event_type: "subscription_updated",
        status: sub.status,
        metadata: { price_id: priceId },
      });
    }
  } else if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const { data: row } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", sub.id)
      .single();
    if (row?.user_id) {
      await supabase
        .from("subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", row.user_id);
      await supabase.from("subscription_history").insert({
        user_id: row.user_id,
        stripe_subscription_id: sub.id,
        event_type: "subscription_deleted",
        status: "canceled",
      });
    }
  }

  return NextResponse.json({ received: true });
}
