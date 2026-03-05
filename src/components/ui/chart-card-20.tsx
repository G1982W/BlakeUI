"use client";

import * as React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { subject: "Speed", value: 85, fullMark: 100 },
  { subject: "Quality", value: 70, fullMark: 100 },
  { subject: "Support", value: 90, fullMark: 100 },
  { subject: "Design", value: 65, fullMark: 100 },
  { subject: "Docs", value: 78, fullMark: 100 },
];

const chartConfig = {
  value: { label: "Score", color: "var(--brand)" },
} satisfies ChartConfig;

export function ChartCard20() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="mb-4 text-sm font-medium">Multi-attribute comparison</p>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[240px] w-full max-w-[280px]">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="var(--brand)"
            fill="var(--brand)"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ChartContainer>
    </div>
  );
}
