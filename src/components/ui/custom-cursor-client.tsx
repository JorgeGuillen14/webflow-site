"use client"

import dynamic from "next/dynamic"

const CustomCursor = dynamic(
  () => import("@/components/ui/custom-cursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
)

export function CustomCursorClient() {
  return <CustomCursor />
}
