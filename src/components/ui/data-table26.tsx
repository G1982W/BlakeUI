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
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type TransactionRow = {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: string;
  category: string;
};

const defaultData: TransactionRow[] = [
  { id: "1", date: "2024-01-15", description: "Payment received", amount: "$1,200.00", status: "Completed", category: "Income" },
  { id: "2", date: "2024-01-14", description: "Office supplies", amount: "-$89.50", status: "Pending", category: "Expense" },
  { id: "3", date: "2024-01-13", description: "Subscription", amount: "-$29.99", status: "Completed", category: "Expense" },
  { id: "4", date: "2024-01-12", description: "Invoice #1024", amount: "$450.00", status: "Completed", category: "Income" },
  { id: "5", date: "2024-01-11", description: "Refund", amount: "$50.00", status: "Completed", category: "Income" },
];

const statusVariant = (s: string) => (s === "Completed" ? "positive" : "warning");

export function DataTable26({ data = defaultData }: { data?: TransactionRow[] }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const step = 120;
    scrollRef.current.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const columns: ColumnDef<TransactionRow>[] = React.useMemo(
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
      { accessorKey: "date", header: "Date", cell: ({ row }) => <span className="whitespace-nowrap">{row.original.date}</span> },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "amount", header: "Amount", cell: ({ row }) => <span className="tabular-nums font-medium">{row.original.amount}</span> },
      { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant={statusVariant(row.original.status) as "positive" | "warning"}>{row.original.status}</Badge> },
      { accessorKey: "category", header: "Category" },
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
        <h2 className="text-lg font-semibold">Transactions</h2>
        <p className="text-sm text-muted-foreground">Sticky columns and scroll controls.</p>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={() => scroll("left")} aria-label="Scroll left">
          <ArrowLeft className="size-4" />
        </Button>
        <div ref={scrollRef} className="min-w-0 flex-1 overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<TransactionRow>) => (
                <TableRow key={headerGroup.id} className="bg-muted/50">
                  {headerGroup.headers.map((header: Header<TransactionRow, unknown>, i) => {
                    const sticky = i < 2;
                    const canSort = header.column.getCanSort();
                    const sorted = header.column.getIsSorted();
                    return (
                      <TableHead
                        key={header.id}
                        className={sticky ? "sticky left-0 z-10 bg-muted/90 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]" : ""}
                        style={sticky ? { minWidth: 100 } : undefined}
                      >
                        {canSort ? (
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
              {table.getRowModel().rows.map((row: Row<TransactionRow>) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell: Cell<TransactionRow, unknown>, i) => (
                    <TableCell
                      key={cell.id}
                      className={i < 2 ? "sticky left-0 z-10 bg-background shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]" : ""}
                      style={i < 2 ? { minWidth: 100 } : undefined}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={() => scroll("right")} aria-label="Scroll right">
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
