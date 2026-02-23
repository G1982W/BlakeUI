"use client";

import { Github, Laptop, Moon, Search, Sun } from "lucide-react";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { AppLink } from "@/components/ui/link";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import TwitterIcon from "@/components/icons/twitter";

function DocsSearchButton({ className }: { className?: string }) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();

  if (!enabled) return null;

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border bg-secondary/60 p-1.5 ps-2 text-sm text-muted-foreground transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={() => setOpenSearch(true)}
      data-search-full=""
      aria-label="Open Search"
    >
      <Search className="size-4" />
      {text.search}
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((key, index) => (
          <kbd
            key={`${key.display}-${index}`}
            className="rounded-md border bg-background px-1.5"
          >
            {key.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}

function ThemeModeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <button
          type="button"
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-md border text-foreground transition-colors",
            "hover:border-foreground/20 hover:text-foreground",
          )}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Moon className="size-4" />
          ) : theme === "light" ? (
            <Sun className="size-4" />
          ) : (
            <Laptop className="size-4" />
          )}
        </button> */}

        <Button variant="primary" size="sm">
          {theme === "dark" ? (
            <Moon className="size-4" />
          ) : theme === "light" ? (
            <Sun className="size-4" />
          ) : (
            <Laptop className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="size-4 text-foreground" />
          <span className="text-foreground">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="size-4 text-foreground" />
          <span className="text-foreground">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="size-4 text-foreground" />
          <span className="text-foreground">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DocsNavbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  }
  async function handleLogin() {
    // redirect to /login
    router.push("/login");
  }
  return (
    <div className="sticky top-0 z-40 flex h-14 items-center border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <DocsSearchButton className="hidden min-w-[350px] sm:inline-flex" />
        </div>
        <div className="flex items-center gap-2">
          <ThemeModeSelector />
          <AppLink href="https://github.com/blakeui" target="_blank">
            <TwitterIcon className="size-4 text-foreground" />
          </AppLink>
          <AppLink href="https://github.com/blakeui" target="_blank">
            <Github className="size-4 text-foreground" />
          </AppLink>
          {user ? (
            <>
              <AppLink
                href="/profile"
                className="inline-flex items-center gap-1.5 rounded-button border border-border-neutral bg-surface px-2 py-1 text-sm font-medium text-surface-foreground hover:shadow-[0px_2px_5px_0px_#40445214]"
              >
                <UserIcon className="size-4" />
                Profile
              </AppLink>
              <Button
                variant="primary"
                size="sm"
                onClick={handleLogout}
                className="gap-1.5"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </>
          ) : (
            <AppLink href="/login" variant="primary" className="gap-1.5">
              <LogIn className="size-4" />
              Login
            </AppLink>
          )}
        </div>
      </div>
    </div>
  );
}
