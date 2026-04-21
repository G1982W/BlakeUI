import { cva, type VariantProps } from "class-variance-authority";
import { ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "group inline-flex items-center text-foreground gap-1 px-1 py-1 text-sm font-medium transition-colors hover:text-link-secondary disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 [aria-disabled=true]:pointer-events-none [aria-disabled=true]:opacity-50 [aria-disabled=true]:text-link-disabled [aria-disabled=true]:hover:text-link-disabled",
  {
    variants: {
      variant: {
        primary: "no-underline",
        secondary: "underline decoration-dotted underline-offset-4",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const affordanceIconClass =
  "size-4 shrink-0 text-muted-foreground transition-[opacity,color] duration-200 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:text-link-secondary group-focus-visible:text-link-secondary";

function LinkAffordanceIcon({ mode }: { mode: "external" | "plus" }) {
  if (mode === "plus") {
    return <Plus aria-hidden className={affordanceIconClass} />;
  }
  return <ExternalLink aria-hidden className={affordanceIconClass} />;
}

export type AppLinkIcon = "external" | "plus" | "none";

export interface AppLinkProps
  extends
    React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof linkVariants> {
  disabled?: boolean;
  /** Hover/focus affordance: trailing `ExternalLink` (default), leading `Plus`, or `none` for custom icons. */
  icon?: AppLinkIcon;
}

const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  (
    {
      className,
      variant,
      disabled,
      href,
      onClick,
      children,
      icon = "external",
      ...props
    },
    ref,
  ) => {
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
        >
          {children}
        </span>
      );
    }

    const showAffordance = icon !== "none";
    const affordanceBefore = showAffordance && icon === "plus";
    const affordanceAfter = showAffordance && icon === "external";

    return (
      <Link
        ref={ref}
        className={cn(linkVariants({ variant }), className)}
        href={href ?? "#"}
        onClick={onClick}
        {...props}
      >
        {affordanceBefore ? <LinkAffordanceIcon mode="plus" /> : null}
        {children}
        {affordanceAfter ? <LinkAffordanceIcon mode="external" /> : null}
      </Link>
    );
  },
);
AppLink.displayName = "AppLink";

export { AppLink, linkVariants };
