"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const topBarVariants = cva(
  "flex flex-none w-full min-w-0 items-center justify-between gap-2 border-b px-4 py-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background text-foreground [&_svg]:text-muted-foreground",
        pink:
          "border-pink-600/30 bg-pink-500 text-white [&_svg]:text-white [&_button]:text-white [&_button:hover]:bg-white/20",
        darkBlue:
          "border-blue-950/50 bg-blue-900 text-white [&_svg]:text-white [&_button]:text-white [&_button:hover]:bg-white/20",
        yellow:
          "border-amber-500/30 bg-amber-400 text-gray-900 [&_svg]:text-gray-900 [&_button]:text-gray-900 [&_button:hover]:bg-black/10",
        teal:
          "border-teal-300 bg-teal-200 text-gray-900 [&_svg]:text-gray-900 [&_button]:text-gray-900 [&_button:hover]:bg-black/10",
        darkTeal:
          "border-teal-950/50 bg-teal-800 text-white [&_svg]:text-white [&_button]:text-white [&_button:hover]:bg-white/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TopBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof topBarVariants> {}

const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="top-bar"
        data-variant={variant}
        className={cn(topBarVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
TopBar.displayName = "TopBar"

function TopBarLeft({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="top-bar-left"
      className={cn("flex min-w-0 items-center gap-2", className)}
      {...props}
    />
  )
}

function TopBarRight({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="top-bar-right"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { TopBar, TopBarLeft, TopBarRight, topBarVariants }
