/**
 * Resolves the browser-facing origin for server redirects (e.g. OAuth callback).
 * Behind proxies, `request.url` may reflect an internal host; prefer env or forwarded headers.
 */
export function getRequestOrigin(request: Request): string {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    if (configured) return configured;

    const headers = request.headers;
    const forwardedHost = headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const forwardedProto = headers
        .get("x-forwarded-proto")
        ?.split(",")[0]
        ?.trim();

    if (forwardedHost) {
        const proto = forwardedProto || "https";
        return `${proto}://${forwardedHost}`;
    }

    return new URL(request.url).origin;
}

/**
 * Browser-safe origin resolver for auth redirects.
 * Uses NEXT_PUBLIC_SITE_URL in production and falls back to current origin locally.
 */
export function getBrowserOrigin(): string {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    if (configured) return configured;

    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    return "http://localhost:3000";
}
