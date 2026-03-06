"use client";

import * as React from "react";
import {
  type ColumnDef,
  type Header,
  type HeaderGroup,
  type Row,
  type Cell,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export type OrderFilterRow = {
  id: string;
  orderId: string;
  customer: string;
  orderStatus: string;
  paymentStatus: string;
  total: string;
};

const defaultData: OrderFilterRow[] = [
  {
    id: "1",
    orderId: "ORD-101",
    customer: "Alice",
    orderStatus: "Processing",
    paymentStatus: "Paid",
    total: "$120",
  },
  {
    id: "2",
    orderId: "ORD-102",
    customer: "Bob",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "$85",
  },
  {
    id: "3",
    orderId: "ORD-103",
    customer: "Carol",
    orderStatus: "Pending",
    paymentStatus: "Pending",
    total: "$200",
  },
  {
    id: "4",
    orderId: "ORD-104",
    customer: "Dave",
    orderStatus: "Delivered",
    paymentStatus: "Paid",
    total: "$56",
  },
  {
    id: "5",
    orderId: "ORD-105",
    customer: "Eve",
    orderStatus: "Processing",
    paymentStatus: "Failed",
    total: "$340",
  },
];

export function DataTable14({
  data = defaultData,
}: {
  data?: OrderFilterRow[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [orderStatusFilter, setOrderStatusFilter] =
    React.useState<string>("all");
  const [paymentFilter, setPaymentFilter] = React.useState<string>("all");

  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      if (orderStatusFilter !== "all" && row.orderStatus !== orderStatusFilter)
        return false;
      if (paymentFilter !== "all" && row.paymentStatus !== paymentFilter)
        return false;
      return true;
    });
  }, [data, orderStatusFilter, paymentFilter]);

  const columns: ColumnDef<OrderFilterRow>[] = React.useMemo(
    () => [
      { accessorKey: "orderId", header: "Order" },
      { accessorKey: "customer", header: "Customer" },
      {
        accessorKey: "orderStatus",
        header: "Order status",
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.orderStatus}</Badge>
        ),
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment",
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.paymentStatus === "Paid"
                ? "positive"
                : row.original.paymentStatus === "Failed"
                  ? "negative"
                  : "secondary"
            }
          >
            {row.original.paymentStatus}
          </Badge>
        ),
      },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
          <span className="tabular-nums">{row.original.total}</span>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const orderCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: data.length };
    data.forEach((r) => {
      counts[r.orderStatus] = (counts[r.orderStatus] ?? 0) + 1;
    });
    return counts;
  }, [data]);

  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-4">
      <div>
        <h2 className="text-lg font-semibold">Orders</h2>
        <p className="text-sm text-muted-foreground">
          Filter by order status, payment status, and search.
        </p>
      </div>
      <Tabs
        value={orderStatusFilter}
        onValueChange={setOrderStatusFilter}
        className="w-full"
      >
        <TabsList className="mb-2">
          <TabsTrigger value="all">All ({orderCounts.all})</TabsTrigger>
          <TabsTrigger value="Processing">
            Processing ({orderCounts.Processing ?? 0})
          </TabsTrigger>
          <TabsTrigger value="Shipped">
            Shipped ({orderCounts.Shipped ?? 0})
          </TabsTrigger>
          <TabsTrigger value="Pending">
            Pending ({orderCounts.Pending ?? 0})
          </TabsTrigger>
          <TabsTrigger value="Delivered">
            Delivered ({orderCounts.Delivered ?? 0})
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={paymentFilter === "all" ? "secondary" : "primary"}
          size="sm"
          onClick={() => setPaymentFilter("all")}
        >
          All
        </Button>
        <Button
          variant={paymentFilter === "Paid" ? "secondary" : "primary"}
          size="sm"
          onClick={() => setPaymentFilter("Paid")}
        >
          Paid
        </Button>
        <Button
          variant={paymentFilter === "Pending" ? "secondary" : "primary"}
          size="sm"
          onClick={() => setPaymentFilter("Pending")}
        >
          Pending
        </Button>
        <Button
          variant={paymentFilter === "Failed" ? "secondary" : "primary"}
          size="sm"
          onClick={() => setPaymentFilter("Failed")}
        >
          Failed
        </Button>
        <Input
          placeholder="Search..."
          className="ml-auto h-8 w-[180px]"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map((headerGroup: HeaderGroup<OrderFilterRow>) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header: Header<OrderFilterRow, unknown>) => {
                      const canSort = header.column.getCanSort();
                      const sorted = header.column.getIsSorted();
                      return (
                        <TableHead key={header.id}>
                          {canSort ? (
                            <Button
                              variant="primary"
                              size="sm"
                              className="-ml-3 h-8 gap-1"
                              onClick={() =>
                                header.column.toggleSorting(sorted === "asc")
                              }
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                              {sorted === "desc" ? (
                                <ArrowDown className="size-4" />
                              ) : sorted === "asc" ? (
                                <ArrowUp className="size-4" />
                              ) : (
                                <ChevronsUpDown className="size-4 opacity-50" />
                              )}
                            </Button>
                          ) : header.isPlaceholder ? null : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
                          )}
                        </TableHead>
                      );
                    },
                  )}
                </TableRow>
              ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row: Row<OrderFilterRow>) => (
              <TableRow key={row.id}>
                {row
                  .getVisibleCells()
                  .map((cell: Cell<OrderFilterRow, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground sm:flex-nowrap">
          <span className="whitespace-nowrap">Rows per page</span>
          <div className="w-20 shrink-0">
            <NativeSelect
              className="w-full min-w-0"
              value={String(table.getState().pagination.pageSize)}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              <NativeSelectOption value="5">5</NativeSelectOption>
              <NativeSelectOption value="10">10</NativeSelectOption>
              <NativeSelectOption value="20">20</NativeSelectOption>
            </NativeSelect>
          </div>
          <span className="whitespace-nowrap">
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            –
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}{" "}
            of {table.getFilteredRowModel().rows.length}
          </span>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
