"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChatStore } from "./store";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMain } from "./chat-main";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export function ChatLayout({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  const { mobileDrawerOpen, setMobileDrawerOpen } = useChatStore();
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const [drawerPortalHost, setDrawerPortalHost] = useState<HTMLDivElement | null>(null);
  const [layoutWidth, setLayoutWidth] = useState<number | null>(null);

  const setLayoutNode = useCallback((node: HTMLDivElement | null) => {
    layoutRef.current = node;
    setDrawerPortalHost(node);
    setLayoutWidth(node ? node.getBoundingClientRect().width : null);
  }, []);

  useEffect(() => {
    const el = layoutRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setLayoutWidth(entry.contentRect.width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldUseDrawer =
    isMobile || (layoutWidth !== null && layoutWidth <= 425);
  /**
   * Docs “mobile” preview (or any narrow host): drawer must size to the preview host, not `vh`,
   * otherwise the sheet overflows the preview frame (e.g. at exactly 425px width).
   */
  const isEmbeddedMobilePreview = !isMobile && shouldUseDrawer;
  const isLayoutWidth425 =
    layoutWidth !== null && Math.round(layoutWidth) === 425;

  return (
    <div
      ref={setLayoutNode}
      className={cn(
        "relative isolate flex w-full max-w-full min-w-0 max-[1440px]:h-screen min-[1441px]:h-full min-[1441px]:min-h-0 overflow-hidden [transform:translateZ(0)] @container",
        className,
      )}
    >
      {/* Sidebar: full width on mobile, fixed on desktop */}
      <ChatSidebar
        openInDrawer={shouldUseDrawer}
        hideSidebarRightBorder={isLayoutWidth425}
      />

      {/* Desktop: chat panel */}
      <div className="hidden flex-1 overflow-hidden @md:flex">
        <ChatMain />
      </div>

      {/* Mobile: chat drawer */}
      <Drawer
        container={isMobile ? undefined : drawerPortalHost ?? undefined}
        open={shouldUseDrawer && mobileDrawerOpen}
        onOpenChange={setMobileDrawerOpen}
        direction="bottom"
      >
        <DrawerContent
          previewDesktopNarrow={isEmbeddedMobilePreview}
          className={cn(
            "flex flex-col p-0",
            isMobile &&
              "min-h-0 h-[100dvh] max-h-[100dvh] data-[vaul-drawer-direction=bottom]:!mt-0 data-[vaul-drawer-direction=bottom]:!h-[100dvh] data-[vaul-drawer-direction=bottom]:!max-h-[100dvh] data-[vaul-drawer-direction=bottom]:rounded-none [&>*:last-child]:flex [&>*:last-child]:min-h-0 [&>*:last-child]:flex-1 [&>*:last-child]:flex-col",
            isEmbeddedMobilePreview &&
              "data-[vaul-drawer-direction=bottom]:!inset-x-auto data-[vaul-drawer-direction=bottom]:!right-auto data-[vaul-drawer-direction=bottom]:!left-1/2 data-[vaul-drawer-direction=bottom]:!-translate-x-1/2 data-[vaul-drawer-direction=bottom]:!w-[min(425px,100%)] data-[vaul-drawer-direction=bottom]:!max-w-full",
          )}
        >
          <ChatMain />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
