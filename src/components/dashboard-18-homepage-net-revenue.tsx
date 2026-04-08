"use client";

import { useMotionValueEvent, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BedDouble,
  ChevronDown,
  DoorOpen,
  Globe,
  KeyRound,
  Search,
} from "lucide-react";
import * as React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- Types ---

type Guest = {
  name: string;
  avatar?: string;
  initials: string;
};

type Booking = {
  id: string;
  guestName: string;
  roomNumber: string;
  roomType: string;
  time: string;
  guests: Guest[];
  guestCount: number;
  source: "Direct" | "Booking.com" | "Expedia" | "Walk-in";
  status: string;
  statusColor: string;
  nights: number;
  specialRequests?: string;
};

type RoomCapacityStatItem = {
  title: string;
  occupied: number;
  total: number;
  weeklyChange: number;
  tone: {
    active: string;
    soft: string;
  };
};

type SalesMetricKey = "netRevenue" | "roomRevenue" | "platformRevenue";

type NumericSeriesTooltipRenderProps = Pick<
  TooltipContentProps<number, string>,
  "active" | "payload" | "label"
>;

// --- Formatters ---

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const numberFormatter = new Intl.NumberFormat("en-US");

const capacityDeltaFormatter = new Intl.NumberFormat("en-US", {
  signDisplay: "always",
  maximumFractionDigits: 1,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});

// --- Palette ---

const mixBase = "transparent";

/** Grayscale (dashboard-18 homepage). */
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

// --- Data ---

const KPI_CAPACITY_SEGMENTS = 24;

const roomCapacityStats: RoomCapacityStatItem[] = [
  {
    title: "General Ward",
    occupied: 128,
    total: 180,
    weeklyChange: 2.8,
    tone: {
      /** Dark slate / charcoal fill */
      active: "oklch(0.32 0.028 252)",
      soft: `color-mix(in oklch, var(--foreground) 10%, var(--background))`,
    },
  },
  {
    title: "ICU",
    occupied: 67,
    total: 90,
    weeklyChange: 3.5,
    tone: {
      /** Medium blue fill */
      active: "oklch(0.52 0.12 252)",
      soft: `color-mix(in oklch, var(--foreground) 10%, var(--background))`,
    },
  },
  {
    title: "Private Rooms",
    occupied: 21,
    total: 30,
    weeklyChange: -1.9,
    tone: {
      /** Deep red fill */
      active: "oklch(0.42 0.16 25)",
      soft: `color-mix(in oklch, var(--foreground) 10%, var(--background))`,
    },
  },
];

const monthlyRevenueData = [
  { month: "JAN", revenue: 72000 },
  { month: "FEB", revenue: 128000 },
  { month: "MAR", revenue: 103000 },
  { month: "APR", revenue: 176000 },
  { month: "MAY", revenue: 230000 },
  { month: "JUN", revenue: 142000 },
  { month: "JUL", revenue: 310000 },
  { month: "AUG", revenue: 640000 },
  { month: "SEP", revenue: 410000 },
  { month: "OCT", revenue: 210000 },
  { month: "NOV", revenue: 98000 },
  { month: "DEC", revenue: 260000 },
];

const roomRevenueShare = [
  0.66, 0.68, 0.67, 0.69, 0.7, 0.66, 0.72, 0.71, 0.69, 0.68, 0.7, 0.69,
];
const platformRevenueShare = [
  0.34, 0.32, 0.33, 0.31, 0.3, 0.34, 0.28, 0.29, 0.31, 0.32, 0.3, 0.31,
];

const salesMetricData: Record<
  SalesMetricKey,
  {
    label: string;
    changePercent: number;
    data: { month: string; value: number }[];
  }
