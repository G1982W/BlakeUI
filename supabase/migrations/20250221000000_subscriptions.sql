-- Subscriptions: one row per user (current subscription)
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_price_id text,
  product_name text,
  status text not null default 'inactive',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

-- History of subscription events (for profile "history" section)
create table if not exists public.subscription_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  stripe_subscription_id text,
  event_type text not null,
  status text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_subscription_history_user_id on public.subscription_history(user_id);
create index if not exists idx_subscription_history_created_at on public.subscription_history(created_at desc);

-- RLS: users can read their own subscription
alter table public.subscriptions enable row level security;
create policy "Users can read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- RLS: users can read their own subscription history
alter table public.subscription_history enable row level security;
create policy "Users can read own subscription history"
  on public.subscription_history for select
  using (auth.uid() = user_id);

comment on table public.subscriptions is 'Current subscription per user; written by Stripe webhook.';
comment on table public.subscription_history is 'Audit log of subscription events; written by Stripe webhook.';
