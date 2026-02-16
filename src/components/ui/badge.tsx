import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex max-w-full shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent px-[6px] py-[2px] text-xs font-medium leading-none no-underline transition-[color,box-shadow] overflow-hidden [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:size-3 [&_svg]:shrink-0 [&_svg]:align-middle focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-badge-default text-badge-default-foreground border-badge-default-border [a&]:hover:bg-badge-default/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
        info: "bg-badge-info text-badge-info-foreground border-badge-info-border [a&]:hover:bg-badge-info/90",
        positive: "bg-badge-positive text-badge-positive-foreground border-badge-positive-border [a&]:hover:bg-badge-positive/90",
        negative: "bg-badge-negative text-badge-negative-foreground border-badge-negative-border [a&]:hover:bg-badge-negative/90",
        warning: "bg-badge-warning text-badge-warning-foreground border-badge-warning-border [a&]:hover:bg-badge-warning/90",
        urgent: "bg-badge-urgent text-badge-urgent-foreground border-badge-urgent-border [a&]:hover:bg-badge-urgent/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
