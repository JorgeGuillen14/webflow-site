'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

// ─── CUSTOM CURSOR ──────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" })
    }

    const grow = () => {
      gsap.to(ring, { scale: 2, borderColor: "rgba(255,255,255,0.6)", duration: 0.3 })
      gsap.to(dot, { scale: 0.5, duration: 0.3 })
    }
    const shrink = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.25)", duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener("mousemove", moveCursor)
    const interactives = document.querySelectorAll("a, button, [role='button']")
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow)
      el.addEventListener("mouseleave", shrink)
    })
    return () => {
      window.removeEventListener("mousemove", moveCursor)
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow)
        el.removeEventListener("mouseleave", shrink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: "50%", background: "white", boxShadow: "0 0 12px 4px rgba(255,255,255,0.5)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{ width: 40, height: 40, marginLeft: -20, marginTop: -20, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.25)", background: "transparent" }}
      />
    </>
  )
}

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

// ─── HEADER ─────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40" style={brandFont}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <a href="/" className="text-white font-black text-xl tracking-[0.45em] uppercase" style={{ fontFamily: "'Courier New', 'SF Mono', 'Fira Code', monospace" }}>
          VELARIX
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {/* Product dropdown */}
          <div className="relative" onMouseEnter={() => setProductOpen(true)} onMouseLeave={() => setProductOpen(false)}>
            <button className="text-sm text-white transition-colors tracking-wide uppercase flex items-center gap-1" aria-expanded={productOpen} aria-haspopup="true">
              Product <ChevronDown className="h-3 w-3" />
            </button>
            {productOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg py-2" role="menu">
                <a href="/kaptureops" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors" role="menuitem">KaptureOps AI</a>
              </div>
            )}
          </div>

          {/* Company dropdown */}
          <div className="relative" onMouseEnter={() => setCompanyOpen(true)} onMouseLeave={() => setCompanyOpen(false)}>
            <button className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase flex items-center gap-1" aria-expanded={companyOpen} aria-haspopup="true">
              Company <ChevronDown className="h-3 w-3" />
            </button>
            {companyOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg py-2" role="menu">
                <a href="/#what-we-do" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors" role="menuitem">What We Do</a>
                <a href="/team" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors" role="menuitem">Team</a>
                <a href="/#security" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors" role="menuitem">Security</a>
              </div>
            )}
          </div>

          <a href="/#contact" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">Contact</a>
          <a href="/kaptureops#demo" className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors tracking-wide uppercase">Request Demo</a>
        </nav>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden flex flex-col items-center gap-4 pb-6 bg-black/80 backdrop-blur-md">
          <a href="/kaptureops" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">KaptureOps AI</a>
          <a href="/#what-we-do" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">What We Do</a>
          <a href="/team" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">Team</a>
          <a href="/#contact" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">Contact</a>
          <a href="/kaptureops#demo" className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors tracking-wide uppercase">Request Demo</a>
        </nav>
      )}
    </header>
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
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hero
      gsap.fromTo(".gsap-k-hero > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.2 })

      // Overview columns
      gsap.fromTo(".gsap-k-overview-col", { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-overview", start: "top 85%", toggleActions: "play none none none" }
      })

      // Capability tiles
      gsap.fromTo(".gsap-k-cap-tile", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-capabilities", start: "top 85%", toggleActions: "play none none none" }
      })

      // How it works steps
      gsap.fromTo(".gsap-k-step", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-how", start: "top 85%", toggleActions: "play none none none" }
      })

      // Results cards
      gsap.fromTo(".gsap-k-result", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-results", start: "top 85%", toggleActions: "play none none none" }
      })

      // Security bullets
      gsap.fromTo(".gsap-k-security li", { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-security", start: "top 85%", toggleActions: "play none none none" }
      })

      // Final CTA
      gsap.fromTo(".gsap-k-final-cta > *", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-k-final-cta", start: "top 85%", toggleActions: "play none none none" }
      })

      // Section headings
      gsap.utils.toArray<HTMLElement>(".gsap-k-section-heading").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
        })
      })
    })

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}

