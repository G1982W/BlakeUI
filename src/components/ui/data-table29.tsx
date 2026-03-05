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
import { Input } from "@/components/ui/input";
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

export type EditableRow = {
  id: string;
  name: string;
  quantity: number;
  status: string;
};

const defaultData: EditableRow[] = [
  { id: "1", name: "Item A", quantity: 10, status: "Active" },
  { id: "2", name: "Item B", quantity: 25, status: "Pending" },
  { id: "3", name: "Item C", quantity: 5, status: "Active" },
];

export function DataTable29({
  data: initialData = defaultData,
}: {
  data?: EditableRow[];
}) {
  const [data, setData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [editing, setEditing] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState<string>("");

  const updateCell = (
    rowId: string,
    key: keyof EditableRow,
    value: string | number,
  ) => {
    setData((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, [key]: value } : r)),
    );
    setEditing(null);
  };

  const columns: ColumnDef<EditableRow>[] = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const isEditing = editing === `${row.id}-name`;
          return isEditing ? (
            <Input
              autoFocus
              className="h-8 w-full"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => updateCell(row.id, "name", editValue)}
              onKeyDown={(e) =>
                e.key === "Enter" && updateCell(row.id, "name", editValue)
              }
            />
          ) : (
            <div
              className="min-h-8 cursor-text rounded px-1 py-0.5 -mx-1"
              onDoubleClick={() => {
                setEditing(`${row.id}-name`);
                setEditValue(row.original.name);
              }}
            >
              {row.original.name}
            </div>
          );
        },
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => {
          const isEditing = editing === `${row.id}-quantity`;
          return isEditing ? (
            <Input
              type="number"
              autoFocus
              className="h-8 w-20"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() =>
                updateCell(row.id, "quantity", parseInt(editValue, 10) || 0)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                updateCell(row.id, "quantity", parseInt(editValue, 10) || 0)
              }
            />
          ) : (
            <div
              className="min-h-8 cursor-text tabular-nums rounded px-1 py-0.5 -mx-1"
              onDoubleClick={() => {
                setEditing(`${row.id}-quantity`);
                setEditValue(String(row.original.quantity));
              }}
            >
              {row.original.quantity}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 -ml-2 font-normal"
              >
                {row.original.status}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => updateCell(row.id, "status", "Active")}
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateCell(row.id, "status", "Pending")}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateCell(row.id, "status", "Inactive")}
              >
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [editing, editValue],
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
        <h2 className="text-lg font-semibold">Editable cells</h2>
        <p className="text-sm text-muted-foreground">
          Double-click a cell to edit. Use context for status.
        </p>
      </div>
      <div className="max-h-[280px] overflow-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map((headerGroup: HeaderGroup<EditableRow>) => (
                <TableRow
                  key={headerGroup.id}
                  className="sticky top-0 bg-muted/80"
                >
                  {headerGroup.headers.map(
                    (header: Header<EditableRow, unknown>) => {
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
            {table.getRowModel().rows.map((row: Row<EditableRow>) => (
              <TableRow key={row.id}>
                {row
                  .getVisibleCells()
                  .map((cell: Cell<EditableRow, unknown>) => (
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
