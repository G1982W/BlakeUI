"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

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

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const form = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const supabase = createClient();

  async function onSubmit(values: ForgotValues) {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success("Check your email");
  }

  if (sent) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Check your email
            </h1>
            <p className="text-muted-foreground text-sm">
              We&apos;ve sent a password reset link to{" "}
              <span className="font-medium text-foreground">
                {form.getValues("email")}
              </span>
              . Click the link to set a new password.
            </p>
          </div>
          <div className="space-y-3">
            <Button variant="secondary" size="lg" className="w-full" asChild>
              <AppLink href="/login">Back to log in</AppLink>
            </Button>
            <p className="text-center text-muted-foreground text-sm">
              Didn&apos;t receive the email?{" "}
              <button
                type="button"
                onClick={() => setSent(false)}
                className="font-medium text-primary hover:underline"
              >
                Try again
              </button>
            </p>
          </div>
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
            Forgot password?
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>
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
            <Button
              type="submit"
              className="w-full"
              size="lg"
              variant="secondary"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-muted-foreground text-sm">
          Remember your password?{" "}
          <AppLink href="/login" variant="secondary">
            Log in
          </AppLink>
        </p>
      </div>
    </div>
  );
}
