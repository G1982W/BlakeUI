"use client";

import * as React from "react";
import { Filter, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const members = [
  { id: "1", name: "Alex Chen", email: "alex@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Sam Wilson", email: "sam@example.com", role: "Editor", status: "Active" },
  { id: "3", name: "Jordan Lee", email: "jordan@example.com", role: "Viewer", status: "Pending" },
];

const roles = ["Admin", "Editor", "Viewer"];

export function SettingsMembers1() {
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<Record<string, boolean>>({
    Admin: true,
    Editor: true,
    Viewer: true,
  });

  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <Input
            type="search"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="primary" size="sm" className="gap-2">
                <Filter className="size-4" />
                Role
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="start">
              <p className="mb-2 text-sm font-medium">Filter by role</p>
              <div className="space-y-2">
                {roles.map((role) => (
                  <label
                    key={role}
                    className="flex cursor-pointer items-center gap-2 text-sm"
                  >
                    <Checkbox
                      checked={roleFilter[role] ?? false}
                      onCheckedChange={(checked) =>
                        setRoleFilter((prev) => ({ ...prev, [role]: !!checked }))
                      }
                    />
                    {role}
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="gap-2">
              <UserPlus className="size-4" />
              Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite members</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Email addresses</label>
                <Textarea
                  placeholder="one@example.com, two@example.com"
                  className="min-h-20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Role</label>
                <NativeSelect>
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </NativeSelect>
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" size="sm">Send invites</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell className="text-muted-foreground">{member.email}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>
                <Badge
                  variant={member.status === "Active" ? "positive" : "warning"}
                  className="text-xs"
                >
                  {member.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
