"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  items: string[] | ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
  itemToStringValue?: (item: string | ComboboxOption) => string;
  children?: React.ReactNode;
}

function getOptionLabel(
  item: string | ComboboxOption,
  itemToStringValue?: (item: string | ComboboxOption) => string
): string {
  if (itemToStringValue) return itemToStringValue(item);
  return typeof item === "string" ? item : item.label;
}

function getOptionValue(item: string | ComboboxOption): string {
  return typeof item === "string" ? item : item.value;
}

export function Combobox({
  items,
  value: valueProp,
  onValueChange,
  placeholder = "Select...",
  emptyText = "No results found.",
  className,
  disabled,
  itemToStringValue,
  children,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");
  const value = valueProp ?? internalValue;
  const setValue = React.useCallback(
    (v: string) => {
      if (valueProp === undefined) setInternalValue(v);
      onValueChange?.(v);
    },
    [valueProp, onValueChange]
  );
  const [inputValue, setInputValue] = React.useState("");

  const filteredItems = React.useMemo(() => {
    if (!inputValue.trim()) return items;
    const lower = inputValue.toLowerCase();
    return items.filter((item) =>
      getOptionLabel(item, itemToStringValue).toLowerCase().includes(lower)
    );
  }, [items, inputValue, itemToStringValue]);

  const handleSelect = (item: string | ComboboxOption) => {
    const val = getOptionValue(item);
    const label = getOptionLabel(item, itemToStringValue);
    setValue(val);
    setInputValue(label);
    setOpen(false);
  };

  React.useEffect(() => {
    const selected = items.find(
      (item) => getOptionValue(item) === value
    );
    setInputValue(
      selected
        ? getOptionLabel(selected, itemToStringValue)
        : value
    );
  }, [value, items, itemToStringValue]);

  const trigger = children ?? (
    <Button
      variant="primary"
      role="combobox"
      aria-expanded={open}
      aria-disabled={disabled}
      disabled={disabled}
      className={cn("w-full justify-between font-normal", className)}
    >
      {inputValue || placeholder}
      <span className="ml-2 shrink-0 opacity-50">▼</span>
    </Button>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <div className="p-1 max-h-60 overflow-auto">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            filteredItems.map((item) => {
              const val = getOptionValue(item);
              const label = getOptionLabel(item, itemToStringValue);
              return (
                <button
                  key={val}
                  type="button"
                  role="option"
                  aria-selected={value === val}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-selected:bg-accent data-selected:text-accent-foreground",
                    value === val && "bg-accent"
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(item);
                  }}
                >
                  {label}
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export interface ComboboxInputProps {
  items: string[] | ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
  itemToStringValue?: (item: string | ComboboxOption) => string;
}

export function ComboboxInput({
  items,
  value = "",
  onValueChange,
  placeholder = "Search...",
  emptyText = "No results found.",
  className,
  disabled,
  itemToStringValue,
}: ComboboxInputProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const filteredItems = React.useMemo(() => {
    if (!inputValue.trim()) return items;
    const lower = inputValue.toLowerCase();
    return items.filter((item) =>
      getOptionLabel(item, itemToStringValue).toLowerCase().includes(lower)
    );
  }, [items, inputValue, itemToStringValue]);

  const handleSelect = (item: string | ComboboxOption) => {
    const val = getOptionValue(item);
    onValueChange?.(val);
    setInputValue("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setOpen(true)}
          disabled={disabled}
          className={cn("w-full", className)}
          role="combobox"
          aria-expanded={open}
        />
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <div className="p-1 max-h-60 overflow-auto">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            filteredItems.map((item) => {
              const val = getOptionValue(item);
              const label = getOptionLabel(item, itemToStringValue);
              return (
                <button
                  key={val}
                  type="button"
                  role="option"
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(item);
                  }}
                >
                  {label}
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
