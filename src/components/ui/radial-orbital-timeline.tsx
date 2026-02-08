"use client"

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

const brandFont = { fontFamily: "var(--font-space-grotesk), sans-serif" }

// ─── LISSAJOUS ORBIT CONFIGS ────────────────────────────────
// Each node gets unique frequency ratios (a, b) creating figure-8s, loops, trefoils
interface NodeOrbit {
  radiusX: number
  radiusY: number
  a: number       // x frequency
  b: number       // y frequency
  phaseX: number  // x phase offset (radians)
  phaseY: number  // y phase offset (radians)
  speed: number   // time multiplier
  // mobile
  radiusXSm: number
  radiusYSm: number
}

const ORBIT_CONFIGS: NodeOrbit[] = [
  { radiusX: 220, radiusY: 150, a: 3, b: 2, phaseX: 0,    phaseY: 0.5,  speed: 0.15,  radiusXSm: 120, radiusYSm: 85 },
  { radiusX: 190, radiusY: 170, a: 2, b: 3, phaseX: 1.2,  phaseY: 0,    speed: 0.12,  radiusXSm: 110, radiusYSm: 95 },
  { radiusX: 250, radiusY: 130, a: 5, b: 4, phaseX: 0.8,  phaseY: 1.5,  speed: 0.10,  radiusXSm: 135, radiusYSm: 75 },
  { radiusX: 175, radiusY: 190, a: 3, b: 4, phaseX: 2.1,  phaseY: 0.3,  speed: 0.13,  radiusXSm: 100, radiusYSm: 105 },
  { radiusX: 235, radiusY: 145, a: 4, b: 3, phaseX: 0.4,  phaseY: 2.0,  speed: 0.11,  radiusXSm: 130, radiusYSm: 80 },
  { radiusX: 200, radiusY: 160, a: 5, b: 3, phaseX: 1.8,  phaseY: 1.1,  speed: 0.14,  radiusXSm: 115, radiusYSm: 90 },
  { radiusX: 260, radiusY: 140, a: 2, b: 5, phaseX: 0.6,  phaseY: 2.5,  speed: 0.09,  radiusXSm: 140, radiusYSm: 78 },
  { radiusX: 165, radiusY: 180, a: 4, b: 5, phaseX: 2.8,  phaseY: 0.7,  speed: 0.16,  radiusXSm: 95,  radiusYSm: 100 },
  { radiusX: 245, radiusY: 155, a: 3, b: 5, phaseX: 1.0,  phaseY: 1.8,  speed: 0.105, radiusXSm: 132, radiusYSm: 88 },
]

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

