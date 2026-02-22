import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { AppLink } from "@/components/ui/link";
import {
  ArrowLeft,
  CreditCard,
  History,
} from "lucide-react";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/profile");
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: history } = await supabase
    .from("subscription_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Account
            </h1>
            <p className="mt-1 text-muted-foreground">{user.email}</p>
          </div>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <CreditCard className="size-5" />
              Subscription
            </h2>
            {subscription && subscription.status === "active" ? (
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium uppercase text-muted-foreground">
                    Status
                  </dt>
                  <dd className="mt-0.5 font-medium capitalize text-foreground">
                    {subscription.status}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-muted-foreground">
                    Plan
                  </dt>
                  <dd className="mt-0.5 font-medium text-foreground">
                    {subscription.product_name ||
                      subscription.stripe_price_id ||
                      "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-muted-foreground">
                    Started
                  </dt>
                  <dd className="mt-0.5 text-foreground">
                    {formatDate(
                      subscription.current_period_start ??
                        subscription.created_at
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-muted-foreground">
                    Next billing date
                  </dt>
                  <dd className="mt-0.5 text-foreground">
                    {formatDate(subscription.current_period_end)}
                  </dd>
                </div>
                {subscription.cancel_at_period_end && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      Subscription will not renew. Access until{" "}
                      {formatDate(subscription.current_period_end)}.
                    </p>
                  </div>
                )}
              </dl>
            ) : (
              <p className="mt-4 text-muted-foreground">
                You don&apos;t have an active subscription.
              </p>
            )}
            {(!subscription || subscription.status !== "active") && (
              <Button variant="secondary" size="md" className="mt-4" asChild>
                <AppLink href="/pricing">View plans</AppLink>
              </Button>
            )}
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <History className="size-5" />
              History
            </h2>
            {history && history.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {history.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-foreground">
                      {h.event_type.replace(/_/g, " ")}
                      {h.status && (
                        <span className="ml-2 text-muted-foreground">
                          ({h.status})
                        </span>
                      )}
                    </span>
                    <time className="text-xs text-muted-foreground">
                      {formatDate(h.created_at)}
                    </time>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No subscription history yet.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
