"use client";

import * as React from "react";
import { CalendarIcon, TrendingUp, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Area,
  AreaChart,
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

const revenueData = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 4500 },
  { month: "Mar", value: 4100 },
  { month: "Apr", value: 4800 },
  { month: "May", value: 5200 },
];

const channelData = [
  { name: "Organic", value: 45, fill: "var(--chart-1)" },
  { name: "Direct", value: 30, fill: "var(--chart-2)" },
  { name: "Referral", value: 25, fill: "var(--chart-3)" },
];

const topPages = [
  { rank: 1, path: "/dashboard", views: 12400 },
  { rank: 2, path: "/settings", views: 8200 },
  { rank: 3, path: "/analytics", views: 6100 },
];

const activeUsers = [
  { name: "Alex", initials: "A" },
  { name: "Sam", initials: "S" },
  { name: "Jordan", initials: "J" },
];

const chartConfig = {
  value: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ChartGroup14() {
  return (
    <div className="space-y-4 w-full rounded-lg border border-border bg-background p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <NativeSelect className="w-[140px]">
          <NativeSelectOption value="7d">Last 7 days</NativeSelectOption>
          <NativeSelectOption value="30d">Last 30 days</NativeSelectOption>
          <NativeSelectOption value="90d">Last 90 days</NativeSelectOption>
        </NativeSelect>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              <CalendarIcon className="mr-2 size-4" />
              Pick date
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar mode="range" numberOfMonths={2} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Revenue",
            value: "$18.2k",
            change: "+12%",
            icon: TrendingUp,
            positive: true,
          },
          {
            label: "Users",
            value: "2,847",
            change: "+8%",
            icon: Users,
            positive: true,
          },
          {
            label: "Sessions",
            value: "12.4k",
            change: "-3%",
            icon: Globe,
            positive: false,
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center justify-between p-3">
              <div className="rounded-md bg-muted p-2">
                <stat.icon className="size-4 text-muted-foreground" />
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="font-semibold">{stat.value}</p>
                <Badge
                  variant={stat.positive ? "positive" : "negative"}
                  className="text-[10px]"
                >
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium">Revenue</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[180px] w-full">
              <AreaChart data={revenueData}>
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
            <p className="text-sm font-medium">Traffic channels</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{}}
              className="mx-auto h-[140px] w-full max-w-[140px]"
            >
              <PieChart>
                <Pie
                  data={channelData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={2}
                >
                  {channelData.map((_, i) => (
                    <Cell key={i} fill={channelData[i].fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <p className="text-sm font-medium">Top pages</p>
            <Button variant="primary" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topPages.map((p) => (
                <li
                  key={p.path}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">#{p.rank}</span>
                  <span className="truncate flex-1 px-2">{p.path}</span>
                  <span className="font-medium">
                    {p.views.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <p className="text-sm font-medium">Active users</p>
            <Button variant="primary" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex -space-x-2">
              {activeUsers.map((u) => (
                <Avatar
                  key={u.name}
                  className="size-8 border-2 border-background"
                >
                  <AvatarFallback className="text-xs">
                    {u.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
