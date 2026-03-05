"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1 w-full",
        button_previous:
          "absolute -left-20 flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background opacity-100 hover:bg-accent hover:text-accent-foreground",
        button_next:
          "absolute -right-20 flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background opacity-100 hover:bg-accent hover:text-accent-foreground",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full",
        day: "relative p-0 text-center text-sm hover:bg-brand hover:text-[var(--brand-foreground)] focus-within:relative [&:has([aria-selected])]:bg-brand [&:has([aria-selected])]:text-[var(--brand-foreground)] [&:has([aria-selected].day-outside)]:bg-brand/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
        day_button:
          "h-9 w-9 p-0 font-normal cursor-pointer aria-selected:opacity-100 rounded-md",
        range_start: "day-range-start rounded-s-md",
        range_end: "day-range-end rounded-e-md",
        selected:
          "bg-brand text-[var(--brand-foreground)] hover:bg-brand hover:text-[var(--brand-foreground)] focus:bg-brand focus:text-[var(--brand-foreground)]",
        today: "bg-brand/20 text-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-brand/50 aria-selected:text-[var(--brand-foreground)]",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-brand/50 aria-selected:text-[var(--brand-foreground)]",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
