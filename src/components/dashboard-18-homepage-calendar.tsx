"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

type BookingCalendarKind = "arrival" | "inHouse" | "departure";

type CalendarBooking = {
  id: string;
  guestName: string;
  roomNumber: string;
  roomType: string;
  source: Booking["source"];
  status: string;
  statusColor: string;
  guestCount: number;
  specialRequests?: string;
  kind: BookingCalendarKind;
  startDate: Date;
  endDate?: Date;
};

type CalendarDaySummary = {
  key: string;
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  arrivalsCount: number;
  inHouseCount: number;
  departuresCount: number;
  totalCount: number;
};

type VisibleMonth = {
  year: number;
  monthIndex: number;
};

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

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

const RECENT_ARRIVALS_TABLE: Booking[] = [
  ...ARRIVALS,
  {
    id: "arr-5",
    guestName: "Noah Wilson",
    roomNumber: "306",
    roomType: "Deluxe",
    time: "6:00 PM Check-in",
    guests: [
      {
        name: "Noah Wilson",
        avatar: "https://i.pravatar.cc/32?img=61",
        initials: "NW",
      },
    ],
    guestCount: 2,
    source: "Booking.com",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 4,
    specialRequests: "High floor",
  },
  {
    id: "arr-6",
    guestName: "Olivia Martin",
    roomNumber: "119",
    roomType: "Standard",
    time: "6:30 PM Check-in",
    guests: [
      {
        name: "Olivia Martin",
        avatar: "https://i.pravatar.cc/32?img=47",
        initials: "OM",
      },
    ],
    guestCount: 1,
    source: "Direct",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 2,
    specialRequests: "Near elevator",
  },
  {
    id: "arr-7",
    guestName: "Liam Thompson",
    roomNumber: "522",
    roomType: "Suite",
    time: "7:00 PM Check-in",
    guests: [
      {
        name: "Liam Thompson",
        avatar: "https://i.pravatar.cc/32?img=68",
        initials: "LT",
      },
    ],
    guestCount: 3,
    source: "Expedia",
    status: "Pending",
    statusColor: "amber",
    nights: 5,
    specialRequests: "Baby crib",
  },
  {
    id: "arr-8",
    guestName: "Ava Rodriguez",
    roomNumber: "227",
    roomType: "Deluxe",
    time: "7:20 PM Check-in",
    guests: [
      {
        name: "Ava Rodriguez",
        avatar: "https://i.pravatar.cc/32?img=36",
        initials: "AR",
      },
    ],
    guestCount: 2,
    source: "Walk-in",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 1,
    specialRequests: "Late dinner reservation",
  },
  {
    id: "arr-9",
    guestName: "Ethan Brooks",
    roomNumber: "402",
    roomType: "Suite",
    time: "8:00 PM Check-in",
    guests: [
      {
        name: "Ethan Brooks",
        avatar: "https://i.pravatar.cc/32?img=34",
        initials: "EB",
      },
      {
        name: "Lara Brooks",
        avatar: "https://i.pravatar.cc/32?img=66",
        initials: "LB",
      },
    ],
    guestCount: 4,
    source: "Direct",
    status: "VIP",
    statusColor: "violet",
    nights: 3,
    specialRequests: "Fruit basket",
  },
  {
    id: "arr-10",
    guestName: "Mia Sanchez",
    roomNumber: "143",
    roomType: "Standard",
    time: "8:20 PM Check-in",
    guests: [
      {
        name: "Mia Sanchez",
        avatar: "https://i.pravatar.cc/32?img=57",
        initials: "MS",
      },
    ],
    guestCount: 1,
    source: "Booking.com",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 2,
    specialRequests: "Quiet room",
  },
  {
    id: "arr-11",
    guestName: "Henry Young",
    roomNumber: "333",
    roomType: "Deluxe",
    time: "8:40 PM Check-in",
    guests: [
      {
        name: "Henry Young",
        avatar: "https://i.pravatar.cc/32?img=72",
        initials: "HY",
      },
    ],
    guestCount: 2,
    source: "Expedia",
    status: "Pending",
    statusColor: "amber",
    nights: 3,
    specialRequests: "Extra towels",
  },
  {
    id: "arr-12",
    guestName: "Grace Patel",
    roomNumber: "610",
    roomType: "Penthouse",
    time: "9:10 PM Check-in",
    guests: [
      {
        name: "Grace Patel",
        avatar: "https://i.pravatar.cc/32?img=46",
        initials: "GP",
      },
    ],
    guestCount: 2,
    source: "Direct",
    status: "VIP",
    statusColor: "violet",
    nights: 6,
    specialRequests: "Private transfer",
  },
  {
    id: "arr-13",
    guestName: "Logan Turner",
    roomNumber: "208",
    roomType: "Standard",
    time: "9:25 PM Check-in",
    guests: [
      {
        name: "Logan Turner",
        avatar: "https://i.pravatar.cc/32?img=13",
        initials: "LT",
      },
    ],
    guestCount: 1,
    source: "Walk-in",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 1,
    specialRequests: "No feather pillows",
  },
  {
    id: "arr-14",
    guestName: "Amelia Scott",
    roomNumber: "439",
    roomType: "Suite",
    time: "9:45 PM Check-in",
    guests: [
      {
        name: "Amelia Scott",
        avatar: "https://i.pravatar.cc/32?img=24",
        initials: "AS",
      },
    ],
    guestCount: 2,
    source: "Booking.com",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 4,
    specialRequests: "Rose petals setup",
  },
  {
    id: "arr-15",
    guestName: "Jack Parker",
    roomNumber: "256",
    roomType: "Deluxe",
    time: "10:10 PM Check-in",
    guests: [
      {
        name: "Jack Parker",
        avatar: "https://i.pravatar.cc/32?img=58",
        initials: "JP",
      },
    ],
    guestCount: 2,
    source: "Expedia",
    status: "Pending",
    statusColor: "amber",
    nights: 2,
    specialRequests: "Late checkout request",
  },
  {
    id: "arr-16",
    guestName: "Sophia Nguyen",
    roomNumber: "509",
    roomType: "Suite",
    time: "10:30 PM Check-in",
    guests: [
      {
        name: "Sophia Nguyen",
        avatar: "https://i.pravatar.cc/32?img=69",
        initials: "SN",
      },
    ],
    guestCount: 3,
    source: "Direct",
    status: "VIP",
    statusColor: "violet",
    nights: 5,
    specialRequests: "Anniversary decor",
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
    statusColor: "sky",
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
    statusColor: "sky",
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
    statusColor: "sky",
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
    statusColor: "sky",
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
    statusColor: "sky",
    nights: 1,
  },
];

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CALENDAR_CATEGORY_META: Record<
  BookingCalendarKind,
  {
    label: string;
    marker: "dot" | "ring" | "dash";
  }
