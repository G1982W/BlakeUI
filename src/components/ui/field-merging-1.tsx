"use client";

import * as React from "react";
import { Merge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: "1",
    name: "Alex Chen",
    company: "Acme Inc",
    role: "Admin",
    email: "alex@example.com",
  },
  {
    id: "2",
    name: "Alex Chen",
    company: "Acme Corp",
    role: "Member",
    email: "a.chen@acme.com",
  },
  {
    id: "3",
    name: "Sam Wilson",
    company: "Beta Co",
    role: "Editor",
    email: "sam@example.com",
  },
];

const fieldKeys = ["name", "company", "role", "email"] as const;

export function FieldMerging1() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [mergeOpen, setMergeOpen] = React.useState(false);
  const [mergedField, setMergedField] = React.useState<Record<string, string>>(
    {},
  );

  const selectedUsers = users.filter((u) => selected.has(u.id));
  const canMerge = selectedUsers.length >= 2;

  const setRowSelected = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const getMergedValue = (key: string) => {
    const chosen = mergedField[key];
    if (chosen) {
      const user = selectedUsers.find((u) => u.id === chosen);
      return user ? (user as Record<string, string>)[key] : "";
    }
    return selectedUsers[0]
      ? (selectedUsers[0] as Record<string, string>)[key]
      : "";
  };

  React.useEffect(() => {
    if (!mergeOpen) return;
    const initialSelected = users.filter((u) => selected.has(u.id));
    if (initialSelected.length >= 2) {
      setMergedField(
        Object.fromEntries(fieldKeys.map((k) => [k, initialSelected[0].id])),
      );
    }
  }, [mergeOpen]);

  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Users</h2>
        <Dialog open={mergeOpen} onOpenChange={setMergeOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
              disabled={!canMerge}
            >
              <Merge className="size-4" />
              Merge selected
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Merge duplicate records</DialogTitle>
            </DialogHeader>
            <div className="grid min-w-0 gap-6 sm:grid-cols-2">
              <div className="min-w-0 space-y-4 rounded-lg bg-muted/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Source records
                </p>
                {selectedUsers.slice(0, 2).map((u) => (
                  <div
                    key={u.id}
                    className="flex min-w-0 items-center gap-3 rounded-md border border-border bg-background p-3"
                  >
                    <Avatar className="size-10 shrink-0">
                      <AvatarFallback>
                        {u.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 overflow-hidden text-sm">
                      <p className="truncate font-medium">{u.name}</p>
                      <p className="truncate text-muted-foreground">
                        {u.company} · {u.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="min-w-0 space-y-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Choose value per field
                </p>
                <div className="grid min-w-0 gap-3">
                  {fieldKeys.map((key) => (
                    <div
                      key={key}
                      className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <label className="shrink-0 text-sm font-medium capitalize">
                        {key}
                      </label>
                      <RadioGroup
                        value={mergedField[key] ?? ""}
                        onValueChange={(id) =>
                          setMergedField((prev) => ({ ...prev, [key]: id }))
                        }
                        className="flex min-w-0 flex-wrap gap-4"
                      >
                        {selectedUsers.slice(0, 2).map((u) => (
                          <label
                            key={u.id}
                            className="flex min-w-0 max-w-full cursor-pointer items-center gap-2 text-sm"
                          >
                            <RadioGroupItem value={u.id} className="shrink-0" />
                            <span className="truncate">
                              {(u as Record<string, string>)[key]}
                            </span>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="min-w-0 rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Merged preview
              </p>
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarFallback>
                    {getMergedValue("name")
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 overflow-hidden text-sm">
                  <p className="truncate font-medium">
                    {getMergedValue("name")}
                  </p>
                  <p className="truncate text-muted-foreground">
                    {getMergedValue("company")} · {getMergedValue("email")}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {getMergedValue("role")}
                  </Badge>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setMergeOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="secondary" size="sm">
                Merge records
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10" />
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={selected.has(user.id)}
                  onCheckedChange={(checked) =>
                    setRowSelected(user.id, checked === true)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {user.name}
                </div>
              </TableCell>
              <TableCell>{user.company}</TableCell>
              <TableCell>
                <Badge variant="secondary">{user.role}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
