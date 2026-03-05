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
  type ColumnSizingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const defaultColumnSizing: ColumnSizingState = {
  sku: 100,
  name: 180,
  type: 90,
  stock: 90,
  availability: 110,
};

export type ResizeRow = {
  id: string;
  sku: string;
  name: string;
  type: string;
  stock: string;
  availability: string;
};

const defaultData: ResizeRow[] = [
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

export function DataTable20({ data = defaultData }: { data?: ResizeRow[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnSizing, setColumnSizing] =
    React.useState<ColumnSizingState>(defaultColumnSizing);
  const [resizingCol, setResizingCol] = React.useState<string | null>(null);

  const columns: ColumnDef<ResizeRow>[] = React.useMemo(
    () => [
      {
        accessorKey: "sku",
        header: "SKU",
        size: 100,
        minSize: 60,
        cell: ({ row }) => (
          <span className="font-mono text-xs uppercase">
            {row.original.sku}
          </span>
        ),
      },
      { accessorKey: "name", header: "Item name", size: 180, minSize: 80 },
      { accessorKey: "type", header: "Type", size: 90, minSize: 60 },
      { accessorKey: "stock", header: "Stock", size: 90, minSize: 60 },
      {
        accessorKey: "availability",
        header: "Availability",
        size: 110,
        minSize: 80,
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
    state: { sorting, columnSizing },
    onSortingChange: setSorting,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });

  const startResize = (columnId: string, clientX: number) => {
    setResizingCol(columnId);
    const col = table.getColumn(columnId);
    const startW = col ? col.getSize() : 100;
    const startX = clientX;
    const onMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      setColumnSizing((p) => ({
        ...p,
        [columnId]: Math.max(60, startW + delta),
      }));
    };
    const onUp = () => {
      setResizingCol(null);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-4">
      <div>
        <h2 className="text-lg font-semibold">Resizable columns</h2>
        <p className="text-sm text-muted-foreground">
          Drag the handle on the right of a header to resize.
        </p>
      </div>
      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map((headerGroup: HeaderGroup<ResizeRow>) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header: Header<ResizeRow, unknown>) => {
                      const colId = header.column.id;
                      const width = header.column.getSize();
                      const canSort = header.column.getCanSort();
                      const sorted = header.column.getIsSorted();
                      return (
                        <TableHead
                          key={header.id}
                          style={{ width, minWidth: width, maxWidth: width }}
                          className="relative"
                        >
                          <div className="flex items-center gap-1">
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
                          </div>
                          <div
                            role="separator"
                            className={cn(
                              "absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none bg-transparent hover:bg-brand/30",
                              resizingCol === colId && "bg-brand/50",
                            )}
                            onMouseDown={(e) => startResize(colId, e.clientX)}
                            aria-label={`Resize ${colId}`}
                          />
                        </TableHead>
                      );
                    },
                  )}
                </TableRow>
              ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row: Row<ResizeRow>) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell: Cell<ResizeRow, unknown>) => {
                  const w = cell.column.getSize();
                  return (
                    <TableCell
                      key={cell.id}
                      style={{ width: w, minWidth: w, maxWidth: w }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
