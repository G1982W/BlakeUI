"use client";

import * as React from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

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

export interface DataDisplayRow {
  title: string;
  description: string;
  url: string;
}

const NEW_AND_UPDATED_CARDS: ComponentCardItem[] = [
  {
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    url: "/docs/avatar",
    preview: (
      <Avatar className="size-10">
        <AvatarImage src="" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    ),
  },
  {
    title: "Charts",
    description:
      "Beautiful data visualization components built on top of Recharts.",
    url: "/docs/chart",
    preview: chartPreview,
  },
  {
    title: "Dialog",
    description:
      "A window overlaid on either the primary window or another dialog window.",
    url: "/docs/dialog",
    preview: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary" size="sm">
            Open
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-sm">Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },
];

const CORE_COMPONENT_CARDS: ComponentCardItem[] = [
  {
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    url: "/docs/button",
    preview: <Button variant="primary">Button</Button>,
  },
  {
    title: "Input",
    description:
      "Displays a form input field or a component that looks like an input field.",
    url: "/docs/input",
    preview: (
      <Input type="text" placeholder="Placeholder" className="max-w-[180px]" />
    ),
  },
  {
    title: "Dialog",
    description:
      "A window overlaid on either the primary window or another dialog window.",
    url: "/docs/dialog",
    preview: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary" size="sm">
            Open
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-sm">Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    title: "Dropdown Menu",
    description:
      "Displays a menu to the user — such as a set of actions or functions.",
    url: "/docs/dropdown-menu",
    preview: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="primary" size="sm">
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    url: "/docs/avatar",
    preview: (
      <Avatar className="size-10">
        <AvatarImage src="" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    ),
  },
  {
    title: "Switch",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    url: "/docs/switch",
    preview: (
      <div className="flex items-center gap-2">
        <Switch defaultChecked />
        <span className="text-xs font-medium">Toggle</span>
      </div>
    ),
  },
];

const DATA_DISPLAY_ROWS: DataDisplayRow[] = [
  {
    title: "Table",
    description:
      "Semantic table built with Tailwind. Use with Data Table for sorting, filtering, and pagination.",
    url: "/docs/table",
  },
  {
    title: "Data Table",
    description:
      "Powerful table and datagrids with TanStack Table: sorting, filtering, pagination, row actions.",
    url: "/docs/premium-components/data-table",
  },
  {
    title: "List View",
    description:
      "List item component with multiple layout variants. Use for rows with icon, title, and value.",
    url: "/docs/list-view",
  },
  {
    title: "Skeleton",
    description: "Placeholder for loading content with a pulse animation.",
    url: "/docs/skeleton",
  },
  {
    title: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    url: "/docs/badge",
  },
];

const TRAFFIC_CHART_DATA = [
  { day: "Mon", visitors: 125 },
  { day: "Tue", visitors: 168 },
  { day: "Wed", visitors: 182 },
  { day: "Thu", visitors: 165 },
  { day: "Fri", visitors: 198 },
  { day: "Sat", visitors: 228 },
  { day: "Sun", visitors: 255 },
];

const trafficChartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig;

function TrafficOverviewChart() {
  return (
    <ChartContainer config={trafficChartConfig} className="h-[260px] w-full">
      <AreaChart
        data={TRAFFIC_CHART_DATA}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-visitors)"
              stopOpacity={0.3}
            />
            <stop
              offset="100%"
              stopColor="var(--color-visitors)"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          className="stroke-muted"
        />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          fontSize={12}
          className="text-muted-foreground"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          fontSize={12}
          domain={[50, 250]}
          ticks={[50, 100, 150, 200, 250]}
          className="text-muted-foreground"
        />
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="var(--color-visitors)"
          strokeWidth={2}
          fill="url(#trafficFill)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

function ComponentCard({
  title,
  description,
  url,
  preview,
  baseLabel,
}: ComponentCardItem) {
  return (
    <Link
      href={url}
      className="group rounded-2xl p-1 flex h-full flex-col border bg-card no-underline transition duration-200 hover:border-foreground/20 hover:shadow-lg"
    >
      <div className="flex rounded-xl bg-background h-36 w-full shrink-0 items-center justify-center border border-border p-6">
        {preview}
      </div>
      <div className="flex min-h-[140px] flex-1 flex-col space-y-2 p-4">
        {baseLabel ? (
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {baseLabel}
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{title}</h3>
          <span className="text-xs text-muted-foreground group-hover:text-foreground">
            Explore →
          </span>
        </div>
        <p className="text-sm text-muted-foreground my-0!">{description}</p>
      </div>
    </Link>
  );
}

export function ComponentsGrid() {
  return (
    <div className="space-y-12 py-6">
      {/* New and Updated */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          New and Updated
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NEW_AND_UPDATED_CARDS.map((card) => (
            <ComponentCard key={card.url} {...card} />
          ))}
        </div>
      </section>

      {/* Core Components */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Core Components
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_COMPONENT_CARDS.map((card) => (
            <ComponentCard key={card.url} {...card} />
          ))}
        </div>
      </section>

      {/* Data Display - detail table card (width of 3 cards) */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Data Display
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-1 lg:col-span-3">
            <div className="rounded-xl border border-border bg-background overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 font-semibold">Component</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="w-[100px] px-4 py-3 font-semibold text-right">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DATA_DISPLAY_ROWS.map((row) => (
                    <tr
                      key={row.url}
                      className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-medium">{row.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.description}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={row.url}
                          className="text-primary hover:underline font-medium"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Forms */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Interactive Forms
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column: Profile Settings card (spans 2 cols on lg) */}
          <Card className="lg:col-span-2 rounded-2xl border bg-card p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-base font-semibold">
                Profile Settings
              </CardTitle>
              <CardDescription className="text-sm">
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-0">
              <Input
                heading="Username"
                description="This is your public display name."
                defaultValue="@alexmorgan"
                className="w-full"
              />
              <Input
                heading="Email"
                type="email"
                defaultValue="alex@example.com"
                className="w-full"
              />
              <Textarea
                heading="Bio"
                defaultValue="Product Designer based in San Francisco. I love building clean user interfaces."
                rows={4}
                className="w-full resize-none"
              />
            </CardContent>
            <CardFooter className="flex gap-2 px-0 pb-0">
              <Button variant="primary">Save changes</Button>
              <Button variant="secondary">Cancel</Button>
            </CardFooter>
          </Card>

          {/* Right column: two stacked cards */}
          <div className="flex flex-col gap-6">
            {/* Heads up alert card */}
            <Card className="rounded-2xl border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Terminal className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm leading-none mb-1">
                    Heads up!
                  </p>
                  <p className="text-sm text-muted-foreground leading-snug">
                    You can add components to your app using the cli.
                  </p>
                </div>
              </div>
            </Card>

            {/* Tabs card */}
            <Card className="rounded-2xl border bg-card p-4">
              <Tabs defaultValue="account" className="w-full">
                <TabsList variant="default" className="w-full grid grid-cols-3">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="account"
                  className="mt-4 rounded-lg border border-border bg-muted/30 min-h-[120px] flex items-center justify-center text-sm text-muted-foreground"
                >
                  Tab Content Area
                </TabsContent>
                <TabsContent
                  value="password"
                  className="mt-4 rounded-lg border border-border bg-muted/30 min-h-[120px] flex items-center justify-center text-sm text-muted-foreground"
                >
                  Tab Content Area
                </TabsContent>
                <TabsContent
                  value="billing"
                  className="mt-4 rounded-lg border border-border bg-muted/30 min-h-[120px] flex items-center justify-center text-sm text-muted-foreground"
                >
                  Tab Content Area
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </section>

      {/* Analytics Integration */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Analytics Integration
        </h2>
        <Card className="rounded-2xl border bg-card overflow-hidden">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-2">
            <div>
              <CardTitle className="text-base font-semibold">
                Traffic Overview
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                Daily unique visitors over the last 30 days.
              </CardDescription>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="shrink-0 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 border-0 shadow-none font-normal"
            >
              Last 7 days
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <TrafficOverviewChart />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
