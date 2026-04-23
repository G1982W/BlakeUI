"use client";

import { HelpCenterLayout } from "@/components/app-pages/help-center/help-center-layout";
import { cn } from "@/lib/utils";

export interface HelpCenterPageProps {
  className?: string;
}

export function HelpCenterPage({ className }: HelpCenterPageProps) {
  return (
    <div
      className={cn(
        "bg-background flex min-h-[720px] w-full flex-col overflow-hidden rounded-lg border border-border shadow-sm",
        className,
      )}>
      <HelpCenterLayout />
    </div>
  );
}
