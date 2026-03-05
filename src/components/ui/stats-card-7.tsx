"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export function StatsCard7({ value = "3.2 GB", percent = 72, label = "Storage used" }: { value?: string; percent?: number; label?: string }) {
  const data = [
    { name: "used", value: percent, fill: "var(--chart-1)" },
    { name: "free", value: 100 - percent, fill: "var(--muted)" },
  ];
  return (
    <Card>
      <CardHeader className="pb-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <ChartContainer config={{}} className="size-16 shrink-0">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={22}
              outerRadius={28}
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="min-w-0">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{percent}% of quota</p>
        </div>
      </CardContent>
    </Card>
  );
}
