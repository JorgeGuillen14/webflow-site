import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase-server"

/**
 * POST /api/leads/request-demo
 * Accepts step1 (contact) and optional step2 (questionnaire), attribution.
 * Validates, normalizes, and stores lead in Supabase (leads + questionnaire_responses).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body?.step1) {
      return NextResponse.json({ error: "Missing step1 data" }, { status: 400 })
    }

    const { step1, step2, attribution = {} } = body

    // Honeypot: if filled, treat as spam
    if (step1.honeypot && String(step1.honeypot).trim()) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 })
    }

    const email = normalizeEmail(step1.work_email)
    if (!email) {
      return NextResponse.json({ error: "Invalid work email" }, { status: 400 })
    }

    const required = ["first_name", "last_name", "title_or_role", "company_name", "company_type", "employee_count_range", "timeline"]
    for (const key of required) {
      if (!step1[key] || !String(step1[key]).trim()) {
        return NextResponse.json({ error: `Missing required field: ${key}` }, { status: 400 })
      }
    }

    if (!step1.consent_authorized) {
      return NextResponse.json({ error: "Consent required" }, { status: 400 })
    }

    const supabase = getSupabaseServer()

    if (!supabase) {
      // No Supabase configured: return success with a generated id (no persistence)
      const leadId = crypto.randomUUID()
      return NextResponse.json({
        success: true,
        lead_id: leadId,
        message: "Demo request received",
      })
    }

    const leadRow = {
      email,
      first_name: String(step1.first_name).trim() || null,
      last_name: String(step1.last_name).trim() || null,
      role: String(step1.title_or_role).trim() || null,
      company_name: String(step1.company_name).trim() || null,
      company_type: String(step1.company_type).trim() || null,
      employees_range: String(step1.employee_count_range).trim() || null,
      timeline: String(step1.timeline).trim() || null,
      utm_source: attribution.utm_source ?? null,
      utm_medium: attribution.utm_medium ?? null,
      utm_campaign: attribution.utm_campaign ?? null,
      utm_term: attribution.utm_term ?? null,
      utm_content: attribution.utm_content ?? null,
      referrer: attribution.referrer ?? null,
      landing_page: attribution.landing_page ?? null,
      consent_authorized: !!step1.consent_authorized,
      status: "new",
      security_environment: step2?.security_environment ? String(step2.security_environment).trim() : null,
    }

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert(leadRow)
      .select("id")
      .single()

    if (leadError) {
      console.error("[request-demo] leads insert", leadError)
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
    }

    const leadId = lead.id

    if (step2 && typeof step2 === "object") {
      const opps = parseInt(String(step2.opps_reviewed_month), 10)
      const bids = parseInt(String(step2.bids_submitted_month), 10)
      const maxBids = parseInt(String(step2.max_bids_month), 10)
      const qRow = {
        lead_id: leadId,
        opps_reviewed_month: Number.isNaN(opps) ? null : opps,
        bids_submitted_month: Number.isNaN(bids) ? null : bids,
        max_bids_month: Number.isNaN(maxBids) ? null : maxBids,
        labor_hours_per_bid_range: step2.labor_hours_per_bid_range || null,
        people_per_bid_range: step2.people_per_bid_range || null,
        cycle_time_range: step2.cycle_time_range || null,
        hours_week_search_range: step2.hours_week_search_range || null,
        constraint_primary: step2.constraint_primary || null,
        constraint_other: step2.constraint_other || null,
        skip_opps_frequency: step2.skip_opps_frequency || null,
        stages_most_labor: Array.isArray(step2.stages_most_labor) ? step2.stages_most_labor : null,
        loss_reason_primary: step2.loss_reason_primary || null,
        loss_reason_other: step2.loss_reason_other || null,
        win_rate_range: step2.win_rate_range || null,
        avg_value_passed_range: step2.avg_value_passed_range || null,
        opp_sources: Array.isArray(step2.opp_sources) ? step2.opp_sources : null,
        proposal_tools: Array.isArray(step2.proposal_tools) ? step2.proposal_tools : null,
        crm: step2.crm || null,
        finance_system: step2.finance_system || null,
        past_performance_locations: Array.isArray(step2.past_performance_locations) ? step2.past_performance_locations : null,
        resume_management: step2.resume_management || null,
        teaming_approach: step2.teaming_approach || null,
        portals_used: Array.isArray(step2.portals_used) ? step2.portals_used : null,
        cmmc_status: step2.cmmc_status || null,
        dcaa_exposure: step2.dcaa_exposure || null,
        notes: step2.notes || null,
      }
      const { error: qError } = await supabase.from("questionnaire_responses").insert(qRow)
      if (qError) console.error("[request-demo] questionnaire_responses insert", qError)
    }

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      message: "Demo request received",
    })
  } catch (e) {
    console.error("[request-demo]", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

function normalizeEmail(value: unknown): string | null {
  if (!value || typeof value !== "string") return null
  const email = value.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email
}
