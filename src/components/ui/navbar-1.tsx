"use client";

import * as React from "react";
import { Menu, ChevronRight } from "lucide-react";
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
import { cn } from "@/lib/utils";

export function Navbar1({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center border-b border-border bg-background/95 backdrop-blur",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4 px-4 md:px-6",
        )}
      >
        <a href="#" className="text-lg font-semibold">
          Brand
        </a>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid  gap-3 p-4 w-[280px] ">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#"
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="text-sm font-medium">Overview</div>
                        <p className="text-muted-foreground text-xs">
                          Product overview and features.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#"
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="text-sm font-medium">Pricing</div>
                        <p className="text-muted-foreground text-xs">
                          Plans and pricing.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[280px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#"
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        Getting started
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#"
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        API reference
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
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button variant="secondary" size="sm">
            Sign up
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
                  <AccordionItem value="products" className="border-b">
                    <AccordionTrigger className="px-4 py-3">
                      Products
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
                          Pricing
                          <ChevronRight className="size-4" />
                        </a>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="docs" className="border-b">
                    <AccordionTrigger className="px-4 py-3">
                      Docs
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 px-4 pb-3">
                        <a
                          href="#"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                        >
                          Getting started
                          <ChevronRight className="size-4" />
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                        >
                          API reference
                          <ChevronRight className="size-4" />
                        </a>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <a
                  href="#"
                  className="block border-t px-4 py-3 text-sm hover:bg-accent"
                >
                  About
                </a>
                <div className="mt-4 flex flex-col gap-2 border-t p-4">
                  <Button variant="primary" size="sm" className="w-full">
                    Log in
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full">
                    Sign up
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
