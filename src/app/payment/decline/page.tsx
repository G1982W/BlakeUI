import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentDeclinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="size-10" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Payment declined
        </h1>
        <p className="mt-3 text-muted-foreground">
          We couldn’t process your payment. Please check your card details or
          try a different payment method.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/pricing">Try again</Link>
          </Button>
          <Button variant="primary" size="lg" asChild>
            <Link href="/docs">Browse docs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