> = {
  arrival: {
    label: "Admissions",
    marker: "dot",
  },
  inHouse: {
    label: "In-Patient",
    marker: "ring",
  },
  departure: {
    label: "Discharges",
    marker: "dash",
  },
};

const MONTH_VIEW_WEEKDAY_LABELS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

const ARRIVAL_DAY_PATTERN = [2, 4, 6, 8, 11, 13, 16, 19, 22, 24, 27, 29];
const DEPARTURE_DAY_PATTERN = [1, 5, 9, 14, 18, 23, 28, 30];
const IN_HOUSE_START_PATTERN = [1, 3, 7, 10, 14, 19, 23, 26];
const IN_HOUSE_SPAN_PATTERN = [2, 4, 5, 3, 6, 4, 3, 5];

// ---------------------------------------------------------------------------
// Date utilities
// ---------------------------------------------------------------------------

function createVisibleMonth(date: Date): VisibleMonth {
  return {
    year: date.getFullYear(),
    monthIndex: date.getMonth(),
  };
}

function createDateAtNoon(year: number, monthIndex: number, day: number) {
  return new Date(year, monthIndex, day, 12, 0, 0, 0);
}

function getMondayFirstOffset(date: Date) {
  return (date.getDay() + 6) % 7;
}

function getDaysInVisibleMonth(visibleMonth: VisibleMonth) {
  return new Date(visibleMonth.year, visibleMonth.monthIndex + 1, 0).getDate();
}

