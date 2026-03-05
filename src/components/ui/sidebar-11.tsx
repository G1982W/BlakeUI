"use client";

import * as React from "react";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
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

const navGroups = [
  {
    label: "Main",
    defaultOpen: true,
    items: [
      { label: "Dashboard", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Team", href: "#" },
    ],
  },
];

export function Sidebar11() {
  const [mainOpen, setMainOpen] = React.useState(true);

  return (
    <div className="flex h-[480px] w-full overflow-hidden rounded-lg border border-border bg-background">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-muted/30">
        <div className="flex h-14 items-center border-b border-border px-4">
          <span className="text-sm font-semibold">App</span>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <Collapsible open={mainOpen} onOpenChange={setMainOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium hover:bg-accent"
              >
                <span>Navigation</span>
                {mainOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <nav className="flex flex-col gap-0.5 pb-2">
                {navGroups[0].items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
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
                <div className="flex flex-1 flex-col items-start text-left text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    john@example.com
                  </span>
                </div>
                <ChevronUp className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-56">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
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
          Main content. Sidebar with user dropdown and collapsible nav.
        </div>
      </main>
    </div>
  );
}
