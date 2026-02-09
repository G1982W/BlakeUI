import * as React from "react";
import Link from "next/link";
import { source } from "@/lib/source";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import registry from "@/registry.json";

const previewByKey: Record<string, React.ReactNode> = {
  badge: <Badge>Badge</Badge>,
  button: <Button>Button</Button>,
  input: <Input type="text" placeholder="Input" className="max-w-[180px]" />,
};

const baseLabelMap: Record<string, string> = {
  base: "Base Components",
};

function getComponentKey(path: string | undefined, url: string) {
  if (path) {
    const name = path.split("/").pop() || "";
    return name.replace(/\.mdx?$/, "");
  }

  const last = url.split("/").filter(Boolean).pop();
  return last ?? url;
}

export function ComponentsGrid() {
  const registryKeys = new Set(
    Object.keys(registry as Record<string, unknown>)
  );
  const pages = source
    .getPages()
    .map((page) => {
      const data = page.data as typeof page.data & {
        component?: boolean;
        base?: string;
      };

      return {
        title: data.title,
        description: data.description,
        base: data.base,
        component: data.component,
        url: page.url,
        key: getComponentKey(page.path, page.url),
      };
    })
    .filter((page) => page.url !== "/docs" && registryKeys.has(page.key))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="mt-6 grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {pages.map((page) => {
        const preview = previewByKey[page.key];
        const baseLabel = page.base
          ? baseLabelMap[page.base] ?? page.base
          : null;

        return (
          <Link
            key={page.url}
            href={page.url}
            className="group rounded-xl border bg-card no-underline transition duration-200 hover:border-foreground/20 hover:shadow-lg"
          >
            <div className="flex items-center justify-center rounded-t-xl border-b bg-muted/40 p-6">
              {preview ?? (
                <div className="text-xs font-medium text-muted-foreground">
                  Preview
                </div>
              )}
            </div>
            <div className="space-y-2 p-4">
              {baseLabel ? (
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {baseLabel}
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">{page.title}</h3>
                <span className="text-xs text-muted-foreground group-hover:text-foreground">
                  View →
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {page.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
