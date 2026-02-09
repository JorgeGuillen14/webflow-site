import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Schedule a demo of KaptureOps AI. See how Velarix automates capture, proposals, compliance, and contract management for defense contractors.",
  openGraph: {
    title: "Request a Demo | Velarix",
    description: "Schedule a demo of KaptureOps AI for your defense contracting organization.",
    url: "https://velarix.ai/request-demo",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
