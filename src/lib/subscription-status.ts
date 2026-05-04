const ACTIVE_STATUSES = ["active", "trialing"];

export function isActiveSubscriptionStatus(
  status: string | null | undefined,
): boolean {
  return ACTIVE_STATUSES.includes(status?.toLowerCase() ?? "");
}
