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
import { ArrowDown, ArrowUp, ChevronsUpDown, MoreHorizontal } from "lucide-react";
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

export type VirtualRow = {
  id: string;
  name: string;
  status: string;
  role: string;
  amount: string;
};

const defaultData: VirtualRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  name: `Record ${i + 1}`,
  status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Completed",
  role: i % 2 === 0 ? "Admin" : "User",
  amount: `$${(i + 1) * 100}`,
}));

export function DataTable27({ data = defaultData }: { data?: VirtualRow[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<VirtualRow>[] = React.useMemo(
    () => [
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
      { accessorKey: "name", header: "Name" },
      { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge> },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "amount", header: "Amount", cell: ({ row }) => <span className="tabular-nums">{row.original.amount}</span> },
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
              <DropdownMenuItem>View</DropdownMenuItem>
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
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-4">
      <div>
        <h2 className="text-lg font-semibold">Virtualized table</h2>
        <p className="text-sm text-muted-foreground">Fixed height, sortable, row selection, row actions.</p>
      </div>
      <div className="max-h-[360px] overflow-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<VirtualRow>) => (
              <TableRow key={headerGroup.id} className="sticky top-0 bg-muted/80">
                {headerGroup.headers.map((header: Header<VirtualRow, unknown>) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id}>
                      {canSort && header.id !== "select" && header.id !== "actions" ? (
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
            {table.getRowModel().rows.map((row: Row<VirtualRow>) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell: Cell<VirtualRow, unknown>) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
