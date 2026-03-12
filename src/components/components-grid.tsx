import * as React from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

const chartPreview = (
  <div className="flex h-12 items-end gap-1.5">
    <div
      className="w-6 rounded-sm bg-muted-foreground/70"
      style={{ height: 24 }}
    />
    <div
      className="w-6 rounded-sm bg-muted-foreground/70"
      style={{ height: 36 }}
    />
    <div
      className="w-6 rounded-sm bg-muted-foreground/70"
      style={{ height: 18 }}
    />
  </div>
);

export interface ComponentCardItem {
  title: string;
  description: string;
  url: string;
  preview: React.ReactNode;
  baseLabel?: string;
}

const COMPONENT_CARDS: ComponentCardItem[] = [
  {
    title: "Switch",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    url: "/docs/components/switch",
    baseLabel: "Base Components",
    preview: (
      <div className="flex items-center gap-2">
        <Switch defaultChecked />
        <span className="text-xs font-medium">Toggle</span>
      </div>
    ),
  },
  {
    title: "Charts",
    description:
      "Beautiful data visualization components built on top of Recharts.",
    url: "/docs/components/chart",
    baseLabel: "Base Components",
    preview: chartPreview,
  },
];

export function ComponentsGrid() {
  return (
    <div className="mt-6 grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {COMPONENT_CARDS.map((card) => (
        <Link
          key={card.url}
          href={card.url}
          className="group rounded-2xl p-1 flex h-full flex-col  border bg-card no-underline transition duration-200 hover:border-foreground/20 hover:shadow-lg"
        >
          <div className="flex rounded-xl bg-background h-36 w-full shrink-0 items-center justify-center border border-border  p-6">
            {card.preview}
          </div>
          <div className="flex min-h-[140px] flex-1 flex-col space-y-2 p-4">
            {card.baseLabel ? (
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {card.baseLabel}
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold">{card.title}</h3>
              <span className="text-xs text-muted-foreground group-hover:text-foreground">
                Explore component →
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
