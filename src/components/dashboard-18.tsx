"use client";

import {
  ArrowUpRight,
  BedDouble,
  Bell,
  CalendarRange,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ClipboardList,
  CreditCard,
  DoorOpen,
  Globe,
  KeyRound,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  UtensilsCrossed,
  Wallet,
  Wrench,
} from "lucide-react";
import * as React from "react";
import {
  Bar,
  BarChart,
  Customized,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type NavItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  isActive?: boolean;
  children?: NavItem[];
};

type NavGroup = {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
};

type UserData = {
  name: string;
  email: string;
  avatar: string;
};

type SidebarData = {
  logo: {
    src: string;
    alt: string;
    title: string;
    description: string;
  };
  navGroups: NavGroup[];
  footerGroup: NavGroup;
  user?: UserData;
};

type HotelAction = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type Guest = {
  name: string;
  avatar?: string;
  initials: string;
};

type Booking = {
  id: string;
  guestName: string;
  roomNumber: string;
  roomType: string;
  time: string;
  guests: Guest[];
  guestCount: number;
  source: "Direct" | "Booking.com" | "Expedia" | "Walk-in";
  status: string;
  statusColor: string;
  nights: number;
  specialRequests?: string;
};

type AvailabilityStatus = "available" | "partial" | "full";

type AvailabilityDateCell = {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  status: AvailabilityStatus;
};

const numberFormatter = new Intl.NumberFormat("en-US");

const mixBase = "var(--background)";

const palette = {
  primary: "var(--primary)",
  secondary: {
    light: `color-mix(in oklch, var(--primary) 75%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--primary) 85%, ${mixBase})`,
  },
  tertiary: {
    light: `color-mix(in oklch, var(--primary) 55%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--primary) 65%, ${mixBase})`,
  },
  quaternary: {
    light: `color-mix(in oklch, var(--primary) 40%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--primary) 45%, ${mixBase})`,
  },
};

const sidebarData: SidebarData = {
  logo: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo.svg",
    alt: "Grandview",
    title: "Grandview",
    description: "Hospitality Suite",
  },
  navGroups: [
    {
      title: "Front Office",
      defaultOpen: true,
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "#",
          isActive: true,
        },
        { label: "Reservations", icon: CalendarRange, href: "#" },
        { label: "Check-in / Check-out", icon: DoorOpen, href: "#" },
        {
          label: "Guest Profiles",
          icon: Users,
          href: "#",
          children: [
            { label: "All Guests", icon: Users, href: "#" },
            { label: "Loyalty Members", icon: Users, href: "#" },
            { label: "Corporate Accounts", icon: Users, href: "#" },
          ],
        },
      ],
    },
    {
      title: "Property",
      defaultOpen: true,
      items: [
        {
          label: "Rooms & Suites",
          icon: BedDouble,
          href: "#",
          children: [
            { label: "Floor Plan", icon: BedDouble, href: "#" },
            { label: "Room Types", icon: BedDouble, href: "#" },
            { label: "Availability", icon: BedDouble, href: "#" },
          ],
        },
        { label: "Housekeeping", icon: Sparkles, href: "#" },
        { label: "Dining & Events", icon: UtensilsCrossed, href: "#" },
      ],
    },
    {
      title: "Revenue",
      defaultOpen: false,
      items: [
        { label: "Rate Manager", icon: CreditCard, href: "#" },
        { label: "Billing & Invoices", icon: Wallet, href: "#" },
        { label: "Channel Distribution", icon: Globe, href: "#" },
      ],
    },
    {
      title: "Administration",
      defaultOpen: false,
      items: [
        { label: "Staff & Roles", icon: ShieldCheck, href: "#" },
        { label: "Maintenance Logs", icon: Wrench, href: "#" },
        { label: "Security & Access", icon: KeyRound, href: "#" },
      ],
    },
  ],
  footerGroup: {
    title: "Settings",
    items: [{ label: "Settings", icon: Settings, href: "#" }],
  },
  user: {
    name: "Robert Austin",
    email: "robert@grandview.hotel",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar22.jpg",
  },
};

const hotelActions: HotelAction[] = [
  { title: "Assign Rooms", icon: DoorOpen },
  { title: "Check In Guests", icon: BedDouble },
  { title: "Housekeeping Queue", icon: ClipboardList },
  { title: "Review VIP Arrivals", icon: Users },
];

const operationsMeta = [
  { label: "Date", value: "Tue, Jun 18" },
  { label: "Arrivals", value: "18 check-ins" },
  { label: "Ready rooms", value: "12 cleared" },
  { label: "VIP guests", value: "3 flagged" },
];

