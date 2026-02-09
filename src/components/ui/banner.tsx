"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlertIcon, InfoIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "relative flex w-full items-start gap-3 rounded-[3.5px] border px-4 py-3 text-sm [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-banner-border bg-muted text-banner-text [&>svg]:text-banner-text dark:text-white",
        caution:
          "border-banner-border bg-amber-50 text-banner-text [&_[data-banner-icon]]:text-banner-text dark:border-banner-border dark:bg-amber dark:text-banner-text dark:[&_[data-banner-icon]]:text-banner-text",
        critical:
          "border-banner-border bg-banner-destructive/95 text-banner-text [&_[data-banner-icon]]:text-banner-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function BannerIcon({
  variant,
}: {
  variant: "default" | "caution" | "critical";
}) {
  if (variant === "critical") {
    return <CircleAlertIcon data-banner-icon className="size-4 shrink-0" />;
  }
  return <InfoIcon data-banner-icon className="size-4 shrink-0" />;
}

export interface BannerAction {
  label: React.ReactNode;
  onClick: () => void;
}

export interface BannerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof bannerVariants> {
  title?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  /** Optional action button (e.g. "Undo", "View") */
  action?: BannerAction;
}

function Banner({
  className,
  variant = "default",
  title,
  onClose,
  closeLabel = "Close",
  action,
  children,
  ...props
}: BannerProps) {
  return (
    <div
      data-slot="banner"
      data-variant={variant}
      role="alert"
      className={cn(
        bannerVariants({ variant }),
        (onClose || action) && "pe-10",
        className,
      )}
      {...props}
    >
      <BannerIcon variant={variant || "default"} />
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium text-[#30313D] leading-none mb-1">{title}</p>}
        {children && <p className="leading-snug">{children}</p>}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-2 inline-flex h-8 items-center justify-center rounded-md border border-[#D7D7D0] bg-white px-3 text-sm font-medium text-[#30313D] shadow-sm transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-[#3d3d45] dark:bg-[#27272a] dark:text-[#f4f4f5] dark:hover:bg-[#3f3f46]"
          >
            {action.label}
          </button>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="absolute top-3 end-3 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shrink-0 [&_svg]:text-current"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

export { Banner, bannerVariants };

export type BannerVariant = NonNullable<
  VariantProps<typeof bannerVariants>["variant"]
>;

export interface BannerOptions {
  variant?: BannerVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: BannerAction;
}

/**
 * Show a persistent banner using the same toast system (Sonner).
 * Banners do not auto-dismiss and show a close button.
 */
function banner(
  message: React.ReactNode,
  options?: BannerOptions,
): string | number {
  const { variant = "default", title, description, action } = options ?? {};
  return toast.custom(
    (id) => (
      <Banner
        variant={variant}
        title={title}
        onClose={() => toast.dismiss(id)}
        closeLabel="Close banner"
        action={
          action
            ? {
                label: action.label,
                onClick: () => {
                  action.onClick();
                  toast.dismiss(id);
                },
              }
            : undefined
        }
      >
        {description ?? message}
      </Banner>
    ),
    { duration: Infinity },
  );
}

export { banner };
