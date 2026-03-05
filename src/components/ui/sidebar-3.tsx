"use client";

import * as React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Archive,
  Users,
  GitBranch,
  Puzzle,
  HelpCircle,
  Settings,
  PanelLeftClose,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "#" },
      { icon: CheckSquare, label: "Tasks", href: "#" },
    ],
  },
  {
    label: "Projects",
    items: [
      { icon: FolderKanban, label: "Active", href: "#" },
      { icon: Archive, label: "Archived", href: "#" },
    ],
  },
  {
    label: "Team",
    items: [
      { icon: Users, label: "Members", href: "#" },
      { icon: GitBranch, label: "Sprints", href: "#" },
    ],
  },
  {
    label: "Workspace",
    items: [{ icon: Puzzle, label: "Integrations", href: "#" }],
  },
];

export function Sidebar3() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex h-[480px] w-full overflow-hidden rounded-lg border border-border bg-background">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-muted/30">
        <div className="flex h-12 items-center justify-between border-b border-border px-4">
          <span className="text-sm font-semibold">App</span>
          <Button
            variant="primary"
            size="sm"
            className="md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-4">
          {groups.map((group) => (
            <div key={group.label} className="mb-6">
              <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <nav className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <item.icon className="size-4 shrink-0" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="border-t border-border px-4 py-3">
          <a
            href="#"
            className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="size-4" />
            Help
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Settings className="size-4" />
            Settings
          </a>
        </div>
      </aside>
      <main className="min-w-0 flex-1 flex-col overflow-auto">
        <div className="flex h-10 items-center gap-2 border-b border-border px-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Home
          </a>
          <span>/</span>
          <span className="text-foreground">Dashboard</span>
        </div>
        <div className="p-4">
          <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
            Main content. Multiple labeled nav groups with footer links.
          </div>
        </div>
      </main>
    </div>
  );
}