const RECENT_ARRIVALS_TABLE: Booking[] = [
  {
    id: "arr-1",
    guestName: "James Brown",
    roomNumber: "412",
    roomType: "Suite",
    time: "2:00 PM Check-in",
    guests: [
      {
        name: "James Brown",
        avatar: "https://i.pravatar.cc/32?img=12",
        initials: "JB",
      },
      {
        name: "Maria Brown",
        avatar: "https://i.pravatar.cc/32?img=25",
        initials: "MB",
      },
    ],
    guestCount: 4,
    source: "Direct",
    status: "VIP",
    statusColor: "violet",
    nights: 3,
    specialRequests: "Late check-out, extra pillows",
  },
  {
    id: "arr-2",
    guestName: "Sarah & Tom Lee",
    roomNumber: "215",
    roomType: "Deluxe",
    time: "3:00 PM Check-in",
    guests: [
      {
        name: "Sarah Lee",
        avatar: "https://i.pravatar.cc/32?img=32",
        initials: "SL",
      },
      {
        name: "Tom Lee",
        avatar: "https://i.pravatar.cc/32?img=15",
        initials: "TL",
      },
    ],
    guestCount: 2,
    source: "Booking.com",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 5,
  },
  {
    id: "arr-3",
    guestName: "Michael Chen",
    roomNumber: "108",
    roomType: "Standard",
    time: "4:00 PM Check-in",
    guests: [
      {
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/32?img=53",
        initials: "MC",
      },
    ],
    guestCount: 1,
    source: "Expedia",
    status: "Pending",
    statusColor: "amber",
    nights: 2,
    specialRequests: "Ground floor preferred",
  },
  {
    id: "arr-4",
    guestName: "Emily Davis",
    roomNumber: "501",
    roomType: "Penthouse",
    time: "5:30 PM Check-in",
    guests: [
      {
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/32?img=44",
        initials: "ED",
      },
      {
        name: "Ryan Davis",
        avatar: "https://i.pravatar.cc/32?img=18",
        initials: "RD",
      },
      { name: "Sophie Davis", initials: "SD" },
    ],
    guestCount: 5,
    source: "Direct",
    status: "VIP",
    statusColor: "violet",
    nights: 7,
    specialRequests: "Airport transfer, champagne on arrival",
  },
  {
    id: "arr-5",
    guestName: "Noah Wilson",
    roomNumber: "306",
    roomType: "Deluxe",
    time: "6:00 PM Check-in",
    guests: [
      {
        name: "Noah Wilson",
        avatar: "https://i.pravatar.cc/32?img=61",
        initials: "NW",
      },
    ],
    guestCount: 2,
    source: "Booking.com",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 4,
    specialRequests: "High floor",
  },
  {
    id: "arr-6",
    guestName: "Olivia Martin",
    roomNumber: "119",
    roomType: "Standard",
    time: "6:30 PM Check-in",
    guests: [
      {
        name: "Olivia Martin",
        avatar: "https://i.pravatar.cc/32?img=47",
        initials: "OM",
      },
    ],
    guestCount: 1,
    source: "Direct",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 2,
    specialRequests: "Near elevator",
  },
  {
    id: "arr-7",
    guestName: "Liam Thompson",
    roomNumber: "522",
    roomType: "Suite",
    time: "7:00 PM Check-in",
    guests: [
      {
        name: "Liam Thompson",
        avatar: "https://i.pravatar.cc/32?img=68",
        initials: "LT",
      },
    ],
    guestCount: 3,
    source: "Expedia",
    status: "Pending",
    statusColor: "amber",
    nights: 5,
    specialRequests: "Baby crib",
  },
  {
    id: "arr-8",
    guestName: "Ava Rodriguez",
    roomNumber: "227",
    roomType: "Deluxe",
    time: "7:20 PM Check-in",
    guests: [
      {
        name: "Ava Rodriguez",
        avatar: "https://i.pravatar.cc/32?img=36",
        initials: "AR",
      },
    ],
    guestCount: 2,
    source: "Walk-in",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 1,
    specialRequests: "Late dinner reservation",
  },
  {
    id: "arr-9",
    guestName: "Ethan Brooks",
    roomNumber: "402",
    roomType: "Suite",
    time: "8:00 PM Check-in",
    guests: [
      {
        name: "Ethan Brooks",
        avatar: "https://i.pravatar.cc/32?img=34",
        initials: "EB",
      },
      {
        name: "Lara Brooks",
        avatar: "https://i.pravatar.cc/32?img=66",
        initials: "LB",
      },
    ],
    guestCount: 4,
    source: "Direct",
    status: "VIP",
    statusColor: "violet",
    nights: 3,
    specialRequests: "Fruit basket",
  },
  {
    id: "arr-10",
    guestName: "Mia Sanchez",
    roomNumber: "143",
    roomType: "Standard",
    time: "8:20 PM Check-in",
    guests: [
      {
        name: "Mia Sanchez",
        avatar: "https://i.pravatar.cc/32?img=57",
        initials: "MS",
      },
    ],
    guestCount: 1,
    source: "Booking.com",
    status: "Confirmed",
    statusColor: "emerald",
    nights: 2,
    specialRequests: "Quiet room",
  },
];

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type SalesTrendPoint = {
  key: string;
  month: string;
  monthLabel: string;
  xLabel: string;
  segment: number;
  directBookings: number;
  otaBookings: number;
  total: number;
};

type ChartOffset = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type SalesTrendBarShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: SalesTrendPoint;
};

const SALES_TREND_MAX = 200;
const SALES_TREND_CELL_STEP = 12;
const SALES_TREND_CELL_SIZE = 8;
const SALES_TREND_CELL_INSET = 2;

