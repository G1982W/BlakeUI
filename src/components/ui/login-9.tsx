"use client";

import * as React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Login9({
  logo,
  onGoogle,
  onGitHub,
  onLinkedIn,
  onEmailSubmit,
  signUpHref = "#",
  className,
}: {
  logo?: React.ReactNode;
  onGoogle?: () => void;
  onGitHub?: () => void;
  onLinkedIn?: () => void;
  onEmailSubmit?: (email: string) => void;
  signUpHref?: string;
  className?: string;
}) {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSubmit?.(email);
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-sm flex-col items-center gap-6 rounded-lg border border-border bg-background p-6",
        className,
      )}
    >
      {logo && <div className="flex justify-center">{logo}</div>}
      <div className="flex w-full flex-col gap-3">
        <Button
          type="button"
          variant="primary"
          className="w-full gap-2"
          onClick={onGoogle}
        >
          <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="primary"
          className="w-full gap-2"
          onClick={onGitHub}
        >
          <Github className="size-4" />
          Continue with GitHub
        </Button>
        <Button
          type="button"
          variant="primary"
          className="w-full gap-2"
          onClick={onLinkedIn}
        >
          <Linkedin className="size-4" />
          Continue with LinkedIn
        </Button>
      </div>
      <div className="flex w-full items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">OR</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
        <div className="space-y-2">
          <label
            htmlFor="login9-email"
            className="text-sm font-medium leading-none"
          >
            Email
          </label>
          <Input
            id="login9-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full gap-2">
          <Mail className="size-4" />
          Continue with email
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a
          href={signUpHref}
          className="underline underline-offset-2 hover:text-foreground"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
