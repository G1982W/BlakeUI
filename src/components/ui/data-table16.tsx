"use client";

import type {
  Column,
  ColumnDef,
  Row,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCheckIcon,
  CheckCircle,
  ChevronLeft,
  ChevronsUpDown,
  Clock,
  LoaderIcon,
  MapPin,
  MoreHorizontal,
  Package,
  PieChart,
  RefreshCcw,
  User,
} from "lucide-react";
import * as React from "react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type UseDataTableOptions<TData> = {
  data: Array<TData>;
  columns: Array<ColumnDef<TData, unknown>>;
  getRowId?: (row: TData) => string;
  initialSorting?: SortingState;
  initialGlobalFilter?: string;
  initialSelection?: RowSelectionState;
  enableRowSelection?: boolean;
};

export function useDataTable<TData>(options: UseDataTableOptions<TData>) {
  const {
    data,
    columns,
    getRowId,
    initialSorting = [],
    initialGlobalFilter = "",
    initialSelection = {},
    enableRowSelection = true,
  } = options;

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

  const [globalFilter, setGlobalFilter] =
    React.useState<string>(initialGlobalFilter);

  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>(initialSelection);

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection,
  });

  return {
    table,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    rowSelection,
    setRowSelection,
  };
}

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const canSort = column.getCanSort();
  const sorted = column.getIsSorted();

  if (!canSort) {
    return (
      <span className="flex h-8 items-center text-sm font-medium text-foreground">
        {title}
      </span>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex h-8 items-center gap-2 px-0 text-sm font-medium text-foreground"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      <span>{title}</span>
      {sorted === "desc" ? (
        <ArrowDown className="h-4 w-4" />
      ) : sorted === "asc" ? (
        <ArrowUp className="h-4 w-4" />
      ) : (
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      )}
    </Button>
  );
};

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  schema: z.ZodSchema;
  itemName: string;
  idField?: string;
}

export function DataTableRowActions<TData>({
  row,
  schema,
  itemName,
  idField = "id",
}: DataTableRowActionsProps<TData>) {
  const item = schema.parse(row.original) as TData;
  const itemRecord = item as Record<string, unknown>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="size-8 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(
              String(itemRecord[idField] || itemRecord.id),
            )
          }
        >
          Copy {itemName} ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit {itemName}</DropdownMenuItem>
        <DropdownMenuItem>View details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Customer details schema
const CustomerSchema = z.object({
  name: z.string(),
  email: z.string(),
  segment: z.string(),
});

// Shipping details schema
const ShippingSchema = z.object({
  service: z.string(),
  fulfillment_channel: z.string(),
  warehouse: z.string(),
  delivery_eta: z.string(),
  tracking_number: z.string(),
  assigned_to: z.string(),
});

// Order details schema
const OrderDetailsSchema = z.object({
  payment_method: z.string(),
  items: z.number(),
  coupon_code: z.string().nullable(),
  gift: z.boolean(),
  return_status: z.string(),
  notes: z.string(),
});

export const Orderschema = z.object({
  id: z.string(),
  purchased: z.string(),
  order_status: z.string(),
  payment_status: z.string(),
  order_total: z.number(),
  currency: z.string(),
  priority: z.string(),
  order_date: z.string(),
  last_updated: z.string(),
  risk_level: z.string(),
  customer: CustomerSchema,
  shipping: ShippingSchema,
  orderDetails: OrderDetailsSchema,
});

type Order = z.infer<typeof Orderschema>;

