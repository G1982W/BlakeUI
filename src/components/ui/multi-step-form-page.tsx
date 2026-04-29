"use client";

import MultiStepFormApp from "@/components/app-pages/multi-step-form/page";
import { cn } from "@/lib/utils";

export interface MultiStepFormPageProps {
  className?: string;
}

export function MultiStepFormPage({ className }: MultiStepFormPageProps) {
  return (
    <div className={cn("bg-background w-full", className)}>
      <MultiStepFormApp />
    </div>
  );
}
