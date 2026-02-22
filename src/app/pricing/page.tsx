import Link from "next/link";
import {
  Check,
  Code2,
  FileCode,
  LayoutTemplate,
  Palette,
  Sparkles,
} from "lucide-react";
import { CheckoutButton } from "@/components/payment/checkout-button";

const FEATURES = [
  { icon: Code2, text: "1193+ Shadcn blocks" },
  { icon: FileCode, text: "1189+ Shadcn components" },
  { icon: LayoutTemplate, text: "12 Next.js, Astro templates (Premium)" },
  { icon: Palette, text: "Figma UI Kit (Premium)" },
  { icon: Sparkles, text: "Lifetime updates & unlimited projects" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get instant access to the code
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Copy/paste blocks and components. One purchase, use in unlimited
            projects.
          </p>
        </div>

        {/* Feature list */}
        <ul className="mt-12 space-y-4 sm:mt-16">
          {FEATURES.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-card-foreground"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-medium sm:text-base">{text}</span>
              <Check className="ml-auto size-5 shrink-0 text-primary" />
            </li>
          ))}
        </ul>

        {/* Pricing card */}
        <div className="mt-12 sm:mt-16">
          <div className="overflow-hidden rounded-xl border border-border-neutral bg-card shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Premium access
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    One-time purchase. No subscription.
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    $99
                  </span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CheckoutButton>Get access</CheckoutButton>
                <Link
                  href="/docs"
                  className="text-center text-sm font-medium text-primary hover:underline"
                >
                  Browse docs first →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Secure checkout via Stripe. You’ll get immediate access after payment.
        </p>
      </div>
    </div>
  );
}
