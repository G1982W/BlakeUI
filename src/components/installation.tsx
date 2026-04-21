"use client";

import * as React from "react";
import {
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
} from "fumadocs-ui/components/codeblock";
import { cn } from "@/lib/utils";
import { CachedDynamicCodeBlock } from "@/components/cached-dynamic-codeblock";
import { useSubscriptionStatus } from "@/hooks/use-subscription-status";

type SourceFile = { path: string; code: string };

type InstallationProps = {
  dependencies?: string[];
  useReactSlot?: boolean;
  /** Single-file install (default). Ignored when `files` is set. */
  code?: string;
  fileName?: string;
  /** Multi-file install: one tab per file (e.g. app page blocks). */
  files?: SourceFile[];
  language?: string;
  className?: string;
  /** When true, content is only shown to logged-in users with an active subscription. */
  premium?: boolean;
};

function buildCommands(packages: string[]) {
  if (packages.length === 0) {
    return {
      npm: "npm install",
      pnpm: "pnpm add",
      yarn: "yarn add",
    };
  }

  if (packages.length === 1) {
    const pkg = packages[0];
    return {
      npm: `npm install ${pkg}`,
      pnpm: `pnpm add ${pkg}`,
      yarn: `yarn add ${pkg}`,
    };
  }

  return {
    npm: packages.map((pkg) => `npm install ${pkg}`).join("\n"),
    pnpm: packages.map((pkg) => `pnpm add ${pkg}`).join("\n"),
    yarn: packages.map((pkg) => `yarn add ${pkg}`).join("\n"),
  };
}

export default function Installation({
  dependencies = [],
  useReactSlot = false,
  code,
  fileName,
  files,
  language = "tsx",
  className,
  premium = false,
}: InstallationProps) {
  const { isLoading: subscriptionLoading, hasActiveSubscription } =
    useSubscriptionStatus();

  const multiFile = Boolean(files && files.length > 0);
  const [activeFileIndex, setActiveFileIndex] = React.useState(0);

  React.useEffect(() => {
    if (!multiFile || !files?.length) return;
    if (activeFileIndex >= files.length) setActiveFileIndex(0);
  }, [activeFileIndex, files, multiFile]);

  if (premium && (subscriptionLoading || !hasActiveSubscription)) {
    return null;
  }

  const packages = [
    ...dependencies,
    ...(useReactSlot ? ["@radix-ui/react-slot"] : []),
  ];
  const commands = buildCommands(packages);
  const hasDependencies = packages.length > 0;

  return (
    <div
      className={cn("mb-10 ml-3.5 mt-8 border-l border-border pl-6", className)}
    >
      {hasDependencies ? (
        <>
          <h3 className="relative mb-6 mt-8 text-sm font-semibold text-foreground">
            Install the following dependencies:
          </h3>
          <CodeBlockTabs
            defaultValue="npm"
            className="my-4 rounded-lg border bg-muted/30"
          >
            <CodeBlockTabsList className="h-12 items-center gap-4 border-b border-border px-4">
              <CodeBlockTabsTrigger value="npm">npm</CodeBlockTabsTrigger>
              <CodeBlockTabsTrigger value="pnpm">pnpm</CodeBlockTabsTrigger>
              <CodeBlockTabsTrigger value="yarn">yarn</CodeBlockTabsTrigger>
            </CodeBlockTabsList>
            <div className="p-3">
              <CodeBlockTab value="npm">
                <CachedDynamicCodeBlock
                  lang="bash"
                  code={commands.npm}
                  codeblock={{
                    title: `terminal`,
                    className:
                      "my-0 rounded-lg border bg-code-background shadow-none",
                  }}
                />
              </CodeBlockTab>
              <CodeBlockTab value="pnpm">
                <CachedDynamicCodeBlock
                  lang="bash"
                  code={commands.pnpm}
                  codeblock={{
                    title: `terminal`,
                    className:
                      "my-0 rounded-lg border bg-code-background shadow-none",
                  }}
                />
              </CodeBlockTab>
              <CodeBlockTab value="yarn">
                <CachedDynamicCodeBlock
                  lang="bash"
                  code={commands.yarn}
                  codeblock={{
                    title: `terminal`,
                    className:
                      "my-0 rounded-lg border bg-code-background shadow-none",
                  }}
                />
              </CodeBlockTab>
            </div>
          </CodeBlockTabs>
        </>
      ) : null}
      {multiFile ? (
        <>
          <h3 className="relative mt-8 text-sm font-semibold text-foreground">
            Create the files below (paths shown on each tab) and paste the
            matching source into each file.
          </h3>
          <div className="mt-4 rounded-lg border border-border bg-muted/20 p-2">
            <div
              className="flex gap-1 overflow-x-auto border-b border-border pb-2"
              role="tablist"
              aria-label="Installation files"
            >
              {files!.map((f, index) => {
                const short = f.path.split("/").filter(Boolean).pop() ?? f.path;
                return (
                  <button
                    key={f.path}
                    type="button"
                    role="tab"
                    aria-selected={index === activeFileIndex}
                    onClick={() => setActiveFileIndex(index)}
                    className={cn(
                      "shrink-0 rounded-md border px-2.5 py-1.5 text-left font-mono text-[11px] transition-colors",
                      index === activeFileIndex
                        ? "border-border bg-surface text-foreground shadow-sm"
                        : "border-transparent text-muted-foreground hover:bg-background/80 hover:text-foreground",
                    )}
                  >
                    {short}
                  </button>
                );
              })}
            </div>
            {files![activeFileIndex] ? (
              <CachedDynamicCodeBlock
                lang={
                  files![activeFileIndex].path.endsWith(".ts") &&
                  !files![activeFileIndex].path.endsWith(".tsx")
                    ? "ts"
                    : language
                }
                code={files![activeFileIndex].code}
                codeblock={{
                  title: files![activeFileIndex].path,
                  className: "m-2 rounded-xl border bg-code-background",
                }}
              />
            ) : null}
          </div>
        </>
      ) : (
        <>
          <h3 className="relative mt-8 text-sm font-semibold text-foreground">
            Create a{" "}
            <code className="mx-1 inline-flex whitespace-nowrap rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-foreground">
              {(fileName ?? "").split("/").pop()}
            </code>{" "}
            file and paste the following code into it.
          </h3>

          <CachedDynamicCodeBlock
            lang={language}
            code={code ?? ""}
            codeblock={{
              title: `${fileName ?? ""} usage`,
              className: "m-4 rounded-2xl border bg-code-background",
            }}
          />
        </>
      )}
      <h3 className="relative mt-8 text-sm font-semibold text-foreground">
        Check the import paths to ensure they match your project setup.
      </h3>
    </div>
  );
}
