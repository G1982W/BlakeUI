"use client";

import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function CheckoutButton({
  children = "Pay",
  className,
}: CheckoutButtonProps) {
  const handlePay = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: "price_1T3e9WCteWMYrDNwbdQGtWDW",
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
      }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      type="button"
      onClick={handlePay}
      className={className}
    >
      {children}
    </Button>
  );
}
// 5. Webhooks (recommended for production)
// Use webhooks so your app reacts to payment_intent.succeeded, checkout.session.completed, etc., instead of relying only on the redirect.
// Route – e.g. src/app/api/webhooks/stripe/route.ts:
// Read raw body (Stripe needs it for signature verification).
// Use stripe.webhooks.constructEvent(body, signature, webhookSecret).
// Handle checkout.session.completed (or other events) and update your DB/state.
// Secret – Stripe Dashboard → Developers → Webhooks → Add endpoint (e.g. https://yourdomain.com/api/webhooks/stripe) → copy Signing secret (whsec_...).
// Env – add STRIPE_WEBHOOK_SECRET=whsec_... and use it in the route.
// Local testing – use Stripe CLI: stripe listen --forward-to localhost:3000/api/webhooks/stripe.
// 6. Project structure (suggestion)
// API routes: src/app/api/create-checkout-session/route.ts, src/app/api/webhooks/stripe/route.ts, optionally src/app/api/create-portal-session/route.ts for customer portal.
// Env: .env.local with NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, and STRIPE_WEBHOOK_SECRET for webhooks.
// Client: one or more pages/components that call these APIs (e.g. “Subscribe” / “Buy” buttons that POST to create a session and redirect).
