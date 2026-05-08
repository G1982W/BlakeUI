"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, Customized, Tooltip, XAxis, YAxis } from "recharts";
import { usePlotArea } from "recharts/es6/hooks.js";

type ChartOffset = {
  left: number;
  top: number;
  width: number;
  height: number;
};
type SalesTrendPoint = {
  key: string;
  month: string;
  monthLabel: string;
  xLabel: string;
  segment: number;
  directBookings: number;
  otaBookings: number;
  total: number;
};
type SalesTrendGridMetrics = {
  cols: number;
  rows: number;
  gridLeft: number;
  gridTop: number;
  gridWidth: number;
  gridHeight: number;
};

type SalesTrendTooltipProps = {
  active?: boolean;
  payload?: Array<{ payload?: SalesTrendPoint }>;
};

type SalesTrendBarShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: SalesTrendPoint;
};

const SALES_TREND_MAX = 200;
const SALES_TREND_CELL_STEP = 12;
const SALES_TREND_CELL_SIZE = 8;
const SALES_TREND_CELL_INSET = 2;

const salesTrendMonths = [
  { key: "jan", label: "JAN" },
  { key: "feb", label: "FEB" },
  { key: "mar", label: "MAR" },
  { key: "apr", label: "APR" },
  { key: "may", label: "MAY" },
  { key: "jun", label: "JUN" },
  { key: "jul", label: "JUL" },
  { key: "aug", label: "AUG" },
  { key: "sep", label: "SEP" },
  { key: "oct", label: "OCT" },
  { key: "nov", label: "NOV" },
  { key: "dec", label: "DEC" },
];

const salesTrendColors = {
  series: {
    directBookings: "var(--brand)",
    otaBookings: {
      light: "color-mix(in oklch, var(--brand) 26%, transparent)",
      dark: "color-mix(in oklch, var(--brand) 36%, transparent)",
    },
  },
  gridCell: "color-mix(in oklch, var(--foreground) 7%, var(--background))",
  gridBase: "transparent",
  cursor: "color-mix(in oklch, var(--foreground) 60%, transparent)",
  panelBorder: "border-border/60",
  panelTextMuted: "text-muted-foreground",
} as const;

function getSalesTrendGridMetrics(offset: ChartOffset): SalesTrendGridMetrics {
  const cols = Math.floor(offset.width / SALES_TREND_CELL_STEP);
  const rows = Math.floor(offset.height / SALES_TREND_CELL_STEP);
  const gridWidth = cols * SALES_TREND_CELL_STEP;
  const gridHeight = rows * SALES_TREND_CELL_STEP;
  const gridLeft = Math.round(offset.left + (offset.width - gridWidth) / 2);
  const gridTop = Math.round(offset.top + (offset.height - gridHeight) / 2);
  return { cols, rows, gridLeft, gridTop, gridWidth, gridHeight };
}

const revenueChartConfig = {
  directBookings: {
    label: "Referral",
    color: salesTrendColors.series.directBookings,
  },
  otaBookings: {
    label: "Walk-in",
    theme: salesTrendColors.series.otaBookings,
  },
} satisfies ChartConfig;


const numberFormatter = new Intl.NumberFormat("en-US");

const directBookingPeaks = [58, 54, 60, 72, 78, 92, 110, 102, 84, 88, 70, 76];
const otaBookingPeaks = [34, 32, 38, 44, 52, 58, 68, 64, 50, 54, 42, 46];
const intraMonthPattern = [0.14, 0.31, 0.52, 0.76, 1, 0.61];

function createSalesTrendData() {
  return salesTrendMonths.flatMap((month, monthIndex) =>
    intraMonthPattern.map((patternFactor, segmentIndex) => {
      const wave = Math.sin((monthIndex * 6 + segmentIndex) / 4.2) * 2.8;
      const pulse = segmentIndex === 4 ? 6 : 0;
      const directBookings = Math.max(
        6,
        Math.round(
          directBookingPeaks[monthIndex] * patternFactor + wave + pulse,
        ),
      );
      const otaBookings = Math.max(
        4,
        Math.round(otaBookingPeaks[monthIndex] * patternFactor + wave * 0.45),
      );
      return {
        key: `${month.key}-${segmentIndex}`,
        month: month.key,
        monthLabel: month.label,
        xLabel: segmentIndex === 0 && monthIndex % 2 === 0 ? month.label : "",
        segment: segmentIndex,
        directBookings,
        otaBookings,
        total: directBookings + otaBookings,
      };
    }),
  );
}

