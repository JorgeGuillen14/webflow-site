"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const DOT_SIZE = 6
const RING_SIZE = 28

/**
 * Shared custom cursor: small white dot + ring, follows mouse on desktop.
 * Uses GSAP quickTo() for smooth, lag-free movement (no new tweens per frame).
 * Grows on links and buttons only. Original feel: smaller, snappier.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // quickTo = one tween per property, just update target = no lag, snappier
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" })
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" })
    const ringX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power2.out" })
    const ringY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power2.out" })

    const moveCursor = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const grow = () => {
      gsap.to(ring, { scale: 1.6, borderColor: "rgba(255,255,255,0.55)", duration: 0.25, ease: "power2.out" })
      gsap.to(dot, { scale: 0.6, duration: 0.25, ease: "power2.out" })
    }
    const shrink = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.3)", duration: 0.25, ease: "power2.out" })
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "power2.out" })
    }

    window.addEventListener("mousemove", moveCursor, { passive: true })

    const interactives = document.querySelectorAll("a, button, [role='button']")
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow)
      el.addEventListener("mouseleave", shrink)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow)
        el.removeEventListener("mouseleave", shrink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block will-change-transform"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 10px 3px rgba(255,255,255,0.5)",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block will-change-transform"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.3)",
          background: "transparent",
        }}
      />
    </>
  )
}
