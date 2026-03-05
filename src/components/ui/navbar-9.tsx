"use client";

import * as React from "react";
import { Menu, ChevronRight, Star } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Navbar9() {
  return (
    <nav className="sticky top-0 z-40 flex h-14 items-center border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4 px-4 md:px-6">
        <a href="#" className="flex shrink-0 items-center gap-2 text-lg font-semibold">
          Logo
        </a>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 p-4 w-[240px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#"
                        className="block select-none rounded-md p-2.5 text-sm leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        Overview
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#"
                        className="block select-none rounded-md p-2.5 text-sm leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        Changelog
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Blog
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-accent sm:inline-flex"
          >
            <Star className="size-3.5" />
            <span>12.5k</span>
          </a>
          <Button variant="secondary" size="sm">
            Get started
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
              <DrawerBody className="p-0">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="features" className="border-b">
                    <AccordionTrigger className="px-4 py-3">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 px-4 pb-3">
                        <a
                          href="#"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                        >
                          Overview
                          <ChevronRight className="size-4" />
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                        >
                          Changelog
                          <ChevronRight className="size-4" />
                        </a>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <a
                    href="#"
                    className="block border-b px-4 py-3 text-sm hover:bg-accent"
                  >
                    Docs
                  </a>
                  <a
                    href="#"
                    className="block border-b px-4 py-3 text-sm hover:bg-accent"
                  >
                    Blog
                  </a>
                </Accordion>
                <div className="flex items-center gap-1.5 border-t p-4">
                  <Star className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">12.5k stars</span>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
