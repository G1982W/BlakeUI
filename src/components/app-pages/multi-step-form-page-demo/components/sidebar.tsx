import { cn } from "@/lib/utils";
import { CheckIcon, BoxIcon } from "lucide-react";
import type { OnboardingStep } from "../page";

interface SidebarProps {
  steps: OnboardingStep[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export const Sidebar = ({ steps, currentStep, onStepClick }: SidebarProps) => {
  return (
    <div className="hidden w-80 flex-col bg-gradient-to-b from-black to-indigo-700 p-6 text-white @lg:flex">
      <div className="mb-12 flex items-center gap-3 pt-4">
        <BoxIcon className="size-6" />
      </div>

      <div className="flex-1 space-y-1">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => {
              if (step.completed || index <= currentStep) onStepClick(index);
            }}
            className={cn(
              "flex w-full items-center gap-4 rounded-lg p-3 text-left transition-all duration-200",
              step.current && "bg-white/10",
              (step.completed || index <= currentStep) && "cursor-pointer",
            )}
          >
            <div
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                step.completed
                  ? "border-green-400 bg-green-400"
                  : step.current
                    ? "border-white bg-transparent"
                    : "border-white/30",
              )}
            >
              {step.completed ? (
                <CheckIcon className="text-gray-800 size-3.5" />
              ) : step.current ? (
                <div className="bg-white size-2 rounded-full" />
              ) : (
                <span className="text-white/60 text-xs">{index + 1}</span>
              )}
            </div>
            <div className="flex-1">
              <span
                className={cn(
                  "text-sm font-medium",
                  step.current ? "text-white" : "text-white/70",
                )}
              >
                {step.title}
              </span>
              {step.optional && (
                <span className="text-white/50 block text-xs">Optional</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="text-white/60 mt-auto flex justify-between pt-8 text-sm">
        <span>Terms of Service</span>
        <span>Help Center</span>
      </div>
    </div>
  );
};