function SalesTrendOffsetSync({
  gridBaseColor,
  gridCellColor,
  onSyncOffset,
}: {
  gridBaseColor: string;
  gridCellColor: string;
  onSyncOffset: (value: ChartOffset) => void;
}) {
  const plotArea = usePlotArea();
  const offset = plotArea
    ? {
        left: plotArea.x,
        top: plotArea.y,
        width: plotArea.width,
        height: plotArea.height,
      }
    : undefined;
  if (offset) onSyncOffset(offset);
  if (!offset) return null;
  const { cols, rows, gridLeft, gridTop } = getSalesTrendGridMetrics(offset);
  const squares: React.ReactNode[] = [];
  for (let row = 0; row < rows; row += 1) {
    const y = gridTop + row * SALES_TREND_CELL_STEP + SALES_TREND_CELL_INSET;
    for (let col = 0; col < cols; col += 1) {
      const x = gridLeft + col * SALES_TREND_CELL_STEP + SALES_TREND_CELL_INSET;
      squares.push(
        <rect
          key={`${row}-${col}`}
          x={x}
          y={y}
          width={SALES_TREND_CELL_SIZE}
          height={SALES_TREND_CELL_SIZE}
          rx={1}
          fill={gridCellColor}
        />,
      );
    }
  }
  return (
    <g>
      <rect
        x={offset.left}
        y={offset.top}
        width={offset.width}
        height={offset.height}
        fill={gridBaseColor}
      />
      {squares}
    </g>
  );
}

const APPOINTMENT_SOURCES_SUMMARY = {
  totalPatients: 3847,
  referral: { count: 2318, percent: 60 },
  walkIn: { count: 1529, percent: 40 },
} as const;

function getSalesTrendColumnCenter(
  x: number,
  width: number,
  metrics: SalesTrendGridMetrics,
) {
  const centerX = x + width / 2;
  const snappedColumn = Math.round(
    (centerX - metrics.gridLeft - SALES_TREND_CELL_STEP / 2) /
      SALES_TREND_CELL_STEP,
  );
  const clampedColumn = Math.max(0, Math.min(metrics.cols - 1, snappedColumn));
  return Math.round(
    metrics.gridLeft +
      clampedColumn * SALES_TREND_CELL_STEP +
      SALES_TREND_CELL_INSET +
      SALES_TREND_CELL_SIZE / 2,
  );
}

function getSalesTrendColumnLeft(
  x: number,
  width: number,
  metrics: SalesTrendGridMetrics,
) {
  return Math.round(
    getSalesTrendColumnCenter(x, width, metrics) - SALES_TREND_CELL_SIZE / 2,
  );
}

function SalesTrendTooltip({ active, payload }: SalesTrendTooltipProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div
      className={cn(
        "min-w-45 rounded-xl border bg-popover/95 p-3 shadow-xl backdrop-blur-sm",
        salesTrendColors.panelBorder,
      )}
    >
      <p
        className={cn(
          "mb-3 rounded-md border bg-muted/35 px-2.5 py-1 text-sm font-medium text-foreground",
          salesTrendColors.panelBorder,
        )}
      >
        {row.monthLabel} 2025
      </p>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-5">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-(--color-directBookings)" />
            Referral
          </span>
          <span className="font-semibold text-foreground">
            {numberFormatter.format(row.directBookings)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-5">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-(--color-otaBookings)" />
            Walk-in
          </span>
          <span className="font-semibold text-foreground">
            {numberFormatter.format(row.otaBookings)}
          </span>
        </div>
      </div>
    </div>
  );
}

