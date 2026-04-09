"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { BlakeLogoIcon } from "@/components/blake-logo-icon";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/docs", label: "Components" },
  { href: "/#pricing", label: "Pricing" },
  { href: "#", label: "Contact" },
] as const;

export function HomeNavbar({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
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

  const handleNavLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileOpen(false);

    if (href !== "/#pricing" || pathname !== "/") {
      return;
    }

    event.preventDefault();
    const pricingSection = document.getElementById("pricing");
    if (!pricingSection) return;

    pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#pricing");
  };

  const linkClass = cn(
    "text-sm text-muted-foreground transition-colors hover:text-foreground",
  );
  const mobileLinkClass = cn(
    "rounded-xl px-3 py-3 text-base font-medium text-foreground",
    "transition-colors hover:bg-muted active:bg-muted/80",
  );

  return (
    <header
      className={cn("@container flex justify-center px-4 pt-4", className)}
    >
      <nav
        className={cn(
          "flex w-full max-w-3xl items-center rounded-full border border-border bg-surface px-4 py-2.5",
          "justify-between gap-3 @md:inline-flex @md:w-auto @md:max-w-none @md:justify-center @md:gap-6 @md:px-6",
        )}
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5"
          onClick={() => setMobileOpen(false)}
        >
          <BlakeLogoIcon />
          <span className="text-base font-medium text-foreground">
            blake<span className="font-bold">/ui</span>
          </span>
        </Link>

        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={(event) => handleNavLinkClick(event, href)}
            className={cn(
              linkClass,
              "hidden text-foreground @md:inline-flex @md:items-center",
            )}
          >
            {label}
          </Link>
        ))}

        {user ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/profile")}
            className={cn("hidden @md:inline-flex")}
          >
            Profile
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/login")}
            className={cn("hidden @md:inline-flex")}
          >
            Log in
          </Button>
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
                  onClick={(event) => handleNavLinkClick(event, href)}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="border-t border-border p-4">
              {user ? (
                <Button
                  type="button"
                  onClick={goAuth}
                  className="w-full rounded-button border border-brand bg-brand px-4 py-3 text-sm font-medium text-white transition-all hover:shadow-[0px_2px_5px_0px_#40445214]"
                >
                  Profile
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={goAuth}
                  className="w-full rounded-button border border-brand bg-brand px-4 py-3 text-sm font-medium text-white transition-all hover:shadow-[0px_2px_5px_0px_#40445214]"
                >
                  Log in
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
