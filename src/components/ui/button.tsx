import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "h-fit inline-flex rounded-button border cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all hover:shadow-[0px_2px_5px_0px_#40445214,0px_0px_0px_4px_#4362835C,0px_0px_0px_1px_#40445229,0px_1px_1px_0px_#0000001F] focus-visible:shadow-[0px_1px_1px_0px_#0000001F,0px_2px_5px_0px_#3C425714,0px_3px_9px_0px_#3C425714] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: "bg-surface text-surface-foreground  border-border-neutral",
        secondary: "bg-brand text-white border-brand",
        destructive: "bg-destructive text-white border-destructive",
      },
      size: {
        sm: "px-2 py-1 gap-1.5 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        md: "px-2 py-1 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "px-4 py-2 gap-2 px-6 has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
