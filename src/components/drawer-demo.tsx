"use client";

import * as React from "react";
// import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  ContextView,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  TopBar,
  TopBarLeft,
  TopBarRight,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreHorizontal, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTEXT_VIEW_VARIANTS = [
  { value: "full", label: "Full", description: "Link + buttons" },
  { value: "withActions", label: "With actions", description: "Buttons only" },
  { value: "withLink", label: "With link", description: "Link only" },
  { value: "minimal", label: "Minimal", description: "Title + description" },
] as const;

type ContextViewVariant = (typeof CONTEXT_VIEW_VARIANTS)[number]["value"];

const TOP_BAR_VARIANTS = [
  { value: "default", label: "Default", appName: "App Name" },
  { value: "pink", label: "Pink", appName: "SuperTodo" },
  { value: "darkBlue", label: "Dark blue", appName: "Ship.io" },
  { value: "yellow", label: "Yellow", appName: "SparkMetrics" },
  { value: "teal", label: "Teal", appName: "Beacon" },
  { value: "darkTeal", label: "Dark teal", appName: "HelpDesk" },
] as const;

type TopBarVariant = (typeof TOP_BAR_VARIANTS)[number]["value"];

function AppIcon({ variant }: { variant: TopBarVariant }) {
  const isLight =
    variant === "default" || variant === "yellow" || variant === "teal";
  return (
    <div
      className={cn(
        "flex size-8 items-center justify-center rounded-full border",
        isLight
          ? "border-border bg-muted/50"
          : "border-current border-opacity-40 bg-white/10",
      )}
    >
      <div
        className={cn(
          "size-2.5 rounded-full border",
          isLight
            ? "border-muted-foreground/40"
            : "border-current border-opacity-50",
        )}
      />
    </div>
  );
}

export function DrawerDemo() {
  const [topBarVariant, setTopBarVariant] =
    React.useState<TopBarVariant>("default");
  const [contextVariant, setContextVariant] =
    React.useState<ContextViewVariant>("full");
  const meta =
    TOP_BAR_VARIANTS.find((v) => v.value === topBarVariant) ??
    TOP_BAR_VARIANTS[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm">Top bar</span>
        <div className="flex flex-wrap gap-1">
          {TOP_BAR_VARIANTS.map((v) => (
            <button
              key={v.value}
              type="button"
              onClick={() => setTopBarVariant(v.value)}
              className={cn(
                "rounded-md border px-2 py-1 text-xs transition-colors",
                topBarVariant === v.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background hover:bg-accent",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm">Context view</span>
        <div className="flex flex-wrap gap-1">
          {CONTEXT_VIEW_VARIANTS.map((v) => (
            <button
              key={v.value}
              type="button"
              onClick={() => setContextVariant(v.value)}
              className={cn(
                "rounded-md border px-2 py-1 text-xs transition-colors",
                contextVariant === v.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background hover:bg-accent",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="secondary">Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent className="flex h-full max-h-dvh flex-col">
          <TopBar variant={topBarVariant}>
            <TopBarLeft>
              <AppIcon variant={topBarVariant} />
              <span className="truncate text-sm font-medium">
                {meta.appName}
              </span>
            </TopBarLeft>
            <TopBarRight>
              <Button size="sm" variant="primary" className="size-8">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">More options</span>
              </Button>
              <DrawerClose asChild>
                <Button size="sm" variant="primary" className="size-8">
                  <X className="size-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DrawerClose>
            </TopBarRight>
          </TopBar>
          <ContextView
            variant={contextVariant}
            title="Drawer title"
            description="Secondary information"
            link={
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Optional link
                <ExternalLink className="size-3.5 shrink-0" />
              </a>
            }
            primaryAction={
              <Button className="w-full gap-2">
                <Plus className="size-4" />
                Primary action
              </Button>
            }
            secondaryAction={
              <Button variant="secondary" className="w-full">
                Secondary action
              </Button>
            }
          />
          <DrawerBody>
            <p className="text-muted-foreground text-sm">
              Main content area. Add lists, forms, or any content here.
            </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
