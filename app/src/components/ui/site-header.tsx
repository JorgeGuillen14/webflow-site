'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

interface SiteHeaderProps {
  /** Highlight the current page in nav */
  activePage?: "home" | "kaptureops" | "team" | "request-demo" | "security" | "faq" | "pricing"
}

export default function SiteHeader({ activePage }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

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

  const navLinkClass = (page?: string) =>
    `text-sm ${activePage === page ? "text-white" : "text-neutral-300 hover:text-white"} transition-colors tracking-wide uppercase py-2`

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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" style={{ pointerEvents: "auto" }}>
          {/* Product dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("product")}
              className={`text-sm ${activePage === "kaptureops" || activePage === "pricing" ? "text-white" : "text-neutral-300 hover:text-white"} transition-colors tracking-wide uppercase flex items-center gap-1 py-2`}
              style={{ pointerEvents: "auto" }}
            >
              Product <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === "product" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "product" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-black border border-white/10 rounded-lg py-2 shadow-2xl" style={{ pointerEvents: "auto", zIndex: 9991 }}>
                <Link href="/kaptureops" onClick={() => setOpenDropdown(null)} className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                  KaptureOps AI
                </Link>
                <Link href="/pricing" onClick={() => setOpenDropdown(null)} className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                  Pricing
                </Link>
              </div>
            )}
          </div>

          {/* Company dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("company")}
              className={`text-sm ${activePage === "team" || activePage === "security" ? "text-white" : "text-neutral-300 hover:text-white"} transition-colors tracking-wide uppercase flex items-center gap-1 py-2`}
              style={{ pointerEvents: "auto" }}
            >
              Company <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === "company" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "company" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-black border border-white/10 rounded-lg py-2 shadow-2xl" style={{ pointerEvents: "auto", zIndex: 9991 }}>
                <Link href="/#focus" onClick={() => setOpenDropdown(null)} className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                  What We Do
                </Link>
                <Link href="/team" onClick={() => setOpenDropdown(null)} className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                  Team
                </Link>
                <Link href="/security" onClick={() => setOpenDropdown(null)} className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                  Security
                </Link>
              </div>
            )}
          </div>

          <Link href="/#contact" className={navLinkClass()} style={{ pointerEvents: "auto" }}>
            Contact
          </Link>
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
          <Link href="/pricing" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            Pricing
          </Link>
          <Link href="/#focus" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            What We Do
          </Link>
          <Link href="/team" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            Team
          </Link>
          <Link href="/security" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            Security
          </Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)} className="text-sm text-neutral-300 hover:text-white transition-colors tracking-wide uppercase py-1">
            Contact
          </Link>
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
