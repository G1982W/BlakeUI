"use client";

import type { User } from "@supabase/supabase-js";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

function mapSupabaseUserToProfile(user: User): SidebarUserProfileUser {
  const name =
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "User";
  return {
    name,
    email: user.email ?? undefined,
    avatar: (user.user_metadata?.avatar_url as string | undefined) ?? undefined,
  };
}

export interface SidebarUserProfileUser {
  name: string;
  email?: string;
  avatar?: string;
}

export interface SidebarUserProfileProps {
  /** Controlled: whether the user is logged in. */
  isLoggedIn?: boolean;
  /** Controlled: called when user clicks Log in. */
  onLogin?: () => void;
  /** Controlled: called when user clicks Log out. */
  onLogout?: () => void;
  /** User to show when logged in. */
  user?: SidebarUserProfileUser;
  className?: string;
}

/**
 * User profile block for the bottom of the Fumadocs sidebar.
 * Shows login state and Login / Log out buttons.
 * Use uncontrolled (no props) for demo with local state; pass isLoggedIn, onLogin, onLogout, user to wire to your auth.
 */
export function SidebarUserProfile({
  isLoggedIn: controlledLoggedIn,
  onLogin,
  onLogout,
  user: controlledUser,
  className,
}: SidebarUserProfileProps) {
  const [internalLoggedIn, setInternalLoggedIn] = React.useState(false);
  const isLoggedIn = controlledLoggedIn ?? internalLoggedIn;
  // const isLoggedIn = true;

  const handleLogin = React.useCallback(() => {
    if (onLogin) onLogin();
    else setInternalLoggedIn(true);
  }, [onLogin]);

  const handleLogout = React.useCallback(() => {
    if (onLogout) onLogout();
    else setInternalLoggedIn(false);
  }, [onLogout]);

  const user =
    controlledUser ??
    (isLoggedIn ? { name: "Demo User", email: "demo@example.com" } : undefined);
  const displayName = user?.name ?? "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn("pt-3 mt-3", className)}>
      {isLoggedIn && user ? (
        <div className="flex flex-col gap-2 px-1">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="size-8 shrink-0">
              <AvatarImage src={user.avatar} alt={displayName} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {displayName}
              </p>
              {user.email && (
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>
          </div>
          {/* <Button
            variant="primary"
            size="sm"
            className="h-8 w-full justify-start gap-2 border-transparent bg-transparent px-2 text-muted-foreground shadow-none hover:bg-sidebar-accent/50 hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            <span>Log out</span>
          </Button> */}
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-1">
          {/* <p className="text-xs text-muted-foreground">Not signed in</p> */}
          <Button
            variant="primary"
            size="sm"
            className="h-8 w-full justify-start gap-2 border-transparent bg-transparent px-2 shadow-none hover:bg-sidebar-accent/50"
            onClick={handleLogin}
          >
            <LogIn className="size-4" />
            <span>Log in</span>
          </Button>
        </div>
      )}
    </div>
  );
}

/**
 * Docs sidebar user profile wired to Supabase auth.
 * Use this in the Fumadocs docs layout sidebar footer to show real login state and Log in / Log out.
 */
export function DocsSidebarUserProfileWithSupabase({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user: u } }) => setUser(u));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = React.useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  }, [router]);

  const handleLogin = React.useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <SidebarUserProfile
      isLoggedIn={!!user}
      user={user ? mapSupabaseUserToProfile(user) : undefined}
      onLogin={handleLogin}
      onLogout={handleLogout}
      className={className}
    />
  );
}
