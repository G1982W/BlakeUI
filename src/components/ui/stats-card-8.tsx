"use client";

import * as React from "react";
import { Check, AlertTriangle, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Status = "healthy" | "warning" | "critical";

const statusConfig: Record<Status, { label: string; icon: React.ElementType; className: string }> = {
  healthy: { label: "Healthy", icon: Check, className: "bg-badge-positive/20 text-badge-positive-foreground" },
  warning: { label: "Warning", icon: AlertTriangle, className: "bg-badge-warning/20 text-badge-warning-foreground" },
  critical: { label: "Critical", icon: X, className: "bg-badge-negative/20 text-badge-negative-foreground" },
};

export function StatsCard8({ status = "healthy" }: { status?: Status }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <Card>
      <CardHeader className="pb-2">
        <p className="text-sm font-medium text-muted-foreground">Uptime</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-2xl font-bold">99.97%</p>
        <div className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium", config.className)}>
          <Icon className="size-3.5" />
          {config.label}
        </div>
      </CardContent>
    </Card>
  );
}
