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
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type InventoryRow = {
  id: string;
  sku: string;
  name: string;
  type: string;
  stock: string;
  price: string;
  availability: string;
};

const defaultData: InventoryRow[] = [
  {
    id: "1",
    sku: "SKU-001",
    name: "Widget A",
    type: "Product",
    stock: "In stock",
    price: "$29.99",
    availability: "Available",
  },
  {
    id: "2",
    sku: "SKU-002",
    name: "Widget B",
    type: "Product",
    stock: "Low",
    price: "$49.99",
    availability: "Limited",
  },
  {
    id: "3",
    sku: "SKU-003",
    name: "Service Pack",
    type: "Service",
    stock: "In stock",
    price: "$99.00",
    availability: "Available",
  },
  {
    id: "4",
    sku: "SKU-004",
    name: "Gadget X",
    type: "Product",
    stock: "Out",
    price: "$19.99",
    availability: "Unavailable",
  },
  {
    id: "5",
    sku: "SKU-005",
    name: "Bundle Y",
    type: "Bundle",
    stock: "In stock",
    price: "$149.00",
    availability: "Available",
  },
];

const stockVariant = (stock: string) =>
  stock === "In stock" ? "positive" : stock === "Low" ? "warning" : "negative";

export function DataTable5({ data = defaultData }: { data?: InventoryRow[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<InventoryRow>[] = React.useMemo(
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
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className={cn(
              stockVariant(row.original.stock) === "positive" &&
                "border-green-500/50 text-green-700 dark:text-green-400",
              stockVariant(row.original.stock) === "warning" &&
                "border-amber-500/50 text-amber-700 dark:text-amber-400",
            )}
          >
            {row.original.stock}
          </Badge>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="tabular-nums">{row.original.price}</span>
        ),
      },
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
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-4">
      <div>
        <h2 className="text-lg font-semibold">Inventory</h2>
        <p className="text-sm text-muted-foreground">
          Fixed-height table with sticky header and scroll.
        </p>
      </div>
      <div className="overflow-hidden rounded-md border border-border">
        <div className="max-h-[320px] overflow-auto">
          <Table>
            <TableHeader>
              {table
                .getHeaderGroups()
                .map((headerGroup: HeaderGroup<InventoryRow>) => (
                  <TableRow
                    key={headerGroup.id}
                    className="sticky top-0 z-10 bg-muted/80 backdrop-blur"
                  >
                    {headerGroup.headers.map(
                      (header: Header<InventoryRow, unknown>) => {
                        const canSort = header.column.getCanSort();
                        const sorted = header.column.getIsSorted();
                        return (
                          <TableHead key={header.id}>
                            {canSort ? (
                              <Button
                                variant="secondary"
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
              {table.getRowModel().rows.map((row: Row<InventoryRow>) => (
                <TableRow key={row.id}>
                  {row
                    .getVisibleCells()
                    .map((cell: Cell<InventoryRow, unknown>) => (
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
      <p className="text-xs text-muted-foreground sm:hidden">
        Swipe horizontally to see all columns.
      </p>
    </div>
  );
}