export const data = [
  {
    id: "#301456",
    purchased: "Leather Jacket",
    order_status: "Ready for pickup",
    customer: "Sarah Johnson",
    payment_method: "****7321",
    payment_status: "Paid",
    items: 3,
    order_date: "2025-10-24T08:28:33.060Z",
    delivery_eta: "2025-10-31T08:28:33.060Z",
    fulfillment_channel: "FBA",
    shipping_service: "Expedited Air",
    warehouse: "ORD-4",
    order_total: 243.4,
    currency: "USD",
    customer_email: "sarah.johnson@example.com",
    customer_segment: "Wholesale",
    priority: "Low",
    coupon_code: "WELCOME10",
    gift: false,
    return_status: "Authorized",
    assigned_to: "Morgan Blythe",
    risk_level: "Low",
    tracking_number: "TRK5817960062",
    last_updated: "2025-10-24T10:28:33.060Z",
    notes: "Sarah prefers expedited air.",
  },
  {
    id: "#789123",
    purchased: "Blue Sneakers",
    order_status: "Fulfilled",
    customer: "Michael Brown",
    payment_method: "****4509",
    payment_status: "Paid",
    items: 2,
    order_date: "2025-10-22T20:28:33.060Z",
    delivery_eta: "2025-10-25T20:28:33.060Z",
    fulfillment_channel: "3PL",
    shipping_service: "Prime 1-Day",
    warehouse: "DFW-2",
    order_total: 119.96,
    currency: "USD",
    customer_email: "michael.brown@example.com",
    customer_segment: "Marketplace",
    priority: "Normal",
    coupon_code: "VIPONLY",
    gift: false,
    return_status: "Authorized",
    assigned_to: "Harper Singh",
    risk_level: "Low",
    tracking_number: "TRK3189925655",
    last_updated: "2025-10-22T22:28:33.060Z",
    notes: "Michael prefers prime 1-day.",
  },
  {
    id: "#654321",
    purchased: "Red Hoodie",
    order_status: "Fulfilled",
    customer: "Emily Davis",
    payment_method: "****9812",
    payment_status: "Pending",
    items: 4,
    order_date: "2025-10-21T08:28:33.060Z",
    delivery_eta: "2025-10-28T08:28:33.060Z",
    fulfillment_channel: "FBA",
    shipping_service: "Expedited Air",
    warehouse: "ATL-1",
    order_total: 354.63,
    currency: "USD",
    customer_email: "emily.davis@example.com",
    customer_segment: "VIP",
    priority: "Urgent",
    coupon_code: "VIPONLY",
    gift: false,
    return_status: "Requested",
    assigned_to: "Harper Singh",
    risk_level: "Medium",
    tracking_number: "TRK2861732425",
    last_updated: "2025-10-21T10:28:33.060Z",
    notes: "Emily prefers expedited air.",
  },
  {
    id: "#987654",
    purchased: "Black Sunglasses",
    order_status: "Unfulfilled",
    customer: "David Lee",
    payment_method: "****6734",
    payment_status: "Pending",
    items: 1,
    order_date: "2025-10-19T20:28:33.060Z",
    delivery_eta: "2025-10-22T20:28:33.060Z",
    fulfillment_channel: "3PL",
    shipping_service: "Prime 1-Day",
    warehouse: "LAX-5",
    order_total: 119.73,
    currency: "USD",
    customer_email: "david.lee@example.com",
    customer_segment: "Marketplace",
    priority: "Low",
    coupon_code: "WELCOME10",
    gift: false,
    return_status: "Received",
    assigned_to: "Riley Nguyen",
    risk_level: "Low",
    tracking_number: "TRK5254503688",
    last_updated: "2025-10-19T22:28:33.060Z",
    notes: "David prefers prime 1-day.",
  },
  {
    id: "#432187",
    purchased: "Green Backpack",
    order_status: "Fulfilled",
    customer: "Lisa Wang",
    payment_method: "****2901",
    payment_status: "Paid",
    items: 2,
    order_date: "2025-10-18T08:28:33.060Z",
    delivery_eta: "2025-10-23T08:28:33.060Z",
    fulfillment_channel: "Dropship",
    shipping_service: "Prime 2-Day",
    warehouse: "ATL-1",
    order_total: 359.28,
    currency: "USD",
    customer_email: "lisa.wang@example.com",
    customer_segment: "Enterprise",
    priority: "High",
    coupon_code: "WELCOME10",
    gift: false,
    return_status: "Authorized",
    assigned_to: "Harper Singh",
    risk_level: "Low",
    tracking_number: "TRK2835974731",
    last_updated: "2025-10-18T10:28:33.060Z",
    notes: "Lisa prefers prime 2-day.",
  },
  {
    id: "#567890",
    purchased: "Silver Watch",
    order_status: "Ready for pickup",
    customer: "James Carter",
    payment_method: "****8456",
    payment_status: "Pending",
    items: 1,
    order_date: "2025-10-16T20:28:33.060Z",
    delivery_eta: "2025-10-22T20:28:33.060Z",
    fulfillment_channel: "Dropship",
    shipping_service: "Standard Ground",
    warehouse: "ATL-1",
    order_total: 381.57,
    currency: "USD",
    customer_email: "james.carter@example.com",
    customer_segment: "Enterprise",
    priority: "Low",
    coupon_code: "VIPONLY",
    gift: false,
    return_status: "Authorized",
    assigned_to: "Morgan Blythe",
    risk_level: "High",
    tracking_number: "TRK1516495925",
    last_updated: "2025-10-16T22:28:33.060Z",
    notes: "James prefers standard ground.",
  },
  {
    id: "#234567",
    purchased: "Gray Scarf",
    order_status: "Fulfilled",
    customer: "Rachel Kim",
    payment_method: "****1234",
    payment_status: "Refunded",
    items: 3,
    order_date: "2025-10-15T08:28:33.060Z",
    delivery_eta: "2025-10-18T08:28:33.060Z",
    fulfillment_channel: "3PL",
    shipping_service: "Prime 2-Day",
    warehouse: "JFK-3",
    order_total: 398.12,
    currency: "USD",
    customer_email: "rachel.kim@example.com",
    customer_segment: "Enterprise",
    priority: "Urgent",
    coupon_code: "SPRING24",
    gift: false,
    return_status: "Authorized",
    assigned_to: "Riley Nguyen",
    risk_level: "Medium",
    tracking_number: "TRK2114884757",
    last_updated: "2025-10-15T10:28:33.060Z",
    notes: "Rachel prefers prime 2-day.",
  },
  {
    id: "#876543",
    purchased: "Purple Dress",
    order_status: "Unfulfilled",
    customer: "Thomas Allen",
    payment_method: "****5678",
    payment_status: "Partially refunded",
    items: 2,
    order_date: "2025-10-13T20:28:33.060Z",
    delivery_eta: "2025-10-19T20:28:33.060Z",
    fulfillment_channel: "Dropship",
    shipping_service: "Prime 1-Day",
    warehouse: "ORD-4",
    order_total: 337.01,
    currency: "USD",
    customer_email: "thomas.allen@example.com",
    customer_segment: "Wholesale",
    priority: "High",
    coupon_code: null,
    gift: false,
    return_status: "Requested",
    assigned_to: "Morgan Blythe",
    risk_level: "Medium",
    tracking_number: "TRK0992177244",
    last_updated: "2025-10-13T22:28:33.060Z",
    notes: "Thomas prefers prime 1-day.",
  },
  {
    id: "#345678",
    purchased: "White Hat",
    order_status: "Ready for pickup",
    customer: "Anna Patel",
    payment_method: "****9012",
    payment_status: "Paid",
    items: 1,
    order_date: "2025-10-12T08:28:33.060Z",
    delivery_eta: "2025-10-18T08:28:33.060Z",
    fulfillment_channel: "Dropship",
    shipping_service: "Standard Ground",
    warehouse: "LAX-5",
    order_total: 277.54,
    currency: "USD",
    customer_email: "anna.patel@example.com",
    customer_segment: "Enterprise",
    priority: "Urgent",
    coupon_code: "WELCOME10",
    gift: false,
    return_status: "Authorized",
    assigned_to: "Harper Singh",
    risk_level: "High",
    tracking_number: "TRK8458630889",
    last_updated: "2025-10-12T10:28:33.060Z",
    notes: "Anna prefers standard ground.",
  },
  {
    id: "#456789",
    purchased: "Brown Boots",
    order_status: "Fulfilled",
    customer: "Robert Singh",
    payment_method: "****3456",
    payment_status: "Paid",
    items: 4,
    order_date: "2025-10-10T20:28:33.060Z",
    delivery_eta: "2025-10-13T20:28:33.060Z",
    fulfillment_channel: "Merchant Fulfilled",
    shipping_service: "Standard Ground",
    warehouse: "ATL-1",
    order_total: 377.76,
    currency: "USD",
    customer_email: "robert.singh@example.com",
    customer_segment: "Marketplace",
    priority: "Low",
    coupon_code: "WELCOME10",
    gift: false,
    return_status: "None",
    assigned_to: "Riley Nguyen",
    risk_level: "Medium",
    tracking_number: "TRK1335228617",
    last_updated: "2025-10-10T22:28:33.060Z",
    notes: "Robert prefers standard ground.",
  },
];

