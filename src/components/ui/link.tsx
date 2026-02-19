import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center text-brand gap-1 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 [aria-disabled=true]:pointer-events-none [aria-disabled=true]:opacity-50 [aria-disabled=true]:text-link-disabled [aria-disabled=true]:hover:text-link-disabled",
  {
    variants: {
      variant: {
        primary: " hover:text-brand/95 no-underline",
        secondary:
          " underline decoration-dotted underline-offset-4 hover:text-brand/95",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface AppLinkProps
  extends
    React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof linkVariants> {
  disabled?: boolean;
}

const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ className, variant, disabled, href, onClick, ...props }, ref) => {
    const isDisabled =
      typeof disabled === "string" ? disabled !== "false" : Boolean(disabled);

    if (isDisabled) {
      return (
        <span
          role="link"
          aria-disabled="true"
          className={cn(
            linkVariants({ variant }),
            "cursor-not-allowed text-link-disabled opacity-60",
            className,
          )}
          tabIndex={-1}
          {...props}
        />
      );
    }

    return (
      <Link
        ref={ref}
        className={cn(linkVariants({ variant }), className)}
        href={href ?? "#"}
        onClick={onClick}
        {...props}
      />
    );
  },
);
AppLink.displayName = "AppLink";

export { AppLink, linkVariants };
