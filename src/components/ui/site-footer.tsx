'use client'

import { Linkedin, Twitter } from "lucide-react"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

export default function SiteFooter() {
  return (
    <footer className="relative w-full" style={brandFont}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand + tagline */}
          <div className="flex flex-col gap-2">
            <a
              href="/"
              className="text-white font-black text-lg tracking-[0.45em] uppercase"
              style={{ fontFamily: "'Courier New', 'SF Mono', 'Fira Code', monospace" }}
            >
              VELARIX
            </a>
            <p className="text-[12px] text-neutral-600 tracking-wide">
              The System Behind GovCon Winners.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center gap-6 md:gap-8" aria-label="Footer navigation">
            <a href="/kaptureops" className="text-[13px] text-neutral-500 hover:text-white transition-colors uppercase tracking-wide">
              KaptureOps AI
            </a>
            <a href="/pricing" className="text-[13px] text-neutral-500 hover:text-white transition-colors uppercase tracking-wide">
              Pricing
            </a>
            <a href="/team" className="text-[13px] text-neutral-500 hover:text-white transition-colors uppercase tracking-wide">
              Team
            </a>
            <a href="/#contact" className="text-[13px] text-neutral-500 hover:text-white transition-colors uppercase tracking-wide">
              Contact
            </a>
            <a href="/request-demo" className="text-[13px] text-neutral-500 hover:text-white transition-colors uppercase tracking-wide">
              Request Demo
            </a>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/velarix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-white transition-colors"
              aria-label="Velarix on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/velarix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-white transition-colors"
              aria-label="Velarix on X"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Legal links + Copyright */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6" aria-label="Legal">
            <a href="/security" className="text-[11px] text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-wide">
              Security
            </a>
            <a href="/privacy" className="text-[11px] text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-wide">
              Privacy Policy
            </a>
            <a href="/terms" className="text-[11px] text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-wide">
              Terms of Service
            </a>
            <a href="/faq" className="text-[11px] text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-wide">
              FAQ
            </a>
          </nav>
          <p className="text-center text-[11px] text-neutral-700 tracking-wide">
            © {new Date().getFullYear()} Velarix LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
