"use client";

import * as React from "react";
import { Camera, Globe, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function SettingsProfile2() {
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
          <Input heading="Name" placeholder="Your name" />
          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <div className="flex rounded-md border border-input">
              <span className="flex items-center border-r border-input bg-muted/50 px-3 text-sm text-muted-foreground">
                @
              </span>
              <input
                className="h-9 min-w-0 flex-1 rounded-r-md border-0 bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="username"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium">Bio</label>
          <Textarea className="min-h-20" placeholder="Tell us about yourself" />
        </div>
      </div>

      <div className="border-b border-border py-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Work
        </h3>
        <div className="space-y-4">
          <Input heading="Job title" placeholder="e.g. Designer" />
          <Input heading="Company" placeholder="Company name" />
          <Input heading="Location" placeholder="City, Country" />
        </div>
      </div>

      <div className="py-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Social Links
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="size-4 shrink-0 text-muted-foreground" />
            <Input className="flex-1" placeholder="https://yourwebsite.com" />
          </div>
          <div className="flex items-center gap-2">
            <Twitter className="size-4 shrink-0 text-muted-foreground" />
            <Input className="flex-1" placeholder="https://twitter.com/username" />
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="size-4 shrink-0 text-muted-foreground" />
            <Input className="flex-1" placeholder="https://linkedin.com/in/username" />
          </div>
          <div className="flex items-center gap-2">
            <Github className="size-4 shrink-0 text-muted-foreground" />
            <Input className="flex-1" placeholder="https://github.com/username" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="primary" size="sm">Cancel</Button>
        <Button variant="secondary" size="sm">Save changes</Button>
      </div>
    </div>
  );
}