// Define the raw data interface
interface RawOrderData {
  id: string;
  purchased: string;
  order_status: string;
  customer: string;
  payment_method: string;
  payment_status: string;
  items: number;
  order_date: string;
  delivery_eta: string;
  fulfillment_channel: string;
  shipping_service: string;
  warehouse: string;
  order_total: number;
  currency: string;
  customer_email: string;
  customer_segment: string;
  priority: string;
  coupon_code: string | null;
  gift: boolean;
  return_status: string;
  assigned_to: string;
  risk_level: string;
  tracking_number: string;
  last_updated: string;
  notes: string;
}

// Transform flat data into nested structure
export const transformedData = data.map((item: RawOrderData) => ({
  id: item.id,
  purchased: item.purchased,
  order_status: item.order_status,
  payment_status: item.payment_status,
  order_total: item.order_total,
  currency: item.currency,
  priority: item.priority,
  order_date: item.order_date,
  last_updated: item.last_updated,
  risk_level: item.risk_level,
  customer: {
    name: item.customer,
    email: item.customer_email,
    segment: item.customer_segment,
  },
  shipping: {
    service: item.shipping_service,
    fulfillment_channel: item.fulfillment_channel,
    warehouse: item.warehouse,
    delivery_eta: item.delivery_eta,
    tracking_number: item.tracking_number,
    assigned_to: item.assigned_to,
  },
  orderDetails: {
    payment_method: item.payment_method,
    items: item.items,
    coupon_code: item.coupon_code,
    gift: item.gift,
    return_status: item.return_status,
    notes: item.notes,
  },
}));