function SalesTrendCursor({
  centerX,
  plotOffset,
  activeTotal,
}: {
  centerX?: number;
  plotOffset?: ChartOffset | null;
  activeTotal?: number;
}) {
  if (typeof centerX !== "number" || !plotOffset) return null;
  const metrics = getSalesTrendGridMetrics(plotOffset);
  let markerY: number | null = null;
  if (typeof activeTotal === "number" && activeTotal > 0) {
    const highlightedRows = Math.max(
      0,
      Math.min(
        metrics.rows,
        Math.round((activeTotal / SALES_TREND_MAX) * metrics.rows),
      ),
    );
    if (highlightedRows > 0) {
      const topFilledCellY =
        Math.round(
          metrics.gridTop +
            metrics.gridHeight -
            highlightedRows * SALES_TREND_CELL_STEP,
        ) + SALES_TREND_CELL_INSET;
      markerY = topFilledCellY + SALES_TREND_CELL_SIZE / 2;
    }
  }
  return (
    <g>
      <line
        x1={centerX}
        y1={metrics.gridTop}
        x2={centerX}
        y2={metrics.gridTop + metrics.gridHeight}
        stroke={salesTrendColors.cursor}
        strokeDasharray="3 4"
        strokeWidth={1.5}
      />
      {markerY !== null ? (
        <circle
          cx={centerX}
          cy={markerY}
          r={5}
          fill="var(--background)"
          stroke="var(--foreground)"
          strokeWidth={2}
        />
      ) : null}
    </g>
  );
}

function SalesTrendSquareBar({
  x,
  y,
  width,
  height,
  payload,
  plotOffset,
  directBookingColor,
  otaBookingColor,
  onColumnCenterByKey,
}: SalesTrendBarShapeProps & {
  plotOffset?: ChartOffset | null;
  directBookingColor: string;
  otaBookingColor: string;
  onColumnCenterByKey?: (pointKey: string, centerX: number) => void;
}) {
  if (
    typeof x !== "number" ||
    typeof width !== "number" ||
    typeof y !== "number" ||
    typeof height !== "number" ||
    !plotOffset ||
    !payload
  )
    return null;
  const metrics = getSalesTrendGridMetrics(plotOffset);
  const columnX = getSalesTrendColumnLeft(x, width, metrics);
  const columnCenterX = columnX + SALES_TREND_CELL_SIZE / 2;
  if (payload.key && onColumnCenterByKey)
    onColumnCenterByKey(payload.key, columnCenterX);
  const maxRows = metrics.rows;
  const highlightedRows = Math.max(
    0,
    Math.min(maxRows, Math.round((payload.total / SALES_TREND_MAX) * maxRows)),
  );
  const directRows =
    payload.total > 0
      ? Math.round((payload.directBookings / payload.total) * highlightedRows)
      : 0;
  const clampedDirectRows = Math.max(0, Math.min(highlightedRows, directRows));
  const bottom = metrics.gridTop + metrics.gridHeight;
  const squares: React.ReactNode[] = [];
  for (let row = 0; row < highlightedRows; row += 1) {
    const rowY =
      Math.round(bottom - (row + 1) * SALES_TREND_CELL_STEP) +
      SALES_TREND_CELL_INSET;
    if (rowY < metrics.gridTop) continue;
    const color =
      row < clampedDirectRows ? directBookingColor : otaBookingColor;
    squares.push(
      <rect
        key={`fg-${row}`}
        x={columnX}
        y={rowY}
        width={SALES_TREND_CELL_SIZE}
        height={SALES_TREND_CELL_SIZE}
        rx={1}
        fill={color}
      />,
    );
  }
  return <g>{squares}</g>;
}