function getVisibleMonthLabel(visibleMonth: VisibleMonth) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(createDateAtNoon(visibleMonth.year, visibleMonth.monthIndex, 1));
}

function shiftVisibleMonth(
  visibleMonth: VisibleMonth,
  offset: number,
): VisibleMonth {
  return createVisibleMonth(
    createDateAtNoon(visibleMonth.year, visibleMonth.monthIndex + offset, 1),
  );
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isSameDay(left: Date, right: Date) {
  return toDateKey(left) === toDateKey(right);
}

function isSameVisibleMonth(date: Date, visibleMonth: VisibleMonth) {
  return (
    date.getFullYear() === visibleMonth.year &&
    date.getMonth() === visibleMonth.monthIndex
  );
}

// ---------------------------------------------------------------------------
// Booking seed helpers
// ---------------------------------------------------------------------------

function dedupeBookingSeeds(bookings: Booking[]) {
  const seen = new Set<string>();
  return bookings.filter((booking) => {
    if (seen.has(booking.id)) {
      return false;
    }
    seen.add(booking.id);
    return true;
  });
}

function repeatBookingSeeds(
  bookings: Booking[],
  total: number,
  prefix: string,
) {
  if (bookings.length === 0 || total <= 0) {
    return [];
  }

  return Array.from({ length: total }, (_, index) => {
    const booking = bookings[index % bookings.length];
    const cycle = Math.floor(index / bookings.length);

    return {
      ...booking,
      id:
        cycle === 0
          ? `${prefix}-${booking.id}`
          : `${prefix}-${booking.id}-${cycle}`,
    };
  });
}

function normalizePatternDays(
  pattern: readonly number[],
  total: number,
  daysInMonth: number,
) {
  const usedDays = new Set<number>();

  return Array.from({ length: total }, (_, index) => {
    const baseDay = Math.min(pattern[index % pattern.length] ?? 1, daysInMonth);
    let candidate = baseDay;

    while (usedDays.has(candidate) && candidate < daysInMonth) {
      candidate += 1;
    }

    while (usedDays.has(candidate) && candidate > 1) {
      candidate -= 1;
    }

    usedDays.add(candidate);
    return candidate;
  });
}

// ---------------------------------------------------------------------------
// Calendar booking builders
// ---------------------------------------------------------------------------

function buildSingleDayCalendarBookings(
  bookings: Booking[],
  kind: Extract<BookingCalendarKind, "arrival" | "departure">,
  visibleMonth: VisibleMonth,
  pattern: readonly number[],
): CalendarBooking[] {
  const scheduledDays = normalizePatternDays(
    pattern,
    bookings.length,
    getDaysInVisibleMonth(visibleMonth),
  );

  return bookings.map((booking, index) => ({
    id: booking.id,
    guestName: booking.guestName,
    roomNumber: booking.roomNumber,
    roomType: booking.roomType,
    source: booking.source,
    status: booking.status,
    statusColor: booking.statusColor,
    guestCount: booking.guestCount,
    specialRequests: booking.specialRequests,
    kind,
    startDate: createDateAtNoon(
      visibleMonth.year,
      visibleMonth.monthIndex,
      scheduledDays[index] ?? 1,
    ),
  }));
}

function buildInHouseCalendarBookings(
  bookings: Booking[],
  visibleMonth: VisibleMonth,
): CalendarBooking[] {
  const daysInMonth = getDaysInVisibleMonth(visibleMonth);
  const scheduledDays = normalizePatternDays(
    IN_HOUSE_START_PATTERN,
    bookings.length,
    daysInMonth,
  );

  return bookings.map((booking, index) => {
    const startDay = scheduledDays[index] ?? 1;
    const span =
      IN_HOUSE_SPAN_PATTERN[index % IN_HOUSE_SPAN_PATTERN.length] ??
      Math.max(booking.nights, 2);
    const boundedSpan = Math.max(2, Math.min(span, 6));
    const endDay = Math.min(startDay + boundedSpan - 1, daysInMonth);

    return {
      id: booking.id,
      guestName: booking.guestName,
      roomNumber: booking.roomNumber,
      roomType: booking.roomType,
      source: booking.source,
      status: booking.status,
      statusColor: booking.statusColor,
      guestCount: booking.guestCount,
      specialRequests: booking.specialRequests,
      kind: "inHouse",
      startDate: createDateAtNoon(
        visibleMonth.year,
        visibleMonth.monthIndex,
        startDay,
      ),
      endDate: createDateAtNoon(
        visibleMonth.year,
        visibleMonth.monthIndex,
        endDay,
      ),
    };
  });
}

function remapBookingsForVisibleMonth(visibleMonth: VisibleMonth) {
  const arrivalPool = dedupeBookingSeeds([
    ...RECENT_ARRIVALS_TABLE,
    ...ARRIVALS,
  ]);
  const arrivalSeeds = repeatBookingSeeds(
    arrivalPool,
    Math.min(12, Math.max(10, arrivalPool.length)),
    "arrival",
  );
  const departureSeeds = repeatBookingSeeds(
    DEPARTURES,
    Math.max(6, DEPARTURES.length),
    "departure",
  );
  const inHouseSeeds = repeatBookingSeeds(
    IN_HOUSE,
    Math.max(6, IN_HOUSE.length),
    "inhouse",
  );

  return [
    ...buildSingleDayCalendarBookings(
      arrivalSeeds,
      "arrival",
      visibleMonth,
      ARRIVAL_DAY_PATTERN,
    ),
    ...buildInHouseCalendarBookings(inHouseSeeds, visibleMonth),
    ...buildSingleDayCalendarBookings(
      departureSeeds,
      "departure",
      visibleMonth,
      DEPARTURE_DAY_PATTERN,
    ),
  ];
}

// ---------------------------------------------------------------------------
// Calendar data helpers
// ---------------------------------------------------------------------------

function getCalendarCountsByDate(bookings: CalendarBooking[]) {
  const countsByDate = new Map<
    string,
    {
      arrivalsCount: number;
      inHouseCount: number;
      departuresCount: number;
    }
  >();

  bookings.forEach((booking) => {
    const endDate = booking.endDate ?? booking.startDate;
    let cursor = createDateAtNoon(
      booking.startDate.getFullYear(),
      booking.startDate.getMonth(),
      booking.startDate.getDate(),
    );

    while (cursor <= endDate) {
      const key = toDateKey(cursor);
      const counts = countsByDate.get(key) ?? {
        arrivalsCount: 0,
        inHouseCount: 0,
        departuresCount: 0,
      };

      if (booking.kind === "arrival" && isSameDay(cursor, booking.startDate)) {
        counts.arrivalsCount += 1;
      }

      if (
        booking.kind === "departure" &&
        isSameDay(cursor, booking.startDate)
      ) {
        counts.departuresCount += 1;
      }

      if (booking.kind === "inHouse") {
        counts.inHouseCount += 1;
      }

      countsByDate.set(key, counts);
      cursor = createDateAtNoon(
        cursor.getFullYear(),
        cursor.getMonth(),
        cursor.getDate() + 1,
      );
    }
  });

  return countsByDate;
}

function resolveDefaultCalendarSelectedDate(
  visibleMonth: VisibleMonth,
  bookings: CalendarBooking[],
  today: Date,
) {
  const countsByDate = getCalendarCountsByDate(bookings);
  const normalizedToday = createDateAtNoon(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  if (isSameVisibleMonth(normalizedToday, visibleMonth)) {
    const todayCounts = countsByDate.get(toDateKey(normalizedToday));
    if (
      todayCounts &&
      todayCounts.arrivalsCount +
        todayCounts.inHouseCount +
        todayCounts.departuresCount >
        0
    ) {
      return normalizedToday;
    }
  }

  const monthPrefix = `${visibleMonth.year}-${`${visibleMonth.monthIndex + 1}`.padStart(2, "0")}`;
  const firstBookedDateKey = Array.from(countsByDate.keys())
    .sort()
    .find((key) => key.startsWith(monthPrefix));

  if (firstBookedDateKey) {
    const [year, month, day] = firstBookedDateKey.split("-").map(Number);
    return createDateAtNoon(year, month - 1, day);
  }

  return createDateAtNoon(visibleMonth.year, visibleMonth.monthIndex, 1);
}

function buildCalendarDaySummaries({
  visibleMonth,
  bookings,
  selectedDate,
  today,
}: {
  visibleMonth: VisibleMonth;
  bookings: CalendarBooking[];
  selectedDate: Date;
  today: Date;
}): CalendarDaySummary[] {
  const firstOfMonth = createDateAtNoon(
    visibleMonth.year,
    visibleMonth.monthIndex,
    1,
  );
  const firstGridDate = createDateAtNoon(
    visibleMonth.year,
    visibleMonth.monthIndex,
    1 - getMondayFirstOffset(firstOfMonth),
  );
  const countsByDate = getCalendarCountsByDate(bookings);
  const normalizedToday = createDateAtNoon(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return Array.from({ length: 42 }, (_, index) => {
    const date = createDateAtNoon(
      firstGridDate.getFullYear(),
      firstGridDate.getMonth(),
      firstGridDate.getDate() + index,
    );
    const key = toDateKey(date);
    const counts = countsByDate.get(key) ?? {
      arrivalsCount: 0,
      inHouseCount: 0,
      departuresCount: 0,
    };

    return {
      key,
      date,
      dayNumber: date.getDate(),
      isCurrentMonth: isSameVisibleMonth(date, visibleMonth),
      isToday: isSameDay(date, normalizedToday),
      isSelected: isSameDay(date, selectedDate),
      arrivalsCount: counts.arrivalsCount,
      inHouseCount: counts.inHouseCount,
      departuresCount: counts.departuresCount,
      totalCount:
        counts.arrivalsCount + counts.inHouseCount + counts.departuresCount,
    };
  });
}

function getCalendarSummaryForDate(
  summaries: CalendarDaySummary[],
  selectedDate: Date,
) {
  return (
    summaries.find((summary) => isSameDay(summary.date, selectedDate)) ?? {
      key: toDateKey(selectedDate),
      date: selectedDate,
      dayNumber: selectedDate.getDate(),
      isCurrentMonth: true,
      isToday: false,
      isSelected: true,
      arrivalsCount: 0,
      inHouseCount: 0,
      departuresCount: 0,
      totalCount: 0,
    }
  );
}

// ---------------------------------------------------------------------------
// Style helpers
// ---------------------------------------------------------------------------

const calendarCellBaseStyle: React.CSSProperties = {
  backgroundColor: "var(--card)",
};

const calendarMutedCellStyle: React.CSSProperties = {
  backgroundColor: "color-mix(in oklch, var(--muted) 34%, var(--background))",
};

function getCalendarCellStyle(
  summary: CalendarDaySummary,
  isMobile: boolean,
): React.CSSProperties {
  const style: React.CSSProperties = {
    ...(summary.isCurrentMonth || summary.isSelected
      ? calendarCellBaseStyle
      : calendarMutedCellStyle),
  };

  if (summary.isSelected) {
    style.backgroundColor =
      "color-mix(in oklch, var(--muted) 82%, var(--background))";
    style.borderColor = "transparent";
    style.boxShadow = "none";
  } else if (summary.isToday) {
    style.boxShadow =
      "inset 0 0 0 1px color-mix(in oklch, var(--primary) 42%, transparent)";
  }

  if (isMobile && !summary.isCurrentMonth && !summary.isSelected) {
    style.opacity = 0.82;
  }

  return style;
}

function getCategoryDotStyle(kind: BookingCalendarKind): React.CSSProperties {
  const defaultColor =
    "color-mix(in oklch, var(--foreground) 72%, var(--background))";
  const categoryColor =
    kind === "arrival"
      ? "var(--success)"
      : kind === "departure"
        ? "var(--destructive)"
        : defaultColor;
  const marker = CALENDAR_CATEGORY_META[kind].marker;

  if (marker === "ring") {
    return {
      backgroundColor: "transparent",
      boxShadow: `inset 0 0 0 1.5px ${categoryColor}`,
    };
  }

  if (marker === "dash") {
    return {
      backgroundColor: categoryColor,
      borderRadius: "999px",
      width: "0.6rem",
      height: "0.16rem",
    };
  }

  return {
    backgroundColor: categoryColor,
    boxShadow:
      kind === "arrival"
        ? "0 0 0 1px color-mix(in oklch, var(--success) 30%, transparent)"
        : kind === "departure"
          ? "0 0 0 1px color-mix(in oklch, var(--destructive) 30%, transparent)"
          : "0 0 0 1px color-mix(in oklch, var(--foreground) 12%, transparent)",
  };
}

function getCategoryLabelClassName(kind: BookingCalendarKind): string {
  if (kind === "arrival") return "text-[color:var(--success)]";
  if (kind === "departure") return "text-destructive";
  return "text-muted-foreground";
}

// ---------------------------------------------------------------------------
// UI Components
// ---------------------------------------------------------------------------

function MonthCalendarHeader({
  monthLabel,
  onToday,
  onPreviousMonth,
  onNextMonth,
}: {
  monthLabel: string;
  onToday: () => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}) {
  return (
    <header className="flex flex-col gap-4 pb-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
          Appointments Calendar
        </p>
        <div className="mt-1 text-lg font-semibold text-foreground">
          {monthLabel}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 rounded-md bg-muted/45 px-4 font-medium"
          onClick={onToday}
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--muted) 72%, var(--background))",
          }}
        >
          Today
        </Button>
        <div className="h-5 w-px bg-border/55" aria-hidden="true" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 rounded-md bg-muted/45 px-3 font-medium"
          aria-label="Previous month"
          onClick={onPreviousMonth}
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--muted) 72%, var(--background))",
          }}
        >
          <ChevronLeft className="mr-1.5 size-4" aria-hidden="true" />
          Prev month
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 rounded-md bg-muted/45 px-3 font-medium"
          aria-label="Next month"
          onClick={onNextMonth}
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--muted) 72%, var(--background))",
          }}
        >
          Next month
          <ChevronRight className="ml-1.5 size-4" aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}

