"use client";

import * as React from "react";
import { Legend, RadialBar, RadialBarChart, Tooltip } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { name: "A", value: 85, fill: "var(--chart-1)" },
  { name: "B", value: 70, fill: "var(--chart-2)" },
  { name: "C", value: 55, fill: "var(--chart-3)" },
  { name: "D", value: 40, fill: "var(--chart-4)" },
];

const chartConfig = {
  A: { label: "Category A", color: "var(--chart-1)" },
  B: { label: "Category B", color: "var(--chart-2)" },
  C: { label: "Category C", color: "var(--chart-3)" },
  D: { label: "Category D", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function ChartCard19() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="mb-4 text-sm font-medium">Radial breakdown</p>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[260px] w-full max-w-[260px]">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="15%"
          outerRadius="90%"
          barSize={12}
          data={data}
        >
          <RadialBar background dataKey="value" cornerRadius={4} />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}
