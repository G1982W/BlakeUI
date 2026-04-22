"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea
} from "@/components/ui/input-group";
import { ChevronDown, MoreHorizontal, Phone, Send, Video, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore, type Message } from "./store";
import { useIsMobile } from "@/hooks/use-mobile";

function MessageBubble({
  message,
  senderAvatarUrl
}: {
  message: Message;
  senderAvatarUrl?: string;
}) {
  const isUser = message.sender === "user";

  return (
    <div className={cn("flex items-end gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="mb-1 size-7 shrink-0">
          {senderAvatarUrl ? (
            <AvatarImage src={senderAvatarUrl} alt={message.senderName ?? ""} />
          ) : null}
          <AvatarFallback className="text-[11px]">
            {message.senderName?.charAt(0) ?? "?"}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("flex max-w-[65%] flex-col gap-1", isUser && "items-end")}>
        {!isUser && message.senderName && (
          <span className="text-muted-foreground ml-1 text-[11px] font-medium">
            {message.senderName}
          </span>
        )}
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted text-foreground rounded-bl-sm"
          )}>
          {message.content}
        </div>
        <span className="text-muted-foreground px-1 text-[10px]">{message.timestamp}</span>
      </div>
    </div>
  );
}

export function ChatMain() {
  const { activeChatId, contacts, groups, messages, sendMessage, setMobileDrawerOpen } =
    useChatStore();
  const isMobile = useIsMobile();
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const allContacts = [...contacts, ...groups];
  const activeContact = allContacts.find((c) => c.id === activeChatId);
  const activeMessages = messages[activeChatId] ?? [];

  const avatarByFirstName = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of contacts) {
      const first = c.name.split(" ")[0];
      if (first && c.avatar) map.set(first, c.avatar);
    }
    return map;
  }, [contacts]);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, [activeMessages.length]);

  // Reset input and scroll when switching chats
  useEffect(() => {
    setInput("");
    scrollToBottom("instant");
  }, [activeChatId]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(activeChatId, trimmed);
    setInput("");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeContact) return null;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="size-9">
              {activeContact.avatar ? (
                <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
              ) : null}
              <AvatarFallback className="text-sm">
                {activeContact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="text-sm font-semibold">{activeContact.name}</h2>
            <p className="text-muted-foreground text-xs">
              {activeContact.isGroup
                ? `${activeContact.members} members`
                : activeContact.status === "online"
                  ? "Active now"
                  : activeContact.status === "away"
                    ? "Away"
                    : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {!activeContact.isGroup && (
            <>
              <Button variant="ghost" size="icon" className="text-muted-foreground size-8">
                <Phone className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground size-8">
                <Video className="size-4" />
              </Button>
            </>
          )}
          {activeContact.isGroup && (
            <Button variant="ghost" size="icon" className="text-muted-foreground size-8">
              <Users className="size-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="text-muted-foreground size-8">
            <MoreHorizontal className="size-4" />
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground size-8"
              onClick={() => setMobileDrawerOpen(false)}>
              <ChevronDown className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {activeMessages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <div className="bg-muted flex size-12 items-center justify-center rounded-full">
              <Send className="text-muted-foreground size-5" />
            </div>
            <p className="text-muted-foreground text-sm">No messages yet. Say hello!</p>
          </div>
        )}
        {activeMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            senderAvatarUrl={
              msg.sender === "other" && msg.senderName
                ? avatarByFirstName.get(msg.senderName)
                : undefined
            }
          />
        ))}
      </div>

      <div className="border-t px-4 py-3">
        <InputGroup className="bg-muted/50 items-end rounded-xl py-1.5 pr-1.5 pl-2">
          <InputGroupTextarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="field-sizing-content max-h-32 min-h-8 py-2 pr-0 pl-1 text-sm"
          />
          <InputGroupAddon align="inline-end" className="self-end py-0">
            <InputGroupButton
              variant="primary"
              size="icon-sm"
              className="rounded-lg"
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send message">
              <Send className="size-3.5" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