const salesTrendColors = {
  series: {
    directBookings: palette.primary,
    otaBookings: {
      light: `color-mix(in oklch, var(--primary) 30%, ${mixBase})`,
      dark: `color-mix(in oklch, var(--primary) 40%, ${mixBase})`,
    },
  },
  gridCell: "color-mix(in oklch, var(--foreground) 7%, var(--background))",
  gridBase: "transparent",
  cursor: "color-mix(in oklch, var(--foreground) 60%, transparent)",
  panelBorder: "border-border/60",
  panelTextMuted: "text-muted-foreground",
} as const;

const salesTrendMonths = [
  { key: "jan", label: "JAN" },
  { key: "feb", label: "FEB" },
  { key: "mar", label: "MAR" },
  { key: "apr", label: "APR" },
  { key: "may", label: "MAY" },
  { key: "jun", label: "JUN" },
  { key: "jul", label: "JUL" },
  { key: "aug", label: "AUG" },
  { key: "sep", label: "SEP" },
  { key: "oct", label: "OCT" },
  { key: "nov", label: "NOV" },
  { key: "dec", label: "DEC" },
];

const directBookingPeaks = [58, 54, 60, 72, 78, 92, 110, 102, 84, 88, 70, 76];
const otaBookingPeaks = [34, 32, 38, 44, 52, 58, 68, 64, 50, 54, 42, 46];
const intraMonthPattern = [0.14, 0.31, 0.52, 0.76, 1, 0.61];

function createSalesTrendData() {
  return salesTrendMonths.flatMap((month, monthIndex) =>
    intraMonthPattern.map((patternFactor, segmentIndex) => {
      const wave = Math.sin((monthIndex * 6 + segmentIndex) / 4.2) * 2.8;
      const pulse = segmentIndex === 4 ? 6 : 0;
      const directBookings = Math.max(
        6,
        Math.round(
          directBookingPeaks[monthIndex] * patternFactor + wave + pulse,
        ),
      );
      const otaBookings = Math.max(
        4,
        Math.round(otaBookingPeaks[monthIndex] * patternFactor + wave * 0.45),
      );
      return {
        key: `${month.key}-${segmentIndex}`,
        month: month.key,
        monthLabel: month.label,
        xLabel: segmentIndex === 0 && monthIndex % 2 === 0 ? month.label : "",
        segment: segmentIndex,
        directBookings,
        otaBookings,
        total: directBookings + otaBookings,
      };
    }),
  );
}

const revenueChartConfig = {
  directBookings: {
    label: "Direct",
    color: salesTrendColors.series.directBookings,
  },
  otaBookings: {
    label: "OTA",
    theme: salesTrendColors.series.otaBookings,
  },
} satisfies ChartConfig;

