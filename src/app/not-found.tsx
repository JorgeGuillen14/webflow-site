'use client'

import { MeshGradient } from "@paper-design/shaders-react"
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

export default function NotFound() {
  return (
    <main className="dark min-h-screen bg-black relative">
      <div className="fixed inset-0 z-0">
        <MeshGradient className="w-full h-full" colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]} speed={0.6} distortion={0.8} swirl={0.1} />
      </div>
      <SiteHeader />

      <div className="relative z-10 pt-20">
        <section className="relative w-full px-6 md:px-12 lg:px-20 min-h-[70vh] flex items-center justify-center" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative text-center max-w-lg">
            <p className="text-[120px] md:text-[180px] font-bold text-white/[0.04] leading-none select-none" aria-hidden="true">
              404
            </p>
            <div className="-mt-20 md:-mt-28">
              <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-4">
                Page not found
              </h1>
              <p className="text-[15px] text-neutral-500 leading-relaxed mb-10 max-w-sm mx-auto">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors tracking-wide uppercase"
                >
                  Back to Home
                </a>
                <a
                  href="/#contact"
                  className="px-8 py-3 rounded-full border border-neutral-700 text-white font-medium text-sm hover:bg-white/5 transition-colors tracking-wide uppercase"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
