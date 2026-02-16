"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SIZES = ["sm", "md", "lg"] as const;

const HOVER_SHADOW =
  "[&_button]:!shadow-[0px_2px_5px_0px_#40445214,0px_0px_0px_4px_#4362835C,0px_0px_0px_1px_#40445229,0px_1px_1px_0px_#0000001F]";

const FOCUS_SHADOW =
  "[&_button]:!shadow-[0px_1px_1px_0px_#0000001F,0px_2px_5px_0px_#3C425714,0px_3px_9px_0px_#3C425714]";

type ButtonVariant = "primary" | "secondary" | "destructive";

interface ButtonVariantShowcaseProps {
  variant: ButtonVariant;
  title?: string;
}

export function ButtonVariantShowcase({
  variant,
  title,
}: ButtonVariantShowcaseProps) {
  return (
    <div className="space-y-6">
      {title
        ? // <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          null
        : null}
      <div className="overflow-x-auto bg-code-background rounded-lg border p-4">
        <div className="grid min-w-[320px] grid-cols-3 gap-x-2 gap-y-3">
          {SIZES.map((size) => (
            <div
              key={`default-${size}`}
              className="flex items-center justify-center pb-3"
            >
              <Button variant={variant} size={size}>
                Button
              </Button>
            </div>
          ))}
          {SIZES.map((size) => (
            <div
              key={`disabled-${size}`}
              className="flex items-center justify-center py-3"
            >
              <Button variant={variant} size={size} disabled>
                Button
              </Button>
            </div>
          ))}
          {SIZES.map((size) => (
            <div
              key={`hover-${size}`}
              className={cn(
                "flex items-center justify-center py-3",
                HOVER_SHADOW,
              )}
            >
              <Button variant={variant} size={size}>
                Button
              </Button>
            </div>
          ))}
          {SIZES.map((size) => (
            <div
              key={`focus-${size}`}
              className={cn(
                "flex items-center justify-center py-3",
                FOCUS_SHADOW,
              )}
            >
              <Button variant={variant} size={size}>
                Button
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
