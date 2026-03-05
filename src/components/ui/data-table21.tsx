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
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronDown, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Badge } from "@/components/ui/badge";

export type ColumnManageRow = {
  id: string;
  sku: string;
  name: string;
  type: string;
  stock: string;
  availability: string;
};

const defaultData: ColumnManageRow[] = [
  {
    id: "1",
    sku: "SKU-001",
    name: "Widget A",
    type: "Product",
    stock: "In stock",
    availability: "Available",
  },
  {
    id: "2",
    sku: "SKU-002",
    name: "Widget B",
    type: "Product",
    stock: "Low",
    availability: "Limited",
  },
  {
    id: "3",
    sku: "SKU-003",
    name: "Service Pack",
    type: "Service",
    stock: "In stock",
    availability: "Available",
  },
];

export function DataTable21({
  data = defaultData,
}: {
  data?: ColumnManageRow[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<
    Record<string, boolean>
  >({});

  const columns: ColumnDef<ColumnManageRow>[] = React.useMemo(
    () => [
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => (
          <span className="font-mono text-xs uppercase">
            {row.original.sku}
          </span>
        ),
      },
      { accessorKey: "name", header: "Item name" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "stock", header: "Stock" },
      {
        accessorKey: "availability",
        header: "Availability",
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.availability}</Badge>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const ColumnHeaderMenu = ({
    columnId,
    title,
  }: {
    columnId: string;
    title: string;
  }) => {
    const column = table.getColumn(columnId);
    if (!column) return <span>{title}</span>;
    const canSort = column.getCanSort();
    const sorted = column.getIsSorted();
    const isVisible = column.getIsVisible();
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="primary" size="sm" className="-ml-3 h-8 gap-1">
            {title}
            {canSort &&
              (sorted === "desc" ? (
                <ArrowDown className="size-4" />
              ) : sorted === "asc" ? (
                <ArrowUp className="size-4" />
              ) : (
                <ChevronDown className="size-4 opacity-50" />
              ))}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {canSort && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                Sort ascending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                Sort descending
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => column.toggleVisibility(!isVisible)}>
            {isVisible ? (
              <EyeOff className="mr-2 size-4" />
            ) : (
              <Eye className="mr-2 size-4" />
            )}
            {isVisible ? "Hide column" : "Show column"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-4">
      <div>
        <h2 className="text-lg font-semibold">Column management</h2>
        <p className="text-sm text-muted-foreground">
          Use header menus to sort and hide columns.
        </p>
      </div>
      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map((headerGroup: HeaderGroup<ColumnManageRow>) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header: Header<ColumnManageRow, unknown>) => (
                      <TableHead key={header.id}>
                        {header.id === "sku" && (
                          <ColumnHeaderMenu columnId="sku" title="SKU" />
                        )}
                        {header.id === "name" && (
                          <ColumnHeaderMenu columnId="name" title="Item name" />
                        )}
                        {header.id === "type" && (
                          <ColumnHeaderMenu columnId="type" title="Type" />
                        )}
                        {header.id === "stock" && (
                          <ColumnHeaderMenu columnId="stock" title="Stock" />
                        )}
                        {header.id === "availability" && (
                          <ColumnHeaderMenu
                            columnId="availability"
                            title="Availability"
                          />
                        )}
                      </TableHead>
                    ),
                  )}
                </TableRow>
              ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row: Row<ColumnManageRow>) => (
              <TableRow key={row.id}>
                {row
                  .getVisibleCells()
                  .map((cell: Cell<ColumnManageRow, unknown>) => (
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
    </div>
  );
}
