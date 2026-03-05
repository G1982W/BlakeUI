"use client";

import * as React from "react";
import { User, Mail, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NativeSelect } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";

const sections = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "social", label: "Social Links", icon: Share2 },
  { id: "preferences", label: "Preferences", icon: Settings },
];

export function SettingsProfile4() {
  const [active, setActive] = React.useState("personal");

  return (
    <div className="flex h-[520px] w-full flex-col overflow-hidden rounded-lg border border-border bg-background">
      <header className="shrink-0 border-b border-border px-6 py-4">
        <nav className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Home
          </a>
          <span>/</span>
          <span className="text-foreground">Profile</span>
        </nav>
        <h1 className="text-lg font-semibold">Profile settings</h1>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-48 shrink-0 flex-col border-r border-border bg-muted/30 py-4">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-left text-sm",
                active === s.id
                  ? "border-r-2 border-brand bg-accent font-medium text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <s.icon className="size-4" />
              {s.label}
            </button>
          ))}
        </aside>
        <main className="min-w-0 flex-1 overflow-auto p-6">
          {active === "personal" && (
            <div className="rounded-lg border border-border p-6">
              <h2 className="mb-4 text-sm font-semibold">
                Personal Information
              </h2>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <Avatar className="size-20 shrink-0">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-4">
                  <Input heading="Name" placeholder="Your name" />
                  <Input heading="Username" placeholder="username" />
                  <Textarea placeholder="About you" className="min-h-20" />
                </div>
              </div>
            </div>
          )}
          {active === "contact" && (
            <div className="rounded-lg border border-border p-6">
              <h2 className="mb-4 text-sm font-semibold">Contact</h2>
              <div className="space-y-4">
                <Input
                  heading="Email"
                  type="email"
                  placeholder="you@example.com"
                />
                <Input
                  heading="Phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                />
                <Input heading="Location" placeholder="City, Country" />
                <Input heading="Website" placeholder="https://" />
              </div>
            </div>
          )}
          {active === "social" && (
            <div className="rounded-lg border border-border p-6">
              <h2 className="mb-4 text-sm font-semibold">Social Links</h2>
              <div className="space-y-4">
                <Input
                  heading="Twitter"
                  placeholder="https://twitter.com/..."
                />
                <Input
                  heading="LinkedIn"
                  placeholder="https://linkedin.com/..."
                />
                <Input heading="GitHub" placeholder="https://github.com/..." />
              </div>
            </div>
          )}
          {active === "preferences" && (
            <div className="rounded-lg border border-border p-6">
              <h2 className="mb-4 text-sm font-semibold">Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Language
                  </label>
                  <NativeSelect>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </NativeSelect>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Timezone
                  </label>
                  <NativeSelect>
                    <option>UTC (GMT+0)</option>
                    <option>EST (GMT-5)</option>
                    <option>PST (GMT-8)</option>
                  </NativeSelect>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <div className="flex shrink-0 justify-end gap-2 border-t border-border bg-muted/30 px-6 py-4">
        <Button variant="primary" size="sm">
          Cancel
        </Button>
        <Button variant="secondary" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
}
