"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { month: "Jan", a: 1200, b: 800, c: 400 },
  { month: "Feb", a: 1400, b: 900, c: 500 },
  { month: "Mar", a: 1100, b: 1000, c: 450 },
  { month: "Apr", a: 1600, b: 950, c: 550 },
  { month: "May", a: 1800, b: 1100, c: 600 },
];

const chartConfig = {
  a: { label: "Series A", color: "var(--chart-1)" },
  b: { label: "Series B", color: "var(--chart-2)" },
  c: { label: "Series C", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function ChartCard9() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="mb-4 text-sm font-medium">Stacked composition</p>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Area type="monotone" dataKey="a" stackId="1" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.6} />
          <Area type="monotone" dataKey="b" stackId="1" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.6} />
          <Area type="monotone" dataKey="c" stackId="1" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.6} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
