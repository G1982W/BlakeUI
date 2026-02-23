"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface CheckoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function CheckoutButton({
  children = "Pay",
  className,
}: CheckoutButtonProps) {
  const router = useRouter();

  const handlePay = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/login`);
      return;
    }

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: process.env.STRIPE_PRICE_ID,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/pricing`,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 401) {
        router.push(`/login`);
        return;
      }
      return;
    }
    if (data.url) window.location.href = data.url;
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      type="button"
      onClick={handlePay}
      className={className}
    >
      {children}
    </Button>
  );
}
