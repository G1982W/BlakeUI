import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, PlusIcon, XIcon } from "lucide-react";

interface StepInviteTeamProps {
  onBack: () => void;
}

export const StepInviteTeam = ({ onBack }: StepInviteTeamProps) => {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<string[]>([]);

  const addInvite = () => {
    const trimmed = email.trim();
    if (trimmed && !invites.includes(trimmed)) {
      setInvites((prev) => [...prev, trimmed]);
      setEmail("");
    }
  };

  const removeInvite = (target: string) => {
    setInvites((prev) => prev.filter((e) => e !== target));
  };

  return (
    <div className="flex min-h-full flex-1 items-start justify-center p-6 @sm:p-8 @lg:p-16">
      <div className="w-full max-w-xl">
        <div className="mb-10 @lg:mb-16">
          <div className="mb-3 flex items-center gap-2">
            <h1 className="text-foreground text-2xl leading-tight font-semibold @sm:text-3xl @lg:text-4xl">
              Invite your team
            </h1>
            <Badge variant="secondary">Optional</Badge>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Collaborate with your team by inviting them now, or do it later from
            settings.
          </p>
        </div>

        <div className="mb-4 space-y-2">
          <Label htmlFor="invite-email">Email address</Label>
          <div className="flex gap-2">
            <Input
              id="invite-email"
              type="email"
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInvite();
                }
              }}
            />
            <Button
              variant="primary"
              size="sm"
              onClick={addInvite}
              className="shrink-0"
            >
              <PlusIcon className="size-4" />
            </Button>
          </div>
        </div>

        {invites.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2 @lg:mb-16">
            {invites.map((inv) => (
              <Badge key={inv} variant="secondary" className="gap-1 pr-1">
                {inv}
                <button
                  onClick={() => removeInvite(inv)}
                  className="hover:bg-muted rounded p-0.5"
                >
                  <XIcon className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="primary" onClick={onBack} size="lg">
            <ChevronLeftIcon className="size-4" />
            Back
          </Button>
          <Button className="flex-1" size="lg">
            {invites.length > 0
              ? `Finish & Send ${invites.length} Invite${invites.length > 1 ? "s" : ""}`
              : "Finish Setup"}
          </Button>
        </div>
      </div>
    </div>
  );
};
