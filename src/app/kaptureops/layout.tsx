import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KaptureOps AI — The Operating System for Defense Contractors",
  description:
    "AI-driven platform that automates the complete capture-to-contract lifecycle. Opportunity discovery, proposal generation, compliance tracking, financial management, and contract oversight in one FedRAMP-ready system.",
  openGraph: {
    title: "KaptureOps AI — The Operating System for Defense Contractors",
    description:
      "AI-driven platform that automates the complete capture-to-contract lifecycle for defense contractors.",
    url: "https://velarix.ai/kaptureops",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
