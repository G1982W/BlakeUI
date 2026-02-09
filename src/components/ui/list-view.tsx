"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const listItemVariants = cva(
  "flex w-full min-w-0 gap-3 border-b border-border py-2.5 text-left last:border-b-0",
  {
    variants: {
      variant: {
        iconTitleSecondaryValue: "items-start",
        titleSecondaryValue: "items-start",
        iconTitleValue: "items-center",
        titleValue: "items-center",
        valueOnly: "items-center",
      },
      withBackground: {
        true: "rounded-lg bg-[#F9F6F1] px-3 dark:bg-muted/50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "iconTitleSecondaryValue",
      withBackground: false,
    },
  }
)

export interface ListItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof listItemVariants> {
  icon?: React.ReactNode
  title?: React.ReactNode
  secondary?: React.ReactNode
  value?: React.ReactNode
  asChild?: boolean
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      className,
      variant = "iconTitleSecondaryValue",
      withBackground = false,
      icon,
      title,
      secondary,
      value,
      children,
      ...props
    },
    ref
  ) => {
    const showIcon =
      variant === "iconTitleSecondaryValue" || variant === "iconTitleValue"
    const showTitle =
      variant === "iconTitleSecondaryValue" ||
      variant === "titleSecondaryValue" ||
      variant === "iconTitleValue" ||
      variant === "titleValue"
    const showSecondary =
      variant === "iconTitleSecondaryValue" || variant === "titleSecondaryValue"
    const showValue =
      variant === "iconTitleSecondaryValue" ||
      variant === "titleSecondaryValue" ||
      variant === "iconTitleValue" ||
      variant === "titleValue" ||
      variant === "valueOnly"

    const hasMainBlock = showTitle || showSecondary

    return (
      <div
        ref={ref}
        data-slot="list-item"
        data-variant={variant}
        data-with-background={withBackground}
        className={cn(listItemVariants({ variant, withBackground }), className)}
        {...props}
      >
        {showIcon && icon != null && (
          <span className="flex shrink-0 text-muted-foreground [&>svg]:size-5">
            {icon}
          </span>
        )}
        {hasMainBlock && (
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            {showTitle && title != null && (
              <span className="truncate text-sm font-medium text-foreground">
                {title}
              </span>
            )}
            {showSecondary && secondary != null && (
              <span className="truncate text-xs text-muted-foreground">
                {secondary}
              </span>
            )}
          </div>
        )}
        {showValue && value != null && (
          <span
            className={cn(
              "shrink-0 text-sm text-muted-foreground",
              hasMainBlock && "text-right"
            )}
          >
            {value}
          </span>
        )}
        {children}
      </div>
    )
  }
)
ListItem.displayName = "ListItem"

function ListView({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="list-view"
      role="list"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}
ListView.displayName = "ListView"

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional header content (e.g. title) rendered above the list */
  header?: React.ReactNode
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ className, header, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="list"
        className={cn("flex flex-col", className)}
        {...props}
      >
        {header != null && (
          <div className="mb-2 text-sm font-medium text-foreground">
            {header}
          </div>
        )}
        <ListView>{children}</ListView>
      </div>
    )
  }
)
List.displayName = "List"

export { List, ListItem, ListView, listItemVariants }