export const validatedData = Orderschema.array().parse(transformedData);

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
};

export type StatusOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const orderStatuses: StatusOption[] = [
  { label: "Fulfilled", value: "Fulfilled", icon: CheckCircle },
  { label: "Ready for pickup", value: "Ready for pickup", icon: Package },
  { label: "Unfulfilled", value: "Unfulfilled", icon: Clock },
];

export const paymentStatuses: StatusOption[] = [
  { label: "Paid", value: "Paid", icon: CheckCheckIcon },
  { label: "Pending", value: "Pending", icon: LoaderIcon },
  { label: "Refunded", value: "Refunded", icon: RefreshCcw },
  {
    label: "Partially refunded",
    value: "Partially refunded",
    icon: PieChart,
  },
];

const createStatusLookup = (options: StatusOption[]) =>
  options.reduce<Record<string, StatusOption>>((acc, option) => {
    acc[option.value] = option;
    return acc;
  }, {});

const orderStatusLookup = createStatusLookup(orderStatuses);

export const getOrderStatusMeta = (status: string) => orderStatusLookup[status];

export const getStatusVariant = (status: string) => {
  switch (status) {
    case "Fulfilled":
      return "default";
    case "Ready for pickup":
      return "secondary";
    case "Unfulfilled":
      return "outline";
    default:
      return "outline";
  }
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      width: 56,
      minWidth: 48,
      headerClassName: "px-2",
      cellClassName: "px-2",
      align: "center",
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] font-mono text-sm">{row.original.id}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "purchased",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate text-sm font-medium">
        {row.original.purchased}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "order_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.order_status;
      const statusMeta = getOrderStatusMeta(status);
      const StatusIcon = statusMeta?.icon;

      return (
        <Badge variant={getStatusVariant(status)} className="gap-1">
          {StatusIcon ? <StatusIcon className="size-3" /> : null}
          <span className="text-xs">{statusMeta?.label ?? status}</span>
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "order_total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium tabular-nums">
        {currencyFormatter.format(row.original.order_total)}
      </span>
    ),
    meta: { align: "right", className: "tabular-nums" },
    enableSorting: true,
  },

  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Details" />
    ),
    cell: ({ row }) => {
      const expandHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        row.toggleExpanded();
      };

      return (
        <div className="relative">
          <Button
            variant="primary"
            size="sm"
            className={cn(
              "group w-full justify-start gap-2 transition-colors",
              "cursor-pointer border-primary/20 hover:bg-primary/5",
            )}
            onClick={expandHandler}
          >
            <div className="truncate text-sm font-medium">
              {row.original.customer.name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {row.original.customer.segment}
            </div>

            <ChevronLeft
              className={cn(
                "ml-auto h-4 w-4 text-primary transition-transform duration-200",
                row.getIsExpanded() && "rotate-90 transform",
              )}
            />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DataTableRowActions
          row={row}
          schema={Orderschema}
          itemName="order"
          idField="id"
        />
      </div>
    ),
  },
];

