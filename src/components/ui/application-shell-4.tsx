"use client";

import * as React from "react";
import { Menu, Search } from "lucide-react";
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

const navTabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
];

export function ApplicationShell4() {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <div className="flex h-[480px] w-full flex-col overflow-hidden rounded-lg border border-border bg-background">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background px-4">
        <a href="#" className="text-lg font-semibold">
          App
        </a>

        <nav className="hidden md:flex md:items-center md:gap-0.5">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                activeTab === tab.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden w-64 sm:block">
            <div className="relative">
              <Search className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8"
              />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" size="sm" className="rounded-full p-0">
                <Avatar className="size-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
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

          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="primary" size="sm" className="md:hidden">
                <Menu className="size-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full max-h-none w-[80vw] max-w-xs border-r rounded-none data-[vaul-drawer-direction=left]:rounded-r-lg">
              <DrawerHeader className="flex flex-row items-center justify-between border-b">
                <DrawerTitle>Menu</DrawerTitle>
                <DrawerClose />
              </DrawerHeader>
              <DrawerBody className="p-4">
                <nav className="flex flex-col gap-1">
                  {navTabs.map((tab) => (
                    <a
                      key={tab.id}
                      href="#"
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium",
                        activeTab === tab.id
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {tab.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-6 border-t pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">
                        john@example.com
                      </p>
                    </div>
                  </div>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="rounded-md border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          Dashboard content. Replace with your app content.
        </div>
      </main>
    </div>
  );
}
