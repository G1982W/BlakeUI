"use client";

import { cn } from "@/lib/utils";
import Page from "@/components/app-pages/multi-step-form-page-demo/page";

export function MultiStepFormPageDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "@container/msf min-h-0 w-full overflow-hidden bg-background max-[1440px]:min-h-0 min-[1441px]:h-full min-[1441px]:min-h-0",
        className,
      )}>
      <Page />
    </div>
  );
}
