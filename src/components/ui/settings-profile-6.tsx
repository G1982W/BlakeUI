"use client";

import * as React from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const steps = [
  { id: "basic", title: "Basic Info", description: "Name and bio" },
  { id: "contact", title: "Contact", description: "Email and phone" },
  { id: "social", title: "Social", description: "Links" },
  { id: "review", title: "Review", description: "Confirm" },
];

const basicSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(2, "Username must be at least 2 characters").regex(/^[a-z0-9_-]+$/i, "Username can only contain letters, numbers, underscore and hyphen"),
  bio: z.string().optional(),
});

const contactSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().optional(),
});

const socialSchema = z.object({
  website: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
});

export function SettingsProfile6() {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    name: "",
    username: "",
    bio: "",
    email: "",
    phone: "",
    website: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const currentStepId = steps[step].id;
  const isLast = step === steps.length - 1;

  const validateStep = (): boolean => {
    if (currentStepId === "basic") {
      const result = basicSchema.safeParse({ name: data.name, username: data.username, bio: data.bio });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const path = String(issue.path[0]);
          if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
        return false;
      }
    } else if (currentStepId === "contact") {
      const result = contactSchema.safeParse({ email: data.email, phone: data.phone });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const path = String(issue.path[0]);
          if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
        return false;
      }
    } else if (currentStepId === "social") {
      const result = socialSchema.safeParse({ website: data.website });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const path = String(issue.path[0]);
          if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const goNext = () => {
    if (isLast) {
      const allResult = basicSchema.safeParse({ name: data.name, username: data.username, bio: data.bio });
      const contactResult = contactSchema.safeParse({ email: data.email, phone: data.phone });
      const socialResult = socialSchema.safeParse({ website: data.website });
      const fieldErrors: Record<string, string> = {};
      if (!allResult.success) allResult.error.issues.forEach((issue) => { const p = String(issue.path[0]); if (p && !fieldErrors[p]) fieldErrors[p] = issue.message; });
      if (!contactResult.success) contactResult.error.issues.forEach((issue) => { const p = String(issue.path[0]); if (p && !fieldErrors[p]) fieldErrors[p] = issue.message; });
      if (!socialResult.success) socialResult.error.issues.forEach((issue) => { const p = String(issue.path[0]); if (p && !fieldErrors[p]) fieldErrors[p] = issue.message; });
      if (Object.keys(fieldErrors).length > 0) { setErrors(fieldErrors); return; }
      setErrors({});
      return;
    }
    if (!validateStep()) return;
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  return (
    <div className="mx-auto max-w-xl w-full rounded-lg border border-border bg-background p-6">
      <div className="mb-8 flex items-center justify-between gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border text-sm font-medium",
                  i < step && "border-brand bg-brand text-white",
                  i === step && "border-brand bg-background text-foreground",
                  i > step && "border-border text-muted-foreground",
                )}
              >
                {i < step ? <Check className="size-4" /> : i + 1}
              </div>
              <p className="mt-2 text-xs mb-0! font-medium">{s.title}</p>
              <p className="text-[10px] my-0! text-muted-foreground">
                {s.description}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className="h-px flex-1 bg-border" aria-hidden />
            )}
          </React.Fragment>
        ))}
      </div>

      {currentStepId === "basic" && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Avatar className="size-20">
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1">
            <Input
              heading="Name"
              placeholder="Your name"
              value={data.name}
              onChange={(e) => { setData((d) => ({ ...d, name: e.target.value })); setErrors((e) => ({ ...e, name: "" })); }}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-1">
            <Input
              heading="Username"
              placeholder="username"
              value={data.username}
              onChange={(e) => { setData((d) => ({ ...d, username: e.target.value })); setErrors((e) => ({ ...e, username: "" })); }}
              aria-invalid={!!errors.username}
            />
            {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
          </div>
          <div className="space-y-1">
            <Textarea
              placeholder="Bio"
              value={data.bio}
              onChange={(e) => setData((d) => ({ ...d, bio: e.target.value }))}
              className="min-h-20"
            />
          </div>
        </div>
      )}
      {currentStepId === "contact" && (
        <div className="space-y-4">
          <div className="space-y-1">
            <Input
              heading="Email"
              type="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => { setData((d) => ({ ...d, email: e.target.value })); setErrors((e) => ({ ...e, email: "" })); }}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-1">
            <Input
              heading="Phone"
              type="tel"
              placeholder="+1 234 567 8900"
              value={data.phone}
              onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
            />
          </div>
        </div>
      )}
      {currentStepId === "social" && (
        <div className="space-y-4">
          <div className="space-y-1">
            <Input
              heading="Website"
              placeholder="https://"
              value={data.website}
              onChange={(e) => { setData((d) => ({ ...d, website: e.target.value })); setErrors((e) => ({ ...e, website: "" })); }}
              aria-invalid={!!errors.website}
            />
            {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
          </div>
        </div>
      )}
      {currentStepId === "review" && (
        <div className="space-y-2 rounded-md border border-border bg-muted/30 p-4 text-sm">
          <p>
            <span className="text-muted-foreground">Name:</span>{" "}
            {data.name || "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Username:</span>{" "}
            {data.username || "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Email:</span>{" "}
            {data.email || "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Phone:</span>{" "}
            {data.phone || "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Website:</span>{" "}
            {data.website || "—"}
          </p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        {step === 0 ? (
          <button
            type="button"
            onClick={() => setStep(steps.length - 1)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Skip to review
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back
          </button>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={goNext}
        >
          {isLast ? "Complete Setup" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