> = {
  netRevenue: {
    label: "Net Revenue",
    changePercent: 8.2,
    data: monthlyRevenueData.map((entry) => ({
      month: entry.month,
      value: entry.revenue,
    })),
  },
  roomRevenue: {
    label: "Room Revenue",
    changePercent: 6.9,
    data: monthlyRevenueData.map((entry, index) => ({
      month: entry.month,
      value: Math.round(entry.revenue * roomRevenueShare[index]),
    })),
  },
  platformRevenue: {
    label: "Platform Revenue",
    changePercent: 4.7,
    data: monthlyRevenueData.map((entry, index) => ({
      month: entry.month,
      value: Math.round(entry.revenue * platformRevenueShare[index]),
    })),
  },
};

const ARRIVALS: Booking[] = [
  {
    id: "arr-1",
    guestName: "James Brown",
    roomNumber: "412",
    roomType: "Suite",
    time: "2:00 PM Check-in",
    guests: [
      {
        name: "James Brown",
        avatar: "https://i.pravatar.cc/32?img=12",
        initials: "JB",
      },
      {
        name: "Maria Brown",
        avatar: "https://i.pravatar.cc/32?img=25",
        initials: "MB",
      },
    ],
    guestCount: 4,
    source: "Direct",
    status: "VIP",
    statusColor: "violet",
    nights: 3,
    specialRequests: "Late check-out, extra pillows",
  },
  {
    id: "arr-2",
    guestName: "Sarah & Tom Lee",
    roomNumber: "215",
    roomType: "Deluxe",
    time: "3:00 PM Check-in",
    guests: [
      {
        name: "Sarah Lee",
        avatar: "https://i.pravatar.cc/32?img=32",
        initials: "SL",
      },
      {
        name: "Tom Lee",
        avatar: "https://i.pravatar.cc/32?img=15",
        initials: "TL",
      },
    ],
    guestCount: 2,
    source: "Booking.com",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 5,
  },
  {
    id: "arr-3",
    guestName: "Michael Chen",
    roomNumber: "108",
    roomType: "Standard",
    time: "4:00 PM Check-in",
    guests: [
      {
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/32?img=53",
        initials: "MC",
      },
    ],
    guestCount: 1,
    source: "Expedia",
    status: "Pending",
    statusColor: "amber",
    nights: 2,
    specialRequests: "Ground floor preferred",
  },
  {
    id: "arr-4",
    guestName: "Emily Davis",
    roomNumber: "501",
    roomType: "Penthouse",
    time: "5:30 PM Check-in",
    guests: [
      {
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/32?img=44",
        initials: "ED",
      },
      {
        name: "Ryan Davis",
        avatar: "https://i.pravatar.cc/32?img=18",
        initials: "RD",
      },
      { name: "Sophie Davis", initials: "SD" },
    ],
    guestCount: 5,
    source: "Direct",
    status: "VIP",
    statusColor: "violet",
    nights: 7,
    specialRequests: "Airport transfer, champagne on arrival",
  },
];

const IN_HOUSE: Booking[] = [
  {
    id: "inh-1",
    guestName: "Robert Garcia",
    roomNumber: "302",
    roomType: "Deluxe",
    time: "Since Feb 16",
    guests: [
      {
        name: "Robert Garcia",
        avatar: "https://i.pravatar.cc/32?img=60",
        initials: "RG",
      },
    ],
    guestCount: 1,
    source: "Walk-in",
    status: "Checked In",
    statusColor: "checkedIn",
    nights: 4,
  },
  {
    id: "inh-2",
    guestName: "Anna & Chris Bell",
    roomNumber: "419",
    roomType: "Suite",
    time: "Since Feb 15",
    guests: [
      {
        name: "Anna Bell",
        avatar: "https://i.pravatar.cc/32?img=29",
        initials: "AB",
      },
      {
        name: "Chris Bell",
        avatar: "https://i.pravatar.cc/32?img=14",
        initials: "CB",
      },
    ],
    guestCount: 2,
    source: "Booking.com",
    status: "Checked In",
    statusColor: "checkedIn",
    nights: 6,
    specialRequests: "Daily housekeeping at 10 AM",
  },
  {
    id: "inh-3",
    guestName: "Lisa Park",
    roomNumber: "207",
    roomType: "Standard",
    time: "Since Feb 17",
    guests: [
      {
        name: "Lisa Park",
        avatar: "https://i.pravatar.cc/32?img=38",
        initials: "LP",
      },
    ],
    guestCount: 1,
    source: "Direct",
    status: "Checked In",
    statusColor: "checkedIn",
    nights: 2,
  },
];

