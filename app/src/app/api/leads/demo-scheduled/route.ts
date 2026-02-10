import { NextRequest, NextResponse } from "next/server"

/**
 * POST /api/leads/demo-scheduled
 * Webhook called by Calendly/HubSpot when a demo is booked.
 * Payload depends on scheduler; typically includes email or lead_id and meeting time.
 * TODO: parse payload, find lead by email or id, update status to "scheduled",
 *       update CRM stage to "Demo Scheduled", send confirmation email.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    // TODO: validate webhook secret from Calendly/HubSpot
    // TODO: extract lead identifier (email or lead_id) and meeting details
    // TODO: update lead in Supabase, CRM; send confirmation email
    return NextResponse.json({ received: true })
  } catch (e) {
    console.error("[demo-scheduled]", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
