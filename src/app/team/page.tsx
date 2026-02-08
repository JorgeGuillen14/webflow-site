'use client'

import KineticTeamHybrid from "@/components/ui/kinetic-team-hybrid"
import { MeshGradient } from "@paper-design/shaders-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Menu, X, ArrowLeft } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

// ─── CUSTOM CURSOR (same as home) ────────────────────────────
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
        style={{
          width: 8, height: 8, marginLeft: -4, marginTop: -4,
          borderRadius: "50%", background: "white",
          boxShadow: "0 0 12px 4px rgba(255,255,255,0.5)",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{
          width: 40, height: 40, marginLeft: -20, marginTop: -20,
          borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.25)",
          background: "transparent",
        }}
      />
    </>
  )
}

// ─── HEADER ──────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40"
      style={brandFont}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <a
          href="/"
          className="text-white font-black text-xl tracking-[0.45em] uppercase"
          style={{ fontFamily: "'Courier New', 'SF Mono', 'Fira Code', monospace" }}
        >
          VELARIX
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">
            Home
          </a>
          <a href="/#features" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">
            Features
          </a>
          <a href="/team" className="text-sm text-white transition-colors tracking-wide uppercase">
            Team
          </a>
          <a href="/#contact" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">
            Contact
          </a>
          <a
            href="/#cta"
            className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors tracking-wide uppercase"
          >
            Get Started
          </a>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden flex flex-col items-center gap-4 pb-6 bg-black/80 backdrop-blur-md">
          <a href="/" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">
            Home
          </a>
          <a href="/#features" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">
            Features
          </a>
          <a href="/team" className="text-sm text-white transition-colors tracking-wide uppercase">
            Team
          </a>
          <a href="/#contact" className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase">
            Contact
          </a>
          <a
            href="/#cta"
            className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors tracking-wide uppercase"
          >
            Get Started
          </a>
        </nav>
      )}
    </header>
  )
}

// ─── SHADER BACKGROUND ───────────────────────────────────────
function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <MeshGradient
        className="w-full h-full"
        colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
        speed={0.6}
        distortion={0.8}
        swirl={0.1}
      />
    </div>
  )
}

// ─── GSAP SCROLL ANIMATIONS ──────────────────────────────────
function useTeamAnimations() {
  useEffect(() => {
    // Heading reveal
    gsap.fromTo(
      ".gsap-team-heading",
      { opacity: 0, y: 50, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    )

    // Stagger team rows in
    gsap.fromTo(
      ".gsap-team-row",
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-team-row", start: "top 90%", toggleActions: "play none none none" }
      }
    )

    // Divider line draws in
    gsap.fromTo(
      ".gsap-team-divider",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut", delay: 0.4 }
    )

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])
}

// ─── TEAM PAGE ───────────────────────────────────────────────
export default function TeamPage() {
  useTeamAnimations()

  return (
    <main className="dark min-h-screen bg-black relative cursor-none md:cursor-none">
      <ShaderBackground />
      <CustomCursor />
      <Header />
      <div className="relative z-10 pt-16">
        <KineticTeamHybrid />
      </div>
    </main>
  )
}
