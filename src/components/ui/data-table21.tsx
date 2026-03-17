"use client";

import {
  type Column,
  type ColumnDef,
  type ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns3,
  EyeOff,
  Footprints,
  PackageIcon,
  Pin,
  PinOff,
  Shirt,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import type { CSSProperties } from "react";
import * as React from "react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
  initialColumnPinning?: ColumnPinningState;
};

export function useDataTable<TData>(options: UseDataTableOptions<TData>) {
  const {
    data,
    columns,
    getRowId,
    initialSorting = [],
    initialColumnPinning = {},
  } = options;

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [columnOrder, setColumnOrder] = React.useState<string[]>(
    columns.map((col) => col.id as string),
  );
  const [columnPinning, setColumnPinning] =
    React.useState<ColumnPinningState>(initialColumnPinning);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting,
      columnOrder,
      columnPinning,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return {
    table,
    sorting,
    setSorting,
    columnOrder,
    setColumnOrder,
    columnPinning,
    setColumnPinning,
    columnVisibility,
    setColumnVisibility,
  };
}

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  columnId: string;
  columnOrder: string[];
  allColumns: Column<TData, unknown>[];
  onMoveColumn: (columnId: string, direction: "left" | "right") => void;
  onPinColumn: (columnId: string, position: "left" | "right" | false) => void;
  onHideColumn: (columnId: string) => void;
};

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  columnId,
  columnOrder,
  allColumns,
  onMoveColumn,
  onPinColumn,
  onHideColumn,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const canSort = column.getCanSort();
  const sorted = column.getIsSorted();
  const currentIndex = columnOrder.indexOf(columnId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === columnOrder.length - 1;
  const isPinned = column.getIsPinned();

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="truncate text-sm font-medium">{title}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-muted data-[state=open]:bg-muted"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {canSort && (
            <>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="flex items-center gap-2"
              >
                <ArrowUp className="h-4 w-4" />
                <span>Asc</span>
                {sorted === "asc" && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="flex items-center gap-2"
              >
                <ArrowDown className="h-4 w-4" />
                <span>Desc</span>
                {sorted === "desc" && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem
            onClick={() => onPinColumn(columnId, "left")}
            className="flex items-center gap-2"
          >
            <Pin className="h-4 w-4 rotate-[-45deg]" />
            <span>Pin to left</span>
            {isPinned === "left" && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onPinColumn(columnId, "right")}
            className="flex items-center gap-2"
          >
            <Pin className="h-4 w-4 rotate-45" />
            <span>Pin to right</span>
            {isPinned === "right" && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
          {isPinned && (
            <DropdownMenuItem
              onClick={() => onPinColumn(columnId, false)}
              className="flex items-center gap-2"
            >
              <PinOff className="h-4 w-4" />
              <span>Unpin</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => onMoveColumn(columnId, "left")}
            disabled={isFirst}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Move to Left</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onMoveColumn(columnId, "right")}
            disabled={isLast}
            className="flex items-center gap-2"
          >
            <ChevronRight className="h-4 w-4" />
            <span>Move to Right</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2">
              <Columns3 className="h-4 w-4" />
              <span>Columns</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
              {allColumns
                .filter((col) => col.getCanHide())
                .map((col) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      checked={col.getIsVisible()}
                      onCheckedChange={(value) => col.toggleVisibility(!!value)}
                    >
                      {typeof col.columnDef.header === "string"
                        ? col.columnDef.header
                        : col.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuItem
            onClick={() => onHideColumn(columnId)}
            className="flex items-center gap-2"
          >
            <EyeOff className="h-4 w-4" />
            <span>Hide column</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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

type Product = z.infer<typeof schema>;

export const data = [
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

export const productTypes = [
  {
    value: "electronics",
    label: "Electronics",
    icon: Smartphone,
  },
  {
    value: "accessories",
    label: "Accessories",
    icon: ShoppingBag,
  },
  {
    value: "clothing",
    label: "Clothing",
    icon: Shirt,
  },
  {
    value: "footwear",
    label: "Footwear",
    icon: Footprints,
  },
  {
    value: "shoes",
    label: "Shoes",
    icon: PackageIcon,
  },
];

export const columns: ColumnDef<Product>[] = [
  {
    id: "sku",
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => <div className="w-[80px]">{row.original.sku}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "item",
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate font-medium">
        {row.original.item}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const productType = productTypes.find(
        (type) => type.value === row.original.type.toLowerCase(),
      );

      if (!productType) {
        return null;
      }

      return (
        <div className="flex w-[120px] items-center gap-2">
          {productType.icon && (
            <productType.icon className="size-4 text-muted-foreground" />
          )}
          <span>{productType.label}</span>
        </div>
      );
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) {
        return true;
      }
      const rowValue = String(row.getValue(id)).toLowerCase();
      return value.some((type) => String(type).toLowerCase() === rowValue);
    },
  },
  {
    id: "stock",
    accessorKey: "stock",
    header: "In Stock",
    cell: ({ row }) => {
      const inStock: boolean = row.getValue("stock");
      return inStock ? "Yes" : "No";
    },
    enableSorting: true,
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
    enableSorting: true,
  },
  {
    id: "availability",
    accessorKey: "availability",
    header: "Available In",
    cell: ({ row }) => {
      const availability: ("In store" | "Online")[] =
        row.getValue("availability");
      return (
        <div className="flex gap-2">
          {availability.map((location) => (
            <Badge key={location} variant="secondary">
              {location}
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
];

export function DataTable21({ className }: { className?: string }) {
  const { table, columnOrder, setColumnOrder } = useDataTable({
    data: validatedData,
    columns,
    getRowId: (row) => row.id.toString(),
  });

  const handleMoveColumn = React.useCallback(
    (columnId: string, direction: "left" | "right") => {
      setColumnOrder((currentOrder) => {
        const currentIndex = currentOrder.indexOf(columnId);
        if (currentIndex === -1) return currentOrder;

        const newIndex =
          direction === "left" ? currentIndex - 1 : currentIndex + 1;

        if (newIndex < 0 || newIndex >= currentOrder.length) {
          return currentOrder;
        }

        const newOrder = [...currentOrder];
        const [removed] = newOrder.splice(currentIndex, 1);
        newOrder.splice(newIndex, 0, removed);

        return newOrder;
      });
    },
    [setColumnOrder],
  );

  const handlePinColumn = React.useCallback(
    (columnId: string, position: "left" | "right" | false) => {
      table.getColumn(columnId)?.pin(position);
    },
    [table],
  );

  const handleHideColumn = React.useCallback(
    (columnId: string) => {
      table.getColumn(columnId)?.toggleVisibility(false);
    },
    [table],
  );

  const allColumns = table.getAllColumns();
  const visibleColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);
  const visibleColumnIds = table
    .getVisibleLeafColumns()
    .map((column) => column.id);
  const rightPinnedColumnIdSet = new Set(
    table.getState().columnPinning.right ?? [],
  );
  const firstRightPinnedIndex = visibleColumnIds.findIndex((columnId) =>
    rightPinnedColumnIdSet.has(columnId),
  );
  const rightStickyDividerTargetId =
    firstRightPinnedIndex > 0
      ? visibleColumnIds[firstRightPinnedIndex - 1]
      : null;

  return (
    <section className={cn("", className)}>
      <div className="container mx-auto">
        <div className="w-full">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Data Table with Column Controls
            </h2>
            <p className="mt-2 text-muted-foreground">
              A data table with comprehensive column controls including sorting,
              pinning, moving, and visibility management
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border-2">
            <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:hover_td[data-pinned]]:bg-muted/50 [&_tr:not(:last-child)_td]:border-b [&_tr[data-state=selected]_td[data-pinned]]:bg-muted [&_tr[data-state=selected]:hover_td[data-pinned]]:bg-muted">
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const columnWithPinning = header.column as unknown as {
                        getIsPinned?: () => "left" | "right" | false;
                        getIsLastColumn?: (
                          position: "left" | "right",
                        ) => boolean;
                        getIsFirstColumn?: (
                          position: "left" | "right",
                        ) => boolean;
                        getStart?: (position: "left" | "right") => number;
                        getAfter?: (position: "left" | "right") => number;
                        getSize?: () => number;
                      };

                      const pinned = columnWithPinning.getIsPinned?.();
                      const pinnedStyle: CSSProperties = {};
                      let lastPinned: "left" | "right" | undefined;

                      if (pinned) {
                        pinnedStyle.position = "sticky";
                        pinnedStyle.zIndex = 1;

                        if (pinned === "left") {
                          const start =
                            columnWithPinning.getStart?.("left") ?? 0;
                          pinnedStyle.left = `${start}px`;
                          if (columnWithPinning.getIsLastColumn?.("left")) {
                            lastPinned = "left";
                          }
                        }

                        if (pinned === "right") {
                          const after =
                            columnWithPinning.getAfter?.("right") ?? 0;
                          pinnedStyle.right = `${after}px`;
                          if (columnWithPinning.getIsFirstColumn?.("right")) {
                            lastPinned = "right";
                          }
                        }

                        const pinnedWidth = columnWithPinning.getSize?.();
                        if (
                          typeof pinnedWidth === "number" &&
                          Number.isFinite(pinnedWidth)
                        ) {
                          pinnedStyle.width = pinnedWidth;
                        }
                      }

                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          style={pinnedStyle}
                          className={cn(
                            "relative h-11 truncate border-r px-3 text-sm font-medium last:border-r-0 data-[pinned]:bg-muted/90 data-[pinned]:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l",
                            header.column.id === rightStickyDividerTargetId &&
                              "!border-r-0",
                          )}
                          data-pinned={pinned || undefined}
                          data-last-col={lastPinned || undefined}
                        >
                          {header.isPlaceholder ? null : typeof header.column
                              .columnDef.header === "string" ? (
                            <DataTableColumnHeader
                              column={header.column}
                              title={header.column.columnDef.header}
                              columnId={header.column.id}
                              columnOrder={columnOrder}
                              allColumns={allColumns}
                              onMoveColumn={handleMoveColumn}
                              onPinColumn={handlePinColumn}
                              onHideColumn={handleHideColumn}
                            />
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
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
                      className="transition-colors hover:bg-muted/50"
                    >
                      {row.getVisibleCells().map((cell) => {
                        const columnWithPinning = cell.column as unknown as {
                          getIsPinned?: () => "left" | "right" | false;
                          getIsLastColumn?: (
                            position: "left" | "right",
                          ) => boolean;
                          getIsFirstColumn?: (
                            position: "left" | "right",
                          ) => boolean;
                          getStart?: (position: "left" | "right") => number;
                          getAfter?: (position: "left" | "right") => number;
                          getSize?: () => number;
                        };

                        const pinned = columnWithPinning.getIsPinned?.();
                        const pinnedStyle: CSSProperties = {};
                        let lastPinned: "left" | "right" | undefined;

                        if (pinned) {
                          pinnedStyle.position = "sticky";
                          pinnedStyle.zIndex = 1;

                          if (pinned === "left") {
                            const start =
                              columnWithPinning.getStart?.("left") ?? 0;
                            pinnedStyle.left = `${start}px`;
                            if (columnWithPinning.getIsLastColumn?.("left")) {
                              lastPinned = "left";
                            }
                          }

                          if (pinned === "right") {
                            const after =
                              columnWithPinning.getAfter?.("right") ?? 0;
                            pinnedStyle.right = `${after}px`;
                            if (columnWithPinning.getIsFirstColumn?.("right")) {
                              lastPinned = "right";
                            }
                          }

                          const pinnedWidth = columnWithPinning.getSize?.();
                          if (
                            typeof pinnedWidth === "number" &&
                            Number.isFinite(pinnedWidth)
                          ) {
                            pinnedStyle.width = pinnedWidth;
                          }
                        }

                        return (
                          <TableCell
                            key={cell.id}
                            style={pinnedStyle}
                            className={cn(
                              "truncate border-r p-3 py-2 text-sm last:border-r-0 data-[pinned]:bg-background/90 data-[pinned]:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l",
                              cell.column.id === rightStickyDividerTargetId &&
                                "!border-r-0",
                            )}
                            data-pinned={pinned || undefined}
                            data-last-col={lastPinned || undefined}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumnCount}
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
