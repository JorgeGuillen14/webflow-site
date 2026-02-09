'use client'

import { useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { MeshGradient } from "@paper-design/shaders-react"
import { ArrowRight, Search, FileText, Users, Shield, DollarSign, Receipt, Layers, UserCheck, BarChart3 } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"
import { RadialOrbitalTimeline, type TimelineItem } from "@/components/ui/radial-orbital-timeline"

gsap.registerPlugin(ScrollTrigger)

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

// ─── MAGNETIC BUTTON ─────────────────────────────────────────
function MagneticButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" })
  }, [])

  const handleLeave = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" })
  }, [])

  const handleEnter = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "power2.out" })
  }, [])

  return (
    <button
      ref={btnRef}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      {...props}
    >
      {children}
    </button>
  )
}

// ─── SHADER BACKGROUND ──────────────────────────────────────
function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <MeshGradient className="w-full h-full" colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]} speed={0.6} distortion={0.8} swirl={0.1} />
    </div>
  )
}

// ─── GSAP ANIMATIONS ────────────────────────────────────────
function useKaptureAnimations() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".gsap-k-hero > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.2 })

      gsap.fromTo(".gsap-k-overview-col", { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-overview", start: "top 85%", toggleActions: "play none none none" }
      })

      gsap.fromTo(".gsap-k-orbital", { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-capabilities", start: "top 85%", toggleActions: "play none none none" }
      })

      gsap.fromTo(".gsap-k-step", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-how", start: "top 85%", toggleActions: "play none none none" }
      })

      gsap.fromTo(".gsap-k-result", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-results", start: "top 85%", toggleActions: "play none none none" }
      })

      gsap.fromTo(".gsap-k-security li", { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-security", start: "top 85%", toggleActions: "play none none none" }
      })

      gsap.fromTo(".gsap-k-final-cta > *", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-final-cta", start: "top 85%", toggleActions: "play none none none" }
      })

      gsap.utils.toArray<HTMLElement>(".gsap-k-section-heading").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
        })
      })
    })

    return () => {
      document.documentElement.style.scrollBehavior = ""
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}

// ─── KAPTUREOPS CAPABILITIES: 9 completely different hues (no same color family) ───
// Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta, Pink
const KAPTUREOPS_CAPABILITIES: TimelineItem[] = [
  { id: 1, title: "Opportunity Discovery", icon: Search, content: "AI monitors federal marketplaces and scores every opportunity against your company profile. Know what to pursue and what to pass — before your competitors even see the listing.", category: "Discovery", relatedIds: [2, 3], color: "#06b6d4" },   // cyan
  { id: 2, title: "Proposal Generation", icon: FileText, content: "Generate compliant proposal drafts in minutes, not weeks. The platform pulls from your data to build Technical, Management, and Staffing volumes grounded in real performance history.", category: "Proposals", relatedIds: [1, 3, 8], color: "#7c3aed" },   // purple
  { id: 3, title: "Intelligent Teaming", icon: Users, content: "AI-powered partner matching and gap analysis. Build the strongest possible team for every pursuit by surfacing the right partners, subcontractors, and joint venture candidates.", category: "Teaming", relatedIds: [1, 2, 8], color: "#22c55e" },   // green
  { id: 4, title: "Compliance Engine", icon: Shield, content: "Continuous monitoring across every certification, clearance, and regulatory requirement your organization needs. Alerts before anything expires. Compliance as a steady state, not a scramble.", category: "Compliance", relatedIds: [5, 7], color: "#eab308" },   // yellow
  { id: 5, title: "Financial Management", icon: DollarSign, content: "Indirect rate calculations, cost pool management, and audit-ready documentation — all automated. Replace the spreadsheets your finance team dreads every month.", category: "Finance", relatedIds: [4, 6], color: "#ef4444" },   // red
  { id: 6, title: "Automated AP", icon: Receipt, content: "AI-powered invoice processing that reads, matches, and verifies every line item against your contracts. Eliminate manual entry errors and accelerate payment cycles.", category: "Accounts Payable", relatedIds: [5, 7], color: "#db2777" },   // pink
  { id: 7, title: "Contract Management", icon: Layers, content: "Full lifecycle oversight from award to closeout. Track spend against ceilings, manage deliverables, and surface analytics that sharpen your strategy for the next pursuit.", category: "Contracts", relatedIds: [4, 6, 9], color: "#2563eb" },   // blue
  { id: 8, title: "Resume Intake", icon: UserCheck, content: "Upload your entire company roster. The platform parses every resume and matches personnel to opportunities based on past performance, clearances, certifications, and role fit — so you always put your best people forward.", category: "Personnel", relatedIds: [2, 3], color: "#f97316" },   // orange
  { id: 9, title: "Pipeline Analytics", icon: BarChart3, content: "Real-time visibility into your entire capture pipeline. Win/loss trends, pursuit velocity, and forecasting — everything leadership needs to make strategic decisions about where to invest next.", category: "Analytics", relatedIds: [1, 7], color: "#c026d3" },   // magenta
]

