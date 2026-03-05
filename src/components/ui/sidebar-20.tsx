"use client";

import * as React from "react";
import {
  ChevronRight,
  ChevronDown,
  FolderOpen,
  File,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export function Sidebar20() {
  const [dashboardOpen, setDashboardOpen] = React.useState(true);
  const [docsOpen, setDocsOpen] = React.useState(false);

  return (
    <div className="flex h-[480px] w-full overflow-hidden rounded-lg border border-border bg-background">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-muted/30">
        <div className="flex h-12 items-center border-b border-border px-4">
          <span className="text-sm font-semibold">Project</span>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <Collapsible open={dashboardOpen} onOpenChange={setDashboardOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium hover:bg-accent"
              >
                {dashboardOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
                <LayoutDashboard className="size-4" />
                Dashboard
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <a
                href="#"
                className="ml-6 flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                Overview
              </a>
              <a
                href="#"
                className="ml-6 flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                Analytics
              </a>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible open={docsOpen} onOpenChange={setDocsOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium hover:bg-accent"
              >
                {docsOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
                <FolderOpen className="size-4" />
                Docs
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <a
                href="#"
                className="ml-6 flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <File className="size-3.5" />
                Getting started
              </a>
              <a
                href="#"
                className="ml-6 flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <File className="size-3.5" />
                API
              </a>
            </CollapsibleContent>
          </Collapsible>
          <div className="my-2 border-t border-border" />
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
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
          <a href="#" className="hover:text-foreground">
            Dashboard
          </a>
          <span>/</span>
          <span className="text-foreground">Overview</span>
        </div>
        <div className="p-4">
          <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
            Main content. Collapsible sidebar sections with breadcrumb.
          </div>
        </div>
      </main>
    </div>
  );
}
