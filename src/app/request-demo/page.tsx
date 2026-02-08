'use client'

import { useState } from "react"
import Link from "next/link"
import { MeshGradient } from "@paper-design/shaders-react"
import { ArrowRight, Check, Shield, Cloud, Lock } from "lucide-react"
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

const COMPANY_TYPES = ["Prime Contractor", "Subcontractor", "Both Prime & Sub"] as const
const EMPLOYEE_RANGES = ["1–10 employees", "11–50 employees", "51–200 employees", "201–1,000 employees", "1,000+ employees"] as const
const TIMELINES = ["Actively evaluating (0–30 days)", "Planning phase (31–90 days)", "Exploratory (90+ days)"] as const

const LABOR_HOURS_RANGES = ["Under 40 hrs", "40–80 hrs", "81–160 hrs", "161–240 hrs", "241–360 hrs", "360+ hrs"] as const
const PEOPLE_PER_BID = ["1 person", "2–3 people", "4–6 people", "7+ people"] as const
const CYCLE_TIME_RANGES = ["Under 7 days", "7–14 days", "15–30 days", "31–60 days", "60+ days"] as const
const HOURS_WEEK_SEARCH = ["Under 2 hrs/wk", "2–5 hrs/wk", "6–10 hrs/wk", "11+ hrs/wk"] as const
const CONSTRAINT_OPTIONS = ["Time", "Staff availability", "Proposal complexity", "Leadership bandwidth", "Pricing uncertainty", "Data scattered across tools", "Other"] as const
const SKIP_FREQUENCY = ["Rarely", "Sometimes", "Frequently"] as const
const STAGES_LABOR = ["Opportunity qualification", "Technical writing", "Cost & pricing", "Review cycles", "Past performance", "Portal compliance", "Submission packaging"] as const
const LOSS_REASONS = ["Price", "Past performance gaps", "Technical quality", "Compliance issue", "Incumbent advantage", "Other"] as const
const WIN_RATE_RANGES = ["Under 10%", "10–20%", "21–35%", "36–50%", "Over 50%"] as const
const AVG_VALUE_PASSED = ["Under $500K", "$500K–$2M", "$2M–$10M", "$10M–$50M", "$50M+"] as const
const CRM_OPTIONS = ["None", "HubSpot", "Salesforce", "GovWin CRM", "Other"] as const
const FINANCE_SYSTEMS = ["Deltek Costpoint", "Unanet", "QuickBooks", "Other", "None"] as const
const SECURITY_ENV = ["Commercial cloud", "AWS GovCloud", "On-premise", "Hybrid", "Not sure"] as const
const CMMC_STATUS = ["Required now", "Certification in progress", "Not required today", "Not sure"] as const
const DCAA_EXPOSURE = ["Yes — active or recent audits", "No", "Not sure"] as const

type Step1Data = {
  work_email: string
  first_name: string
  last_name: string
  title_or_role: string
  company_name: string
  company_type: string
  employee_count_range: string
  timeline: string
  consent_authorized: boolean
  honeypot?: string
}

const initialStep1: Step1Data = {
  work_email: "",
  first_name: "",
  last_name: "",
  title_or_role: "",
  company_name: "",
  company_type: "",
  employee_count_range: "",
  timeline: "",
  consent_authorized: false,
}

type Step2Data = {
  opps_reviewed_month: string
  bids_submitted_month: string
  labor_hours_per_bid_range: string
  people_per_bid_range: string
  cycle_time_range: string
  hours_week_search_range: string
  constraint_primary: string
  constraint_other: string
  skip_opps_frequency: string
  stages_most_labor: string[]
  loss_reason_primary: string
  loss_reason_other: string
  win_rate_range: string
  avg_value_passed_range: string
  crm: string
  crm_other: string
  finance_system: string
  security_environment: string
  cmmc_status: string
  dcaa_exposure: string
  notes: string
}

const initialStep2: Step2Data = {
  opps_reviewed_month: "",
  bids_submitted_month: "",
  labor_hours_per_bid_range: "",
  people_per_bid_range: "",
  cycle_time_range: "",
  hours_week_search_range: "",
  constraint_primary: "",
  constraint_other: "",
  skip_opps_frequency: "",
  stages_most_labor: [],
  loss_reason_primary: "",
  loss_reason_other: "",
  win_rate_range: "",
  avg_value_passed_range: "",
  crm: "",
  crm_other: "",
  finance_system: "",
  security_environment: "",
  cmmc_status: "",
  dcaa_exposure: "",
  notes: "",
}

