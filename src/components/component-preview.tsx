"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import registry from "@/registry.json";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface ComponentPreviewProps {
  name: string;
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({
  name,
  children,
  className,
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);

  const code = (registry as any)[name]?.source || "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group my-4 flex flex-col space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-md border text-foreground bg-white p-1 text-xs">
          <button
            onClick={() => setTab("preview")}
            className={cn(
              "rounded-sm cursor-pointer px-3 py-1 font-medium transition-all hover:text-foreground hover:bg-background",
              tab === "preview" ? "bg-background  shadow-sm" : "",
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={cn(
              "rounded-sm cursor-pointer px-3 py-1 font-medium text-foreground transition-all hover:text-foreground hover:bg-background",
              tab === "code" ? "bg-background  shadow-sm" : "",
            )}
          >
            Code
          </button>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex h-8 items-center justify-center rounded-md border bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-lg border bg-code-background">
        {tab === "preview" ? (
          <div className="flex min-h-[200px] w-full items-center justify-center p-10 ring-offset-background transition-colors">
            {children}
          </div>
        ) : (
          <DynamicCodeBlock
            lang="tsx"
            code={code}
            codeblock={{
              title: undefined,
              className:
                "my-0 rounded-lg border bg-code-background shadow-none text-xs text-zinc-50 font-mono",
            }}
          />
        )}
      </div>
    </div>
  );
}
