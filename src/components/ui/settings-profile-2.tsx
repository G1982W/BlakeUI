"use client";

import * as React from "react";
import { z } from "zod";
import { Camera, Globe, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(2, "Username must be at least 2 characters").regex(/^[a-z0-9_-]+$/i, "Username can only contain letters, numbers, underscore and hyphen"),
  bio: z.string().optional(),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  website: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  twitter: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  linkedin: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  github: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
});

export function SettingsProfile2() {
  const [data, setData] = React.useState({
    name: "",
    username: "",
    bio: "",
    jobTitle: "",
    company: "",
    location: "",
    website: "",
    twitter: "",
    linkedin: "",
    github: "",
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
    <div className="mx-auto max-w-xl rounded-lg border border-border bg-background p-6">
      <div className="flex flex-col items-center gap-4 border-b border-border pb-6">
        <div className="relative">
          <Avatar className="size-24">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button
            variant="primary"
            size="sm"
            className="absolute bottom-0 right-0 size-8 rounded-full p-0"
            aria-label="Upload photo"
          >
            <Camera className="size-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Click to change photo</p>
      </div>

      <div className="border-b border-border py-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Personal Information
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
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
            <label className="mb-1 block text-sm font-medium">Username</label>
            <div className="flex rounded-md border border-input">
              <span className="flex items-center border-r border-input bg-muted/50 px-3 text-sm text-muted-foreground">
                @
              </span>
              <input
                className="h-9 min-w-0 flex-1 rounded-r-md border-0 bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="username"
                value={data.username}
                onChange={(e) => { setData((d) => ({ ...d, username: e.target.value })); setErrors((e) => ({ ...e, username: "" })); }}
                aria-invalid={!!errors.username}
              />
            </div>
            {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <label className="mb-1 block text-sm font-medium">Bio</label>
          <Textarea
            className="min-h-20"
            placeholder="Tell us about yourself"
            value={data.bio}
            onChange={(e) => setData((d) => ({ ...d, bio: e.target.value }))}
          />
        </div>
      </div>

      <div className="border-b border-border py-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Work
        </h3>
        <div className="space-y-4">
          <div className="space-y-1">
            <Input
              heading="Job title"
              placeholder="e.g. Designer"
              value={data.jobTitle}
              onChange={(e) => { setData((d) => ({ ...d, jobTitle: e.target.value })); setErrors((e) => ({ ...e, jobTitle: "" })); }}
              aria-invalid={!!errors.jobTitle}
            />
            {errors.jobTitle && <p className="text-xs text-destructive">{errors.jobTitle}</p>}
          </div>
          <div className="space-y-1">
            <Input
              heading="Company"
              placeholder="Company name"
              value={data.company}
              onChange={(e) => { setData((d) => ({ ...d, company: e.target.value })); setErrors((e) => ({ ...e, company: "" })); }}
              aria-invalid={!!errors.company}
            />
            {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
          </div>
          <div className="space-y-1">
            <Input
              heading="Location"
              placeholder="City, Country"
              value={data.location}
              onChange={(e) => setData((d) => ({ ...d, location: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div className="py-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Social Links
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1 space-y-1">
              <Input
                className="flex-1"
                placeholder="https://yourwebsite.com"
                value={data.website}
                onChange={(e) => { setData((d) => ({ ...d, website: e.target.value })); setErrors((e) => ({ ...e, website: "" })); }}
                aria-invalid={!!errors.website}
              />
              {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Twitter className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1 space-y-1">
              <Input
                className="flex-1"
                placeholder="https://twitter.com/username"
                value={data.twitter}
                onChange={(e) => { setData((d) => ({ ...d, twitter: e.target.value })); setErrors((e) => ({ ...e, twitter: "" })); }}
                aria-invalid={!!errors.twitter}
              />
              {errors.twitter && <p className="text-xs text-destructive">{errors.twitter}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1 space-y-1">
              <Input
                className="flex-1"
                placeholder="https://linkedin.com/in/username"
                value={data.linkedin}
                onChange={(e) => { setData((d) => ({ ...d, linkedin: e.target.value })); setErrors((e) => ({ ...e, linkedin: "" })); }}
                aria-invalid={!!errors.linkedin}
              />
              {errors.linkedin && <p className="text-xs text-destructive">{errors.linkedin}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Github className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1 space-y-1">
              <Input
                className="flex-1"
                placeholder="https://github.com/username"
                value={data.github}
                onChange={(e) => { setData((d) => ({ ...d, github: e.target.value })); setErrors((e) => ({ ...e, github: "" })); }}
                aria-invalid={!!errors.github}
              />
              {errors.github && <p className="text-xs text-destructive">{errors.github}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="primary" size="sm">Cancel</Button>
        <Button variant="secondary" size="sm" onClick={handleSave}>Save changes</Button>
      </div>
    </div>
  );
}
