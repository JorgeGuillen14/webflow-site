import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Your Demo",
  description:
    "Confirm your KaptureOps AI demo session with the Velarix team. Choose a time that works for your schedule.",
  openGraph: {
    title: "Book Your Demo | Velarix",
    description: "Confirm your KaptureOps AI demo session.",
    url: "https://velarix.ai/book-demo",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
