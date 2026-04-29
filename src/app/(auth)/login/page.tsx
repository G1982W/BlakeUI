"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppLink } from "@/components/ui/link";
import { startNavigationProgress } from "@/lib/navigation-progress";
import { getBrowserOrigin } from "@/lib/request-origin";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [oauthLoading, setOauthLoading] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const supabase = createClient();

  async function onSubmit(values: LoginValues) {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword(values);
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
    router.refresh();
    startNavigationProgress();
    router.push("/");
  }

  async function signInWithOAuth(provider: "google" | "github") {
    setOauthLoading(provider);
    const redirectTo = `${getBrowserOrigin()}/auth/callback`;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    if (error) {
      toast.error(error.message);
      setOauthLoading(null);
      return;
    }
    if (data?.url) window.location.href = data.url;
    setOauthLoading(null);
  }

  return (
    <div className="flex max-w-md w-full min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Log in</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email and password or continue with a provider.
          </p>
        </div>

        <div className="grid gap-2">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!!oauthLoading}
            onClick={() => signInWithOAuth("google")}
          >
            {oauthLoading === "google" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FcGoogle className="h-4 w-4 shrink-0" aria-hidden />
            )}
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!!oauthLoading}
            onClick={() => signInWithOAuth("github")}
          >
            {oauthLoading === "github" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SiGithub
                className="h-4 w-4 shrink-0 text-[#181717] dark:text-white"
                aria-hidden
              />
            )}
            Continue with GitHub
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <AppLink
                      href="/forgot-password"
                      variant="secondary"
                      className="text-xs"
                    >
                      Forgot password?
                    </AppLink>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className=""
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 flex h-full items-center justify-center px-3 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-r-md"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              size="lg"
              variant="secondary"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
          <AppLink href="/signup" variant="secondary">
            Sign up
          </AppLink>
        </p>
      </div>
    </div>
  );
}