// ─── PAGE ───────────────────────────────────────────────────
export default function KaptureOpsPage() {
  useKaptureAnimations()

  const steps = [
    { num: "01", label: "Import everything you have", desc: "Past performance, resumes, contracts, teaming agreements, compliance records — upload it all. KaptureOps turns scattered data into structured institutional memory." },
    { num: "02", label: "Discover what to pursue", desc: "AI monitors the federal marketplace and scores every opportunity against your company profile, past wins, and team strengths. Focus only on work you can win." },
    { num: "03", label: "Build the strongest team", desc: "The platform matches personnel and partners to each pursuit based on clearances, certifications, and role fit. Resumes are parsed and ranked automatically." },
    { num: "04", label: "Generate proposals, not paperwork", desc: "AI drafts compliant proposal sections in minutes. Every claim is grounded in your real data with full source traceability." },
    { num: "05", label: "Stay compliant, stay funded", desc: "Certifications, clearances, indirect rates, and invoices are tracked continuously. Alerts fire before anything expires or falls out of compliance." },
    { num: "06", label: "Manage, measure, repeat", desc: "Track active contracts from award to closeout. Surface analytics on win rates, pipeline velocity, and spend — then feed those insights back into the next pursuit." },
  ]

  return (
    <main className="dark min-h-screen bg-black relative">
      <ShaderBackground />
      <SiteHeader activePage="kaptureops" />

      <div className="relative z-10 pt-20" style={brandFont}>
        {/* 1) PRODUCT HERO — same structure & typography as home */}
        <section className="gsap-k-hero relative w-full px-6 md:px-12 lg:px-20 pt-14 md:pt-24 pb-14 md:pb-20">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-4xl mx-auto relative">
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-4 font-medium">
              A Velarix Product
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.05] mb-5">
              KaptureOps AI
            </h1>
            <p className="text-[16px] md:text-lg leading-[1.7] text-neutral-400 mb-6 max-w-2xl">
              The all-in-one, AI-driven operating system for defense contractors.
            </p>
            <p className="text-[16px] leading-[1.7] text-neutral-400 max-w-2xl mb-8">
              KaptureOps AI replaces fragmented tools with a single platform that automates the complete capture-to-contract lifecycle. Opportunity discovery, proposal generation, resume-based team building, compliance tracking, financial management, and contract oversight — one system that acts as both your operational backbone and strategic advisor.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/request-demo">
                <MagneticButton className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2 tracking-wide uppercase">
                  Request a Demo <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
              <a href="#capabilities">
                <MagneticButton className="px-8 py-3 rounded-full border border-neutral-700 text-white font-medium text-sm hover:bg-white/5 transition-colors tracking-wide uppercase">
                  See Platform Capabilities
                </MagneticButton>
              </a>
            </div>
            <p className="text-[12px] text-neutral-600 leading-relaxed max-w-xl">
              Hosted on AWS GovCloud. Encryption at rest and in transit. Designed to align with CMMC Level 2 practices.
            </p>
          </div>
        </section>

        {/* 2) PRODUCT OVERVIEW — same section pattern & typography as home */}
        <section className="gsap-k-overview relative w-full px-6 md:px-12 lg:px-20 pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-6xl mx-auto relative text-center">
            <div className="gsap-k-section-heading mb-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-medium">
                Product Overview
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] text-white">
                Platform Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
              <div className="gsap-k-overview-col w-full max-w-md text-center">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-white mb-3 md:text-[1.25rem]">Find &amp; Win</h3>
                <p className="text-sm md:text-base leading-[1.375rem] text-neutral-400 mb-4">
                  AI-powered opportunity scoring, automated proposal generation, and intelligent team building — all in one workflow.
                </p>
                <ul className="space-y-2 text-left mx-auto max-w-xs">
                  <li className="flex items-start gap-2.5 text-[13px] text-neutral-500 leading-[1.5]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />Pursue only what you can win
                  </li>
                  <li className="flex items-start gap-2.5 text-[13px] text-neutral-500 leading-[1.5]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />Proposals drafted in minutes, not weeks
                  </li>
                </ul>
              </div>
              <div className="gsap-k-overview-col w-full max-w-md text-center">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-white mb-3 md:text-[1.25rem]">People &amp; Partners</h3>
                <p className="text-sm md:text-base leading-[1.375rem] text-neutral-400 mb-4">
                  Upload every resume in your organization. AI matches the best personnel and teaming partners to each pursuit automatically.
                </p>
                <ul className="space-y-2 text-left mx-auto max-w-xs">
                  <li className="flex items-start gap-2.5 text-[13px] text-neutral-500 leading-[1.5]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />Always field your strongest team
                  </li>
                  <li className="flex items-start gap-2.5 text-[13px] text-neutral-500 leading-[1.5]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />Gap analysis across every pursuit
                  </li>
                </ul>
              </div>
              <div className="gsap-k-overview-col w-full max-w-md text-center">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-white mb-3 md:text-[1.25rem]">Operate &amp; Grow</h3>
                <p className="text-sm md:text-base leading-[1.375rem] text-neutral-400 mb-4">
                  Compliance tracking, financial management, invoice automation, and contract oversight — continuously and automatically.
                </p>
                <ul className="space-y-2 text-left mx-auto max-w-xs">
                  <li className="flex items-start gap-2.5 text-[13px] text-neutral-500 leading-[1.5]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />Always audit-ready, never scrambling
                  </li>
                  <li className="flex items-start gap-2.5 text-[13px] text-neutral-500 leading-[1.5]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />Full visibility from award to closeout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3) PLATFORM CAPABILITIES — orbital timeline */}
        <section id="capabilities" className="gsap-k-capabilities relative w-full px-6 md:px-12 lg:px-20 pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-6xl mx-auto relative text-center">
            <div className="gsap-k-section-heading mb-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-medium">
                9 Core Modules
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] text-white">
                Platform Capabilities
              </h2>
              <p className="text-[16px] leading-[1.7] text-neutral-400 mt-3 max-w-lg mx-auto">
                Click any module to explore. Connected modules pulse to show how KaptureOps links your entire workflow.
              </p>
            </div>
            <div className="gsap-k-orbital">
              <RadialOrbitalTimeline timelineData={KAPTUREOPS_CAPABILITIES} />
            </div>
          </div>
        </section>

        {/* 4) HOW IT WORKS — same section pattern as home */}
        <section className="gsap-k-how relative w-full px-6 md:px-12 lg:px-20 pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-4xl mx-auto relative">
            <div className="gsap-k-section-heading mb-12 text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-medium">
                Process
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] text-white">
                How It Works
              </h2>
            </div>
            <div className="space-y-0">
              {steps.map((step) => (
                <div key={step.num} className="gsap-k-step flex items-start gap-6 md:gap-8 py-6 border-t border-white/[0.06]">
                  <span className="text-[13px] font-mono text-neutral-500 pt-0.5 flex-shrink-0">{step.num}</span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1 tracking-[-0.01em]">{step.label}</h3>
                    <p className="text-[15px] leading-[1.6] text-neutral-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5) OUTCOMES — same section pattern as home */}
        <section className="gsap-k-results relative w-full px-6 md:px-12 lg:px-20 pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-6xl mx-auto relative text-center">
            <div className="gsap-k-section-heading mb-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-medium">
                Results
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] text-white">
                Outcomes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="gsap-k-result rounded-2xl border border-white/[0.08] bg-black/50 p-6 md:p-8 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-[-0.03em]">Win more</p>
                <p className="text-[15px] leading-[1.6] text-neutral-400">Stronger proposals with AI-scored team composition and past performance matching.</p>
              </div>
              <div className="gsap-k-result rounded-2xl border border-white/[0.08] bg-black/50 p-6 md:p-8 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-[-0.03em]">Spend less</p>
                <p className="text-[15px] leading-[1.6] text-neutral-400">Replace 6-8 tools and cut $50K+ per proposal in labor. AI drafts in minutes.</p>
              </div>
              <div className="gsap-k-result rounded-2xl border border-white/[0.08] bg-black/50 p-6 md:p-8 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-[-0.03em]">Stay ready</p>
                <p className="text-[15px] leading-[1.6] text-neutral-400">Always CMMC-compliant, always DCAA audit-ready, always on top of contract milestones.</p>
              </div>
            </div>
            <p className="mt-8 text-[12px] text-neutral-600 text-center max-w-xl mx-auto">
              Results vary by process maturity and data quality.
            </p>
          </div>
        </section>

        {/* 6) SECURITY & GOVERNANCE — same bullets & typography as home */}
        <section id="security" className="gsap-k-security relative w-full px-6 md:px-12 lg:px-20 pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative text-center">
            <div className="gsap-k-section-heading mb-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-medium">
                Trust &amp; Compliance
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] text-white">
                Security &amp; Governance
              </h2>
            </div>
            <ul className="space-y-3 text-left max-w-lg mx-auto">
              {[
                "Hosted on AWS GovCloud",
                "Encryption at rest and in transit",
                "Role-based access control (RBAC)",
                "Full audit logging for every action and decision",
                "FedRAMP-ready architecture",
                "Designed to align with CMMC Level 2 practices",
                "DCAA-compliant financial documentation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-neutral-400 leading-[1.5]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[12px] text-neutral-600 max-w-lg mx-auto">
              No certification claims are made. Architecture is designed with alignment in mind.
            </p>
          </div>
        </section>

        {/* 7) FINAL CTA — same as home CTA style */}
        <section className="gsap-k-final-cta relative w-full px-6 md:px-12 lg:px-20 pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.1] mb-4">
              Stop losing contracts to disorganization.
            </h2>
            <p className="text-[16px] leading-[1.7] text-neutral-400 max-w-2xl mx-auto mb-8">
              Your past performance is buried in SharePoint. Your team capabilities live in people&apos;s heads. Your compliance status is a spreadsheet someone forgot to update. KaptureOps AI fixes all of it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/request-demo">
                <MagneticButton className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2 tracking-wide uppercase">
                  Request a Demo <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
              <a href="mailto:contact@velarix.com">
                <MagneticButton className="px-8 py-3 rounded-full border border-neutral-700 text-white font-medium text-sm hover:bg-white/5 transition-colors tracking-wide uppercase">
                  Contact Velarix
                </MagneticButton>
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
