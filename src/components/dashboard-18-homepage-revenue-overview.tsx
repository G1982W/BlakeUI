"use client";

import { BarChart3 } from "lucide-react";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

type DailyMetric = {
  day: string;
  orderCount: number;
  avgOrderValue: number;
  totalRevenue: number;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US");

const mixBase = "transparent";

/** Grayscale series (aligned with dashboard-18 RevenueFlowChart / salesTrendColors). */
const palette = {
  primary: "var(--foreground)",
  secondary: {
    light: `color-mix(in oklch, var(--foreground) 30%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--foreground) 40%, ${mixBase})`,
  },
};

const dailyMetrics: DailyMetric[] = [
  { day: "Jan 1", orderCount: 142, avgOrderValue: 89, totalRevenue: 12638 },
  { day: "Jan 2", orderCount: 198, avgOrderValue: 112, totalRevenue: 22176 },
  { day: "Jan 3", orderCount: 167, avgOrderValue: 95, totalRevenue: 15865 },
  { day: "Jan 4", orderCount: 245, avgOrderValue: 78, totalRevenue: 19110 },
  { day: "Jan 5", orderCount: 289, avgOrderValue: 134, totalRevenue: 38726 },
  { day: "Jan 6", orderCount: 112, avgOrderValue: 156, totalRevenue: 17472 },
  { day: "Jan 7", orderCount: 178, avgOrderValue: 102, totalRevenue: 18156 },
  { day: "Jan 8", orderCount: 234, avgOrderValue: 88, totalRevenue: 20592 },
  { day: "Jan 9", orderCount: 156, avgOrderValue: 145, totalRevenue: 22620 },
  { day: "Jan 10", orderCount: 267, avgOrderValue: 110, totalRevenue: 29370 },
  { day: "Jan 11", orderCount: 189, avgOrderValue: 167, totalRevenue: 31563 },
  { day: "Jan 12", orderCount: 145, avgOrderValue: 92, totalRevenue: 13340 },
  { day: "Jan 13", orderCount: 278, avgOrderValue: 125, totalRevenue: 34750 },
  { day: "Jan 14", orderCount: 201, avgOrderValue: 138, totalRevenue: 27738 },
  { day: "Jan 15", orderCount: 134, avgOrderValue: 176, totalRevenue: 23584 },
  { day: "Jan 16", orderCount: 256, avgOrderValue: 99, totalRevenue: 25344 },
  { day: "Jan 17", orderCount: 187, avgOrderValue: 142, totalRevenue: 26554 },
  { day: "Jan 18", orderCount: 223, avgOrderValue: 85, totalRevenue: 18955 },
  { day: "Jan 19", orderCount: 165, avgOrderValue: 118, totalRevenue: 19470 },
  { day: "Jan 20", orderCount: 298, avgOrderValue: 105, totalRevenue: 31290 },
  { day: "Jan 21", orderCount: 176, avgOrderValue: 162, totalRevenue: 28512 },
  { day: "Jan 22", orderCount: 210, avgOrderValue: 94, totalRevenue: 19740 },
  { day: "Jan 23", orderCount: 243, avgOrderValue: 128, totalRevenue: 31104 },
  { day: "Jan 24", orderCount: 159, avgOrderValue: 151, totalRevenue: 24009 },
  { day: "Jan 25", orderCount: 281, avgOrderValue: 87, totalRevenue: 24447 },
  { day: "Jan 26", orderCount: 195, avgOrderValue: 143, totalRevenue: 27885 },
  { day: "Jan 27", orderCount: 128, avgOrderValue: 189, totalRevenue: 24192 },
  { day: "Jan 28", orderCount: 267, avgOrderValue: 96, totalRevenue: 25632 },
  { day: "Jan 29", orderCount: 214, avgOrderValue: 131, totalRevenue: 28034 },
  { day: "Jan 30", orderCount: 183, avgOrderValue: 117, totalRevenue: 21411 },
];

const GAP_OFFSET = 2500;

const fullYearData = [
  {
    quarter: "Q1 '21",
    thisYear: 28000,
    lastYear: -18000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q2 '21",
    thisYear: 35000,
    lastYear: -22000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q3 '21",
    thisYear: 32000,
    lastYear: -20000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q1 '22",
    thisYear: 42000,
    lastYear: -25000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q2 '22",
    thisYear: 48000,
    lastYear: -28000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q3 '22",
    thisYear: 45000,
    lastYear: -24000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q1 '23",
    thisYear: 55000,
    lastYear: -30000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q2 '23",
    thisYear: 62000,
    lastYear: -32000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q3 '23",
    thisYear: 58000,
    lastYear: -27000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q1 '24",
    thisYear: 65000,
    lastYear: -35000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q2 '24",
    thisYear: 70000,
    lastYear: -33000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
  {
    quarter: "Q3 '24",
    thisYear: 68000,
    lastYear: -30000,
    gapUp: GAP_OFFSET,
    gapDown: -GAP_OFFSET,
  },
];

const revenueDomainMax =
  Math.ceil(
    Math.max(
      ...fullYearData.map((entry) =>
        Math.max(
          Math.abs(entry.thisYear) + GAP_OFFSET,
          Math.abs(entry.lastYear) + GAP_OFFSET,
        ),
      ),
    ) / 5000,
  ) * 5000;

const scatterChartConfig = {
  scatter: { label: "Daily Metrics", color: "var(--brand)" },
} satisfies ChartConfig;

const revenueChartConfig = {
  thisYear: { label: "This Year", color: "var(--brand)" },
  lastYear: { label: "Last Year", theme: palette.secondary },
} satisfies ChartConfig;

const chartHeaderClass =
  "flex h-14 items-center justify-between border-b px-4 sm:px-5";
const chartIconBtnClass = "size-7 sm:size-8";
const chartIconClass = "size-4 text-muted-foreground sm:size-[18px]";
const chartTitleClass = "text-sm font-medium text-pretty sm:text-base";
const tooltipLabelClass = "text-[10px] text-muted-foreground sm:text-xs";
const tooltipValueClass = "text-[10px] font-medium text-foreground sm:text-xs";

type ScatterTooltipProps = Pick<
  TooltipContentProps<number, string>,
  "active" | "payload"
>;

function ScatterTooltip({ active, payload }: ScatterTooltipProps) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload as DailyMetric | undefined;
  if (!data) return null;

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
      <p className="mb-1.5 text-xs font-medium text-foreground">{data.day}</p>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className={tooltipLabelClass}>Orders:</span>
          <span className={tooltipValueClass}>
            {numberFormatter.format(data.orderCount)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className={tooltipLabelClass}>AOV:</span>
          <span className={tooltipValueClass}>
            {currencyFormatter.format(data.avgOrderValue)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border pt-1">
          <span className={tooltipLabelClass}>Revenue:</span>
          <span className={tooltipValueClass}>
            {currencyFormatter.format(data.totalRevenue)}
          </span>
        </div>
      </div>
    </div>
  );
}

const AOVScatterChart = () => {
  const totalOrders = dailyMetrics.reduce((s, d) => s + d.orderCount, 0);
  const totalRevenue = dailyMetrics.reduce((s, d) => s + d.totalRevenue, 0);
  const avgAOV = totalOrders === 0 ? 0 : totalRevenue / totalOrders;

  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-xl border bg-card">
      <div className={chartHeaderClass}>
        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            className={chartIconBtnClass}
            aria-label="AOV vs Order Volume"
          >
            <BarChart3 className={chartIconClass} aria-hidden="true" />
          </Button>
          <h2 className={chartTitleClass}>AOV vs Order Volume</h2>
        </div>
        <span className={tooltipLabelClass}>Last 30 days</span>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
              {currencyFormatter.format(avgAOV)}
            </p>
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase sm:text-xs">
              Avg. AOV
            </p>
          </div>
          <div className="w-px self-stretch bg-border" />
          <div className="flex flex-col gap-1">
            <p className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
              {numberFormatter.format(totalOrders)}
            </p>
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase sm:text-xs">
              Total Orders
            </p>
          </div>
          <div className="w-px self-stretch bg-border" />
          <div className="flex flex-col gap-1">
            <p className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
              {compactCurrencyFormatter.format(totalRevenue)}
            </p>
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase sm:text-xs">
              Total Revenue
            </p>
          </div>
        </div>
        <div className="h-[240px] w-full min-w-0 sm:h-[280px]">
          <ChartContainer
            config={scatterChartConfig}
            className="aspect-auto h-full w-full"
          >
            <ScatterChart margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="0" />
              <XAxis
                type="number"
                dataKey="orderCount"
                name="Orders"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                type="number"
                dataKey="avgOrderValue"
                name="AOV"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                width={50}
                tickFormatter={(v) => `$${v}`}
              />
              <ZAxis
                type="number"
                dataKey="totalRevenue"
                range={[40, 400]}
                name="Revenue"
              />
              <Tooltip
                content={({ active, payload }) => (
                  <ScatterTooltip active={active} payload={payload} />
                )}
                cursor={{ strokeDasharray: "3 3" }}
              />
              <Scatter
                data={dailyMetrics}
                fill="var(--color-scatter)"
                fillOpacity={0.6}
                strokeWidth={0}
              />
            </ScatterChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

type RevenueTooltipProps = Pick<
  TooltipContentProps<number, string>,
  "active" | "payload" | "label"
>;

function RevenueTooltip({ active, payload, label }: RevenueTooltipProps) {
  if (!active || !payload?.length) return null;

  const visiblePayload = payload.filter(
    (entry) => entry.dataKey !== "gapUp" && entry.dataKey !== "gapDown",
  );

  if (!visiblePayload.length) return null;

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
      <p className="mb-1.5 text-xs font-medium text-foreground">{label}</p>
      <div className="space-y-1">
        {visiblePayload.map((entry) => {
          const dataKey = String(entry.dataKey ?? "");
          const cfgLabel =
            revenueChartConfig[dataKey as keyof typeof revenueChartConfig]
              ?.label ?? dataKey;
          return (
            <div key={dataKey} className="flex items-center gap-2">
              <div
                className="size-2 rounded-full"
                style={{ backgroundColor: String(entry.color) }}
              />
              <span className={tooltipLabelClass}>{cfgLabel}:</span>
              <span className={tooltipValueClass}>
                {currencyFormatter.format(Math.abs(Number(entry.value)))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const RevenueOverviewChart = () => {
  const totalThisYear = fullYearData.reduce(
    (sum, entry) => sum + entry.thisYear,
    0,
  );
  const totalLastYear = fullYearData.reduce(
    (sum, entry) => sum + Math.abs(entry.lastYear),
    0,
  );
  const changePercent =
    totalLastYear === 0
      ? 0
      : ((totalThisYear - totalLastYear) / totalLastYear) * 100;
  const isPositive = changePercent >= 0;

  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-xl border bg-card">
      <div className={chartHeaderClass}>
        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            className={chartIconBtnClass}
            aria-label="Revenue Overview"
          >
            <BarChart3 className={chartIconClass} aria-hidden="true" />
          </Button>
          <h2 className={chartTitleClass}>Revenue Overview</h2>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          {[
            { label: "This Year", color: "var(--brand)" },
            { label: "Last Year", color: palette.secondary.light },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="size-2 rounded-full sm:size-2.5"
                style={{ backgroundColor: item.color }}
              />
              <span className={tooltipLabelClass}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
        <div className="flex flex-col gap-1">
          <p className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
            {currencyFormatter.format(totalThisYear)}
          </p>
          <p
            className={cn(
              "text-[10px] tracking-wider uppercase sm:text-xs",
              isPositive
                ? "font-medium text-foreground"
                : "text-muted-foreground",
            )}
          >
            {isPositive ? "+" : "-"}
            {Math.abs(changePercent).toFixed(1)}% vs last year
          </p>
        </div>
        <div className="h-[240px] w-full min-w-0 sm:h-[280px]">
          <ChartContainer config={revenueChartConfig} className="h-full w-full">
            <BarChart data={fullYearData} stackOffset="sign">
              <CartesianGrid vertical={false} strokeDasharray="0" />
              <XAxis
                dataKey="quarter"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                width={50}
                domain={[-revenueDomainMax, revenueDomainMax]}
                tickCount={9}
                tickFormatter={(v: number) =>
                  compactCurrencyFormatter.format(Math.abs(v))
                }
              />

              <Tooltip
                content={({ active, payload, label }) => (
                  <RevenueTooltip
                    active={active}
                    payload={payload}
                    label={label}
                  />
                )}
                cursor={{ fillOpacity: 0.05 }}
              />
              <Bar
                dataKey="gapUp"
                stackId="revenue"
                fill="transparent"
                barSize={22}
                isAnimationActive={false}
              />
              <Bar
                dataKey="thisYear"
                stackId="revenue"
                fill="var(--color-thisYear)"
                radius={6}
                barSize={22}
              />
              <Bar
                dataKey="gapDown"
                stackId="revenue"
                fill="transparent"
                barSize={22}
                isAnimationActive={false}
              />
              <Bar
                dataKey="lastYear"
                stackId="revenue"
                fill="var(--color-lastYear)"
                fillOpacity={0.4}
                radius={6}
                barSize={22}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard18HomepageRevenueOverview() {
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[3fr_2fr]">
      <RevenueOverviewChart />
      <AOVScatterChart />
    </div>
  );
}
