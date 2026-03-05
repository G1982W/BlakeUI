"use client";

import * as React from "react";
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

  const currentStepId = steps[step].id;
  const isLast = step === steps.length - 1;

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
          <Input
            heading="Name"
            placeholder="Your name"
            value={data.name}
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
          />
          <Input
            heading="Username"
            placeholder="username"
            value={data.username}
            onChange={(e) =>
              setData((d) => ({ ...d, username: e.target.value }))
            }
          />
          <Textarea
            placeholder="Bio"
            value={data.bio}
            onChange={(e) => setData((d) => ({ ...d, bio: e.target.value }))}
            className="min-h-20"
          />
        </div>
      )}
      {currentStepId === "contact" && (
        <div className="space-y-4">
          <Input
            heading="Email"
            type="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
          />
          <Input
            heading="Phone"
            type="tel"
            placeholder="+1 234 567 8900"
            value={data.phone}
            onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
          />
        </div>
      )}
      {currentStepId === "social" && (
        <div className="space-y-4">
          <Input
            heading="Website"
            placeholder="https://"
            value={data.website}
            onChange={(e) =>
              setData((d) => ({ ...d, website: e.target.value }))
            }
          />
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
          onClick={() =>
            setStep((s) => (isLast ? s : Math.min(steps.length - 1, s + 1)))
          }
        >
          {isLast ? "Complete Setup" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