export function DataTable16({ className }: { className?: string }) {
  const { table } = useDataTable({
    data: validatedData,
    columns,
    getRowId: (row) => row.id.toString(),
  });

  return (
    <section className={cn("", className)}>
      <div className="container mx-auto">
        <div className="w-full">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Data Table With Expanded row
            </h2>
            <p className="mt-2 text-muted-foreground">
              A data table with expanded row that is bounded by the parent
              column width
            </p>
          </div>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.getIsExpanded() && (
                        <TableRow className="bg-muted/50 transition-colors">
                          <TableCell className="p-0" colSpan={5} />
                          <TableCell className="py-4" colSpan={1}>
                            <div className="rounded-lg border border-border/50 bg-card p-4 shadow-sm">
                              <div className="grid grid-cols-2 gap-4">
                                {/* Left Column */}
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-primary/10 p-2">
                                      <Package className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">
                                        Service
                                      </p>
                                      <p className="text-sm font-medium">
                                        {row.original.shipping.service}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-muted p-2">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">
                                        Tracking
                                      </p>
                                      <p className="rounded bg-muted px-2 py-1 font-mono text-sm font-medium">
                                        {row.original.shipping.tracking_number}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-muted p-2">
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">
                                        Delivery
                                      </p>
                                      <p className="text-sm font-medium">
                                        {formatDate(
                                          row.original.shipping.delivery_eta,
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-muted p-2">
                                      <Package className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">
                                        Warehouse
                                      </p>
                                      <p className="text-sm font-medium">
                                        {row.original.shipping.warehouse}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-muted p-2">
                                      <Package className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">
                                        Channel
                                      </p>
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {
                                          row.original.shipping
                                            .fulfillment_channel
                                        }
                                      </Badge>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-muted p-2">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">
                                        Assigned To
                                      </p>
                                      <p className="text-sm font-medium">
                                        {row.original.shipping.assigned_to}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="p-0" colSpan={1} />
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
