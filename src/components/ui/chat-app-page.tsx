"use client";

import { ChatLayout } from "@/components/app-pages/chat-app/chat-layout";
import { cn } from "@/lib/utils";

export interface ChatAppPageProps {
  className?: string;
}

export function ChatAppPage({ className }: ChatAppPageProps) {
  return (
    <div className={cn("bg-background min-h-screen w-full", className)}>
      <ChatLayout />
    </div>
  );
}
