"use client";

import * as React from "react";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { NativeSelect } from "@/components/ui/native-select";
const members = [
  { id: "1", name: "Alex Chen", email: "alex@example.com", role: "Admin" },
  { id: "2", name: "Sam Wilson", email: "sam@example.com", role: "Member" },
  { id: "3", name: "Jordan Lee", email: "jordan@example.com", role: "Viewer" },
];

const roleVariant: Record<string, "destructive" | "default" | "outline"> = {
  Admin: "destructive",
  Member: "default",
  Viewer: "outline",
};

export function SettingsMembers2() {
  const [search, setSearch] = React.useState("");

  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Members</h2>
        <p className="text-sm text-muted-foreground">
          Manage who has access.{" "}
          <a href="#" className="text-brand hover:underline">Learn more</a>
        </p>
      </div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="gap-2">
              <UserPlus className="size-4" />
              Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input type="email" placeholder="colleague@example.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Role</label>
                <NativeSelect>
                  <option>Admin</option>
                  <option>Member</option>
                  <option>Viewer</option>
                </NativeSelect>
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" size="sm">Send invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="divide-y divide-border rounded-md border border-border">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between gap-4 px-4 py-3"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <Avatar className="size-10 shrink-0">
                <AvatarFallback>
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <Badge variant={roleVariant[member.role] ?? "outline"} className="shrink-0">
                {member.role}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" size="sm" className="size-8 shrink-0 p-0">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Change role</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>
    </div>
  );
}