const DEPARTURES: Booking[] = [
  {
    id: "dep-1",
    guestName: "David Kim",
    roomNumber: "315",
    roomType: "Deluxe",
    time: "11:00 AM Check-out",
    guests: [
      {
        name: "David Kim",
        avatar: "https://i.pravatar.cc/32?img=52",
        initials: "DK",
      },
      {
        name: "Jenny Kim",
        avatar: "https://i.pravatar.cc/32?img=41",
        initials: "JK",
      },
    ],
    guestCount: 2,
    source: "Expedia",
    status: "Checking Out",
    statusColor: "checkingOut",
    nights: 3,
  },
  {
    id: "dep-2",
    guestName: "Rachel Green",
    roomNumber: "104",
    roomType: "Standard",
    time: "12:00 PM Check-out",
    guests: [
      {
        name: "Rachel Green",
        avatar: "https://i.pravatar.cc/32?img=23",
        initials: "RG",
      },
    ],
    guestCount: 1,
    source: "Direct",
    status: "Checking Out",
    statusColor: "checkingOut",
    nights: 1,
  },
];

const STATUS_STYLES: Record<string, string> = {
  violet:
    "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300",
  amber:
    "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200",
  emerald:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  sky: "bg-sky-100 text-sky-900 dark:bg-sky-500/20 dark:text-sky-300",
  checkedIn:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  checkingOut:
    "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200",
};

/** Section header accents for Latest Updates (In-House / Departures). */
const LATEST_GROUP_HEADER_ACCENTS: Record<
  string,
  { icon: string; count: string; label: string }
> = {
  arrivals: {
    icon: "bg-violet-500/15 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400",
    count:
      "bg-violet-500/15 text-violet-900 dark:bg-violet-500/25 dark:text-violet-300",
    label: "text-violet-950 dark:text-violet-100",
  },
  "in-house": {
    icon: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    count:
      "bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-300",
    label: "text-emerald-900 dark:text-emerald-200",
  },
  departures: {
    icon: "bg-amber-500/15 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    count:
      "bg-amber-500/15 text-amber-950 dark:bg-amber-500/25 dark:text-amber-200",
    label: "text-amber-950 dark:text-amber-100",
  },
};

const SOURCE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Direct: Globe,
  "Booking.com": Globe,
  Expedia: Globe,
  "Walk-in": DoorOpen,
};

// --- Chart Config ---

function revenueChartConfigForMetric(
  metric: SalesMetricKey,
): ChartConfig {
  return {
    revenue: {
      label: "Revenue",
      color:
        metric === "netRevenue" ? "var(--brand)" : palette.secondary.light,
    },
  };
}

// --- Sub-components ---