// ─── TRAIL RING BUFFER ──────────────────────────────────────
const TRAIL_LENGTH = 6
const TRAIL_SAMPLE_INTERVAL = 4 // sample every N frames

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

  // Animation state (NOT React state — direct mutation for perf)
  const timeRef = useRef(0)
  const frameRef = useRef(0)
  const animRef = useRef<number>(0)
  const positionsRef = useRef<{ x: number; y: number; z: number }[]>([])
  const trailsRef = useRef<{ x: number; y: number }[][]>([])
  const isMobileRef = useRef(false)
  const particlesRef = useRef<Particle[]>([])
  const selectedIdRef = useRef<number | null>(null)
  const pulseIdsRef = useRef<number[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })
  const mountedRef = useRef(false)

  const orbits = useMemo(() => ORBIT_CONFIGS.slice(0, timelineData.length), [timelineData.length])
  const colors = useMemo(() => timelineData.map((d) => d.color), [timelineData])

  // ─── INIT ───────────────────────────────────────────────
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768
    const count = timelineData.length

    // Init position buffers
    positionsRef.current = Array.from({ length: count }, () => ({ x: 0, y: 0, z: 0 }))
    trailsRef.current = Array.from({ length: count }, () => [])

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

  // ─── COMPUTE NODE POSITION (Lissajous) ─────────────────
  const computePosition = useCallback(
    (orbit: NodeOrbit, t: number) => {
      const mobile = isMobileRef.current
      const rx = mobile ? orbit.radiusXSm : orbit.radiusX
      const ry = mobile ? orbit.radiusYSm : orbit.radiusY

      const x = rx * Math.sin(orbit.a * t * orbit.speed + orbit.phaseX)
      const y = ry * Math.sin(orbit.b * t * orbit.speed + orbit.phaseY)

      // Pseudo-Z for depth: derived from y-position normalized
      const maxR = Math.max(rx, ry)
      const z = y / maxR // -1 to 1, where -1 = far, 1 = near

      return { x, y, z }
    },
    []
  )

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
        timeRef.current += 0.016 // ~60fps timestep
      }
      frameRef.current++
      const t = timeRef.current

      // ── 1. Update node positions via GSAP.set (direct DOM) ──
      const positions = positionsRef.current
      orbits.forEach((orbit, i) => {
        const pos = computePosition(orbit, t)
        positions[i] = pos

        const el = nodeRefs.current[i]
        if (el) {
          // Depth scaling: z ranges -1..1
          const depthScale = 0.82 + (pos.z + 1) * 0.14 // 0.82..1.10
          const depthOpacity = 0.55 + (pos.z + 1) * 0.225 // 0.55..1.0
          const depthZIndex = Math.round((pos.z + 1) * 10) + 20

          gsap.set(el, {
            x: pos.x,
            y: pos.y,
            scale: depthScale,
            opacity: depthOpacity,
            zIndex: depthZIndex,
          })
        }

        // Trail sampling
        if (!paused && frameRef.current % TRAIL_SAMPLE_INTERVAL === 0 && !isMobileRef.current) {
          const trail = trailsRef.current[i]
          trail.push({ x: pos.x, y: pos.y })
          if (trail.length > TRAIL_LENGTH) trail.shift()
        }
      })

      // ── 2. Draw canvas: particles + trails ──
      ctx.clearRect(0, 0, w, h)

      // Particles
      const particles = particlesRef.current
      particles.forEach((p) => {
        if (!paused) {
          p.x += p.vx + Math.sin(t * 0.5 + p.phase) * 0.15
          p.y += p.vy + Math.cos(t * 0.3 + p.phase) * 0.15

          // Wrap around
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

      // Trails (desktop only)
      if (!isMobileRef.current) {
        trailsRef.current.forEach((trail, i) => {
          if (trail.length < 2) return
          const color = colors[i]
          const rgb = hexToRgb(color)

          trail.forEach((point, j) => {
            const progress = j / trail.length
            const alpha = progress * 0.12 + 0.02
            const size = progress * 4 + 1.5

            ctx.beginPath()
            ctx.arc(cx + point.x, cy + point.y, size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
            ctx.fill()
          })
        })
      }

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

              // Proximity-based opacity: closer = brighter
              const maxDist = 350
              let alpha = Math.max(0, 1 - dist / maxDist) * 0.06

              // Brighten connections for selected node
              const selId = selectedIdRef.current
              if (selId !== null) {
                const iId = timelineData[i]?.id
                const jId = timelineData[j]?.id
                const pids = pulseIdsRef.current
                if (
                  (iId === selId && pids.includes(jId)) ||
                  (jId === selId && pids.includes(iId))
                ) {
                  alpha = 0.25
                } else if (iId === selId || jId === selId) {
                  alpha = 0.12
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

        // Center → node lines
        const centerLines = svgRef.current.querySelectorAll<SVGLineElement>(".center-line")
        positions.forEach((pos, i) => {
          const cl = centerLines[i]
          if (cl) {
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
  }, [orbits, colors, computePosition, timelineData])

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
    <div
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[700px] overflow-hidden"
      style={brandFont}
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
            x1="50%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="rgba(255,255,255,0.5)"
            strokeOpacity="0.03"
            strokeWidth="0.5"
            strokeDasharray="2 8"
          />
        ))}
        {/* Node ↔ node proximity lines */}
        {connectionPairs.map((pair, idx) => (
          <line
            key={`conn-${idx}`}
            className="conn-line"
            x1="50%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="rgba(255,255,255,0.5)"
            strokeOpacity="0"
            strokeWidth="0.5"
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

          {/* Core */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-white/5 border border-white/15 flex items-center justify-center backdrop-blur-sm">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/80 animate-ping opacity-20" />
            <div className="absolute w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
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
            style={{ marginLeft: "-28px", marginTop: "-28px" }}
          >
            <button
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "group relative flex flex-col items-center gap-2 cursor-pointer transition-[filter] duration-300",
                isDimmed && "brightness-[0.25] blur-[0.5px]"
              )}
            >
              {/* Active glow burst */}
              {isActive && (
                <div
                  className="absolute -inset-6 rounded-full blur-2xl opacity-40 animate-pulse"
                  style={{ backgroundColor: color }}
                />
              )}

              {/* Pulsing ring for related nodes */}
              {isPulsing && (
                <div
                  className="absolute -inset-2 rounded-full animate-ping opacity-20"
                  style={{ borderWidth: "1.5px", borderColor: color, borderStyle: "solid" }}
                />
              )}

              {/* Node circle */}
              <div
                className={cn(
                  "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 relative transition-all duration-300",
                  isHovered && !isActive && "scale-[1.15]",
                  isActive && "scale-110"
                )}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${color}, ${color}cc)`
                    : isPulsing
                    ? `${color}25`
                    : `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08), rgba(0,0,0,0.6))`,
                  borderColor: isActive
                    ? color
                    : isPulsing
                    ? `${color}55`
                    : isHovered
                    ? `${color}55`
                    : `${color}18`,
                  boxShadow: isActive
                    ? `0 0 30px ${color}50, 0 0 60px ${color}20, inset 0 0 15px ${color}30`
                    : isPulsing
                    ? `0 0 25px ${color}25`
                    : isHovered
                    ? `0 0 20px ${color}20, 0 0 40px ${color}08`
                    : `0 0 10px ${color}06`,
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={
                    !isActive && !isHovered
                      ? { filter: `drop-shadow(0 0 3px ${color}40)` }
                      : isHovered
                      ? { filter: `drop-shadow(0 0 6px ${color}60)` }
                      : undefined
                  }
                >
                  <Icon
                    size={20}
                    className={cn(
                      "transition-all duration-300",
                      isActive
                        ? "text-white"
                        : isHovered
                        ? "text-white"
                        : "text-neutral-300"
                    )}
                  />
                </div>

                {/* Inner glow on hover */}
                {isHovered && !isActive && (
                  <div
                    className="absolute inset-0 rounded-full opacity-40 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${color}20, transparent 70%)`,
                    }}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] md:text-[11px] font-medium tracking-wide text-center max-w-[80px] md:max-w-[100px] leading-tight transition-all duration-300",
                  isActive
                    ? "text-white"
                    : isHovered
                    ? "text-white"
                    : "text-neutral-500"
                )}
                style={
                  isActive || isHovered
                    ? { textShadow: `0 0 10px ${color}40` }
                    : undefined
                }
              >
                {item.title}
              </span>
            </button>
          </div>
        )
      })}

      {/* ── Detail card ── */}
      {selectedItem && (
        <div className="absolute bottom-0 left-0 right-0 z-30 px-4 md:px-0 md:left-1/2 md:-translate-x-1/2 md:bottom-4 md:w-[500px]">
          <Card className="border-white/10 bg-black/85 backdrop-blur-xl text-white shadow-2xl">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{
                      backgroundColor: selectedItem.color,
                      boxShadow: `0 0 20px ${selectedItem.color}40`,
                    }}
                  >
                    <selectedItem.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base md:text-lg text-white tracking-[-0.01em]">
                      {selectedItem.title}
                    </CardTitle>
                    <Badge
                      className="mt-1 text-[10px] uppercase tracking-[0.1em] border-white/10"
                      style={{
                        backgroundColor: `${selectedItem.color}15`,
                        color: selectedItem.color,
                      }}
                    >
                      {selectedItem.category}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="text-neutral-400 hover:text-white hover:bg-white/10 h-8 w-8 flex-shrink-0"
                >
                  <X size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-neutral-400 leading-relaxed">
                {selectedItem.content}
              </p>

              {selectedItem.relatedIds.length > 0 && (
                <div className="pt-2 border-t border-white/[0.06]">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-600 mb-2">
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
                          className="text-[11px] text-neutral-400 hover:text-white border border-white/10 hover:border-white/30 rounded-full px-2.5 py-1 transition-colors flex items-center gap-1"
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
      )}

      {/* ── CSS keyframes (global style tag) ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orbital-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbital-breathe {
          0%, 100% { transform: scale(1); opacity: 0.06; }
          50% { transform: scale(1.08); opacity: 0.1; }
        }
      `}} />
    </div>
  )
}
