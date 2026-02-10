"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const contextViewVariants = cva("flex flex-col px-4 py-4", {
  variants: {
    variant: {
      full: "gap-4",
      withActions: "gap-4",
      withLink: "gap-1",
      minimal: "gap-1",
    },
  },
  defaultVariants: {
    variant: "full",
  },
})

export interface ContextViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof contextViewVariants> {
  /** Main title (e.g. "Drawer title") */
  title?: React.ReactNode
  /** Secondary text below the title */
  description?: React.ReactNode
  /** Optional link (e.g. "Optional link" with icon). Shown when variant is `full` or `withLink`. */
  link?: React.ReactNode
  /** Primary action button. Shown when variant is `full` or `withActions`. */
  primaryAction?: React.ReactNode
  /** Secondary action button. Shown when variant is `full` or `withActions`. */
  secondaryAction?: React.ReactNode
}

const ContextView = React.forwardRef<HTMLDivElement, ContextViewProps>(
  (
    {
      className,
      variant = "full",
      title,
      description,
      link,
      primaryAction,
      secondaryAction,
      children,
      ...props
    },
    ref
  ) => {
    const showLink = (variant === "full" || variant === "withLink") && link != null
    const showActions =
      (variant === "full" || variant === "withActions") &&
      (primaryAction != null || secondaryAction != null)

    return (
      <div
        ref={ref}
        data-slot="context-view"
        data-variant={variant}
        className={cn(contextViewVariants({ variant }), className)}
        {...props}
      >
        {title != null && (
          <span className="text-base font-semibold text-foreground">
            {title}
          </span>
        )}
        {description != null && (
          <span className="text-sm text-muted-foreground">{description}</span>
        )}
        {showLink && <div className="pt-0.5">{link}</div>}
        {showActions && (
          <div className="flex flex-col gap-2">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
        {children}
      </div>
    )
  }
)
ContextView.displayName = "ContextView"

export { ContextView, contextViewVariants }