// ─── CAPABILITY TILE ────────────────────────────────────────
interface CapTileProps {
  title: string
  narrative: string
  signal: string
  action: string
  result: string
}

function CapabilityTile({ title, narrative, signal, action, result }: CapTileProps) {
  return (
    <div className="gsap-k-cap-tile border-t border-white/10 pt-8 pb-10">
      <h3 className="text-lg md:text-xl font-semibold tracking-[-0.02em] text-white mb-3">{title}</h3>
      <p className="text-[15px] leading-relaxed text-neutral-400 mb-6">{narrative}</p>
      <div className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-600 w-16 flex-shrink-0 font-medium">Signal</span>
          <span className="text-sm text-neutral-400">{signal}</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-600 w-16 flex-shrink-0 font-medium">Action</span>
          <span className="text-sm text-neutral-400">{action}</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-600 w-16 flex-shrink-0 font-medium">Result</span>
          <span className="text-sm text-neutral-400">{result}</span>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ───────────────────────────────────────────────────
export default function KaptureOpsPage() {
  useKaptureAnimations()

  const capabilities: CapTileProps[] = [
    {
      title: "Opportunity Intelligence",
      narrative: "A continuously learning system that turns raw opportunity noise into prioritized pursuit decisions.",
      signal: "Market and solicitation signals",
      action: "Normalizes and ranks relevance",
      result: "Teams focus only on work that matters",
    },
    {
      title: "Requirement Intelligence",
      narrative: "A structured understanding of what is being asked, why it matters, and how it must be satisfied.",
      signal: "Unstructured documents",
      action: "Converts into traceable requirement objects",
      result: "Nothing important is missed",
    },
    {
      title: "Workflow Orchestration",
      narrative: "A coordinated execution layer that assigns ownership, sequences work, and enforces accountability.",
      signal: "Tasks and dependencies",
      action: "Routes and tracks execution",
      result: "Predictable delivery",
    },
    {
      title: "Evidence-Constrained Generation",
      narrative: "Content produced only when grounded in approved knowledge and validated inputs.",
      signal: "Approved sources",
      action: "Generates bounded drafts",
      result: "Higher trust outputs",
    },
    {
      title: "Continuous Compliance Posture",
      narrative: "Compliance treated as an always-on state, not a last-minute event.",
      signal: "Controls and obligations",
      action: "Monitors continuously",
      result: "Reduced compliance risk",
    },
    {
      title: "Executive-Level Visibility",
      narrative: "Real-time visibility into posture, progress, and risk.",
      signal: "Platform activity",
      action: "Aggregates into decision views",
      result: "Faster leadership decisions",
    },
  ]

  const steps = [
    { num: "01", label: "Upload or connect sources", desc: "Ingest opportunity documents, historical proposals, and compliance artifacts." },
    { num: "02", label: "Extract and normalize requirements", desc: "Structure unstructured data into traceable, actionable objects." },
    { num: "03", label: "Map ownership and compliance", desc: "Assign responsibility and link controls to obligations." },
    { num: "04", label: "Generate drafts with constraints", desc: "Produce content bounded by approved sources and validated inputs." },
    { num: "05", label: "Export artifacts with provenance", desc: "Deliver outputs with full traceability to source material." },
  ]

  return (
    <main className="dark min-h-screen bg-black relative cursor-none md:cursor-none">
      <ShaderBackground />
      <CustomCursor />
      <Header />

      <div className="relative z-10 pt-20">
        {/* ════════════════════════════════════════════════════════
            1) PRODUCT HERO
            ════════════════════════════════════════════════════════ */}
        <section className="gsap-k-hero relative w-full px-6 md:px-12 lg:px-20 pt-16 md:pt-28 pb-20 md:pb-32" style={brandFont} aria-labelledby="kaptureops-heading">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-4xl relative">
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-6 font-medium">
              A Velarix Product
            </p>
            <h1 id="kaptureops-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.05] mb-6">
              KaptureOps AI
            </h1>
            <p className="text-xl md:text-2xl font-medium text-neutral-300 tracking-[-0.01em] mb-8 max-w-2xl">
              The complete operating system for defense contractors.
            </p>
            <p className="text-[16px] leading-[1.7] text-neutral-400 max-w-2xl mb-10">
              KaptureOps AI automates the end-to-end capture, proposal, and compliance lifecycle by replacing fragmented tools with a single system that ingests opportunities, structures requirements, coordinates internal inputs, and produces compliant proposal outputs with speed and traceability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <MagneticButton className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2 tracking-wide uppercase" id="demo">
                Request a Demo <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton className="px-8 py-3.5 rounded-full border border-neutral-700 text-white font-medium text-sm hover:bg-white/5 transition-colors tracking-wide uppercase">
                See Platform Capabilities
              </MagneticButton>
            </div>
            <p className="text-[12px] text-neutral-600 leading-relaxed max-w-xl">
              Hosted on AWS GovCloud. Encryption at rest and in transit. Designed to align with CMMC Level 2 practices.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full px-6 md:px-12 lg:px-20"><div className="border-t border-white/[0.06]" /></div>

        {/* ════════════════════════════════════════════════════════
            2) PRODUCT OVERVIEW BAND
            ════════════════════════════════════════════════════════ */}
        <section className="gsap-k-overview relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28" style={brandFont} aria-labelledby="overview-heading">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-7xl mx-auto relative">
            <h2 id="overview-heading" className="gsap-k-section-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white mb-16">
              Platform Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {/* Column 1 */}
              <div className="gsap-k-overview-col">
                <h3 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">Opportunity Intelligence</h3>
                <p className="text-[15px] leading-relaxed text-neutral-400 mb-5">
                  A system that continuously evaluates market signals and surfaces high-value pursuits.
                </p>
                <ul className="space-y-2" role="list">
                  <li className="text-sm text-neutral-500 flex items-baseline gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-1.5" aria-hidden="true" />Less noise
                  </li>
                  <li className="text-sm text-neutral-500 flex items-baseline gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-1.5" aria-hidden="true" />Better focus
                  </li>
                </ul>
              </div>
              {/* Column 2 */}
              <div className="gsap-k-overview-col">
                <h3 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">Proposal Acceleration</h3>
                <p className="text-[15px] leading-relaxed text-neutral-400 mb-5">
                  Structured drafting that compresses weeks of effort into days.
                </p>
                <ul className="space-y-2" role="list">
                  <li className="text-sm text-neutral-500 flex items-baseline gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-1.5" aria-hidden="true" />Faster starts
                  </li>
                  <li className="text-sm text-neutral-500 flex items-baseline gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-1.5" aria-hidden="true" />Higher consistency
                  </li>
                </ul>
              </div>
              {/* Column 3 */}
              <div className="gsap-k-overview-col">
                <h3 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">Compliance Posture</h3>
                <p className="text-[15px] leading-relaxed text-neutral-400 mb-5">
                  Always-on awareness of obligations and readiness.
                </p>
                <ul className="space-y-2" role="list">
                  <li className="text-sm text-neutral-500 flex items-baseline gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-1.5" aria-hidden="true" />Fewer surprises
                  </li>
                  <li className="text-sm text-neutral-500 flex items-baseline gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-1.5" aria-hidden="true" />Lower risk
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full px-6 md:px-12 lg:px-20"><div className="border-t border-white/[0.06]" /></div>

        {/* ════════════════════════════════════════════════════════
            3) PLATFORM CAPABILITIES GRID
            ════════════════════════════════════════════════════════ */}
        <section id="capabilities" className="gsap-k-capabilities relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28" style={brandFont} aria-labelledby="capabilities-heading">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-7xl mx-auto relative">
            <h2 id="capabilities-heading" className="gsap-k-section-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white mb-16">
              Platform Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
              {capabilities.map((cap) => (
                <CapabilityTile key={cap.title} {...cap} />
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full px-6 md:px-12 lg:px-20"><div className="border-t border-white/[0.06]" /></div>

        {/* ════════════════════════════════════════════════════════
            4) HOW IT WORKS
            ════════════════════════════════════════════════════════ */}
        <section className="gsap-k-how relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28" style={brandFont} aria-labelledby="how-heading">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-4xl relative">
            <h2 id="how-heading" className="gsap-k-section-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white mb-16">
              How It Works
            </h2>
            <div className="space-y-0">
              {steps.map((step) => (
                <div key={step.num} className="gsap-k-step flex items-start gap-6 md:gap-8 py-6 border-t border-white/[0.06]">
                  <span className="text-[13px] font-mono text-neutral-600 pt-0.5 flex-shrink-0">{step.num}</span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1 tracking-[-0.01em]">{step.label}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full px-6 md:px-12 lg:px-20"><div className="border-t border-white/[0.06]" /></div>

        {/* ════════════════════════════════════════════════════════
            5) RESULTS
            ════════════════════════════════════════════════════════ */}
        <section className="gsap-k-results relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28" style={brandFont} aria-labelledby="results-heading">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-7xl mx-auto relative">
            <h2 id="results-heading" className="gsap-k-section-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white mb-16">
              Outcomes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="gsap-k-result border-t border-white/10 pt-8">
                <p className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-[-0.03em]">Cycle time</p>
                <p className="text-[15px] text-neutral-400 leading-relaxed">Reduction in proposal development timelines through structured automation.</p>
              </div>
              <div className="gsap-k-result border-t border-white/10 pt-8">
                <p className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-[-0.03em]">Compliance risk</p>
                <p className="text-[15px] text-neutral-400 leading-relaxed">Lower exposure through continuous posture monitoring and traceable outputs.</p>
              </div>
              <div className="gsap-k-result border-t border-white/10 pt-8">
                <p className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-[-0.03em]">Team capacity</p>
                <p className="text-[15px] text-neutral-400 leading-relaxed">More bids pursued with the same team through systematic workflow compression.</p>
              </div>
            </div>
            <p className="mt-10 text-[12px] text-neutral-600">
              Results vary by process maturity and data quality.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full px-6 md:px-12 lg:px-20"><div className="border-t border-white/[0.06]" /></div>

        {/* ════════════════════════════════════════════════════════
            6) SECURITY & GOVERNANCE
            ════════════════════════════════════════════════════════ */}
        <section id="security" className="gsap-k-security relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28" style={brandFont} aria-labelledby="security-heading">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl relative">
            <h2 id="security-heading" className="gsap-k-section-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white mb-10">
              Security &amp; Governance
            </h2>
            <ul className="space-y-4" role="list">
              {[
                "Hosted on AWS GovCloud",
                "Encryption at rest and in transit",
                "Role-based access support",
                "Audit logging support",
                "Designed to align with CMMC Level 2 architecture",
              ].map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-[15px] text-neutral-400">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0 mt-1.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[12px] text-neutral-600">
              No certification claims are made. Architecture is designed with alignment in mind.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full px-6 md:px-12 lg:px-20"><div className="border-t border-white/[0.06]" /></div>

        {/* ════════════════════════════════════════════════════════
            7) FINAL CTA
            ════════════════════════════════════════════════════════ */}
        <section className="gsap-k-final-cta relative w-full px-6 md:px-12 lg:px-20 py-24 md:py-36" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.1] mb-10">
              Bring discipline to capture and proposal operations.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2 tracking-wide uppercase">
                Request a Demo <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton className="px-8 py-3.5 rounded-full border border-neutral-700 text-white font-medium text-sm hover:bg-white/5 transition-colors tracking-wide uppercase">
                Contact Velarix
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
