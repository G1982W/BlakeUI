"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import registry from "@/registry.json";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useSubscriptionStatus } from "@/hooks/use-subscription-status";

interface ComponentPreviewProps {
  name: string;
  children: React.ReactNode;
  className?: string;
  /** When true, the Code tab shows a buy overlay unless the user has an active subscription. */
  premium?: boolean;
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
  premium = false,
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);
  const { isLoading: subscriptionLoading, hasActiveSubscription } =
    useSubscriptionStatus();

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

      <div className="relative overflow-hidden rounded-lg border bg-code-background">
        {tab === "preview" ? (
          <div className="flex min-h-[200px] w-full items-center justify-center p-10 ring-offset-background transition-colors">
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
