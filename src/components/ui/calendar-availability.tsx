"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";


type AvailabilityStatus = "available" | "partial" | "full";
type AvailabilityDateCell = {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  status: AvailabilityStatus;
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getAvailabilityStatus(
  year: number,
  month: number,
  day: number,
): AvailabilityStatus {
  const seasonalWeight = [0, 0, 1, 1, 2, 3, 3, 2, 2, 1, 0, 1][month];
  const weekendWeight = new Date(year, month, day).getDay();
  const score =
    ((day * 11 + month * 7 + (year % 100)) % 8) +
    seasonalWeight +
    (weekendWeight === 5 || weekendWeight === 6 ? 2 : 0);
  if (score >= 9) return "full";
  if (score >= 5) return "partial";
  return "available";
}

function generateAvailabilityMonthGrid(
  year: number,
  month: number,
  selectedDate: number,
): AvailabilityDateCell[] {
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = firstDayOfMonth + daysInMonth <= 35 ? 35 : 42;
  const cells: AvailabilityDateCell[] = [];

  for (let i = 0; i < totalCells; i += 1) {
    const dayNumber = i - firstDayOfMonth + 1;
    let cellDate = dayNumber;
    let cellMonth = month;
    let cellYear = year;
    let isCurrentMonth = true;

    if (dayNumber <= 0) {
      cellDate = prevMonthDays + dayNumber;
      cellMonth = month === 0 ? 11 : month - 1;
      cellYear = month === 0 ? year - 1 : year;
      isCurrentMonth = false;
    } else if (dayNumber > daysInMonth) {
      cellDate = dayNumber - daysInMonth;
      cellMonth = month === 11 ? 0 : month + 1;
      cellYear = month === 11 ? year + 1 : year;
      isCurrentMonth = false;
    }

    cells.push({
      date: cellDate,
      month: cellMonth,
      year: cellYear,
      isCurrentMonth,
      isSelected: isCurrentMonth && cellDate === selectedDate,
      isToday:
        cellDate === today.getDate() &&
        cellMonth === today.getMonth() &&
        cellYear === today.getFullYear(),
      status: getAvailabilityStatus(cellYear, cellMonth, cellDate),
    });
  }
  return cells;
}

const availabilityDayCellBase =
  "border-0 bg-transparent text-foreground/85 hover:bg-surface/50";

const availabilityStatusMeta: Record<
  AvailabilityStatus,
  { label: string; summary: string; swatch: string; dot: string }
> = {
  available: {
    label: "Available",
    summary: "Fully open",
    swatch: "border border-border/70 bg-surface",
    dot: "border border-border/70 bg-surface",
  },
  partial: {
    label: "Partial",
    summary: "Partially filled",
    swatch: "bg-brand/30",
    dot: "bg-brand/50",
  },
  full: {
    label: "Full",
    summary: "Sold out",
    swatch: "bg-brand",
    dot: "bg-brand",
  },
};

const AvailabilityCalendarPanel = () => {
  const [currentMonth, setCurrentMonth] = React.useState(5);
  const [currentYear, setCurrentYear] = React.useState(2025);
  const [selectedDate, setSelectedDate] = React.useState(18);

  const calendarCells = React.useMemo(
    () =>
      generateAvailabilityMonthGrid(currentYear, currentMonth, selectedDate),
    [currentMonth, currentYear, selectedDate],
  );

  const selectedCell = React.useMemo(
    () =>
      calendarCells.find(
        (cell) =>
          cell.isCurrentMonth &&
          cell.date === selectedDate &&
          cell.month === currentMonth &&
          cell.year === currentYear,
      ) ??
      calendarCells.find((cell) => cell.isCurrentMonth) ??
      calendarCells[0],
    [calendarCells, currentMonth, currentYear, selectedDate],
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(1);
  };

  const handleDateSelect = (cell: AvailabilityDateCell) => {
    if (cell.month !== currentMonth || cell.year !== currentYear) {
      setCurrentMonth(cell.month);
      setCurrentYear(cell.year);
    }
    setSelectedDate(cell.date);
  };

  return (
    <div className="flex h-full min-w-0 flex-col rounded-xl border bg-card @xl:w-102.5">
      <div className="flex flex-1 flex-col px-4 pt-4 pb-4 @sm:px-5 @sm:pt-5 @sm:pb-5">
        <div className="flex items-center gap-2 rounded-xl bg-muted/35 px-2 py-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="flex size-6 items-center justify-center rounded-md border border-border/80 bg-surface text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <span className="flex-1 text-center text-sm font-medium text-foreground/85">
            {MONTH_LABELS[currentMonth]} {currentYear}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="flex size-6 items-center justify-center rounded-md border border-border/80 bg-surface text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
        <div className="mx-auto flex min-h-0 w-full max-w-93 flex-1 flex-col pt-4">
          <div className="space-y-3">
            <div className="grid grid-cols-7 text-center text-[10px] font-medium tracking-[0.04em] text-muted-foreground">
              {WEEKDAY_LABELS.map((label) => (
                <span key={label} className="py-1">
                  {label}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2.5">
              {calendarCells.map((cell) => {
                const statusMeta = availabilityStatusMeta[cell.status];
                return (
                  <button
                    key={`${cell.year}-${cell.month}-${cell.date}`}
                    type="button"
                    onClick={() => handleDateSelect(cell)}
                    className={cn(
                      "relative flex aspect-square flex-col items-center justify-center gap-1 rounded-[10px] text-[11px] font-medium transition-colors",
                      !cell.isCurrentMonth &&
                        "border-0 bg-transparent text-muted-foreground/35",
                      cell.isCurrentMonth && availabilityDayCellBase,
                      cell.isSelected &&
                        "ring-2 ring-brand/45 ring-offset-1 ring-offset-surface",
                      cell.isToday &&
                        !cell.isSelected &&
                        "ring-1 ring-brand/35",
                    )}
                  >
                    <span className="leading-none tabular-nums">
                      {cell.date}
                    </span>
                    {cell.isCurrentMonth ? (
                      <span
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          statusMeta.dot,
                        )}
                        aria-hidden
                      />
                    ) : (
                      <span className="size-2 shrink-0" aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-6 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              {(["available", "partial", "full"] as AvailabilityStatus[]).map(
                (status) => (
                  <div key={status} className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "size-2.5 rounded-full",
                        availabilityStatusMeta[status].swatch,
                      )}
                    />
                    <span>{availabilityStatusMeta[status].label}</span>
                  </div>
                ),
              )}
            </div>
            <span className="ml-auto text-[11px] text-muted-foreground/75">
              {selectedCell.date} {MONTH_LABELS[selectedCell.month].slice(0, 3)}{" "}
              · {availabilityStatusMeta[selectedCell.status].summary}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AvailabilityCalendarPanel };