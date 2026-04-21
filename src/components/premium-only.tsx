"use client";

import { useSubscriptionStatus } from "@/hooks/use-subscription-status";

/**
 * Renders children only for logged-in users with an active subscription.
 * Use in premium doc sections (e.g. Installation) to hide content from unauthed and non-subscribers.
 */
export function PremiumOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, hasActiveSubscription } = useSubscriptionStatus();

  if (isLoading || !hasActiveSubscription) {
    return null;
  }

  return <>{children}</>;
}
