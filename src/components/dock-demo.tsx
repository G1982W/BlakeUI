"use client";

import * as React from "react";
import {
  HomeIcon,
  SearchIcon,
  MailIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Dock, DockItem } from "@/components/ui/dock";
import { cn } from "@/lib/utils";

type DockPosition = "top" | "bottom" | "left" | "right";

/**
 * Single dock demo with shared state: position (top/bottom/left/right) and
 * auto-hide (on/off). Used in the main Example and in all Examples sections
 * so the same dock is controlled by the same buttons and toggle.
 */
export function DockDemo() {
  const [position, setPosition] = React.useState<DockPosition>("bottom");
  const [autoHide, setAutoHide] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Position</span>
          <div className="flex flex-wrap gap-1">
            {(["top", "bottom", "left", "right"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPosition(p)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm capitalize transition-colors",
                  position === p
                    ? "bg-brand text-primary-foreground border-primary"
                    : "bg-background hover:bg-accent border-border",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={autoHide}
            onClick={() => setAutoHide((v) => !v)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
              autoHide ? "bg-primary" : "bg-input",
            )}
          >
            <span
              className={cn(
                "pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                autoHide ? "translate-x-5" : "translate-x-1",
              )}
            />
          </button>
          <span className="text-muted-foreground text-sm">
            Auto-hide {autoHide ? "on" : "off"}
            {autoHide && " — hover the edge to show the dock"}
          </span>
        </div>
      </div>
      <Dock
        position={position}
        autoHide={autoHide}
        className="pointer-events-auto"
      >
        <DockItem icon={<HomeIcon className="text-brand" />} label="Home" />
        <DockItem icon={<SearchIcon className="text-brand" />} label="Search" />
        <DockItem
          icon={<MailIcon className="text-brand" />}
          label="Mail"
          badge={3}
        />
        <DockItem
          icon={<SettingsIcon className="text-brand" />}
          label="Settings"
        />
        <DockItem icon={<UserIcon className="text-brand" />} label="Profile" />
      </Dock>
    </div>
  );
}