function AvatarGroup({
  guests,
  guestCount,
}: {
  guests: Guest[];
  guestCount: number;
}) {
  if (guests.length === 0) return null;

  const overflow = guestCount - guests.length;

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {guests.slice(0, 4).map((a) => (
          <Avatar
            key={a.name}
            className="size-7 border-2 border-background ring-0"
          >
            {a.avatar && <AvatarImage src={a.avatar} alt={a.name} />}
            <AvatarFallback className="bg-muted text-[10px] font-medium">
              {a.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      {overflow > 0 && (
        <span className="ml-2 text-xs font-medium text-muted-foreground">
          +{overflow}
        </span>
      )}
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const [expanded, setExpanded] = React.useState(false);
  const SourceIcon = SOURCE_ICONS[booking.source] || Globe;

  return (
    <div className="rounded-lg border bg-card p-3 transition-colors hover:bg-muted/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2.5">
          <div>
            <h3 className="truncate text-sm leading-snug font-semibold">
              {booking.guestName} — {booking.roomType} {booking.roomNumber}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {booking.time}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AvatarGroup
              guests={booking.guests}
              guestCount={booking.guestCount}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <SourceIcon className="size-3.5" />
              <span>via {booking.source}</span>
            </div>
            <span className="text-muted-foreground/40">·</span>
            <Badge
              variant="secondary"
              className={cn(
                "border-0 px-2 py-0 text-[11px] font-medium",
                STATUS_STYLES[booking.statusColor] ??
                  STATUS_STYLES.violet,
              )}
            >
              {booking.status}
            </Badge>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-muted"
        >
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-1 border-t pt-3 text-xs text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Room Type:</span>{" "}
            {booking.roomType}
          </p>
          <p>
            <span className="font-medium text-foreground">Nights:</span>{" "}
            {booking.nights}
          </p>
          {booking.specialRequests && (
            <p>
              <span className="font-medium text-foreground">
                Special Requests:
              </span>{" "}
              {booking.specialRequests}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function BookingList({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <BedDouble className="mb-2 size-8 opacity-40" />
        <p className="text-sm">No bookings</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <BookingCard key={b.id} booking={b} />
      ))}
    </div>
  );
}

// --- Hotel Stats Cards ---

const HotelStatsCards = () => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {roomCapacityStats.map((stat) => {
      const isPositive = stat.weeklyChange >= 0;
      const occupancyRatio = stat.occupied / stat.total;
      const occupancyPercent = Math.round(occupancyRatio * 100);
      const filledSegments = Math.max(
        0,
        Math.min(
          KPI_CAPACITY_SEGMENTS,
          Math.round(occupancyRatio * KPI_CAPACITY_SEGMENTS),
        ),
      );
      const availableRooms = Math.max(0, stat.total - stat.occupied);

      return (
        <Card key={stat.title} className="gap-0 px-4 py-3 shadow-none">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-xs font-medium",
                isPositive
                  ? "bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200"
                  : "bg-red-500/15 text-red-800 dark:bg-red-500/15 dark:text-red-200",
              )}
            >
              {capacityDeltaFormatter.format(stat.weeklyChange)}%
            </span>
          </div>

          <div className="mt-1 flex items-end justify-between gap-3">
            <p className="text-3xl leading-none font-semibold tracking-tight tabular-nums">
              {numberFormatter.format(stat.occupied)}
            </p>
            <p className="text-xs text-muted-foreground tabular-nums">
              / {numberFormatter.format(stat.total)} beds
            </p>
          </div>

          <div className="mt-3 flex items-end gap-1 overflow-hidden">
            {Array.from({ length: KPI_CAPACITY_SEGMENTS }).map((_, index) => (
              <span
                key={`${stat.title}-${index}`}
                className="h-6 w-1.5 shrink-0 rounded-[3px]"
                style={{
                  backgroundColor:
                    index < filledSegments ? stat.tone.active : stat.tone.soft,
                  opacity:
                    index < filledSegments
                      ? index % 3 === 0
                        ? 0.86
                        : 1
                      : 0.42,
                }}
              />
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span className="tabular-nums">{occupancyPercent}% occupied</span>
            <span className="tabular-nums">
              {numberFormatter.format(availableRooms)} available
            </span>
          </div>
        </Card>
      );
    })}
  </div>
);

// --- Net Revenue Chart ---

interface CustomReferenceLabelProps {
  viewBox?: { x?: number; y?: number };
  value: number;
}

const CustomReferenceLabel: React.FC<
  CustomReferenceLabelProps & { variant?: "default" | "brand" }
> = (props) => {
  const { viewBox, value, variant = "default" } = props;
  const y = viewBox?.y ?? 0;

  const width = React.useMemo(() => {
    const characterWidth = 8;
    const padding = 10;
    return (
      compactCurrencyFormatter.format(value).length * characterWidth + padding
    );
  }, [value]);

  const fill =
    variant === "brand" ? "var(--brand)" : "var(--secondary-foreground)";
  const textFill =
    variant === "brand" ? "var(--brand-foreground)" : "var(--background)";

  return (
    <>
      <rect x={0} y={y - 9} width={width} height={18} fill={fill} rx={0} />
      <text fontWeight={600} x={6} y={y + 4} fill={textFill}>
        {compactCurrencyFormatter.format(value)}
      </text>
    </>
  );
};

function RevenueBarTooltip({
  active,
  payload,
  label,
  metricLabel,
  useBrandAccent,
}: NumericSeriesTooltipRenderProps & {
  metricLabel: string;
  useBrandAccent?: boolean;
}) {
  if (!active || !payload?.length) return null;

  const value = payload[0]?.value || 0;

  return (
    <div className="border border-border bg-popover p-2 shadow-lg sm:p-3">
      <p className="mb-1.5 text-xs font-medium text-foreground sm:mb-2 sm:text-sm">
        {label}
      </p>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div
          className={cn(
            "size-2 rounded-full sm:size-2.5",
            useBrandAccent ? "bg-brand" : "bg-foreground",
          )}
        />
        <span className="text-[10px] text-muted-foreground sm:text-sm">
          {metricLabel}:
        </span>
        <span className="text-[10px] font-medium text-foreground sm:text-sm">
          {currencyFormatter.format(Number(value))}
        </span>
      </div>
    </div>
  );
}

const OccupancyChart = () => {
  const [metric, setMetric] = React.useState<SalesMetricKey>("netRevenue");
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined,
  );
  const selectedMetric = salesMetricData[metric];
  const secondaryBarPatternId = React.useId();
  const isNetRevenue = metric === "netRevenue";
  const revenueChartConfig = React.useMemo(
    () => revenueChartConfigForMetric(metric),
    [metric],
  );
  const barPatternFillStroke = React.useMemo(
    () =>
      isNetRevenue
        ? {
            fill: "color-mix(in oklch, var(--brand) 14%, var(--background))",
            stroke: "color-mix(in oklch, var(--brand) 40%, var(--background))",
          }
        : {
            fill: palette.quaternary.light,
            stroke: palette.tertiary.dark,
          },
    [isNetRevenue],
  );

  const maxValueData = React.useMemo(() => {
    const metricData = selectedMetric.data;
    if (activeIndex !== undefined) {
      return {
        index: activeIndex,
        value: metricData[activeIndex].value,
      };
    }
    return metricData.reduce(
      (max, data, index) =>
        data.value > max.value ? { index, value: data.value } : max,
      { index: 0, value: 0 },
    );
  }, [activeIndex, selectedMetric.data]);

  const isPositive = selectedMetric.changePercent >= 0;
  const valueSpring = useSpring(maxValueData.value, {
    stiffness: 100,
    damping: 20,
  });
  const [springyValue, setSpringyValue] = React.useState(maxValueData.value);

  useMotionValueEvent(valueSpring, "change", (latest) => {
    setSpringyValue(Number(latest.toFixed(0)));
  });

  React.useEffect(() => {
    valueSpring.set(maxValueData.value);
  }, [maxValueData.value, valueSpring]);

  React.useEffect(() => {
    setActiveIndex(undefined);
  }, [metric]);

  const peakData = React.useMemo(
    () =>
      selectedMetric.data.reduce((peak, entry) =>
        entry.value > peak.value ? entry : peak,
      ),
    [selectedMetric.data],
  );
  const averageValue = React.useMemo(
    () =>
      Math.round(
        selectedMetric.data.reduce((sum, entry) => sum + entry.value, 0) /
          selectedMetric.data.length,
      ),
    [selectedMetric.data],
  );
  const ytdValue = React.useMemo(
    () => selectedMetric.data.reduce((sum, entry) => sum + entry.value, 0),
    [selectedMetric.data],
  );

  return (
    <div className="w-full rounded-xl border bg-card lg:flex lg:h-[470px] lg:flex-col">
      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-pretty sm:text-base">
              {selectedMetric.label}
            </h2>
            <div className="flex items-end gap-3">
              <p className="text-xl leading-tight font-semibold text-foreground sm:text-2xl">
                {currencyFormatter.format(maxValueData.value)}
              </p>
              <div className="mb-0.5 flex shrink-0 items-center gap-1 text-xs whitespace-nowrap">
                {isPositive ? (
                  <ArrowUpRight
                    className="size-3 text-foreground"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownRight
                    className="size-3 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={
                    isPositive ? "text-foreground" : "text-muted-foreground"
                  }
                >
                  {isPositive ? "+" : ""}
                  {selectedMetric.changePercent}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Select
              value={metric}
              onValueChange={(value) => setMetric(value as SalesMetricKey)}
            >
              <SelectTrigger className="h-9 w-[160px] rounded-lg text-[11px] sm:text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="netRevenue">Net Revenue</SelectItem>
                <SelectItem value="roomRevenue">Room Revenue</SelectItem>
                <SelectItem value="platformRevenue">
                  Platform Revenue
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="rounded-lg bg-muted/35 px-3 py-2">
            <p className="text-[11px] text-muted-foreground">Peak Month</p>
            <p className="text-sm font-medium text-foreground">
              {peakData.month}{" "}
              <span className="text-muted-foreground">
                {compactCurrencyFormatter.format(peakData.value)}
              </span>
            </p>
          </div>
          <div className="rounded-lg bg-muted/35 px-3 py-2">
            <p className="text-[11px] text-muted-foreground">Monthly Avg</p>
            <p className="text-sm font-medium text-foreground">
              {compactCurrencyFormatter.format(averageValue)}
            </p>
          </div>
          <div className="rounded-lg bg-muted/35 px-3 py-2">
            <p className="text-[11px] text-muted-foreground">YTD Revenue</p>
            <p className="text-sm font-medium text-foreground">
              {compactCurrencyFormatter.format(ytdValue)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 pt-3 sm:p-5 sm:pt-4 lg:min-h-0 lg:flex-1">
        <div className="h-[260px] w-full min-h-0 min-w-0 sm:h-[300px] lg:h-full lg:min-h-[240px]">
          <ChartContainer config={revenueChartConfig} className="h-full w-full">
            <BarChart
              data={selectedMetric.data}
              margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              <defs>
                <pattern
                  id={secondaryBarPatternId}
                  patternUnits="userSpaceOnUse"
                  width={8}
                  height={8}
                  patternTransform="rotate(35)"
                >
                  <rect width={8} height={8} fill={barPatternFillStroke.fill} />
                  <line
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={8}
                    stroke={barPatternFillStroke.stroke}
                    strokeWidth={2}
                    opacity={0.5}
                  />
                </pattern>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                tickMargin={10}
                interval={0}
              />
              <YAxis hide />
              <Tooltip
                content={({ active, payload, label }) => (
                  <RevenueBarTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    metricLabel={selectedMetric.label}
                    useBrandAccent={isNetRevenue}
                  />
                )}
                cursor={{ fillOpacity: 0.05 }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={30}>
                {selectedMetric.data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    className="duration-200"
                    opacity={index === maxValueData.index ? 1 : 0.9}
                    fill={
                      index === maxValueData.index
                        ? isNetRevenue
                          ? "var(--brand)"
                          : palette.primary
                        : `url(#${secondaryBarPatternId})`
                    }
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                ))}
              </Bar>
              <ReferenceLine
                opacity={isNetRevenue ? 0.55 : 0.4}
                y={springyValue}
                stroke={
                  isNetRevenue ? "var(--brand)" : "var(--secondary-foreground)"
                }
                strokeWidth={1}
                strokeDasharray="3 3"
                label={
                  <CustomReferenceLabel
                    value={maxValueData.value}
                    variant={isNetRevenue ? "brand" : "default"}
                  />
                }
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

// --- Latest Updates Panel ---

const LatestUpdatesPanel = () => {
  const [query, setQuery] = React.useState("");

  const filterBookings = React.useCallback(
    (bookings: Booking[]) => {
      const normalizedQuery = query.trim().toLowerCase();
      if (!normalizedQuery) return bookings;
      return bookings.filter((booking) =>
        [
          booking.guestName,
          booking.roomType,
          booking.roomNumber,
          booking.source,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      );
    },
    [query],
  );

  const filteredArrivals = React.useMemo(
    () => filterBookings(ARRIVALS),
    [filterBookings],
  );
  const filteredInHouse = React.useMemo(
    () => filterBookings(IN_HOUSE),
    [filterBookings],
  );
  const filteredDepartures = React.useMemo(
    () => filterBookings(DEPARTURES),
    [filterBookings],
  );
  const groupedBookings = React.useMemo(
    () => [
      {
        key: "arrivals",
        label: "Arrivals",
        icon: DoorOpen,
        count: filteredArrivals.length,
        bookings: filteredArrivals,
      },
      {
        key: "in-house",
        label: "In-House",
        icon: BedDouble,
        count: filteredInHouse.length,
        bookings: filteredInHouse,
      },
      {
        key: "departures",
        label: "Departures",
        icon: KeyRound,
        count: filteredDepartures.length,
        bookings: filteredDepartures,
      },
    ],
    [filteredArrivals, filteredInHouse, filteredDepartures],
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-pretty sm:text-base">
          Latest Updates
        </h2>
        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
          Last week
        </Button>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col gap-0">
        <div className="mt-3 flex items-center gap-2 rounded-md border bg-background px-2.5 py-2">
          <Search
            className="size-3.5 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search guest, room, or source"
            className="h-4 w-full border-none bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search bookings"
          />
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-5 pr-1">
              {groupedBookings.map((group) => {
                const accent = LATEST_GROUP_HEADER_ACCENTS[group.key];
                return (
                  <section key={group.key} className="space-y-2.5">
                    <div className="flex items-center justify-between border-b border-border/70 pb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "flex size-5 items-center justify-center rounded-md",
                            accent?.icon ?? "bg-muted text-foreground",
                          )}
                        >
                          <group.icon className="size-3.5" aria-hidden="true" />
                        </span>
                        <span
                          className={cn(
                            "text-[11px] font-semibold tracking-[0.08em] uppercase",
                            accent?.label ?? "text-foreground/90",
                          )}
                        >
                          {group.label}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[11px] font-semibold tabular-nums",
                          accent?.count ?? "bg-muted text-foreground",
                        )}
                      >
                        {group.count}
                      </span>
                    </div>
                    <BookingList bookings={group.bookings} />
                  </section>
                );
              })}
              {groupedBookings.every(
                (group) => group.bookings.length === 0,
              ) && (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 px-3 py-6 text-center text-xs text-muted-foreground">
                  No bookings found for this search.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

// --- Main Export ---

export default function Dashboard18HomepageNetRevenue() {
  return (
    <div className="grid min-w-0 gap-4 overflow-hidden sm:gap-6 lg:grid-cols-[7fr_3fr]">
      <div className="flex min-w-0 flex-col gap-4 overflow-hidden sm:gap-6">
        <HotelStatsCards />
        <OccupancyChart />
      </div>
      <div className="h-[500px] sm:h-[550px] lg:h-full lg:max-h-[640px]">
        <LatestUpdatesPanel />
      </div>
    </div>
  );
}