const RevenueFlowChart = () => {
  const [activePointKey, setActivePointKey] = React.useState<string | null>(
    null,
  );
  const chartData = React.useMemo(() => createSalesTrendData(), []);
  const plotOffsetRef = React.useRef<ChartOffset | null>(null);
  const columnCentersByKeyRef = React.useRef<Map<string, number>>(new Map());
  const activePoint = React.useMemo(
    () => chartData.find((p) => p.key === activePointKey) ?? null,
    [activePointKey, chartData],
  );

  React.useEffect(() => {
    columnCentersByKeyRef.current.clear();
    setActivePointKey(null);
  }, []);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-4 rounded-xl border bg-card p-4 text-foreground @sm:gap-5 @sm:p-5",
        salesTrendColors.panelBorder,
      )}
    >
      <div className="space-y-3 pb-3">
        <div className="flex flex-col gap-3">
          <div className="min-w-0 space-y-1.5">
            <p
              className={cn(
                "text-xs font-semibold tracking-[0.16em] uppercase",
                salesTrendColors.panelTextMuted,
              )}
            >
              Appointment Sources
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-4xl leading-none font-semibold text-foreground tabular-nums">
                {numberFormatter.format(
                  APPOINTMENT_SOURCES_SUMMARY.totalPatients,
                )}
              </span>
              <span className="pb-1 text-sm text-muted-foreground">
                patients
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-(--color-directBookings)" />
              <span className="font-medium text-foreground">Referral</span>
              <span className="tabular-nums">
                {numberFormatter.format(
                  APPOINTMENT_SOURCES_SUMMARY.referral.count,
                )}
              </span>
              <span>{APPOINTMENT_SOURCES_SUMMARY.referral.percent}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-(--color-otaBookings)" />
              <span className="font-medium text-foreground">Walk-in</span>
              <span className="tabular-nums">
                {numberFormatter.format(
                  APPOINTMENT_SOURCES_SUMMARY.walkIn.count,
                )}
              </span>
              <span>{APPOINTMENT_SOURCES_SUMMARY.walkIn.percent}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-65 w-full min-w-0 @sm:h-75">
        <ChartContainer
          config={revenueChartConfig}
          className="h-full w-full [&_.recharts-cartesian-axis-line]:stroke-transparent [&_.recharts-cartesian-axis-tick_line]:stroke-transparent"
        >
          <BarChart
            data={chartData}
            barCategoryGap={0}
            margin={{ top: 8, right: 8, left: -6, bottom: 10 }}
            onMouseMove={(state) => {
              const payload = (
                state as
                  | { activePayload?: Array<{ payload?: SalesTrendPoint }> }
                  | undefined
              )?.activePayload?.[0]?.payload;
              const key = payload?.key ?? null;
              setActivePointKey((prev) => (prev === key ? prev : key));
            }}
            onMouseLeave={() =>
              setActivePointKey((prev) => (prev === null ? prev : null))
            }
          >
            <Customized
              component={() => (
                <SalesTrendOffsetSync
                  gridBaseColor={salesTrendColors.gridBase}
                  gridCellColor={salesTrendColors.gridCell}
                  onSyncOffset={(value) => {
                    plotOffsetRef.current = value;
                  }}
                />
              )}
            />
            <XAxis
              dataKey="xLabel"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fontSize: 11, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
              ticks={[0, 50, 100, 150, SALES_TREND_MAX]}
              domain={[0, SALES_TREND_MAX]}
              tickFormatter={(value) => `${value}`}
              width={36}
            />
            <Tooltip content={<SalesTrendTooltip />} cursor={false} />
            <Bar
              dataKey="total"
              fill="var(--color-directBookings)"
              shape={(props: SalesTrendBarShapeProps) => (
                <SalesTrendSquareBar
                  {...props}
                  plotOffset={plotOffsetRef.current}
                  directBookingColor="var(--color-directBookings)"
                  otaBookingColor="var(--color-otaBookings)"
                  onColumnCenterByKey={(pointKey, centerX) => {
                    columnCentersByKeyRef.current.set(pointKey, centerX);
                  }}
                />
              )}
              radius={0}
              barSize={12}
            />
            <Customized
              component={() => (
                <SalesTrendCursor
                  centerX={
                    activePointKey
                      ? columnCentersByKeyRef.current.get(activePointKey)
                      : undefined
                  }
                  plotOffset={plotOffsetRef.current}
                  activeTotal={activePoint?.total}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export { RevenueFlowChart };