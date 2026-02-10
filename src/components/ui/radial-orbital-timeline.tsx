"use client"

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import gsap from "gsap"

export interface TimelineItem {
  id: number
  title: string
  content: string
  category: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  relatedIds: number[]
  color: string
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

// Match main site typography
const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

// ─── SINGLE CIRCLE ORBIT (clockwise, uniform) ────────────────
const ORBIT_RADIUS = 200
const ORBIT_RADIUS_SM = 110
const ORBIT_SPEED = 0.12 // degrees per frame (~clockwise)

// ─── PARTICLE SYSTEM (canvas) ───────────────────────────────
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  phase: number
}

function createParticles(count: number, w: number, h: number, colors: string[]): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    const isColored = Math.random() > 0.6
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.06 + 0.02,
      color: isColored ? colors[Math.floor(Math.random() * colors.length)] : "#ffffff",
      phase: Math.random() * Math.PI * 2,
    })
  }
  return particles
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 255, g: 255, b: 255 }
}

// ─── COMPONENT ──────────────────────────────────────────────
export function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const isPausedRef = useRef(false)
  const [, forceUpdate] = useState(0) // only for detail card re-render

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Animation state (NOT React state — direct mutation for perf)
  const timeRef = useRef(0)
  const frameRef = useRef(0)
  const animRef = useRef<number>(0)
  const positionsRef = useRef<{ x: number; y: number; z: number }[]>([])
  const isMobileRef = useRef(false)
  const particlesRef = useRef<Particle[]>([])
  const selectedIdRef = useRef<number | null>(null)
  const pulseIdsRef = useRef<number[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })
  const mountedRef = useRef(false)
  const rotationRef = useRef(0) // degrees, decreases for clockwise

  const colors = useMemo(() => timelineData.map((d) => d.color), [timelineData])

  // ─── INIT ───────────────────────────────────────────────
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768
    const count = timelineData.length

    // Init position buffers
    positionsRef.current = Array.from({ length: count }, () => ({ x: 0, y: 0, z: 0 }))

    // Init particles
    const container = containerRef.current
    if (container) {
      const rect = container.getBoundingClientRect()
      sizeRef.current = { w: rect.width, h: rect.height }
      const pCount = isMobileRef.current ? 18 : 45
      particlesRef.current = createParticles(pCount, rect.width, rect.height, colors)
    }

    // Staggered entry: nodes start invisible at center, GSAP animates in
    nodeRefs.current.forEach((el) => {
      if (el) gsap.set(el, { scale: 0, opacity: 0 })
    })

    // Delay entry animation slightly for dramatic effect
    const entryTl = gsap.timeline({ delay: 0.3 })
    nodeRefs.current.forEach((el, i) => {
      if (el) {
        entryTl.to(
          el,
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          i * 0.08
        )
      }
    })

    mountedRef.current = true

    return () => {
      entryTl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── COMPUTE NODE POSITION (single circle, clockwise) ───
  const computePosition = useCallback((index: number, total: number, rotationDeg: number) => {
    const r = isMobileRef.current ? ORBIT_RADIUS_SM : ORBIT_RADIUS
    const angleDeg = (index / total) * 360 + rotationDeg
    const angleRad = (angleDeg * Math.PI) / 180
    const x = r * Math.cos(angleRad)
    const y = r * Math.sin(angleRad)
    const z = y / r
    return { x, y, z }
  }, [])

  // ─── MAIN ANIMATION LOOP ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const resizeCanvas = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w: rect.width, h: rect.height }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const tick = () => {
      if (!mountedRef.current) return
      const paused = isPausedRef.current
      const { w, h } = sizeRef.current
      const cx = w / 2
      const cy = h / 2

      if (!paused) {
        rotationRef.current -= ORBIT_SPEED
        if (rotationRef.current <= -360) rotationRef.current += 360
      }
      frameRef.current++
      const rotationDeg = rotationRef.current
      const n = timelineData.length
      const positions = positionsRef.current

      // ── 1. Update node positions (single circle, clockwise) ──
      for (let i = 0; i < n; i++) {
        const pos = computePosition(i, n, rotationDeg)
        positions[i] = pos

        const el = nodeRefs.current[i]
        if (el) {
          const depthScale = 0.92 + (pos.z + 1) * 0.06
          const depthOpacity = 0.7 + (pos.z + 1) * 0.15
          const depthZIndex = Math.round((pos.z + 1) * 10) + 20

          gsap.set(el, {
            x: pos.x,
            y: pos.y,
            scale: depthScale,
            opacity: depthOpacity,
            zIndex: depthZIndex,
          })
        }
      }

      // ── 2. Draw canvas: particles ──
      ctx.clearRect(0, 0, w, h)
      const particles = particlesRef.current
      const t = frameRef.current * 0.016
      particles.forEach((p) => {
        if (!paused) {
          p.x += p.vx + Math.sin(t * 0.5 + p.phase) * 0.15
          p.y += p.vy + Math.cos(t * 0.3 + p.phase) * 0.15
          if (p.x < 0) p.x = w
          if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h
          if (p.y > h) p.y = 0
        }
        const rgb = hexToRgb(p.color)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p.opacity})`
        ctx.fill()
      })

      // ── 3. Update SVG connection web ──
      if (svgRef.current && !isMobileRef.current) {
        const lines = svgRef.current.querySelectorAll<SVGLineElement>(".conn-line")
        let lineIdx = 0
        for (let i = 0; i < positions.length; i++) {
          for (let j = i + 1; j < positions.length; j++) {
            const line = lines[lineIdx]
            if (line) {
              const dx = positions[i].x - positions[j].x
              const dy = positions[i].y - positions[j].y
              const dist = Math.sqrt(dx * dx + dy * dy)

              // Proximity-based opacity: closer = brighter (loud connection lines)
              const maxDist = 350
              let alpha = Math.max(0, 1 - dist / maxDist) * 0.22

              // Brighten connections for selected node — very visible
              const selId = selectedIdRef.current
              if (selId !== null) {
                const iId = timelineData[i]?.id
                const jId = timelineData[j]?.id
                const pids = pulseIdsRef.current
                if (
                  (iId === selId && pids.includes(jId)) ||
                  (jId === selId && pids.includes(iId))
                ) {
                  alpha = 0.95
                } else if (iId === selId || jId === selId) {
                  alpha = 0.5
                }
              }

              line.setAttribute("x1", String(cx + positions[i].x))
              line.setAttribute("y1", String(cy + positions[i].y))
              line.setAttribute("x2", String(cx + positions[j].x))
              line.setAttribute("y2", String(cy + positions[j].y))
              line.setAttribute("stroke-opacity", String(alpha))
            }
            lineIdx++
          }
        }

        // Center → node lines (use pixel coords for alignment)
        const centerLines = svgRef.current.querySelectorAll<SVGLineElement>(".center-line")
        positions.forEach((pos, i) => {
          const cl = centerLines[i]
          if (cl) {
            cl.setAttribute("x1", String(cx))
            cl.setAttribute("y1", String(cy))
            cl.setAttribute("x2", String(cx + pos.x))
            cl.setAttribute("y2", String(cy + pos.y))
          }
        })
      }

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [colors, computePosition, timelineData])

  // ─── CLICK HANDLERS ───────────────────────────────────
  const handleItemClick = useCallback(
    (item: TimelineItem) => {
      if (selectedIdRef.current === item.id) {
        selectedIdRef.current = null
        pulseIdsRef.current = []
        isPausedRef.current = false
        setSelectedItem(null)
      } else {
        selectedIdRef.current = item.id
        pulseIdsRef.current = item.relatedIds
        isPausedRef.current = true
        setSelectedItem(item)
      }
      forceUpdate((n) => n + 1)
    },
    []
  )

  const handleClose = useCallback(() => {
    selectedIdRef.current = null
    pulseIdsRef.current = []
    isPausedRef.current = false
    setSelectedItem(null)
    forceUpdate((n) => n + 1)
  }, [])

  const navigateToRelated = useCallback(
    (id: number) => {
      const item = timelineData.find((d) => d.id === id)
      if (item) handleItemClick(item)
    },
    [timelineData, handleItemClick]
  )


  // ─── CONNECTION LINE PAIRS (for SVG) ──────────────────
  const connectionPairs = useMemo(() => {
    const pairs: { i: number; j: number }[] = []
    for (let i = 0; i < timelineData.length; i++) {
      for (let j = i + 1; j < timelineData.length; j++) {
        pairs.push({ i, j })
      }
    }
    return pairs
  }, [timelineData.length])

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10" style={brandFont}>
      {/* ── Left: Orb visualization (fixed size, no layout shift) ── */}
      <div className="w-full min-w-0 md:flex-1">
        <div
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[700px] overflow-hidden"
        >
          {/* ── Canvas: particles + trails ── */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* ── SVG: ambient connection web ── */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[5] hidden md:block"
            aria-hidden="true"
          >
            {/* Center → node lines */}
            {timelineData.map((_, i) => (
              <line
                key={`cl-${i}`}
                className="center-line"
                x1="0"
                y1="0"
                x2="0"
                y2="0"
                stroke="rgba(255,255,255,0.9)"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeDasharray="2 8"
              />
            ))}
            {/* Node ↔ node proximity lines — bright so connections pop */}
            {connectionPairs.map((pair, idx) => (
              <line
                key={`conn-${idx}`}
                className="conn-line"
                x1="50%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="rgba(255,255,255,0.95)"
                strokeOpacity="0"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* ── Center orb ── */}
          <div
            ref={centerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative">
              {/* Rotating gradient ring */}
              <div
                className="absolute -inset-12 rounded-full opacity-[0.07]"
                style={{
                  background: "conic-gradient(from 0deg, #06b6d4, #8b5cf6, #10b981, #f59e0b, #ef4444, #ec4899, #3b82f6, #06b6d4)",
                  animation: "orbital-spin 20s linear infinite",
                }}
              />
              <div className="absolute -inset-12 rounded-full bg-black/60 backdrop-blur-sm" />

              {/* Color glow rings */}
              <div className="absolute -inset-20 rounded-full bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-violet-500/[0.04] blur-3xl" />
              <div
                className="absolute -inset-14 rounded-full bg-gradient-to-tr from-emerald-500/[0.06] via-transparent to-blue-500/[0.06] blur-2xl"
                style={{ animation: "orbital-breathe 4s ease-in-out infinite" }}
              />

              {/* Core + K.O.A acronym */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-white/5 border border-white/15 flex items-center justify-center backdrop-blur-sm">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/80 opacity-20" />
                <span className="absolute text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/90">
                  K.O.A
                </span>
              </div>
            </div>
          </div>

          {/* ── Orbital nodes ── */}
          {timelineData.map((item, index) => {
            const isActive = selectedItem?.id === item.id
            const isPulsing = pulseIdsRef.current.includes(item.id)
            const isDimmed = selectedItem !== null && !isActive && !isPulsing
            const isHovered = hoveredId === item.id
            const Icon = item.icon
            const color = item.color

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[index] = el }}
                className="absolute top-1/2 left-1/2 will-change-transform"
                style={{ marginLeft: "-32px", marginTop: "-32px" }}
              >
                <button
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "group relative flex flex-col items-center gap-2 cursor-pointer transition-[filter] duration-500 ease-out",
                    isDimmed && "brightness-[0.35]"
                  )}
                >
                  {/* Active glow burst */}
                  {isActive && (
                    <div
                      className="absolute -inset-6 rounded-full blur-2xl opacity-60 animate-pulse"
                      style={{ backgroundColor: color }}
                    />
                  )}

                  {/* Pulsing ring for related nodes */}
                  {isPulsing && (
                    <div
                      className="absolute -inset-2 rounded-full animate-ping opacity-70"
                      style={{ borderWidth: "2px", borderColor: color, borderStyle: "solid", boxShadow: `0 0 12px ${color}` }}
                    />
                  )}

                  {/* Node circle — bold saturated colors, no pastels */}
                  <div
                    className={cn(
                      "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 relative transition-all duration-300",
                      isHovered && !isActive && "scale-[1.15]",
                      isActive && "scale-110"
                    )}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${color}, ${color})`
                        : isPulsing
                        ? `linear-gradient(135deg, ${color}dd, ${color}99)`
                        : `radial-gradient(circle at 30% 30%, ${color}, ${color}99 40%, rgba(0,0,0,0.85) 70%)`,
                      borderColor: isActive
                        ? color
                        : isPulsing
                        ? color
                        : isHovered
                        ? color
                        : `${color}cc`,
                      boxShadow: isActive
                        ? `0 0 32px ${color}, 0 0 64px ${color}cc, inset 0 0 16px rgba(255,255,255,0.2)`
                        : isPulsing
                        ? `0 0 28px ${color}, 0 0 56px ${color}99`
                        : isHovered
                        ? `0 0 24px ${color}, 0 0 48px ${color}99`
                        : `0 0 12px ${color}99`,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={
                        !isActive && !isHovered
                          ? { filter: `drop-shadow(0 0 4px ${color})` }
                          : { filter: `drop-shadow(0 0 8px rgba(255,255,255,0.9))` }
                      }
                    >
                      <Icon
                        size={22}
                        className={cn(
                          "transition-all duration-300",
                          isActive || isHovered ? "text-white" : "text-white/90"
                        )}
                      />
                    </div>

                    {/* Inner highlight on hover */}
                    {isHovered && !isActive && (
                      <div
                        className="absolute inset-0 rounded-full opacity-50 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${color}99, transparent 60%)`,
                        }}
                      />
                    )}
                  </div>

                  {/* Label — site typography: tracking-wide, bold when active/hover */}
                  <span
                    className={cn(
                      "text-[10px] md:text-[11px] font-medium tracking-[0.08em] uppercase text-center max-w-[80px] md:max-w-[100px] leading-tight transition-all duration-300",
                      isActive || isHovered ? "text-white" : "text-neutral-400"
                    )}
                    style={
                      isActive || isHovered
                        ? { textShadow: `0 0 8px ${color}, 0 0 16px ${color}99` }
                        : undefined
                    }
                  >
                    {item.title}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Right: Detail panel — fixed width, smooth content fade ── */}
      <div className="w-full flex items-center justify-center min-h-[200px] md:min-h-[500px] md:w-[380px] md:shrink-0 md:flex-none">
        {selectedItem ? (
          <div
            ref={cardRef}
            className="w-full px-4 md:px-6 md:py-8 flex items-start justify-center orb-card-fade-in"
            aria-label="Module details"
            style={brandFont}
          >
            <div className="w-full max-w-md">
              <Card
                className="text-white shadow-2xl border-2 border-white/20 overflow-hidden"
                style={{ background: "#0a0a0a" }}
              >
                <CardHeader className="pb-3 relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: selectedItem.color,
                          boxShadow: `0 0 20px ${selectedItem.color}`,
                        }}
                      >
                        <selectedItem.icon size={18} className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base md:text-lg font-bold text-white tracking-[-0.02em]">
                          {selectedItem.title}
                        </CardTitle>
                        <Badge
                          className="mt-1 text-[10px] uppercase tracking-[0.15em] border-0 font-semibold text-white"
                          style={{
                            backgroundColor: selectedItem.color,
                            boxShadow: `0 0 10px ${selectedItem.color}`,
                          }}
                        >
                          {selectedItem.category}
                        </Badge>
                      </div>
                    </div>
                    <button
                      onClick={handleClose}
                      className="text-neutral-400 hover:text-white hover:bg-white/10 h-8 w-8 flex-shrink-0 rounded-md flex items-center justify-center transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[15px] text-neutral-300 leading-relaxed tracking-[-0.01em]">
                    {selectedItem.content}
                  </p>

                  {selectedItem.relatedIds.length > 0 && (
                    <div className="pt-2 border-t border-white/15">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2 font-medium">
                        Connected Modules
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedItem.relatedIds.map((rid) => {
                          const related = timelineData.find((d) => d.id === rid)
                          if (!related) return null
                          return (
                            <button
                              key={rid}
                              onClick={() => navigateToRelated(rid)}
                              className="text-[11px] font-medium text-white hover:opacity-90 border rounded-full px-2.5 py-1 transition-colors flex items-center gap-1 uppercase tracking-[0.06em]"
                              style={{
                                borderColor: related.color,
                                boxShadow: `0 0 12px ${related.color}`,
                              }}
                            >
                              {related.title}
                              <ArrowRight size={9} />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center justify-center w-full h-full">
            <p className="text-neutral-600 text-sm tracking-[0.15em] uppercase animate-pulse">
              Select a module to explore
            </p>
          </div>
        )}
      </div>

      {/* ── CSS keyframes ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orbital-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbital-breathe {
          0%, 100% { transform: scale(1); opacity: 0.06; }
          50% { transform: scale(1.08); opacity: 0.1; }
        }
        .orb-card-fade-in {
          animation: orb-card-fade 0.35s ease-out forwards;
        }
        @keyframes orb-card-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  )
}
