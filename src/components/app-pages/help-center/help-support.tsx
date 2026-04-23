"use client";

import { Mail, MessageCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function HelpSupport() {
  return (
    <section className="mt-12" aria-labelledby="support-heading">
      <h2
        id="support-heading"
        className="text-lg font-semibold tracking-tight text-foreground">
        Still need help?
      </h2>
      <p className="text-muted-foreground mt-1 mb-6 text-sm">
        Our team monitors these channels on business days. Average first
        response under four hours on Pro and Enterprise.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="text-primary mb-2 flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
              <Mail className="size-4" />
            </div>
            <CardTitle className="text-base">Email support</CardTitle>
            <CardDescription>
              Best for account access, billing, and detailed technical questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" type="button" asChild>
              <a href="mailto:support@example.com">support@example.com</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="text-primary mb-2 flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
              <MessageCircle className="size-4" />
            </div>
            <CardTitle className="text-base">Live chat</CardTitle>
            <CardDescription>
              Pro and Enterprise: in-app chat weekdays 9am–6pm in your timezone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" type="button">
              Open chat widget
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="text-primary mb-2 flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
              <Headphones className="size-4" />
            </div>
            <CardTitle className="text-base">Priority line</CardTitle>
            <CardDescription>
              Enterprise customers can page on-call engineering for sev-1
              incidents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" type="button">
              View runbooks
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
