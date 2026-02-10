import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "Velarix security practices and compliance posture. AWS GovCloud hosted, CMMC-aligned architecture, encryption at rest and in transit, RBAC, and full audit logging.",
  openGraph: {
    title: "Security & Compliance | Velarix",
    description: "AWS GovCloud hosted, CMMC-aligned, FedRAMP-ready architecture.",
    url: "https://velarix.ai/security",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
