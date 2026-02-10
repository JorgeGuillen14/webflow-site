'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { VelarixGooBlob } from "@/components/ui/velarix-goo-blob"
import { cn } from "@/lib/utils"
import { MeshGradientClient } from "@/components/ui/mesh-gradient-client"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ContextBox } from "@/components/ui/context-box"
import {
  Zap,
  Shield,
  BarChart3,
  Layers,
  ArrowRight,
  Cpu,
  Globe,
  Lock,
  Rocket,
  Sparkles,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import SiteFooter from "@/components/ui/site-footer"

gsap.registerPlugin(ScrollTrigger)

// ─── Shared font style ──────────────────────────────────────
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

// ─── SCROLL ANIMATIONS HOOK (deferred so hero paints first) ───
function useScrollAnimations() {
  useEffect(() => {
    let cancelled = false
    const run = () => {
      if (cancelled) return
      // Smooth scroll behavior
      document.documentElement.style.scrollBehavior = "smooth"

      // ── Hero goo blob — scale up from center
      gsap.fromTo(
      ".gsap-hero-content",
      { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    )

    // ── Hero text — stagger children up
    gsap.fromTo(
      ".gsap-hero-text > *",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.5 }
    )

    // ── Robot — gentle parallax
    gsap.to(".gsap-robot", {
      yPercent: -6,
      ease: "none",
      scrollTrigger: { trigger: ".gsap-robot", start: "top bottom", end: "bottom top", scrub: 1.5 }
    })

    // ── Focus section heading — fade up
    gsap.fromTo(
      ".gsap-focus-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-focus-heading", start: "top 88%", toggleActions: "play none none none" }
      }
    )

    // ── Focus cards — stagger in from below
    gsap.fromTo(
      ".gsap-focus-card",
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-focus-card", start: "top 90%", toggleActions: "play none none none" }
      }
    )

    // ── Focus card inner content — subtle stagger (icon, title, desc, bullets)
    gsap.fromTo(
      ".gsap-focus-card-inner > *",
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-focus-card", start: "top 85%", toggleActions: "play none none none" }
      }
    )

    // ── How We Help heading — line draw + fade
    gsap.fromTo(
      ".gsap-help-heading",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-help-heading", start: "top 90%", toggleActions: "play none none none" }
      }
    )

    // ── How We Help cards — stagger in from below
    gsap.fromTo(
      ".gsap-help-item",
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-help-items", start: "top 90%", toggleActions: "play none none none" }
      }
    )

    // ── How We Help card inner — icon, title, desc stagger
    gsap.fromTo(
      ".gsap-help-card-inner > *",
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-help-items", start: "top 85%", toggleActions: "play none none none" }
      }
    )

    // ── KaptureOps callout card — subtle scale-in
    gsap.fromTo(
      ".gsap-kops-callout",
      { opacity: 0, y: 20, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-kops-callout", start: "top 92%", toggleActions: "play none none none" }
      }
    )

    // ── Stats heading — fade up
    gsap.fromTo(
      ".gsap-stats-heading",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-stats-heading", start: "top 90%", toggleActions: "play none none none" }
      }
    )

    // ── Stat cards — stagger in from below
    gsap.fromTo(
      ".gsap-stat-card",
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-stat-card", start: "top 92%", toggleActions: "play none none none" }
      }
    )

    // ── Final CTA — fade up
    gsap.fromTo(
      ".gsap-final-cta > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-final-cta", start: "top 88%", toggleActions: "play none none none" }
      }
    )

    return () => {
      document.documentElement.style.scrollBehavior = ""
      ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill())
    }
    }

    let scrollCleanup: (() => void) | undefined
    const schedule =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => {
            if (!cancelled) scrollCleanup = run()
          }, { timeout: 500 })
        : 0
    const t = setTimeout(() => {
      if (!cancelled && !scrollCleanup) scrollCleanup = run()
    }, 500)
    return () => {
      cancelled = true
      if (typeof schedule === "number" && schedule !== 0 && typeof cancelIdleCallback !== "undefined")
        cancelIdleCallback(schedule)
      clearTimeout(t)
      scrollCleanup?.()
    }
  }, [])
}

