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
        className
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
        <button
          type="button"
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-md border text-muted-foreground transition-colors",
            "hover:border-foreground/20 hover:text-foreground"
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
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="size-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DocsNavbar() {
  return (
    <div className="sticky top-0 z-40 flex h-14 items-center border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* <Link href="/docs" className="text-sm font-semibold">
            Blake UI
          </Link> */}
          <DocsSearchButton className="hidden min-w-[350px] sm:inline-flex" />
        </div>
        <div className="flex items-center gap-2">
          <ThemeModeSelector />
          <a
            href="https://x.com/blakeui"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-md border text-muted-foreground transition-colors",
              "hover:border-foreground/20 hover:text-foreground"
            )}
            aria-label="Twitter"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="size-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.637 7.584H.474l8.598-9.83L0 1.154h7.594l5.243 6.932zm-1.291 19.493h2.04L6.486 3.24H4.298z" />
            </svg>
          </a>
          <a
            href="https://github.com/blakeui"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-md border text-muted-foreground transition-colors",
              "hover:border-foreground/20 hover:text-foreground"
            )}
            aria-label="GitHub"
            rel="noreferrer"
            target="_blank"
          >
            <Github className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
