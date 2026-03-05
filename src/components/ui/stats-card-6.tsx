"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const chartColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

export type BreakdownItem = { label: string; value: string; percent?: number };

export function StatsCard6({
  title = "Revenue",
  total = "$24,800",
  items = [
    { label: "Subscription", value: "$18,200", percent: 73 },
    { label: "One-time", value: "$4,200", percent: 17 },
    { label: "Add-ons", value: "$2,400", percent: 10 },
  ],
}: {
  title?: string;
  total?: string;
  items?: BreakdownItem[];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-2xl font-bold">{total}</p>
        <ul className="space-y-2 border-t border-border pt-3">
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span
                  className={cn("size-2 shrink-0 rounded-full")}
                  style={{ backgroundColor: chartColors[i % chartColors.length] }}
                  aria-hidden
                />
                {item.label}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                {item.value}
                {item.percent != null && <span className="text-xs">({item.percent}%)</span>}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
