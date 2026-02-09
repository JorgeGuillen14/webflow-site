import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing — KaptureOps AI",
  description:
    "Enterprise pricing for KaptureOps AI. Three tiers — Launch, Scale, and Enterprise — with full platform access at every level. No profit share on your contract wins.",
  openGraph: {
    title: "Pricing — KaptureOps AI",
    description:
      "Enterprise pricing for KaptureOps AI. Full platform access at every tier. No profit share on your contract wins.",
    url: "https://velarix.ai/pricing",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