function WeekdayHeader() {
  return (
    <div
      className="hidden grid-cols-7 gap-px lg:grid"
      style={{
        backgroundColor: "color-mix(in oklch, var(--border) 72%, transparent)",
      }}
    >
      {MONTH_VIEW_WEEKDAY_LABELS.map((weekday) => (
        <div
          key={weekday}
          className="py-3 text-center text-xs font-semibold text-muted-foreground"
          style={{ backgroundColor: "var(--card)" }}
        >
          {weekday}
        </div>
      ))}
    </div>
  );
}

function CalendarMetricRows({ summary }: { summary: CalendarDaySummary }) {
  const rows = (
    [
      { kind: "arrival", count: summary.arrivalsCount },
      { kind: "inHouse", count: summary.inHouseCount },
      { kind: "departure", count: summary.departuresCount },
    ] as const
  ).filter((row) => row.count > 0);

  if (rows.length === 0) {
    return (
      <p className="pt-5 text-[11px] text-muted-foreground">
        No booking activity
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-1.5">
      {rows.map((row) => (
        <div
          key={row.kind}
          className={cn(
            "flex items-center gap-2 text-[11px]",
            getCategoryLabelClassName(row.kind),
          )}
        >
          <span
            className={cn(
              "shrink-0 rounded-full",
              CALENDAR_CATEGORY_META[row.kind].marker === "dash"
                ? "h-[0.16rem] w-2.5"
                : "size-2",
            )}
            aria-hidden="true"
            style={getCategoryDotStyle(row.kind)}
          />
          <span className="truncate">
            {CALENDAR_CATEGORY_META[row.kind].label}
          </span>
          <span className="ml-auto tabular-nums">{row.count}</span>
        </div>
      ))}
    </div>
  );
}

function CalendarDayCell({
  summary,
  mobile = false,
  onSelect,
}: {
  summary: CalendarDaySummary;
  mobile?: boolean;
  onSelect: (summary: CalendarDaySummary) => void;
}) {
  const hasBookings = summary.totalCount > 0;

  return (
    <button
      type="button"
      aria-label={new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(summary.date)}
      aria-pressed={summary.isSelected}
      data-day-key={summary.key}
      data-current-month={summary.isCurrentMonth}
      data-has-bookings={hasBookings}
      data-selected={summary.isSelected}
      onClick={() => onSelect(summary)}
      className={cn(
        "group relative flex w-full text-left transition-colors focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        mobile ? "h-16 flex-col px-2 py-2" : "min-h-[110px] flex-col px-3 py-2",
        !summary.isCurrentMonth &&
          !summary.isSelected &&
          "text-muted-foreground/75",
      )}
      style={getCalendarCellStyle(summary, mobile)}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-full text-sm font-semibold tabular-nums",
            summary.isSelected && "bg-primary text-primary-foreground",
            !summary.isSelected &&
              summary.isToday &&
              "text-primary ring-1 ring-primary",
            !summary.isSelected && !summary.isToday && "text-foreground",
            !summary.isCurrentMonth &&
              !summary.isSelected &&
              "text-muted-foreground",
          )}
        >
          {summary.dayNumber}
        </span>
        {!mobile && hasBookings ? (
          <span className="pt-1 text-[11px] font-medium text-muted-foreground">
            {summary.totalCount} total
          </span>
        ) : null}
      </div>

      {!mobile ? (
        <CalendarMetricRows summary={summary} />
      ) : (
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {summary.arrivalsCount > 0 ? (
              <span
                className="size-1.5 rounded-full"
                style={getCategoryDotStyle("arrival")}
              />
            ) : null}
            {summary.inHouseCount > 0 ? (
              <span
                className="size-1.5 rounded-full"
                style={getCategoryDotStyle("inHouse")}
              />
            ) : null}
            {summary.departuresCount > 0 ? (
              <span
                className="h-[0.14rem] w-2 rounded-full"
                style={getCategoryDotStyle("departure")}
              />
            ) : null}
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">
            {hasBookings ? summary.totalCount : ""}
          </span>
        </div>
      )}
    </button>
  );
}

