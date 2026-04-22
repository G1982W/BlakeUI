"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useChatStore } from "./store";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMain } from "./chat-main";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

export function ChatLayout() {
  const isMobile = useIsMobile();
  const { mobileDrawerOpen, setMobileDrawerOpen } = useChatStore();

  return (
    <div className="flex h-screen overflow-hidden @container w-full">
      {/* Sidebar: full width on mobile, fixed on desktop */}
      <ChatSidebar />

      {/* Desktop: chat panel */}
      <div className="hidden flex-1 overflow-hidden @md:flex">
        <ChatMain />
      </div>

      {/* Mobile: chat drawer */}
      <Drawer
        open={isMobile && mobileDrawerOpen}
        onOpenChange={setMobileDrawerOpen}
        direction="bottom">
        <DrawerContent className="h-[90vh] max-h-[90vh] flex flex-col p-0">
          <ChatMain />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
