'use client'

import Link from "next/link"
import { MeshGradientClient } from "@/components/ui/mesh-gradient-client"
import { Shield, Lock, Server, Eye, FileCheck, Users, Globe, AlertTriangle } from "lucide-react"
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

const SECURITY_SECTIONS = [
  {
    icon: Server,
    title: "AWS GovCloud Hosting",
    content: "All KaptureOps infrastructure runs on AWS GovCloud (US) regions, operated by U.S. persons on U.S. soil. This ensures data residency within the United States and provides the foundation for handling sensitive government workloads.",
  },
  {
    icon: Lock,
    title: "Encryption",
    content: "Data is encrypted at rest using AES-256 and in transit using TLS 1.2+. All database fields containing sensitive information use additional field-level encryption. Key management follows AWS KMS best practices.",
  },
  {
    icon: Shield,
    title: "FedRAMP-Ready Architecture",
    content: "KaptureOps is built on a FedRAMP-ready architecture with controls mapped to NIST 800-53. We are actively pursuing formal FedRAMP authorization. No authorization claims are made at this time.",
  },
  {
    icon: FileCheck,
    title: "CMMC Level 2 Alignment",
    content: "The platform is designed to align with CMMC Level 2 practices based on NIST 800-171 controls. KaptureOps helps your organization maintain continuous compliance through built-in tracking, alerts, and documentation.",
  },
  {
    icon: Eye,
    title: "Audit Logging",
    content: "Every action within the platform is logged with full audit trails. User activity, data access, configuration changes, and AI-generated outputs are all recorded with timestamps, user attribution, and context for compliance review.",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    content: "Fine-grained RBAC ensures users only access data relevant to their role. Administrators can define custom roles, set permissions at the module level, and enforce least-privilege access across the organization.",
  },
  {
    icon: Globe,
    title: "Data Residency",
    content: "All customer data remains within the United States. No data is transferred to or processed in foreign jurisdictions. Our architecture is designed to comply with ITAR and EAR requirements for defense contractor data.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    content: "We maintain a documented incident response plan with defined roles, escalation procedures, and communication protocols. Security events are monitored continuously with automated alerting and response capabilities.",
  },
]

export default function SecurityPage() {
  return (
    <main className="dark min-h-screen bg-black relative">
      <div className="fixed inset-0 z-0">
        <MeshGradientClient className="w-full h-full" colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]} speed={0.6} distortion={0.8} swirl={0.1} />
      </div>
      <SiteHeader />

      <div className="relative z-10 pt-20">
        {/* Hero */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 pt-16 md:pt-28 pb-16 md:pb-20" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-6 font-medium">
              Trust & Compliance
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-6">
              Security &amp; Compliance
            </h1>
            <p className="text-[16px] leading-[1.7] text-neutral-400 max-w-2xl mx-auto">
              KaptureOps is purpose-built for defense contractors who handle sensitive government data. Security is not an afterthought — it is the foundation of every architectural decision.
            </p>
          </div>
        </section>

        {/* Trust badges */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-10" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-4xl mx-auto relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["AWS GovCloud", "CMMC Aligned", "NIST 800-171", "SOC 2 (Planned)"].map((badge) => (
                <div
                  key={badge}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-4 w-4 text-neutral-400" />
                  </div>
                  <p className="text-[12px] font-medium text-neutral-300 uppercase tracking-[0.1em]">{badge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security sections */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-24" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-4xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {SECURITY_SECTIONS.map((section) => {
                const Icon = section.icon
                return (
                  <div
                    key={section.title}
                    className="rounded-2xl border border-white/[0.08] bg-black/50 p-6 md:p-8"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <Icon className="h-4 w-4 text-neutral-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2 tracking-[-0.01em]">
                      {section.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Disclaimer + CTA */}
        <section className="relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-20" style={brandFont}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative text-center">
            <p className="text-[12px] text-neutral-600 mb-10 max-w-lg mx-auto leading-relaxed">
              No certification claims are made. Architecture and controls are designed with alignment to these frameworks in mind. Formal certifications are in progress.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white mb-4">
              Questions about our security posture?
            </h2>
            <p className="text-[15px] text-neutral-400 mb-8 max-w-md mx-auto">
              Our security team is available to discuss architecture, compliance roadmap, and data handling practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:security@velarix.com"
                className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors tracking-wide uppercase"
              >
                Contact Security Team
              </a>
              <Link
                href="/request-demo"
                className="px-8 py-3 rounded-full border border-neutral-700 text-white font-medium text-sm hover:bg-white/5 transition-colors tracking-wide uppercase"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