const SidebarLogo = ({ logo }: { logo: SidebarData["logo"] }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" tooltip={logo.title}>
          <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary">
            <img
              src={logo.src}
              alt={logo.alt}
              width={24}
              height={24}
              className="size-6 text-primary-foreground invert dark:invert-0"
            />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">{logo.title}</span>
            <span className="text-xs text-muted-foreground">
              {logo.description}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const NavMenuItem = ({ item }: { item: NavItem }) => {
  const Icon = item.icon;
  const hasChildren = (item.children?.length ?? 0) > 0;

  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={item.isActive}
          tooltip={item.label}
        >
          <a href={item.href}>
            <Icon className="size-4" aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible asChild defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={item.isActive} tooltip={item.label}>
            <Icon className="size-4" aria-hidden="true" />
            <span>{item.label}</span>
            <ChevronRight
              className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              aria-hidden="true"
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children!.map((child) => (
              <SidebarMenuSubItem key={child.label}>
                <SidebarMenuSubButton asChild isActive={child.isActive}>
                  <a href={child.href}>{child.label}</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const NavUser = ({ user }: { user: UserData }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" aria-hidden="true" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 size-4" aria-hidden="true" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 size-4" aria-hidden="true" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:flex-col">
          <SidebarLogo logo={sidebarData.logo} />
          <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:ml-0" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          {sidebarData.navGroups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <NavMenuItem key={item.label} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        {sidebarData.user && <NavUser user={sidebarData.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

const DashboardHeader = () => {
  const user = sidebarData.user;
  const userInitials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "RA";
  const userFirstName = user?.name.split(" ")[0] ?? "Robert";

  return (
    <header className="sticky top-0 z-40 flex w-full shrink-0 items-center gap-3 border-b bg-background px-4 py-4 @sm:px-6 @lg:rounded-t-xl">
      <Avatar className="size-10 rounded-lg">
        {user?.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
        <AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{`Hello ${userFirstName}`}</span>
        <span className="text-xs text-muted-foreground">
          Welcome back to Grandview 👋
        </span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          className="size-8 p-0"
          aria-label="Search"
        >
          <Search className="size-4" aria-hidden="true" />
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="size-8 p-0"
          aria-label="Notifications"
        >
          <Bell className="size-4" aria-hidden="true" />
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="h-8 gap-1.5 text-xs"
          aria-label="Last 7 days"
        >
          Last 7 days
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="h-8 gap-1.5 text-xs"
          aria-label="Date range"
        >
          <CalendarRange className="size-3.5" aria-hidden="true" />
          Feb 04 - Feb 11, 2024
        </Button>
      </div>
    </header>
  );
};

const OperationsStrip = () => {
  return (
    <section className="rounded-xl border bg-card px-5 py-5 @sm:px-6">
      <div className="flex flex-col gap-5 @xl:flex-row @xl:items-start @xl:justify-between @xl:gap-8">
        <div className="min-w-0 @xl:w-[290px] @xl:shrink-0">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Front Office / Morning Shift
          </p>
          <h2 className="pt-2 text-[26px] leading-none font-medium tracking-tight text-foreground">
            Shift Board
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4">
            {operationsMeta.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-[11px] text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid flex-1 gap-3 @sm:grid-cols-2 @lg:grid-cols-4 @xl:self-end">
          {hotelActions.map((action) => (
            <button
              key={action.title}
              type="button"
              className="group flex h-[92px] flex-col justify-between rounded-lg border bg-background px-4 py-3 text-left transition-colors hover:bg-accent/10"
            >
              <div className="flex items-start justify-between gap-3">
                <action.icon
                  className="size-[24px] shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-foreground uppercase">
                {action.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

function getAvailabilityStatus(
  year: number,
  month: number,
  day: number,
): AvailabilityStatus {
  const seasonalWeight = [0, 0, 1, 1, 2, 3, 3, 2, 2, 1, 0, 1][month];
  const weekendWeight = new Date(year, month, day).getDay();
  const score =
    ((day * 11 + month * 7 + (year % 100)) % 8) +
    seasonalWeight +
    (weekendWeight === 5 || weekendWeight === 6 ? 2 : 0);
  if (score >= 9) return "full";
  if (score >= 5) return "partial";
  return "available";
}

function generateAvailabilityMonthGrid(
  year: number,
  month: number,
  selectedDate: number,
): AvailabilityDateCell[] {
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = firstDayOfMonth + daysInMonth <= 35 ? 35 : 42;
  const cells: AvailabilityDateCell[] = [];

  for (let i = 0; i < totalCells; i += 1) {
    const dayNumber = i - firstDayOfMonth + 1;
    let cellDate = dayNumber;
    let cellMonth = month;
    let cellYear = year;
    let isCurrentMonth = true;

    if (dayNumber <= 0) {
      cellDate = prevMonthDays + dayNumber;
      cellMonth = month === 0 ? 11 : month - 1;
      cellYear = month === 0 ? year - 1 : year;
      isCurrentMonth = false;
    } else if (dayNumber > daysInMonth) {
      cellDate = dayNumber - daysInMonth;
      cellMonth = month === 11 ? 0 : month + 1;
      cellYear = month === 11 ? year + 1 : year;
      isCurrentMonth = false;
    }

    cells.push({
      date: cellDate,
      month: cellMonth,
      year: cellYear,
      isCurrentMonth,
      isSelected: isCurrentMonth && cellDate === selectedDate,
      isToday:
        cellDate === today.getDate() &&
        cellMonth === today.getMonth() &&
        cellYear === today.getFullYear(),
      status: getAvailabilityStatus(cellYear, cellMonth, cellDate),
    });
  }
  return cells;
}

const availabilityStatusMeta: Record<
  AvailabilityStatus,
  { label: string; summary: string; swatch: string; cell: string }
> = {
  available: {
    label: "Available",
    summary: "Fully open",
    swatch: "border border-border/70 bg-background",
    cell: "border border-border/60 bg-background text-foreground/85",
  },
  partial: {
    label: "Partial",
    summary: "Partially filled",
    swatch: "bg-primary/20",
    cell: "bg-primary/14 text-foreground",
  },
  full: {
    label: "Full",
    summary: "Sold out",
    swatch: "bg-foreground",
    cell: "bg-foreground text-background",
  },
};

const AvailabilityCalendarPanel = () => {
  const [currentMonth, setCurrentMonth] = React.useState(5);
  const [currentYear, setCurrentYear] = React.useState(2025);
  const [selectedDate, setSelectedDate] = React.useState(18);

  const calendarCells = React.useMemo(
    () =>
      generateAvailabilityMonthGrid(currentYear, currentMonth, selectedDate),
    [currentMonth, currentYear, selectedDate],
  );

  const selectedCell = React.useMemo(
    () =>
      calendarCells.find(
        (cell) =>
          cell.isCurrentMonth &&
          cell.date === selectedDate &&
          cell.month === currentMonth &&
          cell.year === currentYear,
      ) ??
      calendarCells.find((cell) => cell.isCurrentMonth) ??
      calendarCells[0],
    [calendarCells, currentMonth, currentYear, selectedDate],
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(1);
  };

  const handleDateSelect = (cell: AvailabilityDateCell) => {
    if (cell.month !== currentMonth || cell.year !== currentYear) {
      setCurrentMonth(cell.month);
      setCurrentYear(cell.year);
    }
    setSelectedDate(cell.date);
  };

  return (
    <div className="flex h-full min-w-0 flex-col rounded-xl border bg-card @xl:w-[410px]">
      <div className="flex flex-1 flex-col px-4 pt-4 pb-4 @sm:px-5 @sm:pt-5 @sm:pb-5">
        <div className="flex items-center gap-2 rounded-xl bg-muted/35 px-2 py-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="flex size-6 items-center justify-center rounded-md border border-border/80 bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <span className="flex-1 text-center text-sm font-medium text-foreground/85">
            {MONTH_LABELS[currentMonth]} {currentYear}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="flex size-6 items-center justify-center rounded-md border border-border/80 bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
        <div className="mx-auto flex min-h-0 w-full max-w-[372px] flex-1 flex-col pt-4">
          <div className="space-y-3">
            <div className="grid grid-cols-7 text-center text-[10px] font-medium tracking-[0.04em] text-muted-foreground">
              {WEEKDAY_LABELS.map((label) => (
                <span key={label} className="py-1">
                  {label}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2.5">
              {calendarCells.map((cell) => {
                const statusMeta = availabilityStatusMeta[cell.status];
                return (
                  <button
                    key={`${cell.year}-${cell.month}-${cell.date}`}
                    type="button"
                    onClick={() => handleDateSelect(cell)}
                    className={cn(
                      "relative flex aspect-square items-center justify-center rounded-[10px] text-[11px] font-medium transition-colors",
                      !cell.isCurrentMonth &&
                        "bg-muted/20 text-muted-foreground/35",
                      cell.isCurrentMonth && statusMeta.cell,
                      cell.isSelected &&
                        "ring-2 ring-primary/40 ring-offset-1 ring-offset-background",
                      cell.isToday &&
                        !cell.isSelected &&
                        "ring-1 ring-primary/30",
                    )}
                  >
                    <span>{cell.date}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-6 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              {(["available", "partial", "full"] as AvailabilityStatus[]).map(
                (status) => (
                  <div key={status} className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "size-2.5 rounded-full",
                        availabilityStatusMeta[status].swatch,
                      )}
                    />
                    <span>{availabilityStatusMeta[status].label}</span>
                  </div>
                ),
              )}
            </div>
            <span className="ml-auto text-[11px] text-muted-foreground/75">
              {selectedCell.date} {MONTH_LABELS[selectedCell.month].slice(0, 3)}{" "}
              · {availabilityStatusMeta[selectedCell.status].summary}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

type SalesTrendGridMetrics = {
  cols: number;
  rows: number;
  gridLeft: number;
  gridTop: number;
  gridWidth: number;
  gridHeight: number;
};

function getSalesTrendGridMetrics(offset: ChartOffset): SalesTrendGridMetrics {
  const cols = Math.floor(offset.width / SALES_TREND_CELL_STEP);
  const rows = Math.floor(offset.height / SALES_TREND_CELL_STEP);
  const gridWidth = cols * SALES_TREND_CELL_STEP;
  const gridHeight = rows * SALES_TREND_CELL_STEP;
  const gridLeft = Math.round(offset.left + (offset.width - gridWidth) / 2);
  const gridTop = Math.round(offset.top + (offset.height - gridHeight) / 2);
  return { cols, rows, gridLeft, gridTop, gridWidth, gridHeight };
}

function getSalesTrendColumnCenter(
  x: number,
  width: number,
  metrics: SalesTrendGridMetrics,
) {
  const centerX = x + width / 2;
  const snappedColumn = Math.round(
    (centerX - metrics.gridLeft - SALES_TREND_CELL_STEP / 2) /
      SALES_TREND_CELL_STEP,
  );
  const clampedColumn = Math.max(0, Math.min(metrics.cols - 1, snappedColumn));
  return Math.round(
    metrics.gridLeft +
      clampedColumn * SALES_TREND_CELL_STEP +
      SALES_TREND_CELL_INSET +
      SALES_TREND_CELL_SIZE / 2,
  );
}

function getSalesTrendColumnLeft(
  x: number,
  width: number,
  metrics: SalesTrendGridMetrics,
) {
  return Math.round(
    getSalesTrendColumnCenter(x, width, metrics) - SALES_TREND_CELL_SIZE / 2,
  );
}

function SalesTrendCursor({
  centerX,
  plotOffset,
  activeTotal,
}: {
  centerX?: number;
  plotOffset?: ChartOffset | null;
  activeTotal?: number;
}) {
  if (typeof centerX !== "number" || !plotOffset) return null;
  const metrics = getSalesTrendGridMetrics(plotOffset);
  let markerY: number | null = null;
  if (typeof activeTotal === "number" && activeTotal > 0) {
    const highlightedRows = Math.max(
      0,
      Math.min(
        metrics.rows,
        Math.round((activeTotal / SALES_TREND_MAX) * metrics.rows),
      ),
    );
    if (highlightedRows > 0) {
      const topFilledCellY =
        Math.round(
          metrics.gridTop +
            metrics.gridHeight -
            highlightedRows * SALES_TREND_CELL_STEP,
        ) + SALES_TREND_CELL_INSET;
      markerY = topFilledCellY + SALES_TREND_CELL_SIZE / 2;
    }
  }
  return (
    <g>
      <line
        x1={centerX}
        y1={metrics.gridTop}
        x2={centerX}
        y2={metrics.gridTop + metrics.gridHeight}
        stroke={salesTrendColors.cursor}
        strokeDasharray="3 4"
        strokeWidth={1.5}
      />
      {markerY !== null ? (
        <circle
          cx={centerX}
          cy={markerY}
          r={5}
          fill="var(--background)"
          stroke="var(--foreground)"
          strokeWidth={2}
        />
      ) : null}
    </g>
  );
}

function SalesTrendTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload as SalesTrendPoint | undefined;
  if (!row) return null;
  return (
    <div
      className={cn(
        "min-w-[180px] rounded-xl border bg-popover/95 p-3 shadow-xl backdrop-blur-sm",
        salesTrendColors.panelBorder,
      )}
    >
      <p
        className={cn(
          "mb-3 rounded-md border bg-muted/35 px-2.5 py-1 text-sm font-medium text-foreground",
          salesTrendColors.panelBorder,
        )}
      >
        {row.monthLabel} 2025
      </p>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-5">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-[var(--color-directBookings)]" />
            Direct
          </span>
          <span className="font-semibold text-foreground">
            {numberFormatter.format(row.directBookings)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-5">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-[var(--color-otaBookings)]" />
            OTA
          </span>
          <span className="font-semibold text-foreground">
            {numberFormatter.format(row.otaBookings)}
          </span>
        </div>
      </div>
    </div>
  );
}

function SalesTrendOffsetSync({
  offset,
  gridBaseColor,
  gridCellColor,
  onSyncOffset,
}: {
  offset?: ChartOffset;
  gridBaseColor: string;
  gridCellColor: string;
  onSyncOffset: (value: ChartOffset) => void;
}) {
  if (offset) onSyncOffset(offset);
  if (!offset) return null;
  const { cols, rows, gridLeft, gridTop } = getSalesTrendGridMetrics(offset);
  const squares: React.ReactNode[] = [];
  for (let row = 0; row < rows; row += 1) {
    const y = gridTop + row * SALES_TREND_CELL_STEP + SALES_TREND_CELL_INSET;
    for (let col = 0; col < cols; col += 1) {
      const x = gridLeft + col * SALES_TREND_CELL_STEP + SALES_TREND_CELL_INSET;
      squares.push(
        <rect
          key={`${row}-${col}`}
          x={x}
          y={y}
          width={SALES_TREND_CELL_SIZE}
          height={SALES_TREND_CELL_SIZE}
          rx={1}
          fill={gridCellColor}
        />,
      );
    }
  }
  return (
    <g>
      <rect
        x={offset.left}
        y={offset.top}
        width={offset.width}
        height={offset.height}
        fill={gridBaseColor}
      />
      {squares}
    </g>
  );
}

function SalesTrendSquareBar({
  x,
  y,
  width,
  height,
  payload,
  plotOffset,
  directBookingColor,
  otaBookingColor,
  onColumnCenterByKey,
}: SalesTrendBarShapeProps & {
  plotOffset?: ChartOffset | null;
  directBookingColor: string;
  otaBookingColor: string;
  onColumnCenterByKey?: (pointKey: string, centerX: number) => void;
}) {
  if (
    typeof x !== "number" ||
    typeof width !== "number" ||
    typeof y !== "number" ||
    typeof height !== "number" ||
    !plotOffset ||
    !payload
  )
    return null;
  const metrics = getSalesTrendGridMetrics(plotOffset);
  const columnX = getSalesTrendColumnLeft(x, width, metrics);
  const columnCenterX = columnX + SALES_TREND_CELL_SIZE / 2;
  if (payload.key && onColumnCenterByKey)
    onColumnCenterByKey(payload.key, columnCenterX);
  const maxRows = metrics.rows;
  const highlightedRows = Math.max(
    0,
    Math.min(maxRows, Math.round((payload.total / SALES_TREND_MAX) * maxRows)),
  );
  const directRows =
    payload.total > 0
      ? Math.round((payload.directBookings / payload.total) * highlightedRows)
      : 0;
  const clampedDirectRows = Math.max(0, Math.min(highlightedRows, directRows));
  const bottom = metrics.gridTop + metrics.gridHeight;
  const squares: React.ReactNode[] = [];
  for (let row = 0; row < highlightedRows; row += 1) {
    const rowY =
      Math.round(bottom - (row + 1) * SALES_TREND_CELL_STEP) +
      SALES_TREND_CELL_INSET;
    if (rowY < metrics.gridTop) continue;
    const color =
      row < clampedDirectRows ? directBookingColor : otaBookingColor;
    squares.push(
      <rect
        key={`fg-${row}`}
        x={columnX}
        y={rowY}
        width={SALES_TREND_CELL_SIZE}
        height={SALES_TREND_CELL_SIZE}
        rx={1}
        fill={color}
      />,
    );
  }
  return <g>{squares}</g>;
}

const RevenueFlowChart = () => {
  const [activePointKey, setActivePointKey] = React.useState<string | null>(
    null,
  );
  const chartData = React.useMemo(() => createSalesTrendData(), []);
  const plotOffsetRef = React.useRef<ChartOffset | null>(null);
  const columnCentersByKeyRef = React.useRef<Map<string, number>>(new Map());
  const activePoint = React.useMemo(
    () => chartData.find((p) => p.key === activePointKey) ?? null,
    [activePointKey, chartData],
  );

  React.useEffect(() => {
    columnCentersByKeyRef.current.clear();
    setActivePointKey(null);
  }, []);

  const bookingMix = React.useMemo(() => {
    const totals = chartData.reduce(
      (acc, p) => {
        acc.directBookings += p.directBookings;
        acc.otaBookings += p.otaBookings;
        return acc;
      },
      { directBookings: 0, otaBookings: 0 },
    );
    const total = totals.directBookings + totals.otaBookings;
    return {
      ...totals,
      directShare:
        total > 0 ? Math.round((totals.directBookings / total) * 100) : 0,
      otaShare: total > 0 ? Math.round((totals.otaBookings / total) * 100) : 0,
      totalBookings: total,
    };
  }, [chartData]);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-4 rounded-xl border bg-card p-4 text-foreground @sm:gap-5 @sm:p-5",
        salesTrendColors.panelBorder,
      )}
    >
      <div className="space-y-3 pb-3">
        <div className="flex flex-col gap-3">
          <div className="min-w-0 space-y-1.5">
            <p
              className={cn(
                "text-xs font-semibold tracking-[0.16em] uppercase",
                salesTrendColors.panelTextMuted,
              )}
            >
              Booking Sources
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-4xl leading-none font-semibold text-foreground tabular-nums">
                {numberFormatter.format(bookingMix.totalBookings)}
              </span>
              <span className="pb-1 text-sm text-muted-foreground">
                reservations
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[var(--color-directBookings)]" />
              <span className="font-medium text-foreground">Direct</span>
              <span className="tabular-nums">
                {numberFormatter.format(bookingMix.directBookings)}
              </span>
              <span>{bookingMix.directShare}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[var(--color-otaBookings)]" />
              <span className="font-medium text-foreground">OTA</span>
              <span className="tabular-nums">
                {numberFormatter.format(bookingMix.otaBookings)}
              </span>
              <span>{bookingMix.otaShare}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[260px] w-full min-w-0 @sm:h-[300px]">
        <ChartContainer
          config={revenueChartConfig}
          className="h-full w-full [&_.recharts-cartesian-axis-line]:stroke-transparent [&_.recharts-cartesian-axis-tick_line]:stroke-transparent"
        >
          <BarChart
            data={chartData}
            barCategoryGap={0}
            margin={{ top: 8, right: 8, left: -6, bottom: 10 }}
            onMouseMove={(state) => {
              const payload = (
                state as
                  | { activePayload?: Array<{ payload?: SalesTrendPoint }> }
                  | undefined
              )?.activePayload?.[0]?.payload;
              const key = payload?.key ?? null;
              setActivePointKey((prev) => (prev === key ? prev : key));
            }}
            onMouseLeave={() =>
              setActivePointKey((prev) => (prev === null ? prev : null))
            }
          >
            <Customized
              component={(props: { offset?: ChartOffset }) => (
                <SalesTrendOffsetSync
                  offset={props.offset}
                  gridBaseColor={salesTrendColors.gridBase}
                  gridCellColor={salesTrendColors.gridCell}
                  onSyncOffset={(value) => {
                    plotOffsetRef.current = value;
                  }}
                />
              )}
            />
            <XAxis
              dataKey="xLabel"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fontSize: 11, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
              ticks={[0, 50, 100, 150, SALES_TREND_MAX]}
              domain={[0, SALES_TREND_MAX]}
              tickFormatter={(value) => `${value}`}
              width={36}
            />
            <Tooltip content={<SalesTrendTooltip />} cursor={false} />
            <Bar
              dataKey="total"
              fill="var(--color-directBookings)"
              shape={(props: SalesTrendBarShapeProps) => (
                <SalesTrendSquareBar
                  {...props}
                  plotOffset={plotOffsetRef.current}
                  directBookingColor="var(--color-directBookings)"
                  otaBookingColor="var(--color-otaBookings)"
                  onColumnCenterByKey={(pointKey, centerX) => {
                    columnCentersByKeyRef.current.set(pointKey, centerX);
                  }}
                />
              )}
              radius={0}
              barSize={12}
            />
            <Customized
              component={() => (
                <SalesTrendCursor
                  centerX={
                    activePointKey
                      ? columnCentersByKeyRef.current.get(activePointKey)
                      : undefined
                  }
                  plotOffset={plotOffsetRef.current}
                  activeTotal={activePoint?.total}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

const STATUS_STYLES: Record<string, string> = {
  violet:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  emerald:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

const SOURCE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Direct: Globe,
  "Booking.com": Globe,
  Expedia: Globe,
  "Walk-in": DoorOpen,
};

const arrivalsTableHeadClass =
  "h-9 whitespace-nowrap px-3 text-[11px] font-medium text-muted-foreground";

function parseCheckInTimeToMinutes(label: string) {
  const matched = label.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!matched) return Number.MAX_SAFE_INTEGER;
  const [, hourValue, minuteValue, period] = matched;
  const hour = Number(hourValue) % 12;
  const minute = Number(minuteValue);
  const isPm = period.toUpperCase() === "PM";
  return (isPm ? hour + 12 : hour) * 60 + minute;
}

const RecentArrivalsTableCard = () => {
  const arrivals = React.useMemo(
    () =>
      [...RECENT_ARRIVALS_TABLE].sort(
        (a, b) =>
          parseCheckInTimeToMinutes(a.time) - parseCheckInTimeToMinutes(b.time),
      ),
    [],
  );

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 px-4 pt-4 @sm:px-5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-pretty @sm:text-base">
            Recent Arrivals
          </h2>
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
            {arrivals.length}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
          View all
        </Button>
      </div>
      <div className="mt-3 border-t">
        <ScrollArea className="h-[470px]">
          <div className="min-w-[940px]">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted/40">
                <TableRow className="border-b hover:bg-muted/40">
                  <TableHead className={cn(arrivalsTableHeadClass, "w-[76px]")}>
                    R. No
                  </TableHead>
                  <TableHead
                    className={cn(arrivalsTableHeadClass, "w-[230px]")}
                  >
                    Guest
                  </TableHead>
                  <TableHead
                    className={cn(arrivalsTableHeadClass, "w-[160px]")}
                  >
                    Room
                  </TableHead>
                  <TableHead
                    className={cn(arrivalsTableHeadClass, "w-[120px]")}
                  >
                    Check-in
                  </TableHead>
                  <TableHead className={cn(arrivalsTableHeadClass, "w-[80px]")}>
                    Nights
                  </TableHead>
                  <TableHead className={cn(arrivalsTableHeadClass, "w-[80px]")}>
                    Guests
                  </TableHead>
                  <TableHead
                    className={cn(arrivalsTableHeadClass, "w-[150px]")}
                  >
                    Source
                  </TableHead>
                  <TableHead
                    className={cn(arrivalsTableHeadClass, "w-[125px]")}
                  >
                    Status
                  </TableHead>
                  <TableHead
                    className={cn(arrivalsTableHeadClass, "w-[220px]")}
                  >
                    Special Requests
                  </TableHead>
                  <TableHead
                    className={cn(
                      arrivalsTableHeadClass,
                      "w-[72px] text-right",
                    )}
                  >
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {arrivals.map((arrival, index) => {
                  const SourceIcon = SOURCE_ICONS[arrival.source] || Globe;
                  const leadGuest = arrival.guests[0];
                  return (
                    <TableRow
                      key={arrival.id}
                      className="h-12 hover:bg-muted/20"
                    >
                      <TableCell className="px-3 text-sm text-muted-foreground tabular-nums">
                        #{105 + index}
                      </TableCell>
                      <TableCell className="px-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarImage
                              src={leadGuest?.avatar}
                              alt={arrival.guestName}
                            />
                            <AvatarFallback className="text-[9px]">
                              {leadGuest?.initials ??
                                arrival.guestName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="max-w-[170px] truncate text-sm font-medium text-foreground">
                            {arrival.guestName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 text-sm text-muted-foreground">
                        {arrival.roomType} {arrival.roomNumber}
                      </TableCell>
                      <TableCell className="px-3 text-sm text-muted-foreground">
                        {arrival.time.replace(" Check-in", "")}
                      </TableCell>
                      <TableCell className="px-3 text-sm text-muted-foreground tabular-nums">
                        {arrival.nights}
                      </TableCell>
                      <TableCell className="px-3 text-sm text-muted-foreground tabular-nums">
                        {arrival.guestCount}
                      </TableCell>
                      <TableCell className="px-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <SourceIcon className="size-3.5" aria-hidden="true" />
                          {arrival.source}
                        </span>
                      </TableCell>
                      <TableCell className="px-3">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "border-0 px-2 py-0 text-[11px] font-medium",
                            STATUS_STYLES[arrival.statusColor] ||
                              STATUS_STYLES.violet,
                          )}
                        >
                          {arrival.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[220px] px-3 text-sm text-muted-foreground">
                        <span
                          className="block truncate"
                          title={
                            arrival.specialRequests?.trim() ||
                            "No special requests"
                          }
                        >
                          {arrival.specialRequests?.trim() ||
                            "No special requests"}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="size-7 p-0"
                          aria-label={`More actions for ${arrival.guestName}`}
                        >
                          <MoreHorizontal
                            className="size-3.5"
                            aria-hidden="true"
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const DashboardContent = () => {
  return (
    <main
      id="dashboard-main"
      tabIndex={-1}
      className="w-full flex-1 space-y-4 overflow-auto bg-background p-3 @sm:space-y-6 @sm:p-4 @md:p-6"
    >
      <div className="flex flex-col gap-4 @sm:gap-6 @xl:flex-row">
        <RevenueFlowChart />
        <AvailabilityCalendarPanel />
      </div>
      <RecentArrivalsTableCard />
    </main>
  );
};

const Dashboard18 = ({ className }: { className?: string }) => {
  return (
    <SidebarProvider className={cn("bg-sidebar !h-full !min-h-0", className)}>
      <a
        href="#dashboard-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <AppSidebar />
      <div className="@container min-h-0 h-full w-full min-w-0 overflow-hidden @lg:p-2">
        <div className="flex h-full w-full flex-col items-center justify-start overflow-hidden bg-background @lg:rounded-xl @lg:border">
          <DashboardHeader />
          <DashboardContent />
        </div>
      </div>
    </SidebarProvider>
  );
};

export { Dashboard18 };
