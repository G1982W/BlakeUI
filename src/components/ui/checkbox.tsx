"use client";

import * as React from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ComponentProps<
  typeof CheckboxPrimitive.Root
> {
  description?: string;
  label?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, description, label, id, ...props }, ref) => {
  const checkbox = (
    <CheckboxPrimitive.Root
      id={id}
      ref={ref}
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-brand data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-brand data-[state=checked]:border-primary data-[state=indeterminate]:bg-brand data-[state=indeterminate]:text-primary-foreground dark:data-[state=indeterminate]:bg-brand data-[state=indeterminate]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 data-[state=checked]:focus-visible:border-ring data-[state=checked]:focus-visible:ring-ring/50 data-[state=indeterminate]:focus-visible:border-ring data-[state=indeterminate]:focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] data-[state=checked]:focus-visible:ring-[3px] data-[state=indeterminate]:focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        {props.checked === "indeterminate" ? (
          <MinusIcon className="size-3.5" />
        ) : (
          <CheckIcon className="size-3.5" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label && !description) {
    return checkbox;
  }

  return (
    <div className="flex items-start gap-2">
      {checkbox}
      <div className="grid gap-1.5 leading-none">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
