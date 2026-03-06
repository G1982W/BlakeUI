"use client";

import * as React from "react";
import { z } from "zod";
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

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(2, "Username must be at least 2 characters").regex(/^[a-z0-9_-]+$/i, "Username can only contain letters, numbers, underscore and hyphen"),
  about: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  twitter: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  linkedin: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  github: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  language: z.string().min(1, "Please select a language"),
  timezone: z.string().min(1, "Please select a timezone"),
});

export function SettingsProfile4() {
  const [active, setActive] = React.useState("personal");
  const [data, setData] = React.useState({
    name: "",
    username: "",
    about: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    twitter: "",
    linkedin: "",
    github: "",
    language: "English",
    timezone: "UTC (GMT+0)",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSave = () => {
    const result = profileSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = String(issue.path[0]);
        if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // Save logic here
  };

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
                  <Textarea
                    placeholder="About you"
                    className="min-h-20"
                    value={data.about}
                    onChange={(e) => setData((d) => ({ ...d, about: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}
          {active === "contact" && (
            <div className="rounded-lg border border-border p-6">
              <h2 className="mb-4 text-sm font-semibold">Contact</h2>
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
                <div className="space-y-1">
                  <Input
                    heading="Location"
                    placeholder="City, Country"
                    value={data.location}
                    onChange={(e) => setData((d) => ({ ...d, location: e.target.value }))}
                  />
                </div>
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
            </div>
          )}
          {active === "social" && (
            <div className="rounded-lg border border-border p-6">
              <h2 className="mb-4 text-sm font-semibold">Social Links</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Input
                    heading="Twitter"
                    placeholder="https://twitter.com/..."
                    value={data.twitter}
                    onChange={(e) => { setData((d) => ({ ...d, twitter: e.target.value })); setErrors((e) => ({ ...e, twitter: "" })); }}
                    aria-invalid={!!errors.twitter}
                  />
                  {errors.twitter && <p className="text-xs text-destructive">{errors.twitter}</p>}
                </div>
                <div className="space-y-1">
                  <Input
                    heading="LinkedIn"
                    placeholder="https://linkedin.com/..."
                    value={data.linkedin}
                    onChange={(e) => { setData((d) => ({ ...d, linkedin: e.target.value })); setErrors((e) => ({ ...e, linkedin: "" })); }}
                    aria-invalid={!!errors.linkedin}
                  />
                  {errors.linkedin && <p className="text-xs text-destructive">{errors.linkedin}</p>}
                </div>
                <div className="space-y-1">
                  <Input
                    heading="GitHub"
                    placeholder="https://github.com/..."
                    value={data.github}
                    onChange={(e) => { setData((d) => ({ ...d, github: e.target.value })); setErrors((e) => ({ ...e, github: "" })); }}
                    aria-invalid={!!errors.github}
                  />
                  {errors.github && <p className="text-xs text-destructive">{errors.github}</p>}
                </div>
              </div>
            </div>
          )}
          {active === "preferences" && (
            <div className="rounded-lg border border-border p-6">
              <h2 className="mb-4 text-sm font-semibold">Preferences</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="mb-1 block text-sm font-medium">
                    Language
                  </label>
                  <NativeSelect
                    value={data.language}
                    onChange={(e) => { setData((d) => ({ ...d, language: e.target.value })); setErrors((e) => ({ ...e, language: "" })); }}
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </NativeSelect>
                  {errors.language && <p className="text-xs text-destructive">{errors.language}</p>}
                </div>
                <div className="space-y-1">
                  <label className="mb-1 block text-sm font-medium">
                    Timezone
                  </label>
                  <NativeSelect
                    value={data.timezone}
                    onChange={(e) => { setData((d) => ({ ...d, timezone: e.target.value })); setErrors((e) => ({ ...e, timezone: "" })); }}
                  >
                    <option>UTC (GMT+0)</option>
                    <option>EST (GMT-5)</option>
                    <option>PST (GMT-8)</option>
                  </NativeSelect>
                  {errors.timezone && <p className="text-xs text-destructive">{errors.timezone}</p>}
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
        <Button variant="secondary" size="sm" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
