"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
    />
  );
}

export function CalendarRangeDemo() {
  const [range, setRange] = React.useState<
    { from: Date; to: Date } | undefined
  >(undefined);
  return (
    <Calendar
      mode="range"
      selected={{ from: range?.from, to: range?.to }}
      onSelect={(selected) =>
        setRange({
          from: selected?.from ?? new Date(),
          to: selected?.to ?? new Date(),
        })
      }
      className="rounded-lg border"
    />
  );
}

export function CalendarDropdownDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      fromYear={1926}
      toYear={2026}
      className="rounded-lg border"
    />
  );
}

export function CalendarWeekNumbersDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      showWeekNumber
      className="rounded-lg border"
    />
  );
}

export function CalendarTimezoneDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      timeZone={timeZone}
      className="rounded-lg border"
    />
  );
}
