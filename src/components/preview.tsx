"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { extractCode } from "@/lib/extract-code";

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function Preview({ children, className }: PreviewProps) {
  const [copied, setCopied] = React.useState(false);
  const code = React.useMemo(() => extractCode(children), [children]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group bg-code-background relative my-4 flex flex-col ",
        className,
      )}
    >
      <div className="relative flex w-full items-center justify-center rounded-lg border p-10 ring-offset-background transition-colors">
        {children}
      </div>
      <div className="flex items-center bg-background justify-end px-4 py-2">
        <button
          onClick={copyToClipboard}
          type="button"
          className="text-xs cursor-pointer font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
    </div>
  );
}
