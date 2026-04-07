"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/docs", label: "Components" },
  { href: "/#pricing", label: "Pricing" },
  { href: "#", label: "Contact" },
] as const;

function LogoMark() {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.39999 1.59983L1.46875 5.85168V14.1483L9.39999 18.4002L17.3312 14.1483V5.85168L9.39999 1.59983ZM18.8 5.31713C18.8 5.09784 18.68 4.89646 18.4881 4.79358L9.67562 0.069295C9.50327 -0.0230983 9.29671 -0.0230983 9.12437 0.069295L0.311871 4.79358C0.119959 4.89646 0 5.09784 0 5.31713V14.6829C0 14.9022 0.119959 15.1035 0.311871 15.2064L9.12437 19.9307C9.29671 20.0231 9.50327 20.0231 9.67562 19.9307L18.4881 15.2064C18.68 15.1035 18.8 14.9022 18.8 14.6829V5.31713Z"
        fill="#436283"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.14392 4.94015C8.17815 4.82445 8.27852 4.74127 8.39764 4.72986L9.35875 4.63783C9.47787 4.62643 9.59194 4.68907 9.64713 4.79621L14.0455 13.3343C14.0958 13.432 14.0883 13.5498 14.026 13.6402L13.4864 14.4234C13.4241 14.5138 13.3173 14.5619 13.209 14.5483L6.58054 13.7166C6.49478 13.7059 6.41807 13.6575 6.37082 13.5845L5.90676 12.8673C5.85951 12.7943 5.84652 12.704 5.87125 12.6205L8.14392 4.94015ZM9.08905 6.92623L7.48798 12.3369L12.1796 12.9256L9.08905 6.92623Z"
        fill="#436283"
      />
    </svg>
  );
}

export function HomeNavbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const goAuth = () => {
    setMobileOpen(false);
    router.push(user ? "/profile" : "/login");
  };

  const linkClass = cn(
    "text-sm text-muted-foreground transition-colors hover:text-foreground",
  );
  const mobileLinkClass = cn(
    "rounded-xl px-3 py-3 text-base font-medium text-foreground",
    "transition-colors hover:bg-muted active:bg-muted/80",
  );

  const authButtonClass = cn(
    "rounded-button border border-brand bg-brand px-4 py-1.5 text-sm font-medium text-white",
    "transition-all hover:shadow-[0px_2px_5px_0px_#40445214]",
  );

  return (
    <header className="@container flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-3xl items-center rounded-full border border-border bg-background px-4 py-2.5 shadow-sm",
          "justify-between gap-3 @md:inline-flex @md:w-auto @md:max-w-none @md:justify-center @md:gap-6 @md:px-6",
        )}
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5"
          onClick={() => setMobileOpen(false)}
        >
          <LogoMark />
          <span className="text-base font-medium text-foreground">
            blake<span className="font-bold">/ui</span>
          </span>
        </Link>

        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              linkClass,
              "hidden text-foreground @md:inline-flex @md:items-center",
            )}
          >
            {label}
          </Link>
        ))}

        {user ? (
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className={cn(authButtonClass, "hidden @md:inline-flex")}
          >
            Profile
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.push("/login")}
            className={cn(authButtonClass, "hidden @md:inline-flex")}
          >
            Log in
          </button>
        )}

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground @md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="home-mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="size-5" strokeWidth={2} />
            </button>
          </SheetTrigger>
          <SheetContent
            id="home-mobile-nav"
            side="right"
            className="flex w-[min(100%,20rem)] flex-col gap-0 border-border p-0 sm:max-w-sm"
            showCloseButton
          >
            <div className="border-b border-border px-4 py-4">
              <SheetTitle className="text-left text-base font-semibold text-foreground">
                Menu
              </SheetTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                BlakeUI — components and resources
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={mobileLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="border-t border-border p-4">
              {user ? (
                <button
                  type="button"
                  onClick={goAuth}
                  className="w-full rounded-button border border-brand bg-brand px-4 py-3 text-sm font-medium text-white transition-all hover:shadow-[0px_2px_5px_0px_#40445214]"
                >
                  Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goAuth}
                  className="w-full rounded-button border border-brand bg-brand px-4 py-3 text-sm font-medium text-white transition-all hover:shadow-[0px_2px_5px_0px_#40445214]"
                >
                  Log in
                </button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
