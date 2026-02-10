'use client'

import Link from "next/link"
import { MeshGradientClient } from "@/components/ui/mesh-gradient-client"
import { Check, ArrowRight, Users, Shield, Sparkles, DollarSign } from "lucide-react"
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

// ─── PRICING DATA ────────────────────────────────────────────
const TIERS = [
  {
    name: "Launch",
    title: "Core Capture Deployment",
    subtitle: "For emerging and mid-size GovCons establishing a modern capture operation.",
    users: "Includes up to 2 named users",
    implementation: "$30,000",
    monthly: "$6,500",
    monthlyLabel: "/month",
    cta: "Request Demo",
    href: "/request-demo",
    highlighted: false,
    note: null,
  },
  {
    name: "Scale",
    title: "Expanded Capture Operations",
    subtitle: "For teams running multiple concurrent pursuits across agencies.",
    users: "Includes up to 5 named users",
    implementation: "$60,000",
    monthly: "$12,500",
    monthlyLabel: "/month",
    cta: "Talk to Sales",
    href: "/request-demo",
    highlighted: true,
    note: null,
  },
  {
    name: "Enterprise",
    title: "Enterprise Capture",
    subtitle: "For large organizations with complex, multi-agency pursuit portfolios.",
    users: "5+ named users",
    implementation: null,
    monthly: null,
    monthlyLabel: null,
    cta: "Request a Quote",
    href: "/request-demo",
    highlighted: false,
    note: "Custom implementation and pricing for larger teams.",
  },
]

const PLATFORM_MODULES = [
  "Opportunity Discovery",
  "Proposal Generation",
  "Intelligent Teaming",
  "Compliance Engine",
  "Financial Management",
  "Automated AP",
  "Contract Management",
  "Resume Intake",
  "Pipeline Analytics",
]

const PRICING_FAQS = [
  {
    q: "Why is there an implementation fee?",
    a: "KaptureOps is configured to your organization — your contracts, past performance, personnel, compliance posture, and financial structure. Implementation ensures the platform is production-ready from day one, not a generic template.",
  },
  {
    q: "What does 'named users' mean?",
    a: "Named users are individual team members with their own login and credentials. Every named user gets full access to all 9 modules. Additional users can be added to your plan at any time.",
  },
  {
    q: "Do you take a percentage of our contract wins?",
    a: "No. Never. We do not take a cut of your contract awards, revenue, or profit. No success fees. No revenue share. Your subscription is your only cost — period.",
  },
  {
    q: "Is there a long-term contract?",
    a: "We offer annual agreements with monthly billing. Enterprise tier terms are negotiated individually based on your organization's scale and requirements.",
  },
  {
    q: "How does this compare to building in-house?",
    a: "Most contractors spend $50K+ per proposal using fragmented tools and manual labor. KaptureOps replaces 6–8 separate systems with one integrated platform — a fraction of the friction, without the hiring overhead.",
  },
]

