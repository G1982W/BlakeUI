"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import rawBundles from "@/generated/app-page-sources.json";
import { CachedDynamicCodeBlock } from "@/components/cached-dynamic-codeblock";
import { Lock, Maximize2, X } from "lucide-react";
import Link from "next/link";
import { useSubscriptionStatus } from "@/hooks/use-subscription-status";

type AppPageSourceFile = { path: string; content: string };
type Bundles = Record<string, { files: AppPageSourceFile[] }>;

const appPageSourceBundles = rawBundles as Bundles;

function fileTabLabel(displayPath: string) {
  const parts = displayPath.replace(/^\//, "").split("/");
  return parts[parts.length - 1] ?? displayPath;
}

function langFromPath(displayPath: string) {
  if (displayPath.endsWith(".tsx")) return "tsx";
  if (displayPath.endsWith(".ts")) return "ts";
  return "tsx";
}

export interface AppPagePreviewProps {
  /** Key in `scripts/build-app-page-sources.mjs` → `src/generated/app-page-sources.json`. */
  bundleId: string;
  children: React.ReactNode;
  className?: string;
  previewClassName?: string;
  premium?: boolean;
}

const PREMIUM_OVERLAY_CONTENT = {
  title: "Get Instant Access to the Code",
  subtitle:
    "Get instant access to this block and all 1350 other blocks, available to copy/paste or install via the Blake UI workflow.",
  list: [
    "1193+ Blake UI blocks",
    "1189+ Blake UI components",
    "12 Next.js, Astro templates (Premium)",
    "Figma UI Kit (Premium)",
    "Lifetime updates & unlimited projects",
  ],
  ctaLabel: "Get access",
  ctaHref: "/pricing",
};

export function AppPagePreview({
  bundleId,
  children,
  className,
  previewClassName,
  premium = false,
}: AppPagePreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const { isLoading: subscriptionLoading, hasActiveSubscription } =
    useSubscriptionStatus();

  const bundle = appPageSourceBundles[bundleId];
  const files = bundle?.files ?? [];
  const activeFile = files[activeIndex];

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

  React.useEffect(() => {
    if (activeIndex >= files.length) setActiveIndex(0);
  }, [activeIndex, files.length]);

  const copyToClipboard = () => {
    if (premium && !hasActiveSubscription) return;
    const text = activeFile?.content ?? "";
    if (!text) return;
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showPremiumOverlay =
    premium &&
    tab === "code" &&
    (subscriptionLoading || !hasActiveSubscription);
  const disableCopy = premium && !hasActiveSubscription;

  if (!bundle || files.length === 0) {
    return (
      <div className="not-prose my-4 rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
        No source bundle found for <code className="font-mono">{bundleId}</code>
        . Run{" "}
        <code className="font-mono">
          node scripts/build-app-page-sources.mjs
        </code>{" "}
        after updating bundles.
      </div>
    );
  }

  return (
    <div
      className={cn("group my-4 not-prose flex flex-col space-y-2", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-md border border-border bg-code-background p-1 text-xs text-foreground">
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={cn(
              "cursor-pointer rounded-sm px-3 py-1 font-medium transition-all hover:bg-background hover:text-foreground",
              tab === "preview" ? "bg-background shadow-sm" : "",
            )}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setTab("code")}
            className={cn(
              "cursor-pointer rounded-sm px-3 py-1 font-medium text-foreground transition-all hover:bg-background hover:text-foreground",
              tab === "code" ? "bg-background shadow-sm" : "",
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
              className="flex h-8 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-95"
              title="Expand to full screen"
              aria-label="Expand to full screen"
            >
              <Maximize2 className="size-3.5" />
              Expand
            </button>
          )}
          <button
            type="button"
            onClick={copyToClipboard}
            disabled={disableCopy || tab !== "code" || !activeFile}
            className={cn(
              "flex h-8 items-center justify-center rounded-md border border-border bg-surface px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-50",
              disableCopy && "opacity-60",
            )}
          >
            {copied ? "Copied!" : "Copy file"}
          </button>
        </div>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-200 flex h-screen max-h-screen flex-col overflow-hidden bg-white"
          role="dialog"
          aria-modal="true"
          aria-label="App page preview full screen"
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
          "relative rounded-lg border border-border bg-code-background",
          tab === "preview" ? "overflow-visible" : "overflow-hidden",
        )}
      >
        {tab === "preview" ? (
          <div
            className={cn(
              "flex w-full min-w-0 flex-col items-stretch overflow-visible p-0 ring-offset-background transition-colors lg:p-2.5 [&>*]:min-w-0 [&>*]:w-full",
              previewClassName,
            )}
          >
            {children}
          </div>
        ) : (
          <div
            className={cn("relative min-h-[320px]", premium && "min-h-[520px]")}
          >
            <div className="border-b border-border bg-muted/30 px-2 py-2">
              <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Source files
              </p>
              <div
                className="flex gap-1 overflow-x-auto pb-1"
                role="tablist"
                aria-label="Source files"
              >
                {files.map((file, index) => (
                  <button
                    key={file.path}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "shrink-0 rounded-md border px-2.5 py-1.5 text-left font-mono text-[11px] transition-colors",
                      index === activeIndex
                        ? "border-border bg-surface text-foreground shadow-sm"
                        : "border-transparent bg-transparent text-muted-foreground hover:bg-background/80 hover:text-foreground",
                    )}
                  >
                    {fileTabLabel(file.path)}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={cn(
                "transition-opacity",
                showPremiumOverlay &&
                  "pointer-events-none select-none opacity-30",
              )}
            >
              {activeFile ? (
                <CachedDynamicCodeBlock
                  lang={langFromPath(activeFile.path)}
                  code={activeFile.content}
                  codeblock={{
                    title: activeFile.path,
                    className:
                      "my-0 rounded-none border-0 bg-code-background shadow-none text-xs text-zinc-50 font-mono",
                  }}
                />
              ) : null}
            </div>
            {showPremiumOverlay && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 p-6 backdrop-blur-xs">
                <div className="w-full max-w-md rounded-xl border border-border bg-background/95 p-6 shadow-lg">
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
