"use client";

import * as React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { month: "Jan", current: 4200, previous: 3800 },
  { month: "Feb", current: 4500, previous: 4100 },
  { month: "Mar", current: 4100, previous: 4400 },
  { month: "Apr", current: 4800, previous: 4300 },
  { month: "May", current: 5200, previous: 4600 },
];

const chartConfig = {
  current: { label: "Current", color: "var(--brand)" },
  previous: { label: "Previous", color: "var(--muted-foreground)" },
} satisfies ChartConfig;

export function ChartCard6() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="mb-4 text-sm font-medium">Period comparison</p>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="current" stroke="var(--brand)" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="previous" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
