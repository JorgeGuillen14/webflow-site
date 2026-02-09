import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the team behind Velarix. Defense technology professionals building the operating system for government contractors.",
  openGraph: {
    title: "Team | Velarix",
    description: "Meet the team behind Velarix and KaptureOps AI.",
    url: "https://velarix.ai/team",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
