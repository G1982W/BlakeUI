import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

interface StepRoleUseCaseProps {
  onContinue: () => void;
}

const roles = [
  { id: "product-manager", label: "Product Manager" },
  { id: "developer", label: "Developer" },
  { id: "designer", label: "Designer" },
  { id: "ops", label: "Ops" },
  { id: "founder", label: "Founder" },
  { id: "other", label: "Other" },
];

const automationOptions = [
  { id: "data-collection", label: "Data collection & processing" },
  { id: "emails", label: "Sending emails or messages" },
  { id: "dashboard", label: "Dashboard updates" },
  { id: "repetitive-tasks", label: "Repetitive internal tasks" },
  { id: "ai-assistant", label: "Building your own AI assistant" },
  { id: "other", label: "Other" },
];

export const StepRoleUseCase = ({ onContinue }: StepRoleUseCaseProps) => {
  const [selectedRole, setSelectedRole] = useState("product-manager");
  const [selectedAutomation, setSelectedAutomation] = useState<string[]>([
    "data-collection",
    "repetitive-tasks",
  ]);

  const toggleAutomation = (option: string) => {
    setSelectedAutomation((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  return (
    <div className="flex min-h-full flex-1 items-start justify-center p-6 @sm:p-8 @lg:p-16 max-[1300px]:!p-[30px]">
      <div className="w-full max-w-xl">
        <div className="mb-10 @lg:mb-16">
          <h1 className="text-foreground mb-3 text-2xl leading-tight font-semibold @sm:text-3xl @lg:text-4xl">
            Let&#39;s personalize your experience
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Tell us a bit about you so we can tailor templates, suggestions, and
            features to your needs.
          </p>
        </div>

        <div className="mb-10 @lg:mb-12">
          <h4 className="text-foreground mb-4 text-lg @lg:mb-8 @lg:text-xl">
            What best describes your role?
          </h4>
          <div className="grid grid-cols-2 gap-2 @sm:gap-3 min-[1440px]:grid-cols-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "rounded-lg border p-3 text-left text-sm font-medium transition-all @sm:p-4",
                  selectedRole === role.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white text-foreground hover:border-primary/40",
                )}
              >
                <div className="flex min-w-0 items-center gap-2 @sm:gap-3">
                  <span
                    className={cn(
                      "inline-block size-2.5 shrink-0 rounded-full",
                      selectedRole === role.id
                        ? "bg-primary"
                        : "bg-muted-foreground/50",
                    )}
                    aria-hidden
                  />
                  {role.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10 @lg:mb-16">
          <h4 className="text-foreground mb-4 text-lg @lg:mb-8 @lg:text-xl">
            What do you want to automate first?
          </h4>
          <div className="grid grid-cols-1 gap-2 @sm:grid-cols-2 @sm:gap-3">
            {automationOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleAutomation(option.id)}
                className={cn(
                  "rounded-lg border p-3 text-left text-sm font-medium transition-all @sm:p-4",
                  selectedAutomation.includes(option.id)
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white text-foreground hover:border-primary/40",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={onContinue}
          className="flex w-full justify-between"
          size="lg"
        >
          Continue
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
