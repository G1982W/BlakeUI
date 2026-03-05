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
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronRight, ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type OrderRow = {
  id: string;
  orderId: string;
  customer: string;
  total: string;
  status: string;
  shipping?: string;
  tracking?: string;
  warehouse?: string;
  assigned?: string;
};

const defaultData: OrderRow[] = [
  { id: "1", orderId: "ORD-001", customer: "Acme Corp", total: "$384.92", status: "Processing", shipping: "Express", tracking: "1Z999AA10123456784", warehouse: "WH-North", assigned: "Jane" },
  { id: "2", orderId: "ORD-002", customer: "Beta Inc", total: "$156.00", status: "Shipped", shipping: "Standard", tracking: "1Z999AA10987654321", warehouse: "WH-South", assigned: "John" },
  { id: "3", orderId: "ORD-003", customer: "Gamma LLC", total: "$892.50", status: "Pending", shipping: "Express", tracking: "-", warehouse: "WH-North", assigned: "Jane" },
];

export function DataTable16({ data = defaultData }: { data?: OrderRow[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const columns: ColumnDef<OrderRow>[] = React.useMemo(
    () => [
      {
        id: "expand",
        header: () => null,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => row.toggleExpanded()}
            aria-label={row.getIsExpanded() ? "Collapse" : "Expand"}
          >
            <ChevronRight className={cn("size-4 transition-transform", row.getIsExpanded() && "rotate-90")} />
          </Button>
        ),
      },
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="Select row"
          />
        ),
      },
      { accessorKey: "orderId", header: "Order" },
      { accessorKey: "customer", header: "Customer" },
      { accessorKey: "total", header: "Total", cell: ({ row }) => <span className="tabular-nums font-medium">{row.original.total}</span> },
      { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge> },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Copy ID</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, expanded },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-4">
      <div>
        <h2 className="text-lg font-semibold">Orders</h2>
        <p className="text-sm text-muted-foreground">Expand a row to see shipping and assignment details.</p>
      </div>
      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<OrderRow>) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<OrderRow, unknown>) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id}>
                      {canSort && header.id !== "expand" && header.id !== "select" && header.id !== "actions" ? (
                        <Button variant="ghost" size="sm" className="-ml-3 h-8 gap-1" onClick={() => header.column.toggleSorting(sorted === "asc")}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                          {sorted === "desc" ? <ArrowDown className="size-4" /> : sorted === "asc" ? <ArrowUp className="size-4" /> : <ChevronsUpDown className="size-4 opacity-50" />}
                        </Button>
                      ) : (
                        header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row: Row<OrderRow>) => (
              <React.Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell: Cell<OrderRow, unknown>) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && row.original.shipping != null && (
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableCell colSpan={columns.length} className="py-3">
                      <div className="grid gap-2 rounded-md bg-muted/50 p-4 text-sm sm:grid-cols-2 md:grid-cols-4">
                        <div><span className="text-muted-foreground">Shipping</span> {row.original.shipping}</div>
                        <div><span className="text-muted-foreground">Tracking</span> {row.original.tracking}</div>
                        <div><span className="text-muted-foreground">Warehouse</span> {row.original.warehouse}</div>
                        <div><span className="text-muted-foreground">Assigned</span> {row.original.assigned}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
