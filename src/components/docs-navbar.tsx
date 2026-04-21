"use client";

import { Github, Laptop, Menu, Moon, Search, Sun } from "lucide-react";
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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { AppLink } from "@/components/ui/link";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import TwitterIcon from "@/components/icons/twitter";
import { SidebarTrigger } from "fumadocs-ui/components/sidebar/base";

/** Only render sidebar trigger on docs routes where SidebarContext exists */
function DocsSidebarTrigger() {
  const pathname = usePathname();
  if (pathname == null || !pathname.startsWith("/docs")) return null;
  return (
    <SidebarTrigger
      className="md:hidden -ml-1 flex size-10 shrink-0 items-center justify-center rounded-md border-0 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
      aria-label="Open sidebar"
    >
      <Menu className="size-5" />
    </SidebarTrigger>
  );
}

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary" size="sm">
          {!mounted ? (
            <Laptop className="size-4" />
          ) : theme === "dark" ? (
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
  async function handleSignup() {
    // redirect to /signup
    router.push("/signup");
  }
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-background/50! backdrop-blur [grid-area:header]">
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <DocsSidebarTrigger />
          <DocsSearchButton className="hidden min-w-[350px] sm:inline-flex" />
        </div>
        <div className="flex items-center gap-2">
          <AppLink href="https://github.com/blakeui" target="_blank" icon="none">
            <svg
              className="text-foreground"
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8336 21.9711C13.8336 22.0414 13.7528 22.0977 13.6508 22.0977C13.5348 22.1082 13.454 22.052 13.454 21.9711C13.454 21.9008 13.5348 21.8445 13.6368 21.8445C13.7422 21.834 13.8336 21.8902 13.8336 21.9711ZM12.7403 21.8129C12.7157 21.8832 12.786 21.9641 12.8915 21.9852C12.9829 22.0203 13.0883 21.9852 13.1094 21.9148C13.1094 21.9148 13.0637 21.7637 12.9583 21.732C12.8668 21.7074 12.7649 21.7426 12.7403 21.8129ZM14.2942 21.7531C14.1922 21.7777 14.1219 21.8445 14.1325 21.9254C14.143 21.9957 14.2344 22.0414 14.3399 22.0168C14.4418 21.9922 14.5122 21.9254 14.5016 21.8551C14.4911 21.7883 14.3961 21.7426 14.2942 21.7531ZM16.6075 8.28125C11.7313 8.28125 8.00122 11.9832 8.00122 16.8594C8.00122 20.7582 10.4551 24.0945 13.9602 25.2687C14.4102 25.3496 14.5684 25.0719 14.5684 24.8434C14.5684 24.6254 14.5579 23.423 14.5579 22.6848C14.5579 22.6848 12.0969 23.2121 11.5801 21.6371C11.5801 21.6371 11.1793 20.6141 10.6028 20.3504C10.6028 20.3504 9.79771 19.7984 10.659 19.809C10.659 19.809 11.5344 19.8793 12.0161 20.716C12.786 22.073 14.0762 21.6828 14.579 21.4508C14.6598 20.8883 14.8883 20.498 15.1415 20.266C13.1762 20.048 11.1934 19.7633 11.1934 16.3813C11.1934 15.4145 11.4606 14.9293 12.0231 14.3105C11.9317 14.082 11.6329 13.1398 12.1145 11.9234C12.8493 11.6949 14.5403 12.8727 14.5403 12.8727C15.2434 12.6758 15.9993 12.5738 16.7481 12.5738C16.7481 12.5738 18.2528 12.6758 18.9559 12.8727C18.9559 12.8727 20.6469 11.6914 21.3817 11.9234C21.8633 13.1434 21.5645 14.082 21.4731 14.3105C22.0356 14.9328 22.3801 15.418 22.3801 16.3813C22.3801 19.7738 20.3094 20.0445 18.3442 20.266C18.6676 20.5438 18.9418 21.0711 18.9418 21.8973C18.9418 23.082 18.9313 24.548 18.9313 24.8363C18.9313 25.0648 19.093 25.3426 19.5395 25.2617C23.0551 24.0945 25.4387 20.7582 25.4387 16.8594C25.4387 11.9832 21.4836 8.28125 16.6075 8.28125ZM11.4184 20.4066C11.3727 20.4418 11.3833 20.5227 11.443 20.5895C11.4993 20.6457 11.5801 20.6703 11.6258 20.6246C11.6715 20.5895 11.661 20.5086 11.6012 20.4418C11.545 20.3855 11.4641 20.3609 11.4184 20.4066ZM11.0387 20.1219C11.0141 20.1676 11.0493 20.2238 11.1196 20.259C11.1758 20.2941 11.2461 20.2836 11.2708 20.2344C11.2954 20.1887 11.2602 20.1324 11.1899 20.0973C11.1196 20.0762 11.0633 20.0867 11.0387 20.1219ZM12.1778 21.3734C12.1215 21.4191 12.1426 21.5246 12.2235 21.5914C12.3043 21.6723 12.4063 21.6828 12.452 21.6266C12.4977 21.5809 12.4766 21.4754 12.4063 21.4086C12.329 21.3277 12.2235 21.3172 12.1778 21.3734ZM11.777 20.8566C11.7208 20.8918 11.7208 20.9832 11.777 21.0641C11.8333 21.1449 11.9282 21.1801 11.9739 21.1449C12.0301 21.0992 12.0301 21.0078 11.9739 20.927C11.9247 20.8461 11.8333 20.8109 11.777 20.8566Z"
                fill="currentColor"
              />
            </svg>
          </AppLink>
          <ThemeModeSelector />
          {user ? (
            <>
              <AppLink
                href="/profile"
                icon="none"
                className="inline-flex items-center gap-1.5 rounded-button border border-border-neutral bg-surface px-2 py-1 text-sm font-medium text-surface-foreground hover:shadow-[0px_2px_5px_0px_#40445214]"
              >
                <UserIcon className="size-4" />
                Profile
              </AppLink>
              <Button
                variant="primary"
                size="md"
                onClick={handleLogout}
                className="gap-1.5"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={handleLogin}
                className="gap-1.5"
              >
                Login
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={handleSignup}
                className="gap-1.5"
              >
                Signup
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
