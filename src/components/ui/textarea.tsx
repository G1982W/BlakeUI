import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  /** The heading text */
  heading?: string;
  /** The description text */
  description?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, heading, description, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {heading && (
          <span className="text-input-heading text-sm font-medium leading-none my-0">
            {heading}
          </span>
        )}
        {description && (
          <span className="text-input-description text-xs my-0">
            {description}
          </span>
        )}
        <textarea
          ref={ref}
          data-slot="textarea"
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:border-brand focus-visible:ring-brand/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
