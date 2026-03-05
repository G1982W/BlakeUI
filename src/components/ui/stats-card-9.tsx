"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function StatsCard9() {
  const [view, setView] = React.useState<"mrr" | "arr">("mrr");
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">Recurring revenue</p>
        <Tabs value={view} onValueChange={(v) => setView(v as "mrr" | "arr")} className="w-auto">
          <TabsList className="h-7 gap-0 p-0.5 text-xs">
            <TabsTrigger value="mrr" className="px-2 py-1 text-xs">MRR</TabsTrigger>
            <TabsTrigger value="arr" className="px-2 py-1 text-xs">ARR</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {view === "mrr" ? "$12,400" : "$148,800"}
        </p>
        <p className="text-xs text-muted-foreground">
          {view === "mrr" ? "Monthly recurring revenue" : "Annual recurring revenue"}
        </p>
      </CardContent>
    </Card>
  );
}
