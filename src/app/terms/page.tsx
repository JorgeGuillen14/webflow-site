'use client'

import { MeshGradient } from "@paper-design/shaders-react"
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

export default function TermsPage() {
  return (
    <main className="dark min-h-screen bg-black relative">
      <div className="fixed inset-0 z-0">
        <MeshGradient className="w-full h-full" colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]} speed={0.6} distortion={0.8} swirl={0.1} />
      </div>
      <SiteHeader />

      <div className="relative z-10 pt-20">
        <section className="relative w-full px-6 md:px-12 lg:px-20 pt-16 md:pt-28 pb-16 md:pb-24" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative">
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-6 font-medium">
              Last updated: February 2026
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-12">
              Terms of Service
            </h1>

            <div className="space-y-10 text-[15px] leading-[1.8] text-neutral-400">
              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the KaptureOps platform or any services provided by Velarix LLC (&quot;Velarix,&quot; &quot;we,&quot; &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use our services. These terms apply to all visitors, users, and organizations that access the platform.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">2. Description of Services</h2>
                <p>
                  Velarix provides KaptureOps AI, an AI-driven operating system for defense contractors. The platform includes opportunity discovery, proposal generation, intelligent teaming, compliance tracking, financial management, automated accounts payable, and contract lifecycle management. Features and availability may change as the platform evolves.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">3. User Responsibilities</h2>
                <p className="mb-3">As a user of KaptureOps, you agree to:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Provide accurate and complete information during registration</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Maintain the security of your account credentials</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Use the platform in compliance with all applicable laws and regulations</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Not attempt to reverse-engineer, modify, or create derivative works</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Not use the platform for any unlawful or unauthorized purpose</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">4. Intellectual Property</h2>
                <p>
                  All content, features, and functionality of KaptureOps — including software, text, graphics, logos, and trademarks — are owned by Velarix LLC and protected by intellectual property laws. Your use of the platform does not grant you ownership of any intellectual property rights in the platform or its content.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">5. Data Ownership</h2>
                <p>
                  You retain all rights to the data you upload to KaptureOps. By using the platform, you grant Velarix a limited license to process your data solely for the purpose of providing the services. We do not claim ownership of your data and will not use it for purposes beyond service delivery without your explicit consent.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">6. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Velarix shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our total liability shall not exceed the amounts paid by you in the twelve months preceding the claim. The platform is provided &quot;as is&quot; without warranties of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">7. Termination</h2>
                <p>
                  Either party may terminate the agreement at any time with written notice. Upon termination, your access to the platform will cease and we will provide a reasonable period for you to export your data. Velarix reserves the right to suspend or terminate accounts that violate these terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">8. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the District of Columbia and the United States of America, without regard to conflict of law principles. Any disputes shall be resolved in the courts of the District of Columbia.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">9. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of material changes via email or platform notification. Your continued use of the platform after changes constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">10. Contact</h2>
                <p>
                  For questions about these Terms of Service, contact us at{" "}
                  <a href="mailto:legal@velarix.com" className="text-white hover:underline">legal@velarix.com</a>
                  {" "}or write to Velarix LLC, Washington, D.C.
                </p>
              </section>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
