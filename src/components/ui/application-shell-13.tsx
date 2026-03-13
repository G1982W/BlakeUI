"use client";

import * as React from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  LayoutDashboard,
  FolderKanban,
  Users,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerBody,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const mainNav = [
  {
    id: "overview",
    label: "Overview",
    items: ["Dashboard", "Analytics", "Reports"],
  },
  {
    id: "projects",
    label: "Projects",
    items: ["All projects", "Active", "Archived"],
  },
  { id: "team", label: "Team", items: ["Members", "Invitations", "Roles"] },
  {
    id: "workspace",
    label: "Workspace",
    items: ["Settings", "Billing", "Integrations"],
  },
];

const bottomNavItems = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: LayoutGrid },
];

export function ApplicationShell13() {
  const [activeBottom, setActiveBottom] = React.useState("home");

  return (
    <div className="flex h-[520px] w-full flex-col overflow-hidden rounded-lg border border-border bg-background">
      {/* Top header */}
      <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background px-4">
        <a href="#" className="text-lg font-semibold">
          Brand
        </a>

        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button variant="primary" size="sm" className="md:hidden">
              <Menu className="size-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-full max-h-none w-[85vw] max-w-sm border-r rounded-none data-[vaul-drawer-direction=left]:rounded-r-lg">
            <DrawerHeader className="flex flex-row items-center justify-between border-b">
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerClose />
            </DrawerHeader>
            <DrawerBody className="p-4">
              <nav className="flex flex-col gap-1">
                {mainNav.map((group) => (
                  <div key={group.id} className="py-2">
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                      {group.label}
                    </p>
                    {group.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                ))}
              </nav>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-md">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input type="search" placeholder="Search..." className="pl-9" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" className="relative size-8 p-0">
            <Bell className="size-4" />
            <span className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-white">
              2
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" size="sm" className="gap-2">
                <Avatar className="size-6">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm sm:inline">John</span>
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    john@example.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="primary"
                size="sm"
                className="hidden gap-1 sm:flex"
              >
                Acme Inc
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Acme Inc</DropdownMenuItem>
              <DropdownMenuItem>Other org</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Secondary nav (desktop) */}
      <div className="hidden border-b border-border bg-muted/30 md:block">
        <nav className="flex gap-1 px-4">
          {mainNav.map((group) => (
            <DropdownMenu key={group.id}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-transparent hover:bg-accent hover:text-accent-foreground"
                >
                  {group.label}
                  <ChevronDown className="ml-1 size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {group.items.map((item) => (
                  <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="min-h-0 flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl"></div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="flex shrink-0 justify-around border-t border-border bg-background px-2 py-2 md:hidden">
        {bottomNavItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveBottom(item.id)}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-md px-4 py-2 text-xs font-medium transition-colors",
              activeBottom === item.id
                ? "text-brand"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon className="size-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
