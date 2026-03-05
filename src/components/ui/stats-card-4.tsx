"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function StatsCard4({
  title = "Revenue",
  current = "$24,800",
  previous = "$22,100",
  currentLabel = "This month",
  previousLabel = "Last month",
}: {
  title?: string;
  current?: string;
  previous?: string;
  currentLabel?: string;
  previousLabel?: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 border-t border-border pt-3">
          <div>
            <p className="text-xl font-bold">{current}</p>
            <p className="text-xs text-muted-foreground">{currentLabel}</p>
          </div>
          <div className="border-l border-border pl-4">
            <p className="text-xl font-medium text-muted-foreground">{previous}</p>
            <p className="text-xs text-muted-foreground">{previousLabel}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
