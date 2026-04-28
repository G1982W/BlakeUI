"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChatStore } from "./store";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMain } from "./chat-main";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export function ChatLayout({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  const { mobileDrawerOpen, setMobileDrawerOpen } = useChatStore();
  const layoutRef = useRef<HTMLDivElement>(null);
  const [isCompactPreview, setIsCompactPreview] = useState(false);
  const [layoutBounds, setLayoutBounds] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const el = layoutRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setIsCompactPreview(entry.contentRect.width <= 425);
      const rect = el.getBoundingClientRect();
      setLayoutBounds({ left: rect.left, width: rect.width });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldUseDrawer = isMobile || isCompactPreview;
  const fitToContainerInDesktopCompact = isCompactPreview && !isMobile;

  return (
    <div
      ref={layoutRef}
      className={cn(
        "flex w-full max-w-full min-w-0 max-[1440px]:h-screen min-[1441px]:h-full min-[1441px]:min-h-0 overflow-hidden @container",
        className,
      )}
    >
      {/* Sidebar: full width on mobile, fixed on desktop */}
      <ChatSidebar openInDrawer={shouldUseDrawer} />

      {/* Desktop: chat panel */}
      <div className="hidden flex-1 overflow-hidden @md:flex">
        <ChatMain />
      </div>

      {/* Mobile: chat drawer */}
      <Drawer
        open={shouldUseDrawer && mobileDrawerOpen}
        onOpenChange={setMobileDrawerOpen}
        direction="bottom"
      >
        <DrawerContent
          className={cn(
            "h-[90vh] max-h-[90vh] flex flex-col p-0",
            fitToContainerInDesktopCompact &&
              "data-[vaul-drawer-direction=bottom]:!inset-x-auto data-[vaul-drawer-direction=bottom]:!mt-0 data-[vaul-drawer-direction=bottom]:rounded-t-none data-[vaul-drawer-direction=bottom]:border-x"
          )}
          style={
            fitToContainerInDesktopCompact && layoutBounds
              ? { left: layoutBounds.left, width: layoutBounds.width }
              : undefined
          }
        >
          <ChatMain />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
