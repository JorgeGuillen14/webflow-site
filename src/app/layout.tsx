import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { CustomCursor } from "@/components/ui/custom-cursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Velarix | The System Behind GovCon Winners",
    template: "%s | Velarix",
  },
  description:
    "Velarix builds AI-driven operating systems for defense contractors. KaptureOps AI automates the complete capture-to-contract lifecycle — opportunity discovery, proposal generation, compliance, finance, and contract management in one FedRAMP-ready platform.",
  keywords: [
    "defense contractor software",
    "GovCon AI",
    "KaptureOps",
    "proposal automation",
    "CMMC compliance",
    "DCAA accounting",
    "capture management",
    "government contracting",
    "SAM.gov monitoring",
    "FedRAMP",
  ],
  authors: [{ name: "Velarix LLC" }],
  creator: "Velarix LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://velarix.com",
    siteName: "Velarix",
    title: "Velarix | The System Behind GovCon Winners",
    description:
      "AI-driven operating system for defense contractors. Automate capture, proposals, compliance, and contracts in one platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velarix | The System Behind GovCon Winners",
    description:
      "AI-driven operating system for defense contractors. Automate capture, proposals, compliance, and contracts in one platform.",
    creator: "@velarix",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://velarix.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
