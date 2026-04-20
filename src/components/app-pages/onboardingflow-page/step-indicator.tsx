"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Account Type" },
  { id: 2, title: "Account Info" },
  { id: 3, title: "Business" },
  { id: 4, title: "Billing" },
  { id: 5, title: "Complete" },
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden items-center sm:flex">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className="relative flex flex-1 flex-col items-center"
          >
            {index > 0 && (
              <div
                className={cn(
                  "absolute top-5 right-1/2 h-0.5 w-full -translate-y-1/2",
                  currentStep > step.id - 1 ? "bg-primary" : "bg-border",
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all",
                currentStep > step.id
                  ? "bg-primary text-primary-foreground"
                  : currentStep === step.id
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {currentStep > step.id ? <Check className="size-4" /> : step.id}
            </div>
            <span
              className={cn(
                "mt-2 text-center text-xs font-medium",
                currentStep >= step.id
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold">
            {STEPS[currentStep - 1]?.title}
          </span>
          <span className="text-muted-foreground text-xs">
            Step {currentStep} of {STEPS.length}
          </span>
        </div>
        <div className="flex gap-1">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                currentStep > step.id
                  ? "bg-primary"
                  : currentStep === step.id
                    ? "bg-primary/60"
                    : "bg-muted",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
