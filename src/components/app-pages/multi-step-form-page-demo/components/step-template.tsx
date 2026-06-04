import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  MailIcon,
  BotIcon,
  ZapIcon,
  PlusIcon,
} from "lucide-react";

interface StepTemplateProps {
  onContinue: () => void;
  onBack: () => void;
}

const templates = [
  {
    id: "blank",
    label: "Start from Scratch",
    description: "Begin with an empty canvas",
    icon: PlusIcon,
  },
  {
    id: "crm",
    label: "CRM Pipeline",
    description: "Track leads and deals",
    icon: LayoutDashboardIcon,
  },
  {
    id: "email-automation",
    label: "Email Automation",
    description: "Automate email sequences",
    icon: MailIcon,
  },
  {
    id: "data-pipeline",
    label: "Data Pipeline",
    description: "Collect and transform data",
    icon: ZapIcon,
  },
  {
    id: "ai-chatbot",
    label: "AI Chatbot",
    description: "Build a conversational assistant",
    icon: BotIcon,
  },
  {
    id: "report-generator",
    label: "Report Generator",
    description: "Auto-generate reports",
    icon: FileTextIcon,
  },
];

export const StepTemplate = ({ onContinue, onBack }: StepTemplateProps) => {
  const [selected, setSelected] = useState("blank");

  return (
    <div className="flex min-h-full flex-1 items-start justify-center p-6 @sm/msf:p-8 @lg/msf:p-16">
      <div className="w-full max-w-xl">
        <div className="mb-10 @lg/msf:mb-16">
          <h1 className="text-foreground mb-3 text-2xl leading-tight font-semibold @sm/msf:text-3xl @lg/msf:text-4xl">
            Choose a starting point
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Pick a template to get started quickly, or start from scratch.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-2 @3xl/msf:grid-cols-2 @sm/msf:gap-3 @lg/msf:mb-16">
          {templates.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 text-left transition-all",
                  selected === t.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white hover:border-primary/40 dark:bg-transparent",
                )}
              >
                <Icon
                  className={cn(
                    "mt-0.5 size-5 shrink-0",
                    selected === t.id
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                />
                <div>
                  <p className="text-foreground text-sm font-medium">
                    {t.label}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {t.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <Button variant="primary" onClick={onBack} size="lg">
            <ChevronLeftIcon className="size-4" />
            Back
          </Button>
          <Button
            onClick={onContinue}
            className="flex flex-1 justify-between"
            size="lg"
          >
            Continue
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
