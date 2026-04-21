import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client with service role key.
 * Use in API routes (e.g. webhooks) to bypass RLS and write to subscriptions.
 * Set SUPABASE_SERVICE_ROLE_KEY in .env.local (from Supabase Dashboard → Settings → API).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
