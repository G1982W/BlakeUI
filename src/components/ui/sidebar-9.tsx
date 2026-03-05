"use client";

import * as React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: FolderKanban, label: "Projects", href: "#" },
  { icon: Users, label: "Team", href: "#" },
];

export function Sidebar9() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex h-[480px] w-full overflow-hidden rounded-lg border border-border bg-background">
      <aside
        className={cn(
          "flex shrink-0 flex-col border-r border-border bg-muted/30 transition-[width]",
          collapsed ? "w-14" : "w-56",
        )}
      >
        <div className="flex h-12 items-center justify-between border-b border-border px-3">
          {!collapsed && <span className="text-sm font-semibold">App</span>}
          <Button
            variant="primary"
            size="sm"
            className="size-7 p-0"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={cn("size-4 transition-transform", collapsed && "rotate-180")}
            />
          </Button>
        </div>
        <nav className="flex-1 overflow-auto py-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
        <div className="border-t border-border p-2">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="size-4 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </a>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto p-4">
        <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
          Main content. Sidebar can collapse to icons only.
        </div>
      </main>
    </div>
  );
}
