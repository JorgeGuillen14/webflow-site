'use client'

import { useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { ChevronDown } from "lucide-react"
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

interface FAQItem {
  question: string
  answer: string
  category: string
}

const FAQ_DATA: FAQItem[] = [
  // Product
  {
    category: "Product",
    question: "What is KaptureOps AI?",
    answer: "KaptureOps AI is an all-in-one, AI-driven operating system for defense contractors. It replaces 6-8 fragmented tools with a single FedRAMP-ready platform that automates the complete capture-to-contract lifecycle — from opportunity discovery and proposal generation to compliance tracking, financial management, and contract oversight.",
  },
  {
    category: "Product",
    question: "How does AI proposal generation work?",
    answer: "KaptureOps analyzes the RFP requirements against your past performance library, team capabilities, and compliance artifacts. It then generates bounded proposal drafts for Technical, Management, and Staffing sections with full source traceability — so every claim links back to real performance data. Human review and editing remain central to the process.",
  },
  {
    category: "Product",
    question: "What integrations does KaptureOps support?",
    answer: "KaptureOps connects directly with SAM.gov for opportunity monitoring and integrates with common document formats, financial systems, and HR data sources. The platform is designed to import data from Excel, CSV, PDF, and other standard formats used across the GovCon industry.",
  },
  {
    category: "Product",
    question: "Can KaptureOps handle multiple contracts simultaneously?",
    answer: "Yes. KaptureOps provides full lifecycle visibility across your entire contract portfolio. You can track ceiling and burn rates, manage CDRLs, monitor compliance status, and view win/loss analytics across all active and pending contracts from a single dashboard.",
  },
  // Security
  {
    category: "Security",
    question: "Where is KaptureOps data hosted?",
    answer: "All data is hosted on AWS GovCloud (US) regions, ensuring data residency within the United States. The infrastructure is designed with government-grade security controls including encryption at rest and in transit, role-based access control, and full audit logging.",
  },
  {
    category: "Security",
    question: "Is KaptureOps FedRAMP authorized?",
    answer: "KaptureOps is built on a FedRAMP-ready architecture using AWS GovCloud. We are actively pursuing FedRAMP authorization. Our infrastructure and security controls are designed to meet FedRAMP requirements. No authorization claims are made at this time.",
  },
  {
    category: "Security",
    question: "How does KaptureOps align with CMMC requirements?",
    answer: "KaptureOps is designed to align with CMMC Level 2 practices based on NIST 800-171 controls. The platform includes certification tracking, clearance monitoring, and compliance alerts to help your organization maintain a continuous compliance posture.",
  },
  // Pricing
  {
    category: "Pricing",
    question: "How is KaptureOps priced?",
    answer: "KaptureOps uses a subscription-based pricing model scaled to your organization's size and module requirements. Contact our team for a custom quote tailored to your capture volume and operational needs.",
  },
  {
    category: "Pricing",
    question: "Is there a free trial?",
    answer: "We offer guided demo sessions and proof-of-concept engagements for qualified organizations. Request a demo to see KaptureOps in action with your own data and workflows.",
  },
  // Getting Started
  {
    category: "Getting Started",
    question: "How long does onboarding take?",
    answer: "Most organizations are fully operational within 2-4 weeks. This includes data import, team configuration, compliance setup, and training. Our onboarding team works directly with your staff to ensure a smooth transition.",
  },
  {
    category: "Getting Started",
    question: "What data do I need to provide to get started?",
    answer: "To maximize value from day one, we recommend importing your past performance records, team resumes and certifications, active contract data, teaming agreements, and compliance artifacts. KaptureOps can work with partial data and build institutional knowledge over time.",
  },
  {
    category: "Getting Started",
    question: "Do I need technical staff to manage KaptureOps?",
    answer: "No. KaptureOps is designed for capture managers, BD professionals, and operations teams — not IT departments. The interface is built for non-technical users with an intuitive workflow that mirrors how GovCon professionals already think about capture and compliance.",
  },
]

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-white/[0.06]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className={`text-[15px] font-medium transition-colors ${isOpen ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
          {item.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-neutral-500 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-sm text-neutral-500 leading-relaxed pr-8">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const categories = Array.from(new Set(FAQ_DATA.map((item) => item.category)))

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
              Support
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-[15px] text-neutral-500 leading-relaxed mb-16 max-w-lg">
              Everything you need to know about KaptureOps AI and how it works for defense contractors.
            </p>

            {categories.map((category) => {
              const items = FAQ_DATA.filter((item) => item.category === category)
              return (
                <div key={category} className="mb-12">
                  <h2 className="text-[11px] uppercase tracking-[0.2em] text-neutral-600 mb-2 font-medium">
                    {category}
                  </h2>
                  <div>
                    {items.map((item) => {
                      const globalIndex = FAQ_DATA.indexOf(item)
                      return (
                        <AccordionItem
                          key={globalIndex}
                          item={item}
                          isOpen={openIndex === globalIndex}
                          onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}

            <div className="mt-16 text-center rounded-2xl border border-white/[0.08] bg-black/50 p-8">
              <h3 className="text-lg font-semibold text-white mb-2">Still have questions?</h3>
              <p className="text-sm text-neutral-500 mb-6">
                Our team is ready to help you understand how KaptureOps fits your operations.
              </p>
              <a
                href="/request-demo"
                className="inline-block px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors tracking-wide uppercase"
              >
                Request a Demo
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
