"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function LineChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} stroke="#E2E8F0" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          tick={{ fill: "#94A3B8", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: "#94A3B8", fontSize: 12 }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="desktop"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="mobile"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

const singleSeriesData = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 73 },
  { month: "May", value: 209 },
  { month: "Jun", value: 214 },
]

const singleSeriesConfig = {
  value: {
    label: "Traffic",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function LineChartSingleSeriesDemo() {
  return (
    <ChartContainer config={singleSeriesConfig} className="h-[300px] w-full">
      <LineChart accessibilityLayer data={singleSeriesData}>
        <CartesianGrid vertical={false} stroke="#E2E8F0" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{ fill: "#94A3B8", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: "#94A3B8", fontSize: 12 }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

const multiSeriesData = [
  { time: "00:00", a: 2000, b: 4000, c: 3000, d: 1000 },
  { time: "06:00", a: 4500, b: 3500, c: 5000, d: 2000 },
  { time: "12:00", a: 5500, b: 4500, c: 7000, d: 5500 },
  { time: "18:00", a: 8000, b: 9000, c: 6500, d: 4000 },
  { time: "23:59", a: 9000, b: 8500, c: 8000, d: 7000 },
]

const multiSeriesConfig = {
  a: { label: "Series A", color: "var(--chart-1)" },
  b: { label: "Series B", color: "var(--chart-2)" },
  c: { label: "Series C", color: "var(--chart-3)" },
  d: { label: "Series D", color: "var(--chart-4)" },
} satisfies ChartConfig

export function LineChartMultiSeriesDemo() {
  return (
    <ChartContainer config={multiSeriesConfig} className="h-[300px] w-full">
      <LineChart accessibilityLayer data={multiSeriesData}>
        <CartesianGrid vertical={false} stroke="#E2E8F0" />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#94A3B8", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: "#94A3B8", fontSize: 12 }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="a" stroke="var(--color-a)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="b" stroke="var(--color-b)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="c" stroke="var(--color-c)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="d" stroke="var(--color-d)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}
