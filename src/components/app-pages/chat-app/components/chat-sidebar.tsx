"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, SquarePen, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore, type Contact } from "../store";
import { useRef, useState } from "react";

const STATUS_COLOR: Record<string, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  offline: "bg-muted-foreground/40",
};

function ContactItem({ contact }: { contact: Contact }) {
  const { activeChatId, setActiveChatId } = useChatStore();
  const isActive = contact.id === activeChatId;

  return (
    <button
      className={cn(
        "hover:bg-muted/60 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
        isActive && "bg-muted",
      )}
      onClick={() => setActiveChatId(contact.id)}
    >
      <div className="relative shrink-0">
        <Avatar className="size-10">
          {contact.avatar ? (
            <AvatarImage src={contact.avatar} alt={contact.name} />
          ) : null}
          <AvatarFallback
            className={cn("text-sm font-medium", isActive && "bg-background")}
          >
            {contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        {contact.status && !contact.isGroup && (
          <span
            className={cn(
              "border-background absolute right-0 bottom-0 size-2.5 rounded-full border-2",
              STATUS_COLOR[contact.status],
            )}
          />
        )}
        {contact.isGroup && (
          <span className="bg-muted border-background absolute right-0 bottom-0 flex size-4 items-center justify-center rounded-full border-2">
            <Users className="text-muted-foreground size-2.5" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium">{contact.name}</span>
          <span className="text-muted-foreground shrink-0 text-[11px]">
            {contact.timestamp}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground truncate text-xs">
            {contact.lastMessage}
          </p>
          {contact.unread > 0 && (
            <Badge className="bg-primary text-primary-foreground flex size-4 shrink-0 items-center justify-center rounded-full p-0 text-[10px] leading-none">
              {contact.unread}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}

export function ChatSidebar() {
  const { contacts, groups, activeTab, setActiveTab } = useChatStore();
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex w-full shrink-0 flex-col space-y-4 border-r p-4 md:w-72">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Messages</h1>
        <Button variant="ghost" size="icon" className="size-8">
          <SquarePen className="size-4" />
          <span className="sr-only">New chat</span>
        </Button>
      </div>

      <ButtonGroup className="w-full">
        <Input
          ref={searchInputRef}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 min-w-0 text-sm shadow-none"
        />
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="shrink-0 border shadow-none"
          aria-label="Search"
          onClick={() => searchInputRef.current?.focus()}
        >
          <Search className="size-4" />
        </Button>
      </ButtonGroup>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "personal" | "groups")}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <ButtonGroup className="mb-2 w-full">
          <Button
            type="button"
            variant={activeTab === "personal" ? "secondary" : "outline"}
            size="sm"
            className="flex-1 border shadow-none"
            aria-pressed={activeTab === "personal"}
            onClick={() => setActiveTab("personal")}
          >
            Personal
          </Button>
          <Button
            type="button"
            variant={activeTab === "groups" ? "secondary" : "outline"}
            size="sm"
            className="flex-1 border shadow-none"
            aria-pressed={activeTab === "groups"}
            onClick={() => setActiveTab("groups")}
          >
            Groups
            {groups.some((g) => g.unread > 0) && (
              <span className="bg-primary text-primary-foreground ml-1.5 flex size-4 items-center justify-center rounded-full text-[10px]">
                {groups.reduce((sum, g) => sum + g.unread, 0)}
              </span>
            )}
          </Button>
        </ButtonGroup>

        <TabsContent value="personal" className="mt-0 flex-1 overflow-y-auto">
          <div className="space-y-0.5">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <ContactItem key={c.id} contact={c} />
              ))
            ) : (
              <p className="text-muted-foreground py-6 text-center text-sm">
                No contacts found
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="mt-0 flex-1 overflow-y-auto">
          <div className="space-y-0.5">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((g) => <ContactItem key={g.id} contact={g} />)
            ) : (
              <p className="text-muted-foreground py-6 text-center text-sm">
                No groups found
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
