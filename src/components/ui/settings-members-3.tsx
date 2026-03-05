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
  { id: "1", name: "Alex Chen", email: "alex@example.com", role: "Admin", joinDate: "Jan 2024" },
  { id: "2", name: "Sam Wilson", email: "sam@example.com", role: "Member", joinDate: "Feb 2024" },
  { id: "3", name: "Jordan Lee", email: "jordan@example.com", role: "Viewer", joinDate: "Mar 2024" },
];

const roleVariant: Record<string, "destructive" | "default" | "outline"> = {
  Admin: "destructive",
  Member: "default",
  Viewer: "outline",
};

export function SettingsMembers3() {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Team members</h2>
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-start justify-between gap-2 rounded-lg border border-border p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarFallback>
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">{member.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant={roleVariant[member.role] ?? "outline"} className="text-xs">
                  {member.role}
                </Badge>
                <span className="text-xs text-muted-foreground">{member.joinDate}</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" size="sm" className="size-8 shrink-0 p-0">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Send email</DropdownMenuItem>
                <DropdownMenuItem>Change role</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
}