// ─── PAGE ────────────────────────────────────────────────────
export default function PricingPage() {
  return (
    <main className="dark min-h-screen bg-black relative">
      <div className="fixed inset-0 z-0">
        <MeshGradientClient className="w-full h-full" colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]} speed={0.6} distortion={0.8} swirl={0.1} />
      </div>
      <SiteHeader activePage="pricing" />

      <div className="relative z-10 pt-20">

        {/* ═══ 1) HERO ═══ */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 pt-16 md:pt-28 pb-12 md:pb-16" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-6 font-medium">
              KaptureOps AI Pricing
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-6 leading-[1.1]">
              Same Platform. Full Scope. Every Tier.
            </h1>
            <p className="text-[16px] leading-[1.7] text-neutral-400 max-w-2xl mx-auto">
              Every customer gets the complete KaptureOps AI platform — all 9 modules, full capability. The only difference between tiers is the number of named users on your account.
            </p>
          </div>
        </section>

        {/* ═══ 2) NO REVENUE SHARE CALLOUT ═══ */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-10 md:py-14" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative">
            <div className="rounded-2xl border border-white/[0.08] bg-black/50 p-8 md:p-10 text-center">
              <p className="text-xl md:text-2xl font-bold text-white tracking-[-0.02em] mb-3">
                No Revenue Share. Ever.
              </p>
              <p className="text-[15px] text-neutral-400 leading-relaxed mb-3 max-w-lg mx-auto">
                We do not take a percentage of your contract awards.
                No success fees. No profit share.
              </p>
              <p className="text-[15px] text-neutral-300 leading-relaxed max-w-lg mx-auto">
                KaptureOps is licensed infrastructure — not a broker.
                You keep 100% of the upside.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 3) VALUE PILLS ═══ */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-8" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-4xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Sparkles, label: "Full Platform Access" },
                { icon: DollarSign, label: "No Profit Share. Ever." },
                { icon: Shield, label: "Gov-Cloud Ready" },
              ].map((pill) => {
                const Icon = pill.icon
                return (
                  <div key={pill.label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-4 w-4 text-neutral-400" />
                    </div>
                    <p className="text-[12px] font-medium text-neutral-300 uppercase tracking-[0.1em]">{pill.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══ 4) PRICING TIERS ═══ */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-12 md:py-20" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-5xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`
                    relative rounded-2xl border p-6 md:p-8 flex flex-col
                    ${tier.highlighted
                      ? "border-white/20 bg-black/60 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                      : "border-white/[0.08] bg-black/50"
                    }
                  `}
                >
                  {/* Tier name */}
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-[-0.02em] mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm font-medium text-neutral-300 tracking-[-0.01em] mb-2">
                    {tier.title}
                  </p>
                  <p className="text-[13px] text-neutral-500 leading-relaxed mb-3">
                    {tier.subtitle}
                  </p>

                  {/* Users */}
                  <div className="flex items-center gap-2 mb-5">
                    <Users className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                    <span className="text-sm text-neutral-400">{tier.users}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.06] mb-5" />

                  {/* Pricing */}
                  {tier.monthly ? (
                    <div className="mb-6">
                      {/* Implementation */}
                      <div className="mb-4">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-600 font-medium mb-1">
                          Implementation
                        </p>
                        <p className="text-lg font-bold text-white">{tier.implementation}</p>
                      </div>
                      {/* Monthly */}
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-600 font-medium mb-1">
                          Monthly
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl md:text-4xl font-bold text-white tracking-[-0.03em]">{tier.monthly}</span>
                          <span className="text-sm text-neutral-500">{tier.monthlyLabel}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <p className="text-2xl font-bold text-neutral-400 mb-1">Custom</p>
                      <p className="text-sm text-neutral-500">Let&apos;s build your plan together.</p>
                    </div>
                  )}

                  {/* Spacer to push CTA to bottom */}
                  <div className="flex-1" />

                  {/* CTA */}
                  <Link href={tier.href} className="block">
                    <button
                      className={`
                        w-full py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-2
                        ${tier.highlighted
                          ? "bg-white text-black hover:bg-neutral-200"
                          : "border border-neutral-700 text-white hover:bg-white/5"
                        }
                      `}
                    >
                      {tier.cta} <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>

                  {/* Note */}
                  {tier.note && (
                    <p className="mt-4 text-[11px] text-neutral-600 leading-relaxed text-center">
                      {tier.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5) EARLY DEPLOYMENT NOTE ═══ */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-10 md:py-14" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-2xl mx-auto relative text-center">
            <p className="text-sm text-neutral-500">
              Early deployment pricing is limited. Standard pricing applies as capacity fills.
            </p>
          </div>
        </section>

        {/* ═══ 6) PLATFORM INCLUSIONS ═══ */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-24" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-3 font-medium">
                Full Access
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white">
                What&apos;s Included in Every Tier
              </h2>
              <p className="text-sm text-neutral-500 mt-3">
                Every customer receives the full KaptureOps AI platform. All modules. All capabilities. No feature tiers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PLATFORM_MODULES.map((mod) => (
                <div key={mod} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <Check className="h-4 w-4 text-white shrink-0" />
                  <span className="text-sm text-neutral-300">{mod}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7) PRICING FAQ ═══ */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-24" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-3 font-medium">
                Questions
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white">
                Common Questions
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRICING_FAQS.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-white/[0.08] bg-black/50 p-6">
                  <h3 className="text-sm font-semibold text-white mb-2 tracking-[-0.01em]">{faq.q}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 8) FINAL CTA ═══ */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-20" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative text-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.03em] text-white mb-4 leading-[1.1]">
              Ready to see KaptureOps in action?
            </h2>
            <p className="text-[15px] text-neutral-400 mb-8 max-w-md mx-auto">
              Schedule a demo with our team. We&apos;ll walk through the platform with your data and show you what&apos;s possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/request-demo"
                className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 tracking-wide uppercase"
              >
                Request a Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:contact@velarix.com"
                className="px-8 py-3.5 rounded-full border border-neutral-700 text-white font-medium text-sm hover:bg-white/5 transition-colors tracking-wide uppercase text-center"
              >
                Contact Velarix
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
