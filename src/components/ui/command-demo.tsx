"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function CommandBasicDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar />
                Calendar
              </CommandItem>
              <CommandItem>
                <Smile />
                Search Emoji
              </CommandItem>
              <CommandItem>
                <Calculator />
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
(CommandBasicDemo as { source?: string }).source = String.raw`const [open, setOpen] = React.useState(false);

return (
  <>
    <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
      Open Menu
    </Button>
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              Calendar
            </CommandItem>
            <CommandItem>
              <Smile />
              Search Emoji
            </CommandItem>
            <CommandItem>
              <Calculator />
              Calculator
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              Billing
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  </>
);`;

export function CommandShortcutsDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search commands…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick actions">
              <CommandItem>
                <User />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Calendar />
                Calendar
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
(CommandShortcutsDemo as { source?: string }).source = String.raw`<CommandDialog open={open} onOpenChange={setOpen}>
  <Command>
    <CommandInput placeholder="Search commands…" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Quick actions">
        <CommandItem>
          <User />
          Profile
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Calendar />
          Calendar
          <CommandShortcut>⌘K</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>`;

export function CommandGroupsDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar />
                Calendar
              </CommandItem>
              <CommandItem>
                <Smile />
                Search Emoji
              </CommandItem>
              <CommandItem>
                <Calculator />
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                Profile
              </CommandItem>
              <CommandItem>
                <CreditCard />
                Billing
              </CommandItem>
              <CommandItem>
                <Settings />
                Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
(CommandGroupsDemo as { source?: string }).source = String.raw`<CommandGroup heading="Suggestions">…</CommandGroup>
<CommandSeparator />
<CommandGroup heading="Settings">…</CommandGroup>`;

export function CommandScrollableDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandList className="max-h-[min(320px,50vh)]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Items">
              {Array.from({ length: 40 }, (_, i) => (
                <CommandItem key={i}>
                  <Calendar />
                  Item {i + 1}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
(CommandScrollableDemo as { source?: string }).source = String.raw`<CommandList className="max-h-[min(320px,50vh)]">
  <CommandGroup heading="Items">{/* many CommandItem */}</CommandGroup>
</CommandList>`;

export function CommandRtlDemo() {
  return (
    <div dir="rtl" className="max-w-md">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="ابحث عن أمر…" />
        <CommandList>
          <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
          <CommandGroup heading="اقتراحات">
            <CommandItem>
              <Calendar />
              التقويم
            </CommandItem>
            <CommandItem>
              <Smile />
              البحث عن الرموز التعبيرية
            </CommandItem>
            <CommandItem>
              <Calculator />
              الآلة الحاسبة
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="الإعدادات">
            <CommandItem>
              <User />
              الملف الشخصي
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              الفوترة
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              الإعدادات
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
(CommandRtlDemo as { source?: string }).source = String.raw`<div dir="rtl" className="max-w-md">
  <Command className="rounded-lg border shadow-md">
    ...
  </Command>
</div>`;
