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
const byRole = {
  Admin: [
    { id: "1", name: "Alex Chen", email: "alex@example.com" },
  ],
  Member: [
    { id: "2", name: "Sam Wilson", email: "sam@example.com" },
    { id: "3", name: "Jordan Lee", email: "jordan@example.com" },
  ],
  Viewer: [
    { id: "4", name: "Casey Kim", email: "casey@example.com" },
  ],
};

const roleVariant: Record<string, "destructive" | "default" | "outline"> = {
  Admin: "destructive",
  Member: "default",
  Viewer: "outline",
};

export function SettingsMembers4() {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Members by role</h2>
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
      <div className="space-y-6">
        {Object.entries(byRole).map(([role, list]) => (
          <div key={role}>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant={roleVariant[role] ?? "outline"}>{role}</Badge>
              <span className="text-xs text-muted-foreground">{list.length} member{list.length !== 1 ? "s" : ""}</span>
            </div>
            <ul className="space-y-1 rounded-md border border-border">
              {list.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between gap-2 px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback>
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{member.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{member.email}</p>
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
                      <DropdownMenuItem>Change role</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
