import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about KaptureOps AI and Velarix. Learn about the platform, pricing, security, implementation, and how it helps defense contractors win more work.",
  openGraph: {
    title: "FAQ | Velarix",
    description: "Common questions about KaptureOps AI and Velarix.",
    url: "https://velarix.ai/faq",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
