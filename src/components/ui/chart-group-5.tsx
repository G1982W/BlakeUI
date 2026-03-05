"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { month: "Jan", current: 4200, previous: 3800 },
  { month: "Feb", current: 4500, previous: 4100 },
  { month: "Mar", current: 4100, previous: 4400 },
  { month: "Apr", current: 4800, previous: 4300 },
  { month: "May", current: 5200, previous: 4600 },
  { month: "Jun", current: 4900, previous: 4800 },
];

const chartConfig = {
  current: { label: "Current year", color: "var(--brand)" },
  previous: { label: "Previous year", color: "var(--muted-foreground)" },
} satisfies ChartConfig;

const currentTotal = data.reduce((s, d) => s + d.current, 0);
const previousTotal = data.reduce((s, d) => s + d.previous, 0);
const growth =
  previousTotal > 0
    ? (((currentTotal - previousTotal) / previousTotal) * 100).toFixed(1)
    : "0";

export function ChartGroup5() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium">Year over year</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[240px] w-full">
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="var(--brand)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke="var(--muted-foreground)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium">Summary</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Current period</p>
              <p className="text-xl font-semibold">
                ${currentTotal.toLocaleString()}
              </p>
            </div>
            <div className="border-t border-border pt-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Previous period</p>
                <p className="text-lg font-medium">
                  ${previousTotal.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">Growth</p>
              <p className="text-lg font-semibold text-chart-2">+{growth}%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
