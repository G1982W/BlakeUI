"use client";

import {
  ArrowUpRight,
  MoreHorizontal,
  PieChartIcon,
  ShoppingCart,
} from "lucide-react";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Sector,
  Tooltip,
  type PieSectorDataItem,
  type PieSectorShapeProps,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip as ShadTooltip,
  TooltipContent as ShadTooltipContent,
  TooltipProvider as ShadTooltipProvider,
  TooltipTrigger as ShadTooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type SalesCategoryItem = {
  name: string;
  value: number;
  percent: number;
  color: string;
};

type RevenueFlowColors = {
  thisYear: string;
  prevYear: string;
};

type TimePeriod = "6months" | "year";

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

/** Grayscale (dashboard-18 homepage, matches in-page RevenueFlowChart). */
const palette = {
  primary: "var(--foreground)",
  secondary: {
    light: `color-mix(in oklch, var(--foreground) 32%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--foreground) 42%, ${mixBase})`,
  },
  tertiary: {
    light: `color-mix(in oklch, var(--foreground) 22%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--foreground) 32%, ${mixBase})`,
  },
  quaternary: {
    light: `color-mix(in oklch, var(--foreground) 12%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--foreground) 22%, ${mixBase})`,
  },
};

/** Claim status + department revenue (reference: amber / muted blue / forest green / light gray). */
const clinicalDashboardPalette = {
  amber: "oklch(0.74 0.14 72)",
  slateBlue: "oklch(0.52 0.055 252)",
  forestGreen: "oklch(0.44 0.095 155)",
  neutralLight: "oklch(0.86 0.018 252)",
} as const;

const departmentRevenueChartConfig = {
  cardiology: {
    label: "Cardiology",
    color: clinicalDashboardPalette.forestGreen,
  },
  orthopedics: {
    label: "Orthopedics",
    color: clinicalDashboardPalette.slateBlue,
  },
  oncology: { label: "Oncology", color: clinicalDashboardPalette.amber },
  general: {
    label: "General",
    color: clinicalDashboardPalette.neutralLight,
  },
} satisfies ChartConfig;

const revenueFlowChartConfig = {
  thisYear: { label: "This Year", color: "var(--brand)" },
  prevYear: { label: "Previous Year", theme: palette.secondary },
} satisfies ChartConfig;

const fullYearData = [
  { month: "Jan", thisYear: 42000, prevYear: 38000 },
  { month: "Feb", thisYear: 38000, prevYear: 45000 },
  { month: "Mar", thisYear: 52000, prevYear: 41000 },
  { month: "Apr", thisYear: 45000, prevYear: 48000 },
  { month: "May", thisYear: 58000, prevYear: 44000 },
  { month: "Jun", thisYear: 41000, prevYear: 52000 },
  { month: "Jul", thisYear: 55000, prevYear: 47000 },
  { month: "Aug", thisYear: 48000, prevYear: 53000 },
  { month: "Sep", thisYear: 62000, prevYear: 49000 },
  { month: "Oct", thisYear: 54000, prevYear: 58000 },
  { month: "Nov", thisYear: 67000, prevYear: 52000 },
  { month: "Dec", thisYear: 71000, prevYear: 61000 },
];

const periodLabels: Record<TimePeriod, string> = {
  "6months": "Last 6 Months",
  year: "Last Year",
};

function getDataForPeriod(period: TimePeriod) {
  if (period === "6months") return fullYearData.slice(0, 6);
  return fullYearData;
}

const claimStatusData = {
  total: 1247,
  pending: { count: 156, percent: 12.5 },
  submitted: { count: 423, percent: 33.9 },
  approved: { count: 668, percent: 53.6 },
};

const claimStatusSegmentColors = {
  pending: clinicalDashboardPalette.amber,
  submitted: clinicalDashboardPalette.slateBlue,
  approved: clinicalDashboardPalette.forestGreen,
} as const;

const departmentRevenueData: SalesCategoryItem[] = [
  {
    name: "Cardiology",
    value: 145_000,
    percent: 58,
    color: clinicalDashboardPalette.forestGreen,
  },
  {
    name: "Orthopedics",
    value: 62_000,
    percent: 25,
    color: clinicalDashboardPalette.slateBlue,
  },
  {
    name: "Oncology",
    value: 33_000,
    percent: 13,
    color: clinicalDashboardPalette.amber,
  },
  {
    name: "General",
    value: 10_000,
    percent: 4,
    color: clinicalDashboardPalette.neutralLight,
  },
];

