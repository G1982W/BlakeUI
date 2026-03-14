"use client";

import * as React from "react";
import propsMetadata from "../props.json";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description?: string;
  required?: boolean;
}

interface PropsTableProps {
  component: string;
}

function PropRow({ prop }: { prop: PropDefinition }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-code-background p-3 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-semibold">
          {prop.name}
          {prop.required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {prop.type}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs">
        <span>
          <span className="text-muted-foreground">Default: </span>
          <span className="font-mono">
            {prop.defaultValue !== undefined
              ? String(prop.defaultValue)
              : "-"}
          </span>
        </span>
      </div>
      {(prop.description ?? "") !== "" && (
        <p className="text-muted-foreground">{prop.description}</p>
      )}
    </div>
  );
}

export function PropsTable({ component }: PropsTableProps) {
  const props =
    (propsMetadata as Record<string, PropDefinition[]>)[component] || [];

  if (props.length === 0) {
    return (
      <div className="my-6 rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
        No prop metadata found for component "{component}".
      </div>
    );
  }

  return (
    <div className="my-6">
      {/* Mobile: card layout */}
      <div className="flex flex-col gap-2 md:hidden">
        {props.map((prop) => (
          <PropRow key={prop.name} prop={prop} />
        ))}
      </div>

      {/* Desktop: table */}
      <div className="overflow-x-auto max-md:hidden">
        <table className="w-full min-w-[500px] bg-code-background text-left text-sm">
          <thead className="bg-muted/50 font-medium">
            <tr>
              <th className="px-4 py-2">Prop</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Default</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {props.map((prop) => (
              <tr key={prop.name}>
                <td className="px-4 py-2 font-mono text-xs font-semibold">
                  {prop.name}
                  {prop.required && (
                    <span className="ml-1 text-destructive">*</span>
                  )}
                </td>
                <td
                  className="px-4 py-2 font-mono text-xs text-muted-foreground max-w-[200px] truncate"
                  title={prop.type}
                >
                  {prop.type}
                </td>
                <td className="px-4 py-2 font-mono text-xs">
                  {prop.defaultValue !== undefined
                    ? String(prop.defaultValue)
                    : "-"}
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  {prop.description || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
