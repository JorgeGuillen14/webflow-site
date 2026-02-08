'use client'

import { MeshGradient } from "@paper-design/shaders-react"
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>

            <div className="space-y-10 text-[15px] leading-[1.8] text-neutral-400">
              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">1. Information We Collect</h2>
                <p>
                  Velarix LLC (&quot;Velarix,&quot; &quot;we,&quot; &quot;us&quot;) collects information you provide directly, such as your name, email address, company name, job title, and phone number when you request a demo, contact us, or create an account. We also collect usage data, including pages visited, features used, and interaction patterns within the KaptureOps platform.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">2. How We Use Your Information</h2>
                <p className="mb-3">We use collected information to:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Provide, maintain, and improve the KaptureOps platform</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Respond to demo requests and support inquiries</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Send product updates and relevant communications</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Analyze usage patterns to enhance user experience</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">3. Data Sharing</h2>
                <p>
                  We do not sell your personal information. We may share data with trusted service providers who assist in operating the platform (e.g., cloud hosting, analytics), subject to confidentiality agreements. We may disclose information when required by law or to protect our legal rights.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">4. Data Security</h2>
                <p>
                  All data is hosted on AWS GovCloud with encryption at rest and in transit. We implement role-based access control (RBAC), full audit logging, and follow security practices designed to align with CMMC Level 2 and FedRAMP requirements. Our architecture is built with government-grade security standards in mind.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">5. Data Retention</h2>
                <p>
                  We retain personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us. We will retain and use information as necessary to comply with legal obligations, resolve disputes, and enforce agreements.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">6. Cookies &amp; Tracking</h2>
                <p>
                  We use essential cookies to operate the platform and optional analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings. We do not use third-party advertising cookies.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">7. Government Data Handling</h2>
                <p>
                  KaptureOps is designed for defense contractors handling sensitive government data. All CUI (Controlled Unclassified Information) is processed and stored in accordance with NIST 800-171 guidelines within our AWS GovCloud environment. Data residency remains within the United States.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">8. Your Rights</h2>
                <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Access and receive a copy of your personal data</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Request correction or deletion of your data</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Object to or restrict processing of your data</li>
                  <li className="flex items-baseline gap-2"><span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-2" />Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">9. Contact Us</h2>
                <p>
                  For privacy-related inquiries, contact us at{" "}
                  <a href="mailto:privacy@velarix.com" className="text-white hover:underline">privacy@velarix.com</a>
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
