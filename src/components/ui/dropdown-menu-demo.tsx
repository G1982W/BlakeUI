"use client";

import * as React from "react";
import {
  BellIcon,
  Building2Icon,
  CreditCardIcon,
  LogOutIcon,
  PencilIcon,
  SettingsIcon,
  ShareIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const contentMenu = "w-56 min-w-[14rem]";

/** Matches the canonical grouped usage pattern (hero + Usage section). */
export function DropdownMenuUsageDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuUsageDemo as { source?: string }).source = String.raw`<DropdownMenuGroup>
  <DropdownMenuLabel>My Account</DropdownMenuLabel>
  <DropdownMenuItem>Profile</DropdownMenuItem>
  ...
</DropdownMenuGroup>`;

export function DropdownMenuBasicDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Status</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuBasicDemo as { source?: string }).source = String.raw`<DropdownMenuLabel>...</DropdownMenuLabel>
<DropdownMenuSeparator />
<DropdownMenuItem>...</DropdownMenuItem>`;

export function DropdownMenuSubmenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuItem>New tab</DropdownMenuItem>
        <DropdownMenuItem>New window</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More tools</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={contentMenu}>
            <DropdownMenuItem>Save page as…</DropdownMenuItem>
            <DropdownMenuItem>Create shortcut…</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Developer tools</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Print…</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuSubmenuDemo as { source?: string }).source = String.raw`<DropdownMenuSub>
  <DropdownMenuSubTrigger>More tools</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>...</DropdownMenuSubContent>
</DropdownMenuSub>`;

export function DropdownMenuShortcutsDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuItem>
          Back <DropdownMenuShortcut>⌘[</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Forward <DropdownMenuShortcut>⌘]</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Reload <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Print… <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuShortcutsDemo as { source?: string }).source = String.raw`<DropdownMenuItem>
  Back <DropdownMenuShortcut>⌘[</DropdownMenuShortcut>
</DropdownMenuItem>`;

export function DropdownMenuIconsDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuIconsDemo as { source?: string }).source = String.raw`<DropdownMenuItem>
  <UserIcon />
  Profile
</DropdownMenuItem>`;

export function DropdownMenuCheckboxDemo() {
  const [showBar, setShowBar] = React.useState(true);
  const [showActivity, setShowActivity] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuLabel>View</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showBar}
          onCheckedChange={setShowBar}
        >
          Show Bookmarks Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivity}
          onCheckedChange={setShowActivity}
        >
          Show Full URLs
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuCheckboxDemo as { source?: string }).source = String.raw`<DropdownMenuCheckboxItem
  checked={showBar}
  onCheckedChange={setShowBar}
>
  Show Bookmarks Bar
</DropdownMenuCheckboxItem>`;

export function DropdownMenuCheckboxIconsDemo() {
  const [push, setPush] = React.useState(true);
  const [email, setEmail] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Notifications
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={push} onCheckedChange={setPush}>
          <BellIcon />
          Push notifications
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={email} onCheckedChange={setEmail}>
          <BellIcon />
          Email digest
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuCheckboxIconsDemo as { source?: string }).source = String.raw`<DropdownMenuCheckboxItem checked={push} onCheckedChange={setPush}>
  <BellIcon />
  Push notifications
</DropdownMenuCheckboxItem>`;

export function DropdownMenuRadioDemo() {
  const [view, setView] = React.useState("grid");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuLabel>View</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={view} onValueChange={setView}>
          <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuRadioDemo as { source?: string }).source = String.raw`<DropdownMenuRadioGroup value={view} onValueChange={setView}>
  <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`;

export function DropdownMenuRadioIconsDemo() {
  const [method, setMethod] = React.useState("card");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Payment method
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuLabel>Pay with</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={method} onValueChange={setMethod}>
          <DropdownMenuRadioItem value="card">
            <CreditCardIcon />
            Card
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="wallet">
            <WalletIcon />
            Wallet
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ach">
            <Building2Icon />
            Bank transfer
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuRadioIconsDemo as { source?: string }).source = String.raw`<DropdownMenuRadioItem value="card">
  <CreditCardIcon />
  Card
</DropdownMenuRadioItem>`;

export function DropdownMenuDestructiveDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuItem>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShareIcon />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <TrashIcon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuDestructiveDemo as { source?: string }).source = String.raw`<DropdownMenuItem variant="destructive">
  <TrashIcon />
  Delete
</DropdownMenuItem>`;

export function DropdownMenuAvatarDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="relative size-9 rounded-full p-0"
          aria-label="Account menu"
        >
          <Avatar className="size-9">
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={contentMenu}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-sm leading-none font-medium">Lena Reed</p>
            <p className="text-muted-foreground text-xs">lena@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuAvatarDemo as { source?: string }).source = String.raw`<DropdownMenuTrigger asChild>
  <Button variant="ghost" className="rounded-full p-0">
    <Avatar>...</Avatar>
  </Button>
</DropdownMenuTrigger>`;

export function DropdownMenuComplexDemo() {
  const [sync, setSync] = React.useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary">
          Complex menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={contentMenu}>
        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UsersIcon />
          Team
          <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SettingsIcon />
            Settings
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={contentMenu}>
            <DropdownMenuItem>General</DropdownMenuItem>
            <DropdownMenuItem>Members</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={sync} onCheckedChange={setSync}>
          Sync across devices
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <TrashIcon />
          Delete workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
(DropdownMenuComplexDemo as { source?: string }).source = String.raw`{/* Groups, icons, submenu, checkbox, destructive */}`;

export function DropdownMenuRtlDemo() {
  return (
    <div dir="rtl" className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="secondary">
            افتح القائمة
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          dir="rtl"
          align="start"
          className={contentMenu}
        >
          <DropdownMenuLabel>حسابي</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
          <DropdownMenuItem>الفوترة</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
(DropdownMenuRtlDemo as { source?: string }).source = String.raw`<div dir="rtl">
  <DropdownMenu>
    <DropdownMenuContent dir="rtl">{/* portaled: set dir here */}</DropdownMenuContent>
  </DropdownMenu>
</div>`;
