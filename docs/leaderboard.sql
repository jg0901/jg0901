-- Jemma's Math Arcade: optional *public* scoreboard.
-- Run in a new Supabase project's SQL Editor.
-- This is a casual, unverified leaderboard. Browser-sent scores can be forged.
-- Add authentication, server-side validation and rate limiting before using for prizes.

create table if not exists public.math_arcade_scores (
  id uuid primary key default gen_random_uuid(),
  player_name text not null check (length(btrim(player_name)) between 2 and 24),
  elapsed_seconds integer not null check (elapsed_seconds between 1 and 216000),
  hints_used smallint not null check (hints_used between 0 and 15),
  created_at timestamptz not null default now()
);

create index if not exists math_arcade_scores_rank_idx
  on public.math_arcade_scores (elapsed_seconds asc, hints_used asc, created_at asc);

alter table public.math_arcade_scores enable row level security;
grant usage on schema public to anon;
grant select (player_name, elapsed_seconds, hints_used, created_at)
  on public.math_arcade_scores to anon;
grant insert (player_name, elapsed_seconds, hints_used)
  on public.math_arcade_scores to anon;
revoke update, delete on public.math_arcade_scores from anon;

drop policy if exists "Public arcade scores are readable" on public.math_arcade_scores;
create policy "Public arcade scores are readable"
  on public.math_arcade_scores
  for select to anon using (true);

drop policy if exists "Visitors can submit an arcade score" on public.math_arcade_scores;
create policy "Visitors can submit an arcade score"
  on public.math_arcade_scores
  for insert to anon with check (
    length(btrim(player_name)) between 2 and 24
    and elapsed_seconds between 1 and 216000
    and hints_used between 0 and 15
  );

-- Note: anonymous inserts permit spam and forged scores.
-- Monitor usage and use Auth/Edge Functions/CAPTCHA/rate limiting if going public broadly.
