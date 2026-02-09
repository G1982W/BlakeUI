"use client";

import * as React from "react";
import { banner } from "@/components/ui/banner";
import { Banner } from "@/components/ui/banner";

const buttonBase =
  "inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors";

export function BannerDemoButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() =>
          banner(
            "This is a default banner. It does not auto-dismiss. This is the default variant.",
            { action: { label: "Dismiss", onClick: () => {} } },
          )
        }
        className={`${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90`}
      >
        Default banner
      </button>
      <button
        type="button"
        onClick={() =>
          banner(
            "Save your work before leaving this page. This is the caution banner",
            {
              variant: "caution",
              action: { label: "Dismiss", onClick: () => {} },
            },
          )
        }
        className={`${buttonBase} border border-amber-500/50 bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 dark:text-amber-200`}
      >
        Caution banner
      </button>
      <button
        type="button"
        onClick={() =>
          banner("Your session has expired. Please sign in again.", {
            variant: "critical",
            title: "Session expired",
            action: { label: "Dismiss", onClick: () => {} },
          })
        }
        className={`${buttonBase} bg-destructive text-destructive-foreground hover:bg-destructive/90`}
      >
        Critical banner
      </button>
    </div>
  );
}

export function BannerDemoInline({
  variant = "default",
}: {
  variant?: "default" | "caution" | "critical";
}) {
  const [open, setOpen] = React.useState(true);
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${buttonBase} bg-muted text-muted-foreground hover:bg-muted/80`}
      >
        Show banner
      </button>
    );
  }
  return (
    <Banner
      variant={variant}
      title={variant === "critical" ? "Action required" : undefined}
      onClose={() => setOpen(false)}
      action={{ label: "Dismiss", onClick: () => setOpen(false) }}
    >
      {variant === "default" &&
        "This banner can be dismissed with the close button or Dismiss."}
      {variant === "caution" && "Review the information before continuing."}
      {variant === "critical" &&
        "Please complete the required steps to continue."}
    </Banner>
  );
}
