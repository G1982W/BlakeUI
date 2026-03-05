"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  { name: "Jan", revenue: 4200, profit: 2800, orders: 120 },
  { name: "Feb", revenue: 4500, profit: 3000, orders: 145 },
  { name: "Mar", revenue: 4100, profit: 2600, orders: 98 },
  { name: "Apr", revenue: 4800, profit: 3200, orders: 167 },
  { name: "May", revenue: 5200, profit: 3500, orders: 189 },
];

const deviceData = [
  { name: "Desktop", value: 65, fill: "var(--chart-1)" },
  { name: "Mobile", value: 28, fill: "var(--chart-2)" },
  { name: "Tablet", value: 7, fill: "var(--chart-3)" },
];

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  profit: { label: "Profit", color: "var(--chart-2)" },
  orders: { label: "Orders", color: "var(--chart-3)" },
  visits: { label: "Visits", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ChartGroup15() {
  return (
    <div className="rounded-lg w-full border border-border bg-background p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Button variant="primary" size="sm" className="size-8 p-0">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="primary" size="sm" className="size-8 p-0">
            <ChevronRight className="size-4" />
          </Button>
          <span className="px-2 text-sm font-medium">Last 30 days</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm">
            Compare
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" size="sm">
                <Download className="size-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export CSV</DropdownMenuItem>
              <DropdownMenuItem>Refresh</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          { label: "Revenue", value: "$18.2k" },
          { label: "Profit", value: "$12.1k" },
          { label: "Orders", value: "719" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border border-border bg-muted/30 p-3"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-border p-4 lg:col-span-2">
          <Tabs defaultValue="revenue">
            <TabsList className="mb-3">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="profit">Profit</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="revenue" className="mt-0">
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
                    dataKey="revenue"
                    stroke="var(--chart-1)"
                    fill="var(--chart-1)"
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="profit" className="mt-0">
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
                    dataKey="profit"
                    stroke="var(--chart-2)"
                    fill="var(--chart-2)"
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="orders" className="mt-0">
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <BarChart data={timeData}>
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
                  <Bar
                    dataKey="orders"
                    fill="var(--chart-3)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="mb-3 text-sm font-medium">Device</p>
          <ChartContainer
            config={{}}
            className="mx-auto h-[140px] w-full max-w-[140px]"
          >
            <PieChart>
              <Pie
                data={deviceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
              >
                {deviceData.map((_, i) => (
                  <Cell key={i} fill={deviceData[i].fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
