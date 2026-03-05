"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const areaData = [
  { month: "Jan", value: 3200 },
  { month: "Feb", value: 3800 },
  { month: "Mar", value: 3500 },
  { month: "Apr", value: 4200 },
  { month: "May", value: 4800 },
];

const donutData = [
  { name: "A", value: 40, fill: "var(--chart-1)" },
  { name: "B", value: 35, fill: "var(--chart-2)" },
  { name: "C", value: 25, fill: "var(--chart-3)" },
];

const horizontalBarData = [
  { name: "Q1", value: 420 },
  { name: "Q2", value: 380 },
  { name: "Q3", value: 510 },
  { name: "Q4", value: 290 },
];

const verticalBarData = [
  { x: "Mon", value: 120 },
  { x: "Tue", value: 95 },
  { x: "Wed", value: 140 },
  { x: "Thu", value: 88 },
  { x: "Fri", value: 165 },
];

const areaConfig = {
  value: { label: "Value", color: "var(--chart-1)" },
} satisfies ChartConfig;
const barConfig = {
  value: { label: "Value", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function ChartGroup8() {
  return (
    <div className="space-y-4 w-full rounded-lg border border-border bg-background p-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium">Area chart</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={areaConfig} className="h-[200px] w-full">
              <AreaChart data={areaData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium">Donut</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{}}
              className="mx-auto h-[180px] w-full max-w-[160px]"
            >
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={2}
                >
                  {donutData.map((_, i) => (
                    <Cell key={i} fill={donutData[i].fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium">Horizontal bars</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barConfig} className="h-[180px] w-full">
              <BarChart
                data={horizontalBarData}
                layout="vertical"
                margin={{ left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  className="stroke-muted"
                />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  width={32}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="value"
                  fill="var(--chart-2)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium">Vertical bars</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barConfig} className="h-[180px] w-full">
              <BarChart data={verticalBarData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="x"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="value"
                  fill="var(--chart-3)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
