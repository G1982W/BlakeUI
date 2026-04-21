"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface ChartCard9Props {
  title?: string;
  description?: string;
  className?: string;
}

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80, tablet: 45 },
  { month: "Feb", desktop: 305, mobile: 200, tablet: 65 },
  { month: "Mar", desktop: 237, mobile: 120, tablet: 55 },
  { month: "Apr", desktop: 273, mobile: 190, tablet: 70 },
  { month: "May", desktop: 209, mobile: 130, tablet: 50 },
  { month: "Jun", desktop: 214, mobile: 140, tablet: 60 },
  { month: "Jul", desktop: 256, mobile: 165, tablet: 72 },
  { month: "Aug", desktop: 289, mobile: 180, tablet: 68 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const ChartCard9 = ({
  title = "Traffic Sources",
  description = "Visitors by device type over time",
  className,
}: ChartCard9Props) => {
  return (
    <Card className={cn("max-w-2xl w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillDesktop9" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile9" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTablet9" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-tablet)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-tablet)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="tablet"
              stackId="1"
              stroke="var(--color-tablet)"
              fill="url(#fillTablet9)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="mobile"
              stackId="1"
              stroke="var(--color-mobile)"
              fill="url(#fillMobile9)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="desktop"
              stackId="1"
              stroke="var(--color-desktop)"
              fill="url(#fillDesktop9)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { ChartCard9 };
