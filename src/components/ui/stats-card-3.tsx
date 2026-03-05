"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function StatsCard3({
  title = "Revenue target",
  value = "$18,240",
  target = "$25,000",
  percent: percentProp,
}: {
  title?: string;
  value?: string;
  target?: string;
  percent?: number;
}) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 18240;
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ""), 10) || 25000;
  const percent = percentProp ?? Math.min(100, Math.round((numericValue / numericTarget) * 100));
  return (
    <Card>
      <CardHeader className="pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-2xl font-bold">{value}</p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{percent}% complete</span>
          <span>Target: {target}</span>
        </div>
      </CardContent>
    </Card>
  );
}
