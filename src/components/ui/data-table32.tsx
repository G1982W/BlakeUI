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
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  GripVertical,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type MultiSortRow = {
  id: string;
  name: string;
  status: string;
  role: string;
  value: string;
};

const defaultData: MultiSortRow[] = [
  { id: "1", name: "Alice", status: "Active", role: "Admin", value: "100" },
  { id: "2", name: "Bob", status: "Pending", role: "User", value: "200" },
  { id: "3", name: "Carol", status: "Active", role: "Editor", value: "150" },
  { id: "4", name: "Dave", status: "Inactive", role: "User", value: "80" },
  { id: "5", name: "Eve", status: "Active", role: "Admin", value: "300" },
];

type SortRule = { id: string; desc: boolean };

export function DataTable32({ data = defaultData }: { data?: MultiSortRow[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "name", desc: false },
  ]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [sortPopoverOpen, setSortPopoverOpen] = React.useState(false);
  const [sortRules, setSortRules] = React.useState<SortRule[]>([
    { id: "name", desc: false },
  ]);

  const columns: ColumnDef<MultiSortRow>[] = React.useMemo(
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
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.status}</Badge>
        ),
      },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "value", header: "Value" },
    ],
    [],
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

  const applySortRules = () => {
    setSorting(sortRules.map((r) => ({ id: r.id, desc: r.desc })));
    setSortPopoverOpen(false);
  };

  const addSort = (id: string) => {
    if (sortRules.some((r) => r.id === id)) return;
    setSortRules((prev) => [...prev, { id, desc: false }]);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">Multi-sort</h2>
          <p className="text-sm text-muted-foreground">
            Add and reorder sort rules.
          </p>
        </div>
        <Popover open={sortPopoverOpen} onOpenChange={setSortPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              Sort
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="end">
            <div className="space-y-2">
              <p className="text-sm font-medium">Sort priority</p>
              {sortRules.map((rule, i) => (
                <div key={rule.id} className="flex items-center gap-2 text-sm">
                  <GripVertical className="size-4 text-muted-foreground" />
                  <span className="flex-1 capitalize">{rule.id}</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7"
                    onClick={() =>
                      setSortRules((p) =>
                        p.map((r, j) =>
                          j === i ? { ...r, desc: !r.desc } : r,
                        ),
                      )
                    }
                  >
                    {rule.desc ? (
                      <ArrowDown className="size-4" />
                    ) : (
                      <ArrowUp className="size-4" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7"
                    onClick={() =>
                      setSortRules((p) => p.filter((_, j) => j !== i))
                    }
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-1 pt-2">
                {["name", "status", "role", "value"]
                  .filter((id) => !sortRules.some((r) => r.id === id))
                  .map((id) => (
                    <Button
                      key={id}
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                      onClick={() => addSort(id)}
                    >
                      + {id}
                    </Button>
                  ))}
              </div>
              <Button size="sm" className="w-full" onClick={applySortRules}>
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="overflow-x-auto rounded-md">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map((headerGroup: HeaderGroup<MultiSortRow>) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header: Header<MultiSortRow, unknown>) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ),
                  )}
                </TableRow>
              ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row: Row<MultiSortRow>) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row
                  .getVisibleCells()
                  .map((cell: Cell<MultiSortRow, unknown>) => (
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
