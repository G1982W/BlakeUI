"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
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
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const timeData = [
  { name: "Jan", value: 4200 },
  { name: "Feb", value: 4500 },
  { name: "Mar", value: 4100 },
  { name: "Apr", value: 4800 },
  { name: "May", value: 5200 },
];

const barData = [
  { category: "A", value: 400 },
  { category: "B", value: 300 },
  { category: "C", value: 500 },
  { category: "D", value: 280 },
];

const donutData = [
  { name: "X", value: 45, fill: "var(--chart-1)" },
  { name: "Y", value: 35, fill: "var(--chart-2)" },
  { name: "Z", value: 20, fill: "var(--chart-3)" },
];

const chartConfig = {
  value: { label: "Value", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ChartGroup12() {
  const [preset, setPreset] = React.useState("30");
  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-4">
      <div className="flex flex-wrap items-center justify-end gap-2">
        {(["7", "30", "90"] as const).map((days) => (
          <Button
            key={days}
            variant={preset === days ? "secondary" : "primary"}
            size="sm"
            onClick={() => setPreset(days)}
          >
            {days}d
          </Button>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary" size="sm">
              <CalendarIcon className="mr-2 size-4" />
              Custom
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar mode="range" numberOfMonths={2} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Revenue", value: "$18.2k" },
          { label: "Orders", value: "719" },
          { label: "Conversion", value: "4.2%" },
          { label: "Avg. order", value: "$142" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="sm:col-span-2">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium">Overview</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[180px] w-full">
              <AreaChart data={timeData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="name"
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
            <p className="text-sm font-medium">Distribution</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{}}
              className="mx-auto h-[140px] w-full max-w-[120px]"
            >
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                >
                  {donutData.map((_, i) => (
                    <Cell key={i} fill={donutData[i].fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium">Quick stats</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bounce rate</span>
              <span className="font-medium">32%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">New users</span>
              <span className="font-medium">1,240</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <p className="text-sm font-medium">By category</p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[160px] w-full">
            <BarChart data={barData} layout="vertical" margin={{ left: 0 }}>
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
                dataKey="category"
                tickLine={false}
                axisLine={false}
                width={24}
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
    </div>
  );
}