function DesktopMonthGrid({
  summaries,
  onSelect,
}: {
  summaries: CalendarDaySummary[];
  onSelect: (summary: CalendarDaySummary) => void;
}) {
  return (
    <div
      className="hidden lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px"
      style={{
        backgroundColor: "color-mix(in oklch, var(--border) 72%, transparent)",
      }}
    >
      {summaries.map((summary) => (
        <CalendarDayCell
          key={summary.key}
          summary={summary}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function MobileMonthGrid({
  summaries,
  onSelect,
}: {
  summaries: CalendarDaySummary[];
  onSelect: (summary: CalendarDaySummary) => void;
}) {
  return (
    <div
      className="grid grid-cols-7 gap-px lg:hidden"
      style={{
        backgroundColor: "color-mix(in oklch, var(--border) 72%, transparent)",
      }}
    >
      {summaries.map((summary) => (
        <CalendarDayCell
          key={summary.key}
          summary={summary}
          mobile
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function SummaryMetricInline({
  label,
  value,
  kind,
}: {
  label: string;
  value: number;
  kind: BookingCalendarKind;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm",
        getCategoryLabelClassName(kind),
      )}
    >
      <span
        className={cn(
          "shrink-0 rounded-full",
          CALENDAR_CATEGORY_META[kind].marker === "dash"
            ? "h-[0.16rem] w-2.5"
            : "size-2",
        )}
        aria-hidden="true"
        style={getCategoryDotStyle(kind)}
      />
      <span>{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function SelectedDaySummary({ summary }: { summary: CalendarDaySummary }) {
  const selectedLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(summary.date);

  return (
    <section
      aria-live="polite"
      data-testid="selected-day-summary"
      className="mt-1 px-4 py-3 sm:px-5"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            Selected day
          </p>
          <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <p className="text-base font-semibold text-foreground">
              {selectedLabel}
            </p>
            <p className="text-sm text-muted-foreground">
              {summary.totalCount} occupancy touches
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <SummaryMetricInline
            label="Admissions"
            value={summary.arrivalsCount}
            kind="arrival"
          />
          <SummaryMetricInline
            label="In-Patient"
            value={summary.inHouseCount}
            kind="inHouse"
          />
          <SummaryMetricInline
            label="Discharges"
            value={summary.departuresCount}
            kind="departure"
          />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold text-foreground">
              {summary.totalCount}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const Dashboard18HomepageCalendar = () => {
  const today = React.useMemo(
    () =>
      createDateAtNoon(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ),
    [],
  );
  const initialVisibleMonth = React.useMemo(
    () => createVisibleMonth(today),
    [today],
  );

  const [visibleMonth, setVisibleMonth] =
    React.useState<VisibleMonth>(initialVisibleMonth);
  const [selectedDate, setSelectedDate] = React.useState<Date>(() =>
    resolveDefaultCalendarSelectedDate(
      initialVisibleMonth,
      remapBookingsForVisibleMonth(initialVisibleMonth),
      today,
    ),
  );

  const bookings = React.useMemo(
    () => remapBookingsForVisibleMonth(visibleMonth),
    [visibleMonth],
  );

  const daySummaries = React.useMemo(
    () =>
      buildCalendarDaySummaries({
        visibleMonth,
        bookings,
        selectedDate,
        today,
      }),
    [bookings, selectedDate, today, visibleMonth],
  );

  const selectedSummary = React.useMemo(
    () => getCalendarSummaryForDate(daySummaries, selectedDate),
    [daySummaries, selectedDate],
  );

  const applyVisibleMonth = React.useCallback(
    (nextVisibleMonth: VisibleMonth) => {
      const nextBookings = remapBookingsForVisibleMonth(nextVisibleMonth);
      const nextSelectedDate = resolveDefaultCalendarSelectedDate(
        nextVisibleMonth,
        nextBookings,
        today,
      );

      React.startTransition(() => {
        setVisibleMonth(nextVisibleMonth);
        setSelectedDate(nextSelectedDate);
      });
    },
    [today],
  );

  const handleSelectDay = React.useCallback((summary: CalendarDaySummary) => {
    React.startTransition(() => {
      setVisibleMonth(createVisibleMonth(summary.date));
      setSelectedDate(summary.date);
    });
  }, []);

  return (
    <section
      data-testid="hotel-bookings-calendar"
      className="w-full rounded-xl border border-border bg-surface p-4 @sm:p-5 @md:p-6"
    >
      <MonthCalendarHeader
        monthLabel={getVisibleMonthLabel(visibleMonth)}
        onToday={() => applyVisibleMonth(createVisibleMonth(today))}
        onPreviousMonth={() =>
          applyVisibleMonth(shiftVisibleMonth(visibleMonth, -1))
        }
        onNextMonth={() =>
          applyVisibleMonth(shiftVisibleMonth(visibleMonth, 1))
        }
      />

      <div className="py-2">
        <SelectedDaySummary summary={selectedSummary} />

        <div className="mt-3" data-testid="month-calendar-grid">
          <WeekdayHeader />
          <DesktopMonthGrid
            summaries={daySummaries}
            onSelect={handleSelectDay}
          />
          <MobileMonthGrid
            summaries={daySummaries}
            onSelect={handleSelectDay}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard18HomepageCalendar;

export {
  buildCalendarDaySummaries,
  type CalendarDaySummary,
  getCalendarCountsByDate,
  type CalendarBooking,
  resolveDefaultCalendarSelectedDate,
};
