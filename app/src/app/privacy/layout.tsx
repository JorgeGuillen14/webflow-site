import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Velarix privacy policy. How we collect, use, and protect your personal information when you use our services and KaptureOps AI platform.",
  openGraph: {
    title: "Privacy Policy | Velarix",
    description: "How Velarix handles and protects your data.",
    url: "https://velarix.ai/privacy",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
