"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import registry from "@/registry.json";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Lock, Maximize2, X } from "lucide-react";
import Link from "next/link";
import { useSubscriptionStatus } from "@/hooks/use-subscription-status";

interface ComponentPreviewProps {
  name: string;
  children: React.ReactNode;
  className?: string;
  /** When true, the Code tab shows a buy overlay unless the user has an active subscription. */
  premium?: boolean;
  previewClassName?: string;
}

const PREMIUM_OVERLAY_CONTENT = {
  title: "Get Instant Access to the Code",
  subtitle:
    "Get instant access to this block and all 1350 other blocks, available to copy/paste or install via the shadcn CLI.",
  list: [
    "1193+ Shadcn blocks",
    "1189+ Shadcn components",
    "12 Next.js, Astro templates (Premium)",
    "Figma UI Kit (Premium)",
    "Lifetime updates & unlimited projects",
  ],
  ctaLabel: "Get access",
  ctaHref: "/pricing",
};

export function ComponentPreview({
  name,
  children,
  className,
  previewClassName,
  premium = false,
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const { isLoading: subscriptionLoading, hasActiveSubscription } =
    useSubscriptionStatus();

  React.useEffect(() => {
    if (!expanded) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  const code = (registry as any)[name]?.source || "";

  const copyToClipboard = () => {
    if (premium && !hasActiveSubscription) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showPremiumOverlay =
    premium &&
    tab === "code" &&
    (subscriptionLoading || !hasActiveSubscription);
  const disableCopy = premium && !hasActiveSubscription;

  return (
    <div className={cn("group my-4 flex flex-col space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-md border text-foreground bg-code-background p-1 text-xs">
          <button
            onClick={() => setTab("preview")}
            className={cn(
              "rounded-sm cursor-pointer px-3 py-1 font-medium transition-all hover:text-foreground hover:bg-background",
              tab === "preview" ? "bg-background  shadow-sm" : "",
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={cn(
              "rounded-sm cursor-pointer px-3 py-1 font-medium text-foreground transition-all hover:text-foreground hover:bg-background",
              tab === "code" ? "bg-background  shadow-sm" : "",
            )}
          >
            Code
          </button>
        </div>
        <div className="flex items-center gap-2">
          {tab === "preview" && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="flex h-8 items-center justify-center gap-1.5 rounded-md border bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-95"
              title="Expand to full screen"
              aria-label="Expand to full screen"
            >
              <Maximize2 className="size-3.5" />
              Expand
            </button>
          )}
          <button
            onClick={copyToClipboard}
            disabled={disableCopy}
            className={cn(
              "flex h-8 items-center justify-center rounded-md border bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-50",
              disableCopy && "opacity-60",
            )}
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-200 flex h-screen max-h-screen flex-col overflow-hidden bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Component preview full screen"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-border bg-background px-4 py-2">
            <span className="text-sm font-medium text-muted-foreground">
              Full screen preview — Press Escape to close
            </span>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              title="Close full screen"
              aria-label="Close full screen"
            >
              <X className="size-5" />
            </button>
          </div>
          <div
            className={cn(
              "h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] overflow-auto p-6",
              previewClassName,
            )}
          >
            {children}
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative rounded-lg border bg-code-background",
          tab === "preview" ? "overflow-visible" : "overflow-hidden",
        )}
      >
        {tab === "preview" ? (
          <div
            className={cn(
              "flex w-full items-center justify-center p-10 ring-offset-background transition-colors",
              previewClassName,
            )}
          >
            {children}
          </div>
        ) : (
          <div
            className={cn("relative min-h-[320px]", premium && "min-h-[520px]")}
          >
            <div
              className={cn(
                "transition-opacity",
                showPremiumOverlay &&
                  "pointer-events-none select-none opacity-30",
              )}
            >
              <DynamicCodeBlock
                lang="tsx"
                code={code}
                codeblock={{
                  title: undefined,
                  className:
                    "my-0 rounded-lg border bg-code-background shadow-none text-xs text-zinc-50 font-mono",
                }}
              />
            </div>
            {showPremiumOverlay && (
              <div className="absolute backdrop-blur-xs inset-0 flex items-center justify-center p-6">
                <div className="w-full max-w-md rounded-xl border border-border bg-background/95 p-6 shadow-lg ">
                  <div className="mb-4 flex items-center justify-center gap-2 text-primary">
                    <Lock className="size-5" />
                    <span className="text-sm font-medium">Premium</span>
                  </div>
                  <h3 className="text-center text-lg font-semibold text-foreground">
                    {PREMIUM_OVERLAY_CONTENT.title}
                  </h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    {PREMIUM_OVERLAY_CONTENT.subtitle}
                  </p>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    What you&apos;ll get:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {PREMIUM_OVERLAY_CONTENT.list.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={PREMIUM_OVERLAY_CONTENT.ctaHref}
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-primary bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/95"
                  >
                    {PREMIUM_OVERLAY_CONTENT.ctaLabel}
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
