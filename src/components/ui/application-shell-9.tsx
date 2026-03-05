"use client";

import * as React from "react";
import {
  Search,
  FolderOpen,
  GitBranch,
  Settings,
  ChevronRight,
  ChevronDown,
  File,
  Plus,
  PanelRightClose,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export function ApplicationShell9() {
  const [explorerOpen, setExplorerOpen] = React.useState(true);
  const [srcOpen, setSrcOpen] = React.useState(true);
  const [publicOpen, setPublicOpen] = React.useState(false);
  const [panelOpen, setPanelOpen] = React.useState(false);

  return (
    <div className="flex h-[480px] w-full overflow-hidden rounded-lg border border-border bg-background">
      {/* Activity bar */}
      <div className="flex w-12 shrink-0 flex-col items-center border-r border-border bg-muted/50 py-2">
        <Button
          variant="primary"
          size="sm"
          className={cn(
            "mb-1 size-8 p-0",
            explorerOpen ? "bg-accent text-accent-foreground" : "bg-transparent",
          )}
          onClick={() => setExplorerOpen(!explorerOpen)}
          aria-label="Explorer"
        >
          <FolderOpen className="size-4" />
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="mb-1 size-8 bg-transparent p-0 hover:bg-accent hover:text-accent-foreground"
          aria-label="Search"
        >
          <Search className="size-4" />
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="mb-1 size-8 bg-transparent p-0 hover:bg-accent hover:text-accent-foreground"
          aria-label="Source control"
        >
          <GitBranch className="size-4" />
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="mt-auto size-8 bg-transparent p-0 hover:bg-accent hover:text-accent-foreground"
          aria-label="Settings"
        >
          <Settings className="size-4" />
        </Button>
      </div>

      {/* File explorer sidebar */}
      {explorerOpen && (
        <div className="flex w-56 shrink-0 flex-col border-r border-border bg-background">
          <div className="flex h-9 items-center justify-between border-b border-border px-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Explorer
            </span>
            <Button variant="primary" size="sm" className="size-6 p-0">
              <Plus className="size-3.5" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-1">
            <Collapsible open={srcOpen} onOpenChange={setSrcOpen}>
              <CollapsibleTrigger className="flex w-full items-center gap-1 px-2 py-1.5 text-left text-sm hover:bg-accent">
                {srcOpen ? (
                  <ChevronDown className="size-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="size-4 text-muted-foreground" />
                )}
                <FolderOpen className="size-4 text-muted-foreground" />
                <span>src</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-6 border-l border-border pl-2">
                  <a
                    href="#"
                    className="flex items-center gap-2 py-1 text-sm hover:bg-accent"
                  >
                    <File className="size-4 text-muted-foreground" />
                    index.tsx
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 py-1 text-sm hover:bg-accent"
                  >
                    <File className="size-4 text-muted-foreground" />
                    app.tsx
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 py-1 text-sm hover:bg-accent"
                  >
                    <File className="size-4 text-muted-foreground" />
                    layout.tsx
                  </a>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible open={publicOpen} onOpenChange={setPublicOpen}>
              <CollapsibleTrigger className="flex w-full items-center gap-1 px-2 py-1.5 text-left text-sm hover:bg-accent">
                {publicOpen ? (
                  <ChevronDown className="size-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="size-4 text-muted-foreground" />
                )}
                <FolderOpen className="size-4 text-muted-foreground" />
                <span>public</span>
                <span className="ml-auto rounded bg-muted px-1.5 text-xs">
                  2
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-6 border-l border-border pl-2">
                  <a
                    href="#"
                    className="flex items-center gap-2 py-1 text-sm hover:bg-accent"
                  >
                    <File className="size-4 text-muted-foreground" />
                    favicon.ico
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 py-1 text-sm hover:bg-accent"
                  >
                    <File className="size-4 text-muted-foreground" />
                    logo.svg
                  </a>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-9 items-center justify-between border-b border-border px-3">
          <span className="text-sm font-medium">Welcome</span>
          <Button
            variant="primary"
            size="sm"
            className={cn(
              "size-7 p-0",
              panelOpen && "bg-accent text-accent-foreground",
            )}
            onClick={() => setPanelOpen(!panelOpen)}
            aria-label="Toggle panel"
          >
            <PanelRightClose className="size-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="rounded-md border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Main content area. Replace with your editor or dashboard content.
          </div>
        </div>
        {panelOpen && (
          <div className="flex h-24 shrink-0 flex-col border-t border-border">
            <div className="flex h-7 items-center border-b border-border px-2 text-xs font-medium text-muted-foreground">
              Panel
            </div>
            <div className="flex-1 overflow-auto p-2 text-xs text-muted-foreground">
              Secondary panel for output, terminal, or tools.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
