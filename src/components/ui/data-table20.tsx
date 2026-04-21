"use client";

import {
  type Column,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
};

export function useDataTable<TData>(options: UseDataTableOptions<TData>) {
  const { data, columns, getRowId, initialSorting = [] } = options;

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: { sorting },
    columnResizeMode: "onChange",
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      size: 150,
      minSize: 50,
      maxSize: 500,
    },
  });

  return {
    table,
    sorting,
    setSorting,
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
      <span className="flex h-8 items-center pr-4 text-sm font-medium text-foreground">
        {title}
      </span>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex h-8 w-full items-center justify-between gap-2 px-0 pr-4 text-sm font-medium text-foreground hover:bg-transparent"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      <span className="truncate">{title}</span>
      {sorted === "desc" ? (
        <ArrowDown className="h-4 w-4 shrink-0" />
      ) : sorted === "asc" ? (
        <ArrowUp className="h-4 w-4 shrink-0" />
      ) : (
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
      )}
    </Button>
  );
};

export const schema = z.object({
  id: z.string(),
  item: z.string(),
  type: z.string(),
  stock: z.boolean(),
  sku: z.string(),
  price: z.number(),
  availability: z.array(z.enum(["In store", "Online"])),
});

const data = [
  {
    id: "prod-001",
    item: "Tablet Case",
    type: "Electronics",
    stock: true,
    sku: "TC-001",
    price: 83.24,
    availability: ["In store", "Online"],
  },
  {
    id: "prod-002",
    item: "Smart Watch",
    type: "Electronics",
    stock: true,
    sku: "SW-002",
    price: 246.27,
    availability: ["In store", "Online"],
  },
  {
    id: "prod-003",
    item: "Wool Sweater",
    type: "Accessories",
    stock: true,
    sku: "WS-003",
    price: 168.27,
    availability: ["In store"],
  },
  {
    id: "prod-004",
    item: "Wireless Earbuds",
    type: "Electronics",
    stock: true,
    sku: "WE-004",
    price: 107.75,
    availability: ["In store", "Online"],
  },
  {
    id: "prod-005",
    item: "Laptop Sleeve",
    type: "Electronics",
    stock: true,
    sku: "LS-005",
    price: 248.02,
    availability: ["In store", "Online"],
  },
  {
    id: "prod-006",
    item: "Running Shoes",
    type: "Footwear",
    stock: true,
    sku: "RS-006",
    price: 208.26,
    availability: ["In store"],
  },
  {
    id: "prod-007",
    item: "Winter Jacket",
    type: "Clothing",
    stock: true,
    sku: "WJ-007",
    price: 148.06,
    availability: ["In store"],
  },
  {
    id: "prod-008",
    item: "Phone Case",
    type: "Accessories",
    stock: true,
    sku: "PC-008",
    price: 298.08,
    availability: ["In store", "Online"],
  },
  {
    id: "prod-009",
    item: "Fitness Tracker",
    type: "Clothing",
    stock: true,
    sku: "FT-009",
    price: 222.09,
    availability: ["In store"],
  },
  {
    id: "prod-010",
    item: "Sunglasses",
    type: "Accessories",
    stock: true,
    sku: "SG-010",
    price: 60.17,
    availability: ["In store"],
  },
];

export const validatedData = schema.array().parse(data);

const COLUMN_SIZES = {
  sku: { default: 100, min: 80, max: 150 },
  item: { default: 200, min: 100, max: 400 },
  type: { default: 120, min: 80, max: 200 },
  stock: { default: 100, min: 80, max: 150 },
  price: { default: 120, min: 100, max: 200 },
  availability: { default: 180, min: 120, max: 300 },
} as const;

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
    size: COLUMN_SIZES.sku.default,
    minSize: COLUMN_SIZES.sku.min,
    maxSize: COLUMN_SIZES.sku.max,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "item",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item" />
    ),
    cell: ({ row }) => (
      <div className="truncate font-medium">{row.getValue("item")}</div>
    ),
    size: COLUMN_SIZES.item.default,
    minSize: COLUMN_SIZES.item.min,
    maxSize: COLUMN_SIZES.item.max,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    size: COLUMN_SIZES.type.default,
    minSize: COLUMN_SIZES.type.min,
    maxSize: COLUMN_SIZES.type.max,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="In Stock" />
    ),
    cell: ({ row }) => {
      const inStock = row.getValue("stock") as boolean;
      return inStock ? "Yes" : "No";
    },
    size: COLUMN_SIZES.stock.default,
    minSize: COLUMN_SIZES.stock.min,
    maxSize: COLUMN_SIZES.stock.max,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return (
        <div className="truncate font-medium tabular-nums">{formatted}</div>
      );
    },
    size: COLUMN_SIZES.price.default,
    minSize: COLUMN_SIZES.price.min,
    maxSize: COLUMN_SIZES.price.max,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available In" />
    ),
    cell: ({ row }) => {
      const availability = row.getValue("availability") as (
        | "In store"
        | "Online"
      )[];
      return (
        <div className="flex gap-2">
          {availability.map((location) => (
            <Badge key={location} variant="secondary" className="shrink-0">
              {location}
            </Badge>
          ))}
        </div>
      );
    },
    size: COLUMN_SIZES.availability.default,
    minSize: COLUMN_SIZES.availability.min,
    maxSize: COLUMN_SIZES.availability.max,
    enableSorting: false,
    enableHiding: false,
  },
];

export const DataTable20 = ({ className }: { className?: string }) => {
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
              Data Table with Resizable and sortable columns
            </h2>
            <p className="mt-2 text-muted-foreground">
              A clean and simple data table with sorting capabilities and
              expandable columns width
            </p>
          </div>
          <div className="overflow-hidden rounded-md">
            <div className="overflow-x-auto">
              <Table
                className="relative w-full table-fixed"
                style={{
                  minWidth: table.getCenterTotalSize(),
                }}
              >
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="bg-muted/50">
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className="relative px-2 select-none"
                            style={{
                              width: `${header.getSize()}px`,
                            }}
                            aria-sort={
                              header.column.getIsSorted() === "asc"
                                ? "ascending"
                                : header.column.getIsSorted() === "desc"
                                  ? "descending"
                                  : "none"
                            }
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            {header.column.getCanResize() && (
                              <div
                                onDoubleClick={() => header.column.resetSize()}
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                                className="group/resize absolute top-0 -right-2 z-10 flex h-full w-4 cursor-col-resize touch-none justify-center select-none hover:before:bg-primary active:before:bg-primary"
                                role="separator"
                                aria-label="Resize column"
                              />
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
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="transition-colors hover:bg-muted/50"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="truncate"
                            style={{
                              width: `${cell.column.getSize()}px`,
                              maxWidth: `${cell.column.getSize()}px`,
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <p className="text-muted-foreground">
                            No products found.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
