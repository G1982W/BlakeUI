"use client";

import * as React from "react";
import {
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navSections = [
  {
    label: "Overview",
    defaultOpen: true,
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "#" },
      { icon: FolderKanban, label: "Projects", href: "#" },
    ],
  },
  {
    label: "Team",
    defaultOpen: false,
    items: [{ icon: Users, label: "Members", href: "#" }],
  },
];

export function Sidebar10() {
  const [overviewOpen, setOverviewOpen] = React.useState(true);
  const [teamOpen, setTeamOpen] = React.useState(false);

  return (
    <div className="flex h-[480px] w-full overflow-hidden rounded-lg border border-border bg-background">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-muted/30">
        <div className="flex h-14 items-center border-b border-border px-4">
          <span className="text-sm font-semibold">App</span>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <Collapsible open={overviewOpen} onOpenChange={setOverviewOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {overviewOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
                Overview
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {navSections[0].items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 pl-8 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <item.icon className="size-4" />
                  {item.label}
                </a>
              ))}
            </CollapsibleContent>
          </Collapsible>
          <div className="my-2 border-t border-border" />
          <Collapsible open={teamOpen} onOpenChange={setTeamOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {teamOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
                Team
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {navSections[1].items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 pl-8 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <item.icon className="size-4" />
                  {item.label}
                </a>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="border-t border-border p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-start gap-3 rounded-md px-3 py-2"
              >
                <Avatar className="size-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-left text-sm">
                  <p className="truncate font-medium">John Doe</p>
                  <p className="truncate text-xs text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto p-4">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Home
          </a>
          <span>/</span>
          <span className="text-foreground">Dashboard</span>
        </div>
        <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
          Main content. Sidebar with collapsible sections, separators, and user menu.
        </div>
      </main>
    </div>
  );
}
