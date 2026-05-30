"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./components/sidebar";
import { StepRoleUseCase } from "./components/step-role-use-case";
import { StepTemplate } from "./components/step-template";
import { StepDataSource } from "./components/step-data-source";
import { StepFirstFlow } from "./components/step-first-flow";
import { StepInviteTeam } from "./components/step-invite-team";

export interface OnboardingStep {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
  optional?: boolean;
}

const initialSteps: OnboardingStep[] = [
  { id: "role", title: "Role & Use Case", completed: false, current: true },
  {
    id: "template",
    title: "Choose a Template",
    completed: false,
    current: false,
  },
  {
    id: "data-source",
    title: "Data Source Setup",
    completed: false,
    current: false,
  },
  {
    id: "first-flow",
    title: "Build Your First Flow",
    completed: false,
    current: false,
    optional: true,
  },
  {
    id: "invite-team",
    title: "Invite Team",
    completed: false,
    current: false,
    optional: true,
  },
];

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<OnboardingStep[]>(initialSteps);

  const goToStep = (index: number) => {
    if (index < 0 || index >= steps.length) return;

    setSteps((prev) =>
      prev.map((step, i) => ({
        ...step,
        current: i === index,
        completed: i < index ? true : step.completed,
      })),
    );
    setCurrentStep(index);
  };

  const handleContinue = () => {
    goToStep(currentStep + 1);
  };

  const handleBack = () => {
    goToStep(currentStep - 1);
  };

  const stepComponents = [
    <StepRoleUseCase key="role" onContinue={handleContinue} />,
    <StepTemplate
      key="template"
      onContinue={handleContinue}
      onBack={handleBack}
    />,
    <StepDataSource
      key="data-source"
      onContinue={handleContinue}
      onBack={handleBack}
    />,
    <StepFirstFlow
      key="first-flow"
      onContinue={handleContinue}
      onBack={handleBack}
    />,
    <StepInviteTeam key="invite-team" onBack={handleBack} />,
  ];

  return (
    <div className="flex min-h-0 w-full min-w-0 flex-col @lg/msf:flex-row max-[1440px]:min-h-screen min-[1441px]:h-full min-[1441px]:min-h-0">
      <Sidebar steps={steps} currentStep={currentStep} onStepClick={goToStep} />

      <main className="min-h-0 flex-1 pb-20 @lg/msf:pb-0">
        {stepComponents[currentStep]}
      </main>

      <div className="bg-background fixed right-0 bottom-0 left-0 border-t p-4 @lg/msf:hidden">
        <div className="flex items-center justify-center gap-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                step.completed
                  ? "bg-primary"
                  : step.current
                    ? "bg-primary"
                    : "bg-muted-foreground/30",
              )}
            />
          ))}
        </div>
        <p className="text-muted-foreground mt-2 text-center text-sm">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
