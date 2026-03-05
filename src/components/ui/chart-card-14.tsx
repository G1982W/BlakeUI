"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const data = [
  { month: "Jan", min: 10, max: 45, avg: 26 },
  { month: "Feb", min: 15, max: 52, avg: 32 },
  { month: "Mar", min: 12, max: 48, avg: 30 },
  { month: "Apr", min: 18, max: 55, avg: 36 },
  { month: "May", min: 22, max: 60, avg: 40 },
];

const chartConfig = {
  min: { label: "Min", color: "var(--muted-foreground)" },
  max: { label: "Max", color: "var(--muted-foreground)" },
  avg: { label: "Average", color: "var(--brand)" },
} satisfies ChartConfig;

export function ChartCard14({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background p-4",
        className,
      )}
    >
      <p className="mb-4 text-sm font-medium">Range with average</p>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <AreaChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-muted"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="max"
            stroke="transparent"
            fill="var(--muted)"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="min"
            stroke="transparent"
            fill="var(--background)"
          />
          <Area
            type="monotone"
            dataKey="avg"
            stroke="var(--brand)"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="transparent"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
