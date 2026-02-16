"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "fumadocs-ui/components/tabs";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { registry } from "./registry";

interface VariantGridProps {
  component: string;
  variants: {
    [key: string]: readonly string[];
  };
}

export function VariantGrid({
  component: componentName,
  variants,
}: VariantGridProps) {
  const Component = registry[componentName];

  if (!Component) {
    return <div>Component "{componentName}" not found in registry.</div>;
  }

  const variantKeys = Object.keys(variants);
  const combinations = variantKeys.reduce(
    (acc, key) => {
      const values = variants[key];
      return acc.flatMap((combo) =>
        values.map((value) => ({ ...combo, [key]: value })),
      );
    },
    [{}] as Record<string, string>[],
  );
  const isButton = componentName === "Button";
  const codeSnippet = combinations
    .map((props) => {
      const propString = Object.entries(props)
        .map(([key, value]) => ` ${key}="${value}"`)
        .join("");
      const child =
        isButton && (props.size ?? "").includes("icon")
          ? "<Plus />"
          : componentName;
      return `<${componentName}${propString}>
  ${child}
</${componentName}>`;
    })
    .join("\n\n");

  return (
    <Tabs
      defaultValue="preview"
      className="rounded-3xl border bg-card/80 shadow-sm ring-1 ring-border/30"
    >
      <div className="flex items-center justify-between border-b px-2 py-3">
        {/* <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {componentName} Variants
        </span> */}
        <TabsList className="bg-transparent">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="preview" className="m-0 bg-background">
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-6">
          {combinations.map((props, index) => {
            const sizeValue = props.size ?? "";
            const isIconSize = isButton && sizeValue.includes("icon");
            const previewContent = isIconSize ? <Plus /> : componentName;
            const extraProps = isIconSize ? { "aria-label": "Add" } : {};
            const variantValue = props.variant ?? "";
            return (
              <div
                key={`${componentName}-${index}`}
                className="flex flex-col items-start justify-center bg-button-background px-2 gap-2 py-2 rounded-md"
              >
                <span className="text-[8px] ml-1 text-left leading-none font-medium uppercase text-muted-foreground">
                  {sizeValue ? sizeValue : variantValue}
                </span>
                <div className="">
                  <Component {...props} {...extraProps}>
                    {previewContent}
                  </Component>
                </div>
              </div>
            );
          })}
        </div>
      </TabsContent>

      <TabsContent value="code" className="m-0">
        <DynamicCodeBlock
          lang="tsx"
          code={codeSnippet}
          codeblock={{
            title: `${componentName} usage`,
            className: "m-4 rounded-2xl border bg-background/70",
          }}
        />
      </TabsContent>
    </Tabs>
  );
}
