import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface StepFirstFlowProps {
  onContinue: () => void;
  onBack: () => void;
}

export const StepFirstFlow = ({ onContinue, onBack }: StepFirstFlowProps) => {
  const [flowName, setFlowName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex min-h-full flex-1 items-start justify-center p-6 @sm/msf:p-8 @lg/msf:p-16">
      <div className="w-full max-w-xl">
        <div className="mb-10 @lg/msf:mb-16">
          <div className="mb-3 flex items-center gap-2">
            <h1 className="text-foreground text-2xl leading-tight font-semibold @sm/msf:text-3xl @lg/msf:text-4xl">
              Build your first flow
            </h1>
            <Badge variant="secondary">Optional</Badge>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Give your first automation a name and describe what it should do.
            You can skip this step and create flows later.
          </p>
        </div>

        <div className="mb-6 space-y-2">
          <Label htmlFor="flow-name">Flow name</Label>
          <Input
            id="flow-name"
            placeholder="e.g., Weekly Report Generator"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            className="bg-white dark:bg-transparent"
          />
        </div>

        <div className="mb-10 space-y-2 @lg/msf:mb-16">
          <Label htmlFor="flow-description">Description</Label>
          <Textarea
            id="flow-description"
            placeholder="Describe what this flow should do..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white dark:bg-transparent"
          />
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
