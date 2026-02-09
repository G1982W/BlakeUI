"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, PlusCircleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface ChipMenuOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface ChipMenuProps {
  /** Currently selected value (must match an option's value). */
  value: string | null;
  /** Callback when selection changes. */
  onValueChange: (value: string) => void;
  /** Menu options. */
  options: ChipMenuOption[];
  /** Placeholder when no value is selected. */
  placeholder?: string;
  /** Badge variant. */
  variant?: React.ComponentProps<typeof Badge>["variant"];
  /** Optional class for the trigger badge. */
  className?: string;
  /** Optional class for the dropdown content. */
  contentClassName?: string;
  /** Whether the chip is disabled. */
  disabled?: boolean;
}

function ChipMenu({
  value,
  onValueChange,
  options,
  placeholder = "Select…",
  variant = "default",
  className,
  contentClassName,
  disabled = false,
}: ChipMenuProps) {
  const selected = options.find((o) => o.value === value);
  const label = selected ? selected.label : "";
  const [open, setOpen] = React.useState(false);

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onValueChange("");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {label ? (
        <Badge
          variant={variant}
          className={cn(
            "py-[4px] cursor-pointer gap-1 pr-1 transition-opacity hover:opacity-90 data-[state=open]:opacity-90",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <span
            className="px-[2px] text-chip-menu-placeholder"
            onClick={handleReset}
          >
            <PlusCircleIcon className={cn("size-3 opacity-70 transition-transform", label && "rotate-45")} />{" "}
          </span>
          {placeholder && (
            <span className="text-chip-menu-placeholder">{placeholder}</span>
          )}
          <span className="px-[6px] text-chip-menu-placeholder">|</span>
          <DropdownMenuTrigger
            disabled={disabled}
            className="inline-flex items-center gap-1 h-auto border-0 bg-transparent p-0 outline-none focus:ring-0 focus-visible:ring-0"
          >
            <span className="text-primary">{label}</span>
            <ChevronDownIcon className="size-3 opacity-70" />
          </DropdownMenuTrigger>
        </Badge>
      ) : (
        <DropdownMenuTrigger
          disabled={disabled}
          className="inline-flex h-auto border-0 bg-transparent p-0 outline-none focus:ring-0 focus-visible:ring-0"
        >
          <Badge
            variant={variant}
            className={cn(
              "py-[4px] cursor-pointer gap-1 pr-1 transition-opacity hover:opacity-90 data-[state=open]:opacity-90",
              !selected && "text-muted-foreground",
              className
            )}
          >
            <span className="px-[2px] text-chip-menu-placeholder">
              <PlusCircleIcon className="size-3 opacity-70" />{" "}
            </span>
            {placeholder && (
              <span className="text-chip-menu-placeholder">{placeholder}</span>
            )}
            <span className="text-primary">{label}</span>
            <ChevronDownIcon className="size-3 opacity-70" />
          </Badge>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent className={contentClassName} align="start">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            disabled={opt.disabled}
            onSelect={() => onValueChange(opt.value)}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ChipMenu };