function useHoverHighlight<T extends string | number>() {
  const [active, setActive] = React.useState<T | null>(null);

  const handleHover = React.useCallback((value: T | null) => {
    setActive(value);
  }, []);

  return { active, handleHover };
}

const ClaimStatusChart = () => {
  const { active: activeSegment, handleHover } = useHoverHighlight<number>();

  const claimStatusItems = [
    {
      key: "pending",
      label: "Pending",
      ...claimStatusData.pending,
      color: claimStatusSegmentColors.pending,
    },
    {
      key: "submitted",
      label: "Submitted",
      ...claimStatusData.submitted,
      color: claimStatusSegmentColors.submitted,
    },
    {
      key: "approved",
      label: "Approved",
      ...claimStatusData.approved,
      color: claimStatusSegmentColors.approved,
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            className="size-7 sm:size-8"
            aria-label="Claim status"
          >
            <ShoppingCart className="size-4 text-muted-foreground sm:size-[18px]" />
          </Button>
          <div>
            <span className="text-sm font-medium sm:text-base">
              Claim Status
            </span>
            <p className="text-[10px] text-muted-foreground sm:text-xs">
              {numberFormatter.format(claimStatusData.total)} Claims This Month
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="size-7 sm:size-8"
          aria-label="More options"
        >
          <MoreHorizontal className="size-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex h-3 w-full overflow-hidden rounded-full sm:h-4">
          {claimStatusItems.map((item, index) => (
            <ShadTooltipProvider key={item.key}>
              <ShadTooltip>
                <ShadTooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "h-full border-0 p-0 transition-opacity duration-200 motion-reduce:transition-none",
                      activeSegment !== null &&
                        activeSegment !== index &&
                        "opacity-40",
                    )}
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    }}
                    onPointerEnter={() => handleHover(index)}
                    onPointerLeave={() => handleHover(null)}
                    onFocus={() => handleHover(index)}
                    onBlur={() => handleHover(null)}
                    aria-label={`${item.label}: ${numberFormatter.format(item.count)} claims (${item.percent}%)`}
                  />
                </ShadTooltipTrigger>
                <ShadTooltipContent
                  side="top"
                  sideOffset={8}
                  className="px-3 py-2"
                >
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {item.percent}%
                      </span>
                    </div>
                    <span className="text-muted-foreground tabular-nums">
                      {numberFormatter.format(item.count)} claims
                    </span>
                  </div>
                </ShadTooltipContent>
              </ShadTooltip>
            </ShadTooltipProvider>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-x-1 text-[10px] text-muted-foreground tabular-nums sm:text-xs"
          aria-label="Claim share breakdown"
        >
          {claimStatusItems.map((item, index) => (
            <React.Fragment key={item.key}>
              {index > 0 ? (
                <span className="px-1 text-muted-foreground/50" aria-hidden="true">
                  —
                </span>
              ) : null}
              <span
                className={cn(
                  "transition-opacity duration-200 motion-reduce:transition-none",
                  activeSegment !== null &&
                    activeSegment !== index &&
                    "opacity-40",
                )}
              >
                {item.percent}%
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {claimStatusItems.map((item, index) => (
            <ShadTooltipProvider key={item.key}>
              <ShadTooltip>
                <ShadTooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1.5 border-0 bg-transparent p-0 transition-opacity duration-200 motion-reduce:transition-none",
                      activeSegment !== null &&
                        activeSegment !== index &&
                        "opacity-40",
                    )}
                    onPointerEnter={() => handleHover(index)}
                    onPointerLeave={() => handleHover(null)}
                    onFocus={() => handleHover(index)}
                    onBlur={() => handleHover(null)}
                  >
                    <span
                      className="size-2.5 rounded-full sm:size-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-muted-foreground sm:text-xs">
                      {item.label}
                    </span>
                  </button>
                </ShadTooltipTrigger>
                <ShadTooltipContent
                  side="top"
                  sideOffset={8}
                  className="px-3 py-2"
                >
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {item.percent}%
                      </span>
                    </div>
                    <span className="text-muted-foreground tabular-nums">
                      {numberFormatter.format(item.count)} claims
                    </span>
                  </div>
                </ShadTooltipContent>
              </ShadTooltip>
            </ShadTooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderActiveShape = (props: PieSectorDataItem) => {
  const {
    cx = 0,
    cy = 0,
    innerRadius = 0,
    outerRadius = 0,
    startAngle = 0,
    endAngle = 0,
    fill = "currentColor",
  } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const RevenueByDepartmentChart = () => {
  const { active: activeSlice, handleHover: setHoveredSlice } =
    useHoverHighlight<number>();
  const totalDepartmentRevenue = departmentRevenueData.reduce(
    (acc, item) => acc + item.value,
    0,
  );

  const pieSectorShape = React.useCallback(
    (props: PieSectorShapeProps, index: number) => {
      const highlighted =
        props.isActive || (activeSlice !== null && activeSlice === index);
      if (highlighted) {
        return renderActiveShape(props);
      }
      return (
        <Sector
          cx={props.cx}
          cy={props.cy}
          innerRadius={props.innerRadius}
          outerRadius={props.outerRadius}
          startAngle={props.startAngle}
          endAngle={props.endAngle}
          fill={props.fill}
          stroke="none"
        />
      );
    },
    [activeSlice],
  );

  return (
    <div className="flex flex-1 flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            className="size-7 sm:size-8"
            aria-label="Revenue by department"
          >
            <PieChartIcon className="size-4 text-muted-foreground sm:size-[18px]" />
          </Button>
          <div>
            <span className="text-sm font-medium sm:text-base">
              Revenue by Department
            </span>
            <p className="flex items-center gap-1 text-[10px] text-muted-foreground sm:text-xs">
              <ArrowUpRight
                className="size-3 shrink-0"
                style={{ color: clinicalDashboardPalette.forestGreen }}
                aria-hidden="true"
              />
              <span
                className="font-medium"
                style={{ color: clinicalDashboardPalette.forestGreen }}
              >
                +8.4%
              </span>
              <span>vs last month</span>
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="size-7 sm:size-8"
          aria-label="More options"
        >
          <MoreHorizontal className="size-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex flex-1 items-center gap-4 sm:gap-6">
        <div className="relative size-[100px] shrink-0 sm:size-[120px]">
          <ChartContainer
            config={departmentRevenueChartConfig}
            className="h-full w-full"
          >
            <PieChart>
              <Pie
                data={departmentRevenueData}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="90%"
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
                shape={pieSectorShape}
                onMouseEnter={(_data, index) => setHoveredSlice(index)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                {departmentRevenueData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-semibold sm:text-base">
              {compactCurrencyFormatter.format(totalDepartmentRevenue)}
            </span>
            <span className="text-[8px] text-muted-foreground sm:text-[10px]">
              Total
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 sm:gap-3">
          {departmentRevenueData.map((item, index) => (
            <div
              key={item.name}
              className={cn(
                "flex items-center justify-between gap-2 transition-opacity duration-200 motion-reduce:transition-none",
                activeSlice !== null && activeSlice !== index && "opacity-50",
              )}
              onMouseEnter={() => setHoveredSlice(index)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="size-2 rounded-full sm:size-2.5"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-muted-foreground sm:text-xs">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                <span className="font-medium tabular-nums">
                  {compactCurrencyFormatter.format(item.value)}
                </span>
                <span className="text-muted-foreground tabular-nums">
                  {item.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type RevenueFlowTooltipRenderProps = Pick<
  TooltipContentProps<number, string>,
  "active" | "payload" | "label"
>;

function CustomTooltip({
  active,
  payload,
  label,
  colors,
}: RevenueFlowTooltipRenderProps & { colors: RevenueFlowColors }) {
  if (!active || !payload?.length) return null;

  const thisYear = payload.find((p) => p.dataKey === "thisYear")?.value || 0;
  const prevYear = payload.find((p) => p.dataKey === "prevYear")?.value || 0;
  const diff = Number(thisYear) - Number(prevYear);
  const percentage = prevYear ? Math.round((diff / Number(prevYear)) * 100) : 0;
  const currentYear = new Date().getFullYear();

  return (
    <div className="rounded-lg border border-border bg-popover p-2 shadow-lg sm:p-3">
      <p className="mb-1.5 text-xs font-medium text-foreground sm:mb-2 sm:text-sm">
        {label}, {currentYear}
      </p>
      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="size-2 rounded-full sm:size-2.5"
            style={{ backgroundColor: colors.thisYear }}
          />
          <span className="text-[10px] text-muted-foreground sm:text-sm">
            This Year:
          </span>
          <span className="text-[10px] font-medium text-foreground sm:text-sm">
            {currencyFormatter.format(Number(thisYear))}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="size-2 rounded-full sm:size-2.5"
            style={{ backgroundColor: colors.prevYear }}
          />
          <span className="text-[10px] text-muted-foreground sm:text-sm">
            Prev Year:
          </span>
          <span className="text-[10px] font-medium text-foreground sm:text-sm">
            {currencyFormatter.format(Number(prevYear))}
          </span>
        </div>
        <div className="mt-1 border-t border-border pt-1">
          <span
            className={cn(
              "text-[10px] font-medium sm:text-xs",
              diff >= 0 ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {diff >= 0 ? "+" : ""}
            {percentage}% vs last year
          </span>
        </div>
      </div>
    </div>
  );
}

const RevenueFlowChart = () => {
  const [period, setPeriod] = React.useState<TimePeriod>("6months");
  const { active: activeSeries, handleHover } = useHoverHighlight<
    "thisYear" | "prevYear"
  >();

  const legendItems = [
    { key: "thisYear", label: "This Year", color: "var(--brand)" },
    { key: "prevYear", label: "Prev Year", color: palette.secondary.light },
  ] as const;

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const nextPeriod = params.get("period");
    if (nextPeriod === "6months" || nextPeriod === "year") {
      setPeriod(nextPeriod);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (period !== "6months") {
      params.set("period", period);
    } else {
      params.delete("period");
    }
    const nextQuery = params.toString();
    const nextUrl = nextQuery
      ? `${window.location.pathname}?${nextQuery}`
      : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
  }, [period]);

  const chartData = getDataForPeriod(period);
  const totalRevenue = chartData.reduce((acc, item) => acc + item.thisYear, 0);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-xl border bg-card p-4 sm:gap-6 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
            {currencyFormatter.format(totalRevenue)}
          </p>
          <p className="text-xs text-muted-foreground">
            Total Revenue ({periodLabels[period]})
          </p>
        </div>
        <div className="hidden items-center gap-3 sm:flex sm:gap-5">
          {legendItems.map((item) => (
            <div
              key={item.key}
              className={cn(
                "flex items-center gap-1.5 transition-opacity duration-200 motion-reduce:transition-none",
                activeSeries !== null &&
                  activeSeries !== item.key &&
                  "opacity-40",
              )}
              onMouseEnter={() => handleHover(item.key)}
              onMouseLeave={() => handleHover(null)}
            >
              <div
                className="size-2.5 rounded-full sm:size-3"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] text-muted-foreground sm:text-xs">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="size-7 sm:size-8"
              aria-label="Select time period"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Time Period</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(periodLabels) as TimePeriod[]).map((key) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={period === key}
                onCheckedChange={() => setPeriod(key)}
              >
                {periodLabels[key]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[200px] w-full min-w-0 sm:h-[240px] lg:h-[280px]">
        <ChartContainer
          config={revenueFlowChartConfig}
          className="h-full w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="thisYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-thisYear)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-thisYear)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="prevYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-prevYear)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-prevYear)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              dx={-5}
              tickFormatter={(value) => compactCurrencyFormatter.format(value)}
              width={40}
            />
            <Tooltip
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  colors={{
                    thisYear: "var(--color-thisYear)",
                    prevYear: "var(--color-prevYear)",
                  }}
                />
              )}
              cursor={{ strokeOpacity: 0.2 }}
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="var(--color-thisYear)"
              strokeWidth={activeSeries === "thisYear" ? 3 : 2}
              fill="url(#thisYearGradient)"
              fillOpacity={
                activeSeries === null || activeSeries === "thisYear" ? 1 : 0.3
              }
              strokeOpacity={
                activeSeries === null || activeSeries === "thisYear" ? 1 : 0.3
              }
            />
            <Area
              type="monotone"
              dataKey="prevYear"
              stroke="var(--color-prevYear)"
              strokeWidth={activeSeries === "prevYear" ? 3 : 2}
              fill="url(#prevYearGradient)"
              fillOpacity={
                activeSeries === null || activeSeries === "prevYear" ? 1 : 0.3
              }
              strokeOpacity={
                activeSeries === null || activeSeries === "prevYear" ? 1 : 0.3
              }
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default function Dashboard18HomepageTotalRevenue() {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:gap-6">
      <RevenueFlowChart />
      <div className="flex w-full flex-col gap-4 xl:w-[410px]">
        <ClaimStatusChart />
        <RevenueByDepartmentChart />
      </div>
    </div>
  );
}
