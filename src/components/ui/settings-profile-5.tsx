"use client";

import * as React from "react";
import { Globe, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
              <Input
                heading="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                heading="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                heading="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Textarea
                heading="Bio"
                description="A short bio about yourself."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-16"
              />
              <Input
                heading="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border p-4">
          <h3 className="mb-4 text-sm font-semibold">Links</h3>
          <div className="space-y-4">
            <Input
              heading="Website"
              placeholder="https://"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <Input
              heading="Twitter"
              placeholder="https://twitter.com/..."
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
            <Input
              heading="LinkedIn"
              placeholder="https://linkedin.com/..."
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <Input
              heading="GitHub"
              placeholder="https://github.com/..."
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
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
    </div>
  );
}
