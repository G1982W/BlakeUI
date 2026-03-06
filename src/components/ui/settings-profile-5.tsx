"use client";

import * as React from "react";
import { z } from "zod";
import { Globe, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(2, "Username must be at least 2 characters").regex(/^[a-z0-9_-]+$/i, "Username can only contain letters, numbers, underscore and hyphen"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  twitter: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  linkedin: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  github: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
});

export function SettingsProfile5() {
  const [name, setName] = React.useState("Jane Doe");
  const [username, setUsername] = React.useState("jane");
  const [role, setRole] = React.useState("Designer");
  const [bio, setBio] = React.useState("Building things on the web.");
  const [location, setLocation] = React.useState("San Francisco");
  const [website, setWebsite] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [github, setGithub] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSave = () => {
    const result = profileSchema.safeParse({
      name,
      username,
      role,
      bio,
      location,
      website,
      twitter,
      linkedin,
      github,
    });
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
    <div className="flex min-h-[420px] w-full gap-6 overflow-auto rounded-lg border border-border bg-background p-6">
      <div className="min-w-0 flex-1 space-y-6">
        <div className="rounded-lg border border-border p-4">
          <h3 className="mb-4 text-sm font-semibold">Basic Information</h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <Avatar className="size-16 shrink-0">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-4">
              <div className="space-y-1">
                <Input
                  heading="Name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((e) => ({ ...e, name: "" })); }}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-1">
                <Input
                  heading="Username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setErrors((e) => ({ ...e, username: "" })); }}
                  aria-invalid={!!errors.username}
                />
                {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
              </div>
              <div className="space-y-1">
                <Input
                  heading="Role"
                  value={role}
                  onChange={(e) => { setRole(e.target.value); setErrors((e) => ({ ...e, role: "" })); }}
                  aria-invalid={!!errors.role}
                />
                {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
              </div>
              <div className="space-y-1">
                <Textarea
                  heading="Bio"
                  description="A short bio about yourself."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-16"
                />
              </div>
              <div className="space-y-1">
                <Input
                  heading="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border p-4">
          <h3 className="mb-4 text-sm font-semibold">Links</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <Input
                heading="Website"
                placeholder="https://"
                value={website}
                onChange={(e) => { setWebsite(e.target.value); setErrors((e) => ({ ...e, website: "" })); }}
                aria-invalid={!!errors.website}
              />
              {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
            </div>
            <div className="space-y-1">
              <Input
                heading="Twitter"
                placeholder="https://twitter.com/..."
                value={twitter}
                onChange={(e) => { setTwitter(e.target.value); setErrors((e) => ({ ...e, twitter: "" })); }}
                aria-invalid={!!errors.twitter}
              />
              {errors.twitter && <p className="text-xs text-destructive">{errors.twitter}</p>}
            </div>
            <div className="space-y-1">
              <Input
                heading="LinkedIn"
                placeholder="https://linkedin.com/..."
                value={linkedin}
                onChange={(e) => { setLinkedin(e.target.value); setErrors((e) => ({ ...e, linkedin: "" })); }}
                aria-invalid={!!errors.linkedin}
              />
              {errors.linkedin && <p className="text-xs text-destructive">{errors.linkedin}</p>}
            </div>
            <div className="space-y-1">
              <Input
                heading="GitHub"
                placeholder="https://github.com/..."
                value={github}
                onChange={(e) => { setGithub(e.target.value); setErrors((e) => ({ ...e, github: "" })); }}
                aria-invalid={!!errors.github}
              />
              {errors.github && <p className="text-xs text-destructive">{errors.github}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden shrink-0 lg:block">
        <div className="sticky top-6 w-64 rounded-lg border border-border bg-muted/30 p-4">
          <Badge variant="secondary" className="mb-3">
            Public view
          </Badge>
          <div className="flex flex-col items-center text-center">
            <Avatar className="size-16">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="mt-2 font-medium">{name || "Name"}</p>
            <p className="text-xs text-muted-foreground">
              @{username || "username"}
            </p>
            {role && <p className="text-xs text-muted-foreground">{role}</p>}
            {location && (
              <p className="text-xs text-muted-foreground">{location}</p>
            )}
            {bio && <p className="mt-2 text-xs text-muted-foreground">{bio}</p>}
            <div className="mt-3 flex gap-2">
              {website && (
                <a
                  href={website}
                  className="rounded p-1 hover:bg-accent"
                  aria-label="Website"
                >
                  <Globe className="size-4" />
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  className="rounded p-1 hover:bg-accent"
                  aria-label="Twitter"
                >
                  <Twitter className="size-4" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  className="rounded p-1 hover:bg-accent"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-4" />
                </a>
              )}
              {github && (
                <a
                  href={github}
                  className="rounded p-1 hover:bg-accent"
                  aria-label="GitHub"
                >
                  <Github className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="secondary" size="sm" onClick={handleSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
