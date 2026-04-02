"use client";

import * as React from "react";
import {
  ClipboardPasteIcon,
  CopyIcon,
  PencilIcon,
  ScissorsIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const triggerClassName =
  "flex h-[150px] w-[300px] max-w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground";

export function ContextMenuBasicDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerClassName}>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
(ContextMenuBasicDemo as { source?: string }).source = String.raw`<ContextMenu>
  <ContextMenuTrigger className="...">Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

export function ContextMenuSubmenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerClassName}>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save Page As…</ContextMenuItem>
            <ContextMenuItem>Create Shortcut…</ContextMenuItem>
            <ContextMenuItem>Name Window…</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Print…</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
(ContextMenuSubmenuDemo as { source?: string }).source = String.raw`<ContextMenuSub>
  <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Save Page As…</ContextMenuItem>
    ...
  </ContextMenuSubContent>
</ContextMenuSub>`;

export function ContextMenuShortcutsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerClassName}>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Save Page As… <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Print… <ContextMenuShortcut>⌘P</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
(ContextMenuShortcutsDemo as { source?: string }).source = String.raw`<ContextMenuItem>
  Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
</ContextMenuItem>`;

export function ContextMenuGroupsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerClassName}>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>Subscription</ContextMenuItem>
          <ContextMenuItem>Settings</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
(ContextMenuGroupsDemo as { source?: string }).source = String.raw`<ContextMenuGroup>
  <ContextMenuItem>Profile</ContextMenuItem>
  ...
</ContextMenuGroup>
<ContextMenuSeparator />
<ContextMenuGroup>...</ContextMenuGroup>`;

export function ContextMenuIconsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerClassName}>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <CopyIcon />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>
          <ScissorsIcon />
          Cut
        </ContextMenuItem>
        <ContextMenuItem>
          <ClipboardPasteIcon />
          Paste
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
(ContextMenuIconsDemo as { source?: string }).source = String.raw`<ContextMenuItem>
  <CopyIcon />
  Copy
</ContextMenuItem>`;

export function ContextMenuCheckboxDemo() {
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [showFullUrls, setShowFullUrls] = React.useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerClassName}>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          Show Bookmarks Bar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showFullUrls}
          onCheckedChange={setShowFullUrls}
        >
          Show Full URLs
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
(ContextMenuCheckboxDemo as { source?: string }).source = String.raw`const [showBookmarks, setShowBookmarks] = React.useState(true);

<ContextMenuCheckboxItem
  checked={showBookmarks}
  onCheckedChange={setShowBookmarks}
>
  Show Bookmarks Bar
</ContextMenuCheckboxItem>`;

export function ContextMenuRadioDemo() {
  const [view, setView] = React.useState("grid");

  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerClassName}>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>View Mode</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={view} onValueChange={setView}>
          <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
(ContextMenuRadioDemo as { source?: string }).source = String.raw`const [view, setView] = React.useState("grid");

<ContextMenuRadioGroup value={view} onValueChange={setView}>
  <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
  <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
</ContextMenuRadioGroup>`;

export function ContextMenuDestructiveDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerClassName}>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <PencilIcon />
          Edit
        </ContextMenuItem>
        <ContextMenuItem>
          <ShareIcon />
          Share
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
(ContextMenuDestructiveDemo as { source?: string }).source = String.raw`<ContextMenuItem variant="destructive">
  <TrashIcon />
  Delete
</ContextMenuItem>`;

export function ContextMenuRtlDemo() {
  return (
    <div dir="rtl" className="flex justify-center">
      <ContextMenu>
        <ContextMenuTrigger className={triggerClassName}>
          انقر بزر الماوس الأيمن هنا
        </ContextMenuTrigger>
        <ContextMenuContent dir="rtl">
          <ContextMenuItem>الملف الشخصي</ContextMenuItem>
          <ContextMenuItem>الفوترة</ContextMenuItem>
          <ContextMenuItem>الفريق</ContextMenuItem>
          <ContextMenuItem>الاشتراك</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
(ContextMenuRtlDemo as { source?: string }).source = String.raw`<div dir="rtl">
  <ContextMenu>
    <ContextMenuContent dir="rtl">{/* portaled */}</ContextMenuContent>
  </ContextMenu>
</div>`;
