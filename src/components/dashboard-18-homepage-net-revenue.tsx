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
  Landmark,
  Search,
  UserRound,
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
  /** Search keywords (payor, physician, etc.) */
  source: string;
  /** Shown below time, e.g. Referral: Dr. Chen or Insurance */
  attribution: string;
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

const ADMISSIONS: Booking[] = [
  {
    id: "adm-1",
    guestName: "James Brown",
    roomNumber: "412",
    roomType: "Cardiology",
    time: "2:00 PM Admission",
    guests: [
      {
        name: "James Brown",
        avatar: "https://i.pravatar.cc/32?img=12",
        initials: "JB",
      },
    ],
    guestCount: 1,
    source: "Referral Dr Chen Cardiology",
    attribution: "Referral: Dr. Chen",
    status: "Critical",
    statusColor: "critical",
    nights: 1,
  },
  {
    id: "adm-2",
    guestName: "Sarah & Tom Lee",
    roomNumber: "215",
    roomType: "Orthopedics",
    time: "3:00 PM Admission",
    guests: [
      {
        name: "Sarah & Tom Lee",
        avatar: "https://i.pravatar.cc/32?img=32",
        initials: "ST",
      },
    ],
    guestCount: 2,
    source: "Insurance Orthopedics",
    attribution: "Insurance",
    status: "Stable",
    statusColor: "stable",
    nights: 2,
  },
  {
    id: "adm-3",
    guestName: "Michael Chen",
    roomNumber: "108",
    roomType: "General",
    time: "4:00 PM Admission",
    guests: [
      {
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/32?img=53",
        initials: "MC",
      },
    ],
    guestCount: 1,
    source: "Referral Dr Park",
    attribution: "Referral: Dr. Park",
    status: "Observation",
    statusColor: "observation",
    nights: 1,
  },
  {
    id: "adm-4",
    guestName: "Emily Davis",
    roomNumber: "501",
    roomType: "ICU",
    time: "5:30 PM Admission",
    guests: [
      {
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/32?img=44",
        initials: "ED",
      },
    ],
    guestCount: 1,
    source: "Direct ICU",
    attribution: "Direct",
    status: "Critical",
    statusColor: "critical",
    nights: 1,
  },
];

const IN_PATIENT: Booking[] = [
  {
    id: "inp-1",
    guestName: "Robert Garcia",
    roomNumber: "302",
    roomType: "Cardiology",
    time: "Since Apr 5",
    guests: [
      {
        name: "Robert Garcia",
        avatar: "https://i.pravatar.cc/32?img=60",
        initials: "RG",
      },
    ],
    guestCount: 1,
    source: "Walk-in Cardiology",
    attribution: "Walk-in",
    status: "In-Patient",
    statusColor: "inPatient",
    nights: 4,
  },
  {
    id: "inp-2",
    guestName: "Anna & Chris Bell",
    roomNumber: "419",
    roomType: "ICU",
    time: "Since Apr 4",
    guests: [
      {
        name: "Anna & Chris Bell",
        avatar: "https://i.pravatar.cc/32?img=29",
        initials: "AB",
      },
    ],
    guestCount: 2,
    source: "Insurance ICU",
    attribution: "Insurance",
    status: "In-Patient",
    statusColor: "inPatient",
    nights: 6,
  },
  {
    id: "inp-3",
    guestName: "Lisa Park",
    roomNumber: "207",
    roomType: "Oncology",
    time: "Since Apr 3",
    guests: [
      {
        name: "Lisa Park",
        avatar: "https://i.pravatar.cc/32?img=38",
        initials: "LP",
      },
    ],
    guestCount: 1,
    source: "Direct Oncology",
    attribution: "Direct",
    status: "In-Patient",
    statusColor: "inPatient",
    nights: 3,
  },
];

const DISCHARGES: Booking[] = [
  {
    id: "dis-1",
    guestName: "David Kim",
    roomNumber: "315",
    roomType: "Orthopedics",
    time: "11:00 AM Discharge",
    guests: [
      {
        name: "David Kim",
        avatar: "https://i.pravatar.cc/32?img=52",
        initials: "DK",
      },
    ],
    guestCount: 1,
    source: "Insurance Orthopedics",
    attribution: "Insurance",
    status: "Stable",
    statusColor: "stable",
    nights: 3,
  },
  {
    id: "dis-2",
    guestName: "Rachel Green",
    roomNumber: "104",
    roomType: "General",
    time: "12:00 PM Discharge",
    guests: [
      {
        name: "Rachel Green",
        avatar: "https://i.pravatar.cc/32?img=23",
        initials: "RG",
      },
    ],
    guestCount: 1,
    source: "Direct General",
    attribution: "Direct",
    status: "Stable",
    statusColor: "stable",
    nights: 1,
  },
];

const STATUS_STYLES: Record<string, string> = {
  critical:
    "bg-red-100 text-red-900 dark:bg-red-500/20 dark:text-red-300",
  stable:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  observation:
    "bg-sky-100 text-sky-900 dark:bg-sky-500/20 dark:text-sky-300",
  inPatient:
    "bg-blue-100 text-blue-900 dark:bg-blue-500/20 dark:text-blue-300",
};

/** Section header accents (Latest Patient Activity). */
const LATEST_GROUP_HEADER_ACCENTS: Record<
  string,
  { icon: string; count: string; label: string }
