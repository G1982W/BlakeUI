"use client";

import * as React from "react";

export function ChartCard26() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="mb-4 text-sm font-medium">Performance</p>
      <div className="relative h-16 w-full">
        <div className="absolute inset-0 flex items-center">
          <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
            <div className="flex h-full w-full gap-0">
              <div className="h-full flex-1 bg-destructive/30" style={{ minWidth: "33%" }} />
              <div className="h-full flex-1 bg-warning/30" style={{ minWidth: "34%" }} />
              <div className="h-full flex-1 bg-positive/30" style={{ minWidth: "33%" }} />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center px-2">
          <div
            className="h-4 rounded-md bg-foreground"
            style={{ width: "72%" }}
          />
          <div
            className="absolute left-[80%] top-1/2 h-0 w-0 -translate-y-1/2 border-8 border-b-brand border-l-transparent border-r-transparent border-t-transparent"
            aria-hidden
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span>Actual: 72</span>
        <span>Target: 80</span>
        <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-sm bg-destructive/50" /> Poor</span>
        <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-sm bg-warning/50" /> OK</span>
        <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-sm bg-positive/50" /> Good</span>
      </div>
    </div>
  );
}