// ─── HEADER / NAV ────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Close dropdowns when clicking outside the header
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 backdrop-blur-md bg-black/40"
      style={{ ...brandFont, zIndex: 9990, pointerEvents: "auto", position: "fixed" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <Link
          href="/"
          className="text-white font-black text-xl tracking-[0.45em] uppercase"
          style={{ fontFamily: "'Courier New', 'SF Mono', 'Fira Code', monospace", pointerEvents: "auto" }}
        >
          VELARIX
        </Link>

        {/* Desktop nav — click-based dropdowns */}
        <nav className="hidden md:flex items-center gap-8" style={{ pointerEvents: "auto" }}>
          {/* Product dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("product")}
              className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase flex items-center gap-1 py-2"
              style={{ pointerEvents: "auto" }}
            >
              Product <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === "product" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "product" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-black border border-white/10 rounded-lg py-2 shadow-2xl" style={{ pointerEvents: "auto", zIndex: 9991 }}>
                <Link href="/kaptureops" onClick={() => setOpenDropdown(null)} className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                  KaptureOps AI
                </Link>
              </div>
            )}
          </div>

          {/* Company dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("company")}
              className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase flex items-center gap-1 py-2"
              style={{ pointerEvents: "auto" }}
            >
              Company <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === "company" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "company" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-black border border-white/10 rounded-lg py-2 shadow-2xl" style={{ pointerEvents: "auto", zIndex: 9991 }}>
                <a href="#focus" onClick={() => setOpenDropdown(null)} className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                  What We Do
                </a>
                <Link href="/team" onClick={() => setOpenDropdown(null)} className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                  Team
                </Link>
              </div>
            )}
          </div>

          <a href="#focus" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-2" style={{ pointerEvents: "auto" }}>
            Focus
          </a>
          <Link href="/pricing" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-2" style={{ pointerEvents: "auto" }}>
            Pricing
          </Link>
          <a href="#contact" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-2" style={{ pointerEvents: "auto" }}>
            Contact
          </a>
          <Link
            href="/request-demo"
            className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors tracking-wide uppercase"
            style={{ pointerEvents: "auto" }}
          >
            Request Demo
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => { setMenuOpen(!menuOpen); setOpenDropdown(null) }}
          aria-label="Toggle menu"
          style={{ pointerEvents: "auto" }}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col items-center gap-4 pb-6 bg-black/90 backdrop-blur-md" style={{ pointerEvents: "auto" }}>
          <Link href="/kaptureops" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            KaptureOps AI
          </Link>
          <a href="#focus" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            What We Do
          </a>
          <Link href="/team" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            Team
          </Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            Pricing
          </Link>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            Contact
          </a>
          <Link
            href="/request-demo"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors tracking-wide uppercase"
          >
            Request Demo
          </Link>
        </nav>
      )}
    </header>
  )
}

// ─── LAZY SPLINE (loads when hero 3D area is in view + dynamic import) ──
function LazySpline() {
  const [showSpline, setShowSpline] = useState(false)
  const [SplineScene, setSplineScene] = useState<React.ComponentType<{ scene: string; className?: string }> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShowSpline(true)
      },
      { rootMargin: "100px", threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!showSpline) return
    import("@/components/ui/splite").then((m) => setSplineScene(() => m.SplineScene))
  }, [showSpline])

  return (
    <div ref={containerRef} className="w-full h-full min-h-[320px]">
      {!showSpline || !SplineScene ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      )}
    </div>
  )
}

// ─── ANIMATED SHADER BACKGROUND ──────────────────────────────
function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <MeshGradientClient
        className="w-full h-full"
        colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
        speed={0.6}
        distortion={0.8}
        swirl={0.1}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "3.3s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/[0.03] rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "6.6s", animationDelay: "0.5s" }}
        />
      </div>
    </div>
  )
}

// ─── HERO SECTION ─────────────────────────────────────────────

/* =====================================================================
   OLD HERO LAYOUT (commented out — revert by swapping back)
   =====================================================================
function HeroSection_OLD() {
  return (
    <section className="relative w-full" style={brandFont}>
      <div className="w-full h-[700px] md:h-[800px] relative">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="flex flex-col md:flex-row items-center h-full">
          <div className="gsap-hero-content flex-1 p-6 md:p-12 relative z-10 flex flex-col items-center justify-center text-center -mt-8 md:-mt-16">
            <div className="mb-4">
              <VelarixGooBlob size={240} />
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight"
              style={brandFont}
            >
              Build the Future
            </h1>
            <p className="mt-4 text-neutral-300 max-w-lg text-lg leading-relaxed">
              Empowering teams to ship faster with next-generation tools.
              Placeholder text for your value proposition.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <MagneticButton className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton className="px-8 py-3 rounded-full border border-neutral-700 text-white font-medium hover:bg-white/10 transition-colors">
                Learn More
              </MagneticButton>
            </div>
          </div>

          <div className="gsap-robot flex-1 relative h-full max-w-[480px] md:max-w-none border-0 [&_*]:border-0 [&_*]:outline-none">
            <div className="w-full h-full scale-[0.8] origin-center">
              <LazySpline />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
   ===================================================================== */

/* =====================================================================
   PREVIOUS HERO (before Velarix-first rewrite) — uncomment to revert
   =====================================================================
function HeroSection_V2() {
  return (
    <section className="relative w-full" style={brandFont}>
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="gsap-hero-content relative z-10 flex flex-col items-center justify-center text-center -mt-8 md:-mt-12 -mb-16 md:-mb-24">
        <VelarixGooBlob size={380} />
      </div>
      <div className="w-full relative">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="gsap-hero-text flex-1 p-6 md:p-12 relative z-10 flex flex-col items-center md:items-start justify-center text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight" style={brandFont}>Build the Future</h1>
            <p className="mt-4 text-neutral-300 max-w-lg text-lg leading-relaxed">Empowering teams to ship faster with next-generation tools. Placeholder text for your value proposition.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <MagneticButton className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2">Get Started <ArrowRight className="h-4 w-4" /></MagneticButton>
              <MagneticButton className="px-8 py-3 rounded-full border border-neutral-700 text-white font-medium hover:bg-white/10 transition-colors">Learn More</MagneticButton>
            </div>
          </div>
          <div className="gsap-robot flex-1 relative h-[400px] md:h-[500px] w-full border-0 [&_*]:border-0 [&_*]:outline-none">
            <div className="w-full h-full scale-[0.8] origin-center"><LazySpline /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
   ===================================================================== */

function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* ── GOO BLOB — brand anchor ── */}
      <div className="gsap-hero-content relative z-10 flex flex-col items-center justify-center text-center -mt-8 md:-mt-12 -mb-12 md:-mb-20">
        <VelarixGooBlob size={380} />
      </div>

      {/* ── HERO BODY ── */}
      <div className="w-full relative">
        <div className="flex flex-col md:flex-row items-center md:items-start">

          {/* Left — headline + value prop */}
          <div className="gsap-hero-text flex-1 px-6 md:px-12 pt-6 pb-2 md:pt-10 md:pb-4 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-4 font-medium">
              Win More. Waste Less. Move Faster.
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05]">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                The System Behind
              </span>
              <br />
              <span className="text-neutral-500">
                GovCon Winners
              </span>
            </h1>
            <p className="mt-5 text-neutral-400 max-w-lg text-[16px] leading-[1.7]">
              Velarix built the operating system for government contractors. KaptureOps AI brings capture, compliance, proposals, finance, and teaming into one FedRAMP-ready platform so contractors can move faster, stay compliant, and win more work.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/request-demo">
                <MagneticButton className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2 tracking-wide uppercase">
                  Request a Demo <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
              <a href="#focus">
                <MagneticButton className="px-8 py-3 rounded-full border border-neutral-700 text-white font-medium text-sm hover:bg-white/5 transition-colors tracking-wide uppercase">
                  What We Do
                </MagneticButton>
              </a>
            </div>
          </div>

          {/* Right — 3D element */}
          <div className="gsap-robot flex-1 relative h-[400px] md:h-[500px] w-full border-0 [&_*]:border-0 [&_*]:outline-none">
            <div className="w-full h-full scale-[0.8] origin-center">
              <LazySpline />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =====================================================================
   OLD FEATURES SECTION (commented out — uncomment to revert)
   =====================================================================
interface GridItemProps { area: string; icon: React.ReactNode; title: string; description: string }
function GridItem({ area, icon, title, description }: GridItemProps) { ... kept for reference ... }
function FeaturesSection_OLD() { ... Engineered for dominance grid ... }
   ===================================================================== */

// ─── WHAT WE FOCUS ON — 3-pillar grid ──────────────────────────
function FocusSection() {
  const pillars = [
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "Capture & Proposal Acceleration",
      desc: "From opportunity discovery to proposal submission in a fraction of the time. AI-powered drafts, past performance matching, and intelligent teaming.",
      bullets: [
        "AI Fit Scoring ranks opportunities so teams pursue the right work",
        "Draft proposals in minutes leveraging past performance data",
      ],
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Intelligent Teaming & Personnel",
      desc: "Your institutional knowledge turned into competitive intelligence. KaptureOps learns from every contract, every team member, every teaming relationship.",
      bullets: [
        "AI-scored recommendations for teaming partners and personnel",
        "Gap analysis identifies missing capabilities before you bid",
      ],
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Compliance & Finance Readiness",
      desc: "CMMC, DCAA, and FedRAMP alignment built into every workflow. Always audit-ready, never scrambling.",
      bullets: [
        "Certification tracking, clearance alerts, and compliance posture monitoring",
        "DCAA-ready indirect rate calculators and cost pool management",
      ],
    },
  ]

  return (
    <section id="focus" className="relative w-full px-6 md:px-12 lg:px-20 pt-8 pb-10 md:pt-12 md:pb-14">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative text-center">
        <div className="gsap-focus-heading mb-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-medium">
            Core Disciplines
          </p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] text-white">
            What we focus on
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 justify-items-center">
          {pillars.map((p) => (
            <li key={p.title} className="w-full max-w-md min-h-[14rem] list-none gsap-focus-card">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col items-center text-center gap-4 overflow-hidden rounded-xl border-[0.75px] bg-black/70 backdrop-blur-md p-5 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-5">
                  <div className="gsap-focus-card-inner flex flex-col items-center gap-4 w-full">
                    <div className="w-fit rounded-lg border-[0.75px] border-border bg-white/5 p-2 shrink-0">
                      {p.icon}
                    </div>
                    <h3 className="text-xl leading-[1.375rem] font-semibold tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                      {p.desc}
                    </p>
                    <ul className="space-y-2 w-full text-left">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[13px] text-neutral-500 leading-[1.5]">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* =====================================================================
   OLD CTA SECTION (commented out — uncomment to revert)
   =====================================================================
function CTASection_OLD() { ... "Ready to get started?" with Start Free Trial / Contact Sales ... }
   ===================================================================== */

// ─── HOW WE HELP — tight 3-item strip ──────────────────────────
function HowWeHelpStrip() {
  const items = [
    {
      label: "Win More",
      line: "AI-powered opportunity scoring and proposal generation so your team pursues the right work and submits stronger bids.",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      label: "Waste Less",
      line: "Replace 6-8 fragmented tools with one platform. Stop paying $50K+ per proposal in labor costs.",
      icon: <Lock className="h-4 w-4" />,
    },
    {
      label: "Move Faster",
      line: "Cut capture cycles from months to weeks. Use KaptureOps AI to automate opportunity monitoring, proposal workflows, compliance tracking, and much more.",
      icon: <Rocket className="h-4 w-4" />,
    },
  ]

  return (
    <section className="relative w-full px-6 md:px-12 lg:px-20 pt-2 pb-6 md:pt-4 md:pb-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative text-center">
        <div className="gsap-help-heading mb-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-1.5 font-medium">
            How We Help
          </p>
          <div className="h-px max-w-xl mx-auto bg-white/[0.06]" />
        </div>

        <ul className="gsap-help-items grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-stretch">
          {items.map((item) => (
            <li key={item.label} className="list-none gsap-help-item flex">
              <div className="relative w-full rounded-[1.25rem] border-[0.75px] border-border p-1.5 md:p-2 flex flex-col">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex flex-1 flex-col items-center text-center gap-3 overflow-hidden rounded-xl border-[0.75px] bg-black/70 backdrop-blur-md p-4 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
                  <div className="gsap-help-card-inner flex flex-col items-center gap-3 w-full flex-1 min-h-0">
                    <div className="w-fit rounded-lg border-[0.75px] border-border bg-white/5 p-1.5 shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-semibold tracking-[-0.02em] md:text-lg text-foreground uppercase leading-tight">
                      {item.label}
                    </h3>
                    <p className="text-[13px] leading-[1.5] md:text-sm text-muted-foreground">
                      {item.line}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* =====================================================================
   OLD KAPTUREOPS BAND (commented out — uncomment to revert)
   =====================================================================
function KaptureOpsBand_OLD() {
  return (
    <section className="relative w-full px-6 md:px-12 lg:px-20 py-24 md:py-32" style={brandFont}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="relative w-full px-0 mb-16"><div className="border-t border-white/[0.06]" /></div>
      <div className="gsap-kband max-w-4xl relative">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-6 font-medium">A Velarix Product</p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.08] mb-6">KaptureOps AI</h2>
        <p className="text-xl md:text-2xl font-medium text-neutral-300 tracking-[-0.01em] mb-6 max-w-2xl">The complete operating system for defense contractors.</p>
        <p className="text-[16px] leading-[1.7] text-neutral-400 max-w-2xl mb-10">KaptureOps AI automates the end-to-end capture, proposal, and compliance lifecycle...</p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">...</div>
        <p className="text-[12px] text-neutral-600 leading-relaxed max-w-xl">Hosted on AWS GovCloud...</p>
      </div>
    </section>
  )
}
   ===================================================================== */

/* =====================================================================
   OLD WHAT WE DO SECTION (commented out — uncomment to revert)
   =====================================================================
function WhatWeDoSection_OLD() {
  return (
    <section id="what-we-do" className="relative w-full px-6 md:px-12 lg:px-20 py-24 md:py-32" style={brandFont}>
      ... 6 ContextBox cards: Secure AI Delivery, Automation Engineering, Governance and Compliance Enablement,
          Cyber Risk Reduction, Data and System Integration, Mission-Oriented Product Build ...
    </section>
  )
}
   ===================================================================== */

/* =====================================================================
   OLD SECURITY PANEL (commented out — uncomment to revert)
   =====================================================================
function SecurityPanel_OLD() {
  return (
    <section id="security" className="relative w-full px-6 md:px-12 lg:px-20 py-24 md:py-32" style={brandFont}>
      ... AWS GovCloud, Encryption, RBAC, Audit logging, CMMC Level 2 alignment ...
    </section>
  )
}
   ===================================================================== */

/* =====================================================================
   OLD FINAL CTA BAND (commented out — uncomment to revert)
   =====================================================================
function FinalCTABand_OLD() {
  return (
    <section className="relative w-full px-6 md:px-12 lg:px-20 py-24 md:py-36" style={brandFont}>
      ... "Bring discipline to capture and proposal operations." with Request a Demo / Contact Velarix ...
    </section>
  )
}
   ===================================================================== */

// ─── KAPTUREOPS AI CALLOUT — small reference card ───────────
function KaptureOpsCallout() {
  return (
    <section className="relative w-full px-6 md:px-12 lg:px-20 pt-4 pb-6 md:pt-6 md:pb-10">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative">
        <div className="h-px w-full bg-white/[0.06] mb-6" />
        <div className="gsap-kops-callout">
          <div className="relative rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] bg-black/70 backdrop-blur-md px-6 py-5 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
              <div className="relative flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-1 font-medium">
                  Flagship Platform
                </p>
                <h3 className="text-lg font-semibold text-white tracking-[-0.01em]">
                  KaptureOps AI
                </h3>
                <p className="text-[13px] text-muted-foreground leading-[1.6] mt-1">
                  The all-in-one operating system for defense contractors. Capture, proposals, teaming, compliance, finance, and contracts in one FedRAMP-ready platform.
                </p>
              </div>
              <Link href="/kaptureops" className="relative shrink-0">
                <MagneticButton className="px-6 py-2.5 rounded-full border border-white/[0.1] text-white text-xs font-medium hover:bg-white/5 transition-colors flex items-center gap-2 tracking-wide uppercase">
                  Learn More <ArrowRight className="h-3 w-3" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── LIVE GOVCON STATISTICS ──────────────────────────────────
interface StatData {
  label: string
  value: string
  source: string
  description: string
  live?: boolean
}

const FALLBACK_STATS: StatData[] = [
  {
    label: "FY25 Federal Contract Spending",
    value: "$755B+",
    source: "USAspending.gov",
    description: "Total federal contract obligations for the current fiscal year across all agencies, pulled live from USAspending.gov. Updates as new awards are reported.",
    live: true,
  },
  {
    label: "FY26 DoD Budget Request",
    value: "$892.6B",
    source: "DoD Comptroller",
    description: "Department of Defense budget request for fiscal year 2026. DoD accounts for roughly 61% of all federal contract spending.",
  },
  {
    label: "Avg Competitive Win Rate",
    value: "30%",
    source: "Deltek Clarity 2024",
    description: "Industry benchmark win rate for established government contractors. New contractors average ~20%. Top performers can reach 80%+.",
  },
  {
    label: "Avg Capture Cycle",
    value: "12–18 mo",
    source: "Shipley / Lohfeld",
    description: "Time from opportunity identification to proposal submission. 40–80% of the government buying decision is made before the RFP drops.",
  },
  {
    label: "Avg Proposal Effort",
    value: "25–35 hrs",
    source: "APMP / Loopio",
    description: "Average hours a capture team spends writing a single proposal response. Complex federal solicitations can require significantly more.",
  },
  {
    label: "Buying Decision Made Pre-RFP",
    value: "40–80%",
    source: "OST Global / Shipley",
    description: "Percentage of the government's buying decision already made before proposals are even submitted. Early capture positioning is critical.",
  },
]

function useGovConStats(enabled: boolean) {
  const [stats, setStats] = useState<StatData[]>(FALLBACK_STATS)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false

    async function fetchStats() {
      try {
        // Fetch total federal contract spending for current FY (FY25: Oct 2024 – Sep 2025)
        const spendingRes = await fetch("https://api.usaspending.gov/api/v2/search/spending_over_time/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            group: "fiscal_year",
            filters: {
              time_period: [{ start_date: "2024-10-01", end_date: "2025-09-30" }],
              award_type_codes: ["A", "B", "C", "D"],
            },
          }),
        })

        const updated = [...FALLBACK_STATS]

        if (spendingRes.ok) {
          const spendingData = await spendingRes.json()
          const results = spendingData?.results
          if (results && results.length > 0) {
            const totalObligation = results.reduce(
              (sum: number, r: { aggregated_amount: number }) => sum + (r.aggregated_amount || 0),
              0
            )
            if (totalObligation > 0) {
              const billions = (totalObligation / 1_000_000_000).toFixed(0)
              updated[0] = {
                ...updated[0],
                value: `$${billions}B`,
              }
            }
          }
        }

        if (!cancelled) {
          setStats(updated)
          setLoaded(true)
        }
      } catch {
        if (!cancelled) setLoaded(true)
      }
    }

    fetchStats()
    return () => { cancelled = true }
  }, [enabled])

  return { stats, loaded }
}

function StatCard({ stat, loaded }: { stat: StatData; loaded: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <li
      className="min-h-[10rem] list-none gsap-stat-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-xl border-[0.75px] bg-black/70 backdrop-blur-md p-5 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
          {/* Default view */}
          <div
            className={cn(
              "relative flex flex-col gap-2 transition-opacity duration-300",
              hovered ? "opacity-0" : "opacity-100"
            )}
          >
            <span
              className={cn(
                "gsap-stat-value text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white transition-opacity duration-300",
                !loaded && "opacity-40"
              )}
              style={brandFont}
            >
              {loaded ? stat.value : "—"}
            </span>
            <span className="text-[13px] leading-[1.4] text-neutral-400 font-medium">
              {stat.label}
            </span>
          </div>

          {/* Hover description overlay */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-center p-5 transition-opacity duration-300",
              hovered ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <p className="text-[12px] leading-[1.6] text-neutral-300">
              {stat.description}
            </p>
          </div>

          {/* Source — always visible at bottom */}
          <span className="text-[10px] text-neutral-600 uppercase tracking-[0.15em] relative">
            {stat.source}
            {stat.live && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 ml-2 animate-pulse" title="Live data" />
            )}
          </span>
        </div>
      </div>
    </li>
  )
}

function GovConStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const { stats, loaded } = useGovConStats(inView)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) setInView(true) },
      { rootMargin: "80px", threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!loaded || hasAnimated.current) return
    hasAnimated.current = true

    const counters = containerRef.current?.querySelectorAll(".gsap-stat-value")
    if (counters) {
      counters.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        )
      })
    }
  }, [loaded])

  return (
    <section ref={sectionRef} className="relative w-full px-6 md:px-12 lg:px-20 pt-6 pb-10 md:pt-8 md:pb-14">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative" ref={containerRef}>
        <div className="h-px w-full bg-white/[0.06] mb-8" />
        <div className="gsap-stats-heading mb-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-3 font-medium">
            Industry Pulse
          </p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] text-white">
            The GovCon Landscape, Live
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} loaded={loaded} />
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── COMPACT FINAL CTA ──────────────────────────────────────
function FinalCTA() {
  return (
    <section id="contact" className="relative w-full px-6 md:px-12 lg:px-20 pt-4 pb-10 md:pt-6 md:pb-14">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative">
        <div className="gsap-final-cta flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          {/* Left — headline + tagline */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] text-white leading-[1.1] mb-2">
              Decide faster. Scale further.
            </h2>
            <p className="text-lg md:text-xl font-semibold tracking-[-0.01em] text-neutral-500 mb-4" style={{ fontFamily: "'Courier New', 'SF Mono', 'Fira Code', monospace" }}>
              Velarix. The System Behind GovCon Winners.
            </p>
            <p className="text-[15px] text-neutral-500 leading-[1.6] max-w-lg">
              If your organization operates in regulated environments and needs operational systems that perform, we should talk.
            </p>
          </div>

          {/* Right — CTA buttons + contact email */}
          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
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
            <a href="mailto:contact@velarix.com" className="text-[13px] text-neutral-600 hover:text-neutral-400 transition-colors tracking-wide">
              contact@velarix.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


/* =====================================================================
   OLD PAGE RENDER (commented out — uncomment to revert)
   =====================================================================
export default function Home_OLD() {
  useScrollAnimations()
  return (
    <main className="dark min-h-screen bg-black relative cursor-none md:cursor-none">
      <ShaderBackground />
      <Header />
      <div className="relative z-10 pt-16">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
        <KaptureOpsBand />
        <WhatWeDoSection />
        <SecurityPanel />
        <FinalCTABand />
      </div>
    </main>
  )
}
   ===================================================================== */

// ─── PAGE ─────────────────────────────────────────────────────
export default function Home() {
  useScrollAnimations()

  return (
    <main className="dark min-h-screen bg-black relative cursor-none md:cursor-none">
      <ShaderBackground />
      <Header />
      <div className="relative z-10 pt-16">
        <HeroSection />
        <FocusSection />
        <HowWeHelpStrip />
        <KaptureOpsCallout />
        <GovConStats />
        <FinalCTA />
        <SiteFooter />
      </div>
    </main>
  )
}