> = {
  admissions: {
    icon: "bg-violet-500/15 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400",
    count:
      "bg-violet-500/15 text-violet-900 dark:bg-violet-500/25 dark:text-violet-300",
    label: "text-violet-950 dark:text-violet-100",
  },
  inPatient: {
    icon: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    count:
      "bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-300",
    label: "text-emerald-900 dark:text-emerald-200",
  },
  discharges: {
    icon: "bg-amber-500/15 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    count:
      "bg-amber-500/15 text-amber-950 dark:bg-amber-500/25 dark:text-amber-200",
    label: "text-amber-950 dark:text-amber-100",
  },
};

function attributionIcon(attribution: string) {
  const a = attribution.trim();
  if (a.startsWith("Referral:")) return UserRound;
  if (a === "Insurance") return Landmark;
  if (a === "Walk-in") return DoorOpen;
  return Globe;
}

// --- Chart Config ---

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--brand)",
  },
} satisfies ChartConfig;

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
  const AttributionIcon = attributionIcon(booking.attribution);

  return (
    <div className="rounded-lg border bg-card p-3 transition-colors hover:bg-muted/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2.5">
          <div>
            <h3 className="truncate text-sm leading-snug font-semibold">
              {booking.guestName} — {booking.roomType}-{booking.roomNumber}
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
            <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
              <AttributionIcon className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{booking.attribution}</span>
            </div>
            <span className="text-muted-foreground/40">·</span>
            <Badge
              variant="secondary"
              className={cn(
                "border-0 px-2 py-0 text-[11px] font-medium",
                STATUS_STYLES[booking.statusColor] ?? STATUS_STYLES.stable,
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
            <span className="font-medium text-foreground">Unit:</span>{" "}
            {booking.roomType}
          </p>
          <p>
            <span className="font-medium text-foreground">LOS (days):</span>{" "}
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
        <p className="text-sm">No patient activity</p>
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

const CustomReferenceLabel: React.FC<CustomReferenceLabelProps> = (props) => {
  const { viewBox, value } = props;
  const y = viewBox?.y ?? 0;

  const { width, height, padX, rectTop } = React.useMemo(() => {
    const characterWidth = 9;
    const padX = 14;
    const padY = 4;
    const height = 18 + padY * 2;
    const label = compactCurrencyFormatter.format(value);
    const width = label.length * characterWidth + padX * 2;
    const rectTop = y - height / 2;
    return { width, height, padX, rectTop };
  }, [value, y]);

  return (
    <>
      <rect
        x={0}
        y={rectTop}
        width={width}
        height={height}
        fill="var(--brand)"
        rx={2}
      />
      <text
        fontWeight={600}
        fontSize={12}
        x={padX}
        y={y}
        dominantBaseline="middle"
        fill="var(--brand-foreground)"
      >
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
}: NumericSeriesTooltipRenderProps & { metricLabel: string }) {
  if (!active || !payload?.length) return null;

  const value = payload[0]?.value || 0;

  return (
    <div className="border border-border bg-popover p-2 shadow-lg sm:p-3">
      <p className="mb-1.5 text-xs font-medium text-foreground sm:mb-2 sm:text-sm">
        {label}
      </p>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="size-2 rounded-full bg-brand sm:size-2.5" />
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
  const barPatternFillStroke = {
    fill: "color-mix(in oklch, var(--brand) 14%, var(--background))",
    stroke: "color-mix(in oklch, var(--brand) 40%, var(--background))",
  };

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
              margin={{ top: 14, right: 12, left: 0, bottom: 0 }}
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
                        ? "var(--brand)"
                        : `url(#${secondaryBarPatternId})`
                    }
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                ))}
              </Bar>
              <ReferenceLine
                opacity={0.55}
                y={springyValue}
                stroke="var(--brand)"
                strokeWidth={1}
                strokeDasharray="3 3"
                label={<CustomReferenceLabel value={maxValueData.value} />}
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
          booking.attribution,
          booking.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      );
    },
    [query],
  );

  const filteredAdmissions = React.useMemo(
    () => filterBookings(ADMISSIONS),
    [filterBookings],
  );
  const filteredInPatient = React.useMemo(
    () => filterBookings(IN_PATIENT),
    [filterBookings],
  );
  const filteredDischarges = React.useMemo(
    () => filterBookings(DISCHARGES),
    [filterBookings],
  );
  const groupedBookings = React.useMemo(
    () => [
      {
        key: "admissions",
        label: "Admissions",
        icon: DoorOpen,
        count: filteredAdmissions.length,
        bookings: filteredAdmissions,
      },
      {
        key: "inPatient",
        label: "In-Patient",
        icon: BedDouble,
        count: filteredInPatient.length,
        bookings: filteredInPatient,
      },
      {
        key: "discharges",
        label: "Discharges",
        icon: KeyRound,
        count: filteredDischarges.length,
        bookings: filteredDischarges,
      },
    ],
    [filteredAdmissions, filteredInPatient, filteredDischarges],
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border bg-card p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-medium text-pretty sm:text-base">
          Latest Patient Activity
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Last 24 hours</p>
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
            placeholder="Search patient, unit, or source"
            className="h-4 w-full border-none bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search patient activity"
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
                  No patient activity found for this search.
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
