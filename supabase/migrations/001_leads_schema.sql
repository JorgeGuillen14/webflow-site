-- Request Demo intake: leads, questionnaire_responses, scores, events
-- Run in Supabase SQL editor or via Supabase CLI.

-- 5.1 leads
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text not null,
  first_name text,
  last_name text,
  role text,
  company_name text,
  company_type text,
  employees_range text,
  timeline text,
  security_environment text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  landing_page text,
  consent_authorized boolean default false,
  status text default 'new'
);

create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_created_at_idx on public.leads (created_at);

-- 5.2 questionnaire_responses
create table if not exists public.questionnaire_responses (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  opps_reviewed_month int,
  bids_submitted_month int,
  max_bids_month int,
  labor_hours_per_bid_range text,
  people_per_bid_range text,
  cycle_time_range text,
  hours_week_search_range text,
  constraint_primary text,
  constraint_other text,
  skip_opps_frequency text,
  stages_most_labor text[],
  loss_reason_primary text,
  loss_reason_other text,
  win_rate_range text,
  avg_value_passed_range text,
  opp_sources text[],
  proposal_tools text[],
  crm text,
  finance_system text,
  past_performance_locations text[],
  resume_management text,
  teaming_approach text,
  portals_used text[],
  cmmc_status text,
  dcaa_exposure text,
  notes text
);

create index if not exists questionnaire_responses_lead_id_idx on public.questionnaire_responses (lead_id);

-- 5.3 scores
create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  fit_score int,
  throughput_gap_score int,
  automation_roi_score int,
  compliance_risk_score int,
  route text,
  created_at timestamptz default now()
);

create index if not exists scores_lead_id_idx on public.scores (lead_id);

-- 5.4 events
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid,
  event_type text not null,
  payload jsonb,
  created_at timestamptz default now()
);

create index if not exists events_lead_id_idx on public.events (lead_id);
create index if not exists events_event_type_idx on public.events (event_type);

-- RLS: only service role (backend) can insert/read; no client access to raw data
alter table public.leads enable row level security;
alter table public.questionnaire_responses enable row level security;
alter table public.scores enable row level security;
alter table public.events enable row level security;

-- Policy: no direct client access (use API only)
create policy "Service role only" on public.leads for all using (false) with check (false);
create policy "Service role only" on public.questionnaire_responses for all using (false) with check (false);
create policy "Service role only" on public.scores for all using (false) with check (false);
create policy "Service role only" on public.events for all using (false) with check (false);

-- Note: Your backend (Next.js API route with SUPABASE_SERVICE_ROLE_KEY) bypasses RLS.
-- Do not expose Supabase keys that can read/write these tables to the client.
