"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type ResetValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSession, setHasSession] = React.useState<boolean | null>(null);

  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const supabase = createClient();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function onSubmit(values: ResetValues) {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password: values.password });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated. You can now log in.");
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (hasSession === null) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm text-center">
          <h1 className="text-xl font-bold tracking-tight">
            Invalid or expired link
          </h1>
          <p className="text-muted-foreground text-sm">
            This password reset link is invalid or has expired. Request a new one
            below.
          </p>
          <Button variant="secondary" size="lg" className="w-full" asChild>
            <AppLink href="/forgot-password">Request new link</AppLink>
          </Button>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to log in
        </Link>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Set new password
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your new password below.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                    />
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
              {isLoading ? "Updating..." : "Update password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
