"use client";

import { toast } from "sonner";

const buttonBase =
  "inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors";

export function ToastDemo({
  variant = "default",
}: {
  variant?: "default" | "description" | "variants" | "action";
}) {
  if (variant === "default") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => toast("Event has been created.")}
          className={`${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          Default toast
        </button>
      </div>
    );
  }

  if (variant === "description") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            toast("Event created", {
              description: "Your event has been added to the calendar.",
            })
          }
          className={`${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          Toast with description
        </button>
      </div>
    );
  }

  if (variant === "variants") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => toast.success("Changes saved.")}
          className={`${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          Success
        </button>
        <button
          type="button"
          onClick={() => toast.error("Something went wrong.")}
          className={`${buttonBase} bg-destructive text-destructive-foreground hover:bg-destructive/90`}
        >
          Error
        </button>
        <button
          type="button"
          onClick={() => toast.warning("Please review your input.")}
          className={`${buttonBase} border border-amber-500/50 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 dark:text-amber-400`}
        >
          Warning
        </button>
        <button
          type="button"
          onClick={() => toast.info("New update available.")}
          className={`${buttonBase} bg-secondary text-secondary-foreground hover:bg-secondary/80`}
        >
          Info
        </button>
        <button
          type="button"
          onClick={() => {
            const id = toast.loading("Saving...");
            setTimeout(() => toast.success("Saved.", { id }), 1500);
          }}
          className={`${buttonBase} bg-secondary text-secondary-foreground hover:bg-secondary/80`}
        >
          Loading
        </button>
      </div>
    );
  }

  if (variant === "action") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            toast("Event in trash", {
              action: {
                label: "Undo",
                onClick: () => toast("Undone."),
              },
            })
          }
          className={`${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          Toast with action
        </button>
      </div>
    );
  }

  return null;
}

export function ToastDemoButton() {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => toast("Event has been created.")}
        className={`${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90`}
      >
        Show toast
      </button>
    </div>
  );
}
