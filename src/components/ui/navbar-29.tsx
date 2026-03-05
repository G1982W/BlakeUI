"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerBody,
} from "@/components/ui/drawer";
export function Navbar29() {
  return (
    <nav className="sticky top-0 z-40 flex h-14 items-center border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4 px-4 md:px-6">
        <a href="#" className="text-lg font-semibold">
          Company
        </a>

        <div className="hidden md:flex md:items-center md:gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="primary"
                size="sm"
                className="gap-2 bg-transparent hover:bg-accent hover:text-accent-foreground"
              >
                Products
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={4}
              className="w-[560px] p-0"
            >
              <div className="grid grid-cols-3 gap-6 p-6">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Platform
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="block text-sm font-medium hover:text-brand"
                      >
                        Overview
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-sm font-medium hover:text-brand"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-sm font-medium hover:text-brand"
                      >
                        Pricing
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Resources
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="block text-sm font-medium hover:text-brand"
                      >
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-sm font-medium hover:text-brand"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-sm font-medium hover:text-brand"
                      >
                        Support
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Company
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="block text-sm font-medium hover:text-brand"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-sm font-medium hover:text-brand"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-sm font-medium hover:text-brand"
                      >
                        Careers
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-border bg-muted/30 px-6 py-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Need help? Contact us at{" "}
                  <a
                    href="mailto:support@example.com"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    support@example.com
                  </a>
                </p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Solutions
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>

          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="primary" size="sm" className="md:hidden">
                <Menu className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full max-h-none w-[85vw] max-w-sm border-r rounded-none data-[vaul-drawer-direction=left]:rounded-r-lg">
              <DrawerHeader className="flex flex-row items-center justify-between border-b">
                <DrawerTitle>Menu</DrawerTitle>
                <DrawerClose />
              </DrawerHeader>
              <DrawerBody className="flex flex-col gap-0 p-0">
                <div className="flex flex-col border-b">
                  <a
                    href="#"
                    className="px-4 py-3 text-sm font-medium hover:bg-accent"
                  >
                    Products
                  </a>
                  <a
                    href="#"
                    className="px-4 py-3 text-sm font-medium hover:bg-accent"
                  >
                    Solutions
                  </a>
                  <a
                    href="#"
                    className="px-4 py-3 text-sm font-medium hover:bg-accent"
                  >
                    Pricing
                  </a>
                </div>
                <div className="mt-auto border-t p-4">
                  <p className="text-xs text-muted-foreground">
                    Contact:{" "}
                    <a
                      href="mailto:support@example.com"
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      support@example.com
                    </a>
                  </p>
                </div>
                <div className="border-t p-4">
                  <Button variant="secondary" size="sm" className="w-full">
                    Sign in
                  </Button>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
