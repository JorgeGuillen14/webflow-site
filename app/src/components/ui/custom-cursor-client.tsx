"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const CustomCursor = dynamic(
  () => import("@/components/ui/custom-cursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
)

/** Renders custom cursor only after first paint + idle so it doesn't block initial load. */
export function CustomCursorClient() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const fallback = setTimeout(() => setReady(true), 2000)
    let idleId: number | undefined
    if (typeof requestIdleCallback !== "undefined") {
      idleId = requestIdleCallback(() => { setReady(true); clearTimeout(fallback) }, { timeout: 1500 })
    }
    return () => {
      clearTimeout(fallback)
      if (idleId !== undefined && typeof cancelIdleCallback !== "undefined") cancelIdleCallback(idleId)
    }
  }, [])

  if (!ready) return null
  return <CustomCursor />
}
