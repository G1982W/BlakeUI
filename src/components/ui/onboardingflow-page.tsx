"use client";

import OnboardingFlow from "@/components/app-pages/onboardingflow-page-preview/onboarding";
import { cn } from "@/lib/utils";

export interface OnboardingFlowPageProps {
  className?: string;
}

export function OnboardingFlowPage({ className }: OnboardingFlowPageProps) {
  return (
    <OnboardingFlow
      className={cn("bg-background min-h-screen w-full", className)}
    />
  );
}
