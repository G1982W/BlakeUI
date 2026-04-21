"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

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

interface ChartCard6Props {
  title?: string;
  description?: string;
  className?: string;
}

const chartData = [
  { month: "Jan", current: 186, previous: 165 },
  { month: "Feb", current: 305, previous: 280 },
  { month: "Mar", current: 237, previous: 251 },
  { month: "Apr", current: 273, previous: 240 },
  { month: "May", current: 209, previous: 195 },
  { month: "Jun", current: 314, previous: 285 },
];

const chartConfig = {
  current: {
    label: "This Year",
    color: "var(--chart-1)",
  },
  previous: {
    label: "Last Year",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const ChartCard6 = ({
  title = "Revenue Comparison",
  description = "Current year vs previous year",
  className,
}: ChartCard6Props) => {
  return (
    <Card className={cn("max-w-2xl w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
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
            <Line
              type="monotone"
              dataKey="current"
              stroke="var(--color-current)"
              strokeWidth={2}
              dot={{ fill: "var(--color-current)", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="var(--color-previous)"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ fill: "var(--color-previous)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { ChartCard6 };
