"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  Factory,
  Globe,
  CheckCircle2,
  CreditCard,
  Building2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "./store";
import type { FormData } from "./store";
import { StepIndicator } from "./step-indicator";
import { CoverPanel } from "./cover-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function validateStep(step: number, data: FormData) {
  switch (step) {
    case 2:
      if (!data.teamName.trim()) return "Team account name is required";
      return null;
    case 3:
      if (!data.companyName.trim()) return "Company name is required";
      if (!data.industry) return "Please select an industry";
      return null;
    case 4:
      if (!data.nameOnCard.trim()) return "Name on card is required";
      if (data.cardNumber.replace(/\s/g, "").length < 16)
        return "Enter a valid 16-digit card number";
      if (!data.expirationMonth) return "Select expiration month";
      if (!data.expirationYear) return "Select expiration year";
      if (data.cvv.length < 3) return "Enter a valid CVV";
      return null;
    default:
      return null;
  }
}

export default function OnboardingFlow({ className }: { className?: string }) {
  const { currentStep, formData, next, prev, update, reset } =
    useOnboardingStore();
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    const err = validateStep(currentStep, formData);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    next();
  };

  const handlePrev = () => {
    setError(null);
    prev();
  };

  const handleUpdate = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setError(null);
    update(field, value);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Choose Account Type</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Select the type that best fits your use case.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 @md/form:grid-cols-2">
              {[
                {
                  value: "personal" as const,
                  icon: User,
                  title: "Personal Account",
                  desc: "For individuals and freelancers",
                },
                {
                  value: "corporate" as const,
                  icon: Briefcase,
                  title: "Corporate Account",
                  desc: "For teams and organizations",
                },
              ].map(({ value, icon: Icon, title, desc }) => (
                <button
                  key={value}
                  onClick={() => handleUpdate("accountType", value)}
                  className={cn(
                    "flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all",
                    formData.accountType === value
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "border-border bg-white hover:border-primary/50 hover:bg-muted/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg",
                      formData.accountType === value
                        ? "bg-primary/10"
                        : "bg-white",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5",
                        formData.accountType === value
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium">{title}</div>
                    <div className="text-muted-foreground mt-0.5 text-sm">
                      {desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Account Info</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Set up your account details.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>Team Size</Label>
              <div className="grid grid-cols-2 gap-2 @md/form:grid-cols-4">
                {["1-1", "2-10", "10-50", "50+"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleUpdate("teamSize", size)}
                    className={cn(
                      "rounded-lg border py-3 text-sm font-medium transition-all",
                      formData.teamSize === size
                        ? "border-primary bg-primary/5 text-primary ring-2 ring-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="teamName">
                Team Account Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="teamName"
                placeholder="e.g. Acme Corp"
                value={formData.teamName}
                onChange={(e) => handleUpdate("teamName", e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Account Plan</Label>
              <RadioGroup
                value={formData.accountPlan}
                onValueChange={(v) => handleUpdate("accountPlan", v)}
                className="space-y-2"
              >
                {[
                  {
                    value: "company",
                    icon: Factory,
                    title: "Company Account",
                    desc: "Full access for teams",
                  },
                  {
                    value: "developer",
                    icon: User,
                    title: "Developer Account",
                    desc: "Ideal for building and testing",
                  },
                  {
                    value: "testing",
                    icon: Globe,
                    title: "Testing Account",
                    desc: "Sandbox environment access",
                  },
                ].map(({ value, icon: Icon, title, desc }) => (
                  <label
                    key={value}
                    htmlFor={`plan-${value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all",
                      formData.accountPlan === value
                        ? "border-primary bg-primary/5"
                        : "border-border bg-white hover:bg-muted/50",
                    )}
                  >
                    <Icon className="text-muted-foreground size-5 shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{title}</div>
                      <div className="text-muted-foreground text-xs">
                        {desc}
                      </div>
                    </div>
                    <RadioGroupItem value={value} id={`plan-${value}`} />
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Business Details</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Tell us about your business.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="companyName">
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="companyName"
                  placeholder="Acme Inc."
                  value={formData.companyName}
                  onChange={(e) => handleUpdate("companyName", e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label>
                  Industry <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.industry}
                  onValueChange={(v) => handleUpdate("industry", v)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={(e) => handleUpdate("website", e.target.value)}
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Billing Details</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Your card is stored securely and never shared.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nameOnCard">
                  Name on Card <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nameOnCard"
                  placeholder="John Doe"
                  value={formData.nameOnCard}
                  onChange={(e) => handleUpdate("nameOnCard", e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cardNumber">
                  Card Number <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleUpdate(
                        "cardNumber",
                        formatCardNumber(e.target.value),
                      )
                    }
                    inputMode="numeric"
                    className="bg-white pr-10"
                  />
                  <CreditCard className="text-muted-foreground absolute top-1/2 right-3 size-4 -translate-y-1/2" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 @md/form:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>
                    Expiry Date <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={formData.expirationMonth || undefined}
                      onValueChange={(v) => handleUpdate("expirationMonth", v)}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem
                            key={i + 1}
                            value={String(i + 1).padStart(2, "0")}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.expirationYear || undefined}
                      onValueChange={(v) => handleUpdate("expirationYear", v)}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={2025 + i} value={String(2025 + i)}>
                            {2025 + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cvv">
                    CVV <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="•••"
                    maxLength={4}
                    value={formData.cvv}
                    onChange={(e) =>
                      handleUpdate(
                        "cvv",
                        e.target.value.replace(/\D/g, "").slice(0, 4),
                      )
                    }
                    inputMode="numeric"
                    className="bg-white"
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">
                    Save card for future billing
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Securely saved for future payments
                  </div>
                </div>
                <Switch
                  checked={formData.saveCard}
                  onCheckedChange={(v) => handleUpdate("saveCard", v)}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center gap-6 py-4 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500/10 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="size-10 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Your account has been created successfully.
              </p>
            </div>
            <div className="w-full rounded-xl border bg-muted/30 p-4 text-left">
              <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="size-3.5" />
                Account Summary
              </div>
              <div className="space-y-2">
                {[
                  {
                    icon: User,
                    label: "Account Type",
                    value:
                      formData.accountType === "corporate"
                        ? "Corporate Account"
                        : "Personal Account",
                  },
                  {
                    icon: Factory,
                    label: "Plan",
                    value:
                      formData.accountPlan === "company"
                        ? "Company"
                        : formData.accountPlan === "developer"
                          ? "Developer"
                          : "Testing",
                  },
                  ...(formData.companyName
                    ? [
                        {
                          icon: Building2,
                          label: "Company",
                          value: formData.companyName,
                        },
                      ]
                    : []),
                  ...(formData.teamName
                    ? [{ icon: Globe, label: "Team", value: formData.teamName }]
                    : []),
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="text-muted-foreground size-4 shrink-0" />
                    <span className="text-muted-foreground text-sm">
                      {label}
                    </span>
                    <span className="ml-auto text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={reset}>
              Start Over
            </Button>
          </div>
        );
    }
  };

  return (
    <ResizablePanelGroup
      id="onboarding-preview"
      direction="horizontal"
      className={cn(
        "max-[1440px]:h-screen min-[1441px]:h-full min-[1441px]:min-h-0",
        className,
      )}
    >
      <ResizablePanel defaultSize={100} minSize={40}>
        <div className="@container/outer mx-auto h-full min-h-0 max-w-360">
          <div className="grid h-full min-h-0 @xl/outer:grid-cols-2">
            <CoverPanel />

          {/* Form side */}
          <div className="@container/form flex h-full flex-col overflow-y-auto">
            {/* Mobile header */}
            <div className="flex items-center gap-2 border-b px-6 py-4 @xl/outer:hidden">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                <div className="size-2.5 rounded-sm bg-primary" />
              </div>
              <span className="text-sm font-semibold">Acme Inc.</span>
            </div>

            <div className="flex flex-1 flex-col justify-center px-6 py-10 @md/form:px-10 @2xl/form:px-16">
              <div className="mx-auto w-full max-w-md">
                <StepIndicator currentStep={currentStep} />

                <div className="mt-8 min-h-[320px]">{renderStep()}</div>

                {currentStep < 5 && (
                  <>
                    {error && (
                      <p className="text-destructive mt-4 text-sm">{error}</p>
                    )}
                    <div className="mt-6 flex items-center justify-between border-t pt-5">
                      <Button
                        variant="primary"
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        className="gap-1.5"
                      >
                        <ChevronLeft className="size-4" />
                        Back
                      </Button>
                      <Button onClick={handleNext} className="gap-1.5">
                        {currentStep === 4 ? "Submit" : "Continue"}
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={0} minSize={0} />
    </ResizablePanelGroup>
  );
}
