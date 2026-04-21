"use client";

import * as React from "react";
import { useShiki } from "fumadocs-core/highlight/client";
import {
  CodeBlock,
  type CodeBlockProps,
  Pre,
} from "fumadocs-ui/components/codeblock";
import type { DynamicCodeblockProps } from "fumadocs-ui/components/dynamic-codeblock";
import { cn } from "@/lib/utils";

type CachedDynamicCodeBlockProps = DynamicCodeblockProps;

const PropsContext = React.createContext<CodeBlockProps | undefined>(undefined);

function DefaultPre(props: React.ComponentProps<"pre">) {
  const extraProps = React.use(PropsContext);

  return (
    <CodeBlock
      {...(props as unknown as CodeBlockProps)}
      {...extraProps}
      className={cn("my-0", props.className, extraProps?.className)}
    >
      <Pre>{props.children}</Pre>
    </CodeBlock>
  );
}

function Placeholder({
  code,
  components = {},
}: {
  code: string;
  components?: Record<string, React.ElementType>;
}) {
  const PreComponent = components.pre ?? "pre";
  const CodeComponent = components.code ?? "code";

  return (
    <PreComponent>
      <CodeComponent>
        {code.split("\n").map((line, i) => (
          <span key={i} className="line">
            {line}
          </span>
        ))}
      </CodeComponent>
    </PreComponent>
  );
}

function Internal({
  code,
  options,
}: {
  code: string;
  options: Record<string, unknown>;
}) {
  return useShiki(code, options as never);
}

export function CachedDynamicCodeBlock({
  lang,
  code,
  codeblock,
  options,
  wrapInSuspense = true,
}: CachedDynamicCodeBlockProps) {
  const shikiOptions = React.useMemo(
    () => ({
      lang,
      ...options,
      components: {
        pre: DefaultPre,
        ...options?.components,
      },
    }),
    [lang, options],
  );

  const children = (
    <PropsContext.Provider value={codeblock}>
      <Internal code={code} options={shikiOptions} />
    </PropsContext.Provider>
  );

  if (!wrapInSuspense) return children;

  return (
    <React.Suspense
      fallback={
        <Placeholder code={code} components={shikiOptions.components} />
      }
    >
      {children}
    </React.Suspense>
  );
}
