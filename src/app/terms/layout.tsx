import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Velarix terms of service. Terms and conditions governing the use of Velarix services, KaptureOps AI platform, and website.",
  openGraph: {
    title: "Terms of Service | Velarix",
    description: "Terms governing use of Velarix services.",
    url: "https://velarix.ai/terms",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
