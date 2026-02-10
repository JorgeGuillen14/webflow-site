'use client'

import Link from "next/link"
import { MeshGradientClient } from "@/components/ui/mesh-gradient-client"
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

export default function BookDemoPage() {
  return (
    <main className="dark min-h-screen bg-black relative" style={brandFont}>
      <div className="fixed inset-0 z-0">
        <MeshGradientClient className="w-full h-full" colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]} speed={0.6} distortion={0.8} swirl={0.1} />
      </div>

      <SiteHeader />

      <div className="relative z-10 pt-24">
        <div className="relative max-w-3xl mx-auto px-6 md:px-12 py-16">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm -z-10" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Book your demo</h1>
          <p className="text-neutral-400 mb-8">
            Choose a time that works for you. Enterprise and Core demos use separate calendars — we&apos;ll route you based on your submission.
          </p>

          {/* Placeholder: replace with Calendly or HubSpot Meetings embed */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] border-dashed min-h-[400px] flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-neutral-500 mb-4">Scheduler embed (Calendly / HubSpot Meetings)</p>
              <p className="text-sm text-neutral-600">
                Add your embed code or iframe here.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            Prefer to talk first? <Link href="/request-demo" className="text-white hover:underline">Submit the form</Link> and we&apos;ll reach out.
          </p>
        </div>

        <SiteFooter />
      </div>
    </main>
  )
}
