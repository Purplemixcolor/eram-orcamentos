create table if not exists public.eram_app_state (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.eram_app_state enable row level security;

drop policy if exists "Public can read ERAM app state" on public.eram_app_state;
create policy "Public can read ERAM app state"
on public.eram_app_state for select
using (true);

drop policy if exists "Public can insert ERAM app state" on public.eram_app_state;
create policy "Public can insert ERAM app state"
on public.eram_app_state for insert
with check (true);

drop policy if exists "Public can update ERAM app state" on public.eram_app_state;
create policy "Public can update ERAM app state"
on public.eram_app_state for update
using (true)
with check (true);

-- Necessario para sincronizacao em tempo real no Supabase Realtime.
alter publication supabase_realtime add table public.eram_app_state;
