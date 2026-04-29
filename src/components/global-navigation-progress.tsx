"use client";

import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

import {
  doneNavigationProgress,
  NAVIGATION_PROGRESS_DONE_EVENT,
  NAVIGATION_PROGRESS_START_EVENT,
  startNavigationProgress,
} from "@/lib/navigation-progress";

const INITIAL_PROGRESS = 8;
const MAX_PROGRESS_BEFORE_DONE = 92;
const STEP_INTERVAL_MS = 240;
const DONE_HIDE_DELAY_MS = 220;

function isInternalNavigationAnchor(anchor: HTMLAnchorElement) {
  if (!anchor.href) return false;
  if (anchor.target === "_blank") return false;
  if (anchor.hasAttribute("download")) return false;
  const url = new URL(anchor.href, window.location.href);
  return url.origin === window.location.origin;
}

export function GlobalNavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const intervalRef = React.useRef<number | null>(null);
  const hideTimeoutRef = React.useRef<number | null>(null);
  const startedRef = React.useRef(false);

  const clearTimers = React.useCallback(() => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (hideTimeoutRef.current != null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const begin = React.useCallback(() => {
    if (typeof window === "undefined") return;
    clearTimers();
    startedRef.current = true;
    setIsVisible(true);
    setProgress((prev) => Math.max(prev, INITIAL_PROGRESS));

    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= MAX_PROGRESS_BEFORE_DONE) return prev;
        const remaining = MAX_PROGRESS_BEFORE_DONE - prev;
        const step = Math.max(1, remaining * 0.1);
        return Math.min(MAX_PROGRESS_BEFORE_DONE, prev + step);
      });
    }, STEP_INTERVAL_MS);
  }, [clearTimers]);

  const complete = React.useCallback(() => {
    if (!startedRef.current) return;
    clearTimers();
    setProgress(100);
    hideTimeoutRef.current = window.setTimeout(() => {
      startedRef.current = false;
      setIsVisible(false);
      setProgress(0);
    }, DONE_HIDE_DELAY_MS);
  }, [clearTimers]);

  React.useEffect(() => {
    begin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const handleStart = () => begin();
    const handleDone = () => complete();

    window.addEventListener(NAVIGATION_PROGRESS_START_EVENT, handleStart);
    window.addEventListener(NAVIGATION_PROGRESS_DONE_EVENT, handleDone);

    return () => {
      window.removeEventListener(NAVIGATION_PROGRESS_START_EVENT, handleStart);
      window.removeEventListener(NAVIGATION_PROGRESS_DONE_EVENT, handleDone);
    };
  }, [begin, complete]);

  React.useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (!isInternalNavigationAnchor(anchor)) return;
      const targetUrl = new URL(anchor.href, window.location.href);
      const isSamePathAndQuery =
        targetUrl.pathname === window.location.pathname &&
        targetUrl.search === window.location.search;
      if (isSamePathAndQuery) return;
      startNavigationProgress();
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  React.useEffect(() => {
    doneNavigationProgress();
  }, [pathname, searchParams]);

  React.useEffect(() => clearTimers, [clearTimers]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-1000 h-1 overflow-hidden"
    >
      <div
        className="h-full bg-brand transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
