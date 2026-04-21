"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ACTIVE_STATUSES = ["active", "trialing"];

export function useSubscriptionStatus() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function check() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.id) {
        setHasActiveSubscription(false);
        setIsLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error || !data) {
        setHasActiveSubscription(false);
      } else {
        setHasActiveSubscription(
          ACTIVE_STATUSES.includes(data.status?.toLowerCase() ?? "")
        );
      }
      setIsLoading(false);
    }

    check();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      check();
    });
    return () => subscription.unsubscribe();
  }, []);

  return { isLoading, hasActiveSubscription };
}