// ─── Reusable form components ─────────────────────────────────
function SelectField({ label, hint, value, onChange, options }: { label: string; hint?: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <label className="block">
      <span className="block text-sm text-neutral-300 mb-1 font-medium">{label}</span>
      {hint && <span className="block text-[11px] text-neutral-600 mb-1.5">{hint}</span>}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:border-white/30 focus:outline-none text-sm">
        <option value="">Select</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}

function InputField({ label, hint, value, onChange, placeholder, type = "text", required }: { label: string; hint?: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm text-neutral-300 mb-1 font-medium">{label}</span>
      {hint && <span className="block text-[11px] text-neutral-600 mb-1.5">{hint}</span>}
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-neutral-600 focus:border-white/30 focus:outline-none text-sm" placeholder={placeholder} />
    </label>
  )
}

function CheckboxGroup({ label, hint, options, selected, toggle }: { label: string; hint?: string; options: readonly string[]; selected: string[]; toggle: (v: string) => void }) {
  return (
    <div>
      <span className="block text-sm text-neutral-300 mb-1 font-medium">{label}</span>
      {hint && <span className="block text-[11px] text-neutral-600 mb-2">{hint}</span>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className={`inline-flex items-center gap-2 cursor-pointer text-sm px-3 py-1.5 rounded-full border transition-colors ${selected.includes(opt) ? "border-white/30 bg-white/10 text-white" : "border-white/[0.06] text-neutral-500 hover:border-white/15"}`}>
            <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="sr-only" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────
export default function RequestDemoPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [step1, setStep1] = useState<Step1Data>(initialStep1)
  const [step2, setStep2] = useState<Step2Data>(initialStep2)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateStep1 = (k: keyof Step1Data, v: string | boolean) => {
    setStep1((prev) => ({ ...prev, [k]: v }))
    setError(null)
  }

  const updateStep2 = (k: keyof Step2Data, v: string | string[]) => {
    setStep2((prev) => ({ ...prev, [k]: v }))
    setError(null)
  }

  const toggleStep2Array = (k: "stages_most_labor", value: string) => {
    setStep2((prev) => {
      const arr = prev[k] as string[]
      const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]
      return { ...prev, [k]: next }
    })
    setError(null)
  }

  const step1Valid =
    step1.work_email &&
    step1.first_name &&
    step1.last_name &&
    step1.title_or_role &&
    step1.company_name &&
    step1.company_type &&
    step1.employee_count_range &&
    step1.timeline &&
    step1.consent_authorized

  const handleStep1Next = () => {
    if (!step1Valid) return
    setStep(2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const payload = {
        step1,
        step2,
        attribution: {
          utm_source: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_source") ?? null : null,
          utm_medium: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_medium") ?? null : null,
          utm_campaign: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_campaign") ?? null : null,
          utm_term: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_term") ?? null : null,
          utm_content: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_content") ?? null : null,
          referrer: typeof window !== "undefined" ? document.referrer || null : null,
          landing_page: typeof window !== "undefined" ? window.location.href : null,
        },
      }
      const res = await fetch("/api/leads/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error ?? "Submission failed")
      setSubmitSuccess(true)
      if (typeof window !== "undefined") {
        if ((window as unknown as { gtag?: (...a: unknown[]) => void }).gtag) {
          (window as unknown as { gtag: (...a: unknown[]) => void }).gtag("event", "demo_form_submitted", { lead_id: data.lead_id })
        }
        window.dispatchEvent(new CustomEvent("cta_click_request_demo", { detail: { lead_id: data.lead_id } }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="dark min-h-screen bg-black relative" style={brandFont}>
      {/* Shader background — same as homepage */}
      <div className="fixed inset-0 z-0">
        <MeshGradient className="w-full h-full" colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]} speed={0.6} distortion={0.8} swirl={0.1} />
      </div>

      <SiteHeader activePage="request-demo" />

      <div className="relative z-10 pt-24 pb-12 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
        {/* Dark scrim for readability */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm -z-10" aria-hidden="true" />

        {/* Hero */}
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-4 font-medium">
            Get Started
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Request a Demo of KaptureOps AI
          </h1>
          <p className="text-base text-neutral-400 mb-6 max-w-2xl leading-relaxed">
            See how KaptureOps AI unifies capture, compliance, proposals, finance, and teaming in one FedRAMP-ready platform built for every GovCon.
          </p>
          <ul className="space-y-2.5 mb-6">
            {[
              "Automate opportunity discovery and bid workflows",
              "Stay audit-ready across compliance and finance",
              "Build the strongest team using institutional knowledge",
            ].map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-neutral-300 text-sm">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-5 text-[12px] text-neutral-600">
            <span className="flex items-center gap-1.5"><Cloud className="h-3.5 w-3.5" /> AWS GovCloud</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> FedRAMP-ready</span>
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> CMMC Level 2 aligned</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`flex items-center gap-2 text-xs font-medium ${step === 1 ? "text-white" : "text-neutral-600"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] border ${step === 1 ? "border-white bg-white text-black" : "border-white/20"}`}>1</span>
            Your Info
          </div>
          <div className="w-8 h-px bg-white/10" />
          <div className={`flex items-center gap-2 text-xs font-medium ${step === 2 ? "text-white" : "text-neutral-600"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] border ${step === 2 ? "border-white bg-white text-black" : "border-white/20"}`}>2</span>
            Your Operations
          </div>
        </div>

        {/* Form or success */}
        {submitSuccess ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Demo request received</h2>
            <p className="text-neutral-400 mb-6">We&apos;ll be in touch shortly. You can also book a time that works for you.</p>
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors">
              Book your demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ════════ STEP 1 ════════ */}
            {step === 1 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 md:p-8 space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">Step 1 — Tell us about yourself</h2>
                  <p className="text-[12px] text-neutral-600 mt-1">We use this to prepare a tailored demo for your team.</p>
                </div>

                <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" value={step1.honeypot ?? ""} onChange={(e) => updateStep1("honeypot", e.target.value)} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Work email *" hint="We'll send demo details here" value={step1.work_email} onChange={(v) => updateStep1("work_email", v)} placeholder="you@company.com" type="email" required />
                  <InputField label="Company name *" hint="Your organization's legal or DBA name" value={step1.company_name} onChange={(v) => updateStep1("company_name", v)} placeholder="Acme Defense Inc." required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="First name *" value={step1.first_name} onChange={(v) => updateStep1("first_name", v)} required />
                  <InputField label="Last name *" value={step1.last_name} onChange={(v) => updateStep1("last_name", v)} required />
                </div>
                <InputField label="Your title or role *" hint="Helps us tailor the demo to your responsibilities" value={step1.title_or_role} onChange={(v) => updateStep1("title_or_role", v)} placeholder="e.g. Capture Manager, BD Director, COO" required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField label="Company type *" hint="How do you primarily contract?" value={step1.company_type} onChange={(v) => updateStep1("company_type", v)} options={COMPANY_TYPES} />
                  <SelectField label="Company size *" hint="Total headcount" value={step1.employee_count_range} onChange={(v) => updateStep1("employee_count_range", v)} options={EMPLOYEE_RANGES} />
                </div>
                <SelectField label="Evaluation timeline *" hint="When are you looking to adopt a solution?" value={step1.timeline} onChange={(v) => updateStep1("timeline", v)} options={TIMELINES} />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required checked={step1.consent_authorized} onChange={(e) => updateStep1("consent_authorized", e.target.checked)} className="mt-1 rounded border-white/20 bg-black/50 text-white focus:ring-white/30" />
                  <span className="text-sm text-neutral-400">I confirm I am authorized to share this information on behalf of my organization. *</span>
                </label>
                <div className="flex justify-end pt-2">
                  <button type="button" onClick={handleStep1Next} disabled={!step1Valid} className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
                    Continue <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ════════ STEP 2 ════════ */}
            {step === 2 && (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 md:p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Step 2 — Your current operations</h2>
                      <p className="text-[12px] text-neutral-600 mt-1">Helps us customize your demo. All fields are optional.</p>
                    </div>
                    <button type="button" onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }) }} className="text-sm text-neutral-500 hover:text-white transition-colors">← Back</button>
                  </div>

                  {/* ── Capture volume ── */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-200 mb-0.5">Capture Volume & Capacity</h3>
                      <p className="text-[11px] text-neutral-600">How much pursuit activity does your team handle?</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Opportunities reviewed per month" hint="Total opps your team evaluates for go/no-go" value={step2.opps_reviewed_month} onChange={(v) => updateStep2("opps_reviewed_month", v)} placeholder="e.g. 20" />
                      <InputField label="Bids submitted per month" hint="Proposals actually submitted to the government" value={step2.bids_submitted_month} onChange={(v) => updateStep2("bids_submitted_month", v)} placeholder="e.g. 5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SelectField label="Labor hours per bid" hint="Total team hours on one typical bid" value={step2.labor_hours_per_bid_range} onChange={(v) => updateStep2("labor_hours_per_bid_range", v)} options={LABOR_HOURS_RANGES} />
                      <SelectField label="People per bid" hint="Team members involved in one proposal" value={step2.people_per_bid_range} onChange={(v) => updateStep2("people_per_bid_range", v)} options={PEOPLE_PER_BID} />
                      <SelectField label="Cycle time (RFP to submit)" hint="Days from RFP release to submission" value={step2.cycle_time_range} onChange={(v) => updateStep2("cycle_time_range", v)} options={CYCLE_TIME_RANGES} />
                    </div>
                  </div>

                  {/* ── Discovery & bottlenecks ── */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-200 mb-0.5">Discovery & Bottlenecks</h3>
                      <p className="text-[11px] text-neutral-600">Where does your team spend the most time or hit constraints?</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField label="Weekly hours on opp search" hint="Time spent finding and qualifying opportunities" value={step2.hours_week_search_range} onChange={(v) => updateStep2("hours_week_search_range", v)} options={HOURS_WEEK_SEARCH} />
                      <SelectField label="Primary capacity constraint" hint="What most limits your bid volume?" value={step2.constraint_primary} onChange={(v) => updateStep2("constraint_primary", v)} options={CONSTRAINT_OPTIONS} />
                    </div>
                    {step2.constraint_primary === "Other" && (
                      <InputField label="Describe your constraint" value={step2.constraint_other} onChange={(v) => updateStep2("constraint_other", v)} />
                    )}
                    <SelectField label="Skip opps due to capacity?" hint="How often do you pass on good opportunities because the team is stretched?" value={step2.skip_opps_frequency} onChange={(v) => updateStep2("skip_opps_frequency", v)} options={SKIP_FREQUENCY} />
                    <CheckboxGroup label="Where is labor heaviest?" hint="Select the proposal stages that consume the most team hours" options={STAGES_LABOR} selected={step2.stages_most_labor} toggle={(v) => toggleStep2Array("stages_most_labor", v)} />
                  </div>

                  {/* ── Win/loss ── */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-200 mb-0.5">Win/Loss Profile</h3>
                      <p className="text-[11px] text-neutral-600">Understanding your outcomes helps us show relevant features.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField label="Primary reason for losses" hint="Most common debrief feedback" value={step2.loss_reason_primary} onChange={(v) => updateStep2("loss_reason_primary", v)} options={LOSS_REASONS} />
                      <SelectField label="Approximate win rate" hint="Across competitive bids" value={step2.win_rate_range} onChange={(v) => updateStep2("win_rate_range", v)} options={WIN_RATE_RANGES} />
                    </div>
                    {step2.loss_reason_primary === "Other" && (
                      <InputField label="Describe loss reason" value={step2.loss_reason_other} onChange={(v) => updateStep2("loss_reason_other", v)} />
                    )}
                    <SelectField label="Average opportunity value pursued" hint="Typical contract value of bids you submit" value={step2.avg_value_passed_range} onChange={(v) => updateStep2("avg_value_passed_range", v)} options={AVG_VALUE_PASSED} />
                  </div>

                  {/* ── Tools & security ── */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-200 mb-0.5">Current Tools & Security</h3>
                      <p className="text-[11px] text-neutral-600">What systems are in place today?</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField label="CRM" hint="Pipeline/BD tracking tool" value={step2.crm} onChange={(v) => updateStep2("crm", v)} options={CRM_OPTIONS} />
                      <SelectField label="Finance system" hint="Accounting & indirect rates" value={step2.finance_system} onChange={(v) => updateStep2("finance_system", v)} options={FINANCE_SYSTEMS} />
                    </div>
                    {step2.crm === "Other" && (
                      <InputField label="CRM name" value={step2.crm_other} onChange={(v) => updateStep2("crm_other", v)} />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SelectField label="Security environment" hint="Where your data lives" value={step2.security_environment} onChange={(v) => updateStep2("security_environment", v)} options={SECURITY_ENV} />
                      <SelectField label="CMMC status" hint="Current certification posture" value={step2.cmmc_status} onChange={(v) => updateStep2("cmmc_status", v)} options={CMMC_STATUS} />
                      <SelectField label="DCAA audit exposure" hint="Active or recent DCAA audits?" value={step2.dcaa_exposure} onChange={(v) => updateStep2("dcaa_exposure", v)} options={DCAA_EXPOSURE} />
                    </div>
                  </div>

                  {/* ── Additional notes ── */}
                  <label className="block">
                    <span className="block text-sm text-neutral-300 mb-1 font-medium">Anything else we should know?</span>
                    <span className="block text-[11px] text-neutral-600 mb-1.5">Specific pain points, upcoming bids, or questions for the demo</span>
                    <textarea value={step2.notes} onChange={(e) => updateStep2("notes", e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-neutral-600 focus:border-white/30 focus:outline-none resize-y text-sm" placeholder="Optional" />
                  </label>
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }) }} className="px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors">
                    ← Back
                  </button>
                  <button type="submit" disabled={submitting} className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 disabled:opacity-50 transition-colors flex items-center gap-2">
                    {submitting ? "Submitting…" : "Submit & Book Demo"}
                    {!submitting && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </main>
  )
}
