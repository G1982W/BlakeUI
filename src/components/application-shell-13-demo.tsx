"use client";

import { ApplicationShell13 } from "@/components/ui/application-shell-13";
import { cn } from "@/lib/utils";

export function ApplicationShell13Demo({ className }: { className?: string }) {
  return (
    <ApplicationShell13
      className={cn(
        "[&>header]:static [&>header]:top-auto [&>header]:z-10 [&>nav]:static [&>nav]:z-10",
        className
      )}
    />
  );
}
