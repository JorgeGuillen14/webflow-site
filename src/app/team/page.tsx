'use client'

import { useState, useEffect } from 'react'
import { MeshGradient } from "@paper-design/shaders-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, Minus, Plus, X, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import SiteHeader from "@/components/ui/site-header"
import SiteFooter from "@/components/ui/site-footer"
import React from 'react'

gsap.registerPlugin(ScrollTrigger)

/* ---------- Types ---------- */
interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  imageStyle?: React.CSSProperties
  bio: string
  linkedin?: string
  twitter?: string
}

/* ---------- Data ---------- */
const TEAM: TeamMember[] = [
  {
    id: '01',
    name: 'Chad Neptune',
    role: 'Chief Executive Officer',
    image: '/team/chad-neptune.png',
    bio: 'Seasoned executive with deep experience in defense contracting, federal program management, and business development. Chad leads Velarix with a mission to modernize how GovCon companies capture and win work.',
    linkedin: 'https://www.linkedin.com/in/chadneptune',
  },
  {
    id: '02',
    name: 'Jorge Guillen',
    role: 'Chief Operating Officer',
    image: '/team/jorge-guillen.png',
    imageStyle: { objectPosition: "center 25%", transform: "scale(1.25)" },
    bio: 'Operational strategist focused on scaling technology platforms for regulated industries. Jorge oversees product delivery, partnerships, and day-to-day operations across Velarix.',
    linkedin: 'https://www.linkedin.com/in/jorgeguillen',
  },
  {
    id: '03',
    name: 'Hiram Cavazos',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    bio: 'Full-stack engineer and architect specializing in AI/ML systems, cloud infrastructure on AWS GovCloud, and FedRAMP-aligned security architectures. Hiram leads all engineering at Velarix.',
    linkedin: 'https://www.linkedin.com/in/hiramcavazos',
  },
  {
    id: '04',
    name: 'Vanessa Cavazos',
    role: 'Chief Financial Officer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    bio: 'Finance leader with expertise in DCAA-compliant accounting, indirect rate management, and government contract financial operations. Vanessa ensures Velarix and its clients stay audit-ready.',
    linkedin: 'https://www.linkedin.com/in/vanessacavazos',
  },
  {
    id: '05',
    name: 'Noah Neptune',
    role: 'Success Manager',
    image: '/team/noah-neptune.jpg',
    bio: 'Client success advocate who ensures every KaptureOps deployment delivers measurable impact. Noah works directly with GovCon teams to optimize their capture and compliance workflows.',
  },
]

/* ---------- Bio Popup ---------- */
function BioPopup({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-6 md:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Photo */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/10 mb-5 mx-auto">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
            style={{ objectPosition: "center 15%", ...member.imageStyle }}
          />
        </div>

        {/* Name & role */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-white tracking-[-0.01em]">{member.name}</h3>
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mt-1">{member.role}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-neutral-400 leading-relaxed text-center mb-6">{member.bio}</p>

        {/* Socials */}
        {(member.linkedin || member.twitter) && (
          <div className="flex items-center justify-center gap-3">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            )}
            {member.twitter && (
              <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ---------- Shader Background ---------- */
function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <MeshGradient
        className="w-full h-full"
        colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
        speed={0.6}
        distortion={0.8}
        swirl={0.1}
      />
    </div>
  )
}

/* ---------- GSAP Animations ---------- */
function useTeamAnimations() {
  useEffect(() => {
    gsap.fromTo(
      ".gsap-team-heading",
      { opacity: 0, y: 50, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    )

    gsap.fromTo(
      ".gsap-team-row",
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-team-row", start: "top 90%", toggleActions: "play none none none" }
      }
    )

    gsap.fromTo(
      ".gsap-team-divider",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut", delay: 0.4 }
    )

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])
}

/* ---------- Team Row ---------- */
function TeamRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
  onViewBio,
}: {
  data: TeamMember
  index: number
  isActive: boolean
  setActiveId: (id: string | null) => void
  isMobile: boolean
  isAnyActive: boolean
  onViewBio: (member: TeamMember) => void
}) {
  const isDimmed = isAnyActive && !isActive

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        y: 0,
        backgroundColor: isActive && isMobile ? 'rgba(255,255,255,0.03)' : 'transparent'
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={() => isMobile && setActiveId(isActive ? null : data.id)}
      className={`gsap-team-row group relative border-t border-neutral-800/60 transition-colors duration-500 last:border-b ${
        isMobile ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <div className="relative z-10 flex flex-col gap-3 py-6 px-2 md:flex-row md:items-center md:justify-between md:py-10 md:px-0">
        {/* Name & Index */}
        <div className="flex items-center gap-4 md:gap-8 transition-transform duration-500 group-hover:translate-x-3">
          <span className="font-mono text-[11px] md:text-xs text-neutral-600 tabular-nums w-6 shrink-0">
            0{index + 1}
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-400 transition-colors duration-300 group-hover:text-white md:text-5xl lg:text-6xl leading-none">
            {data.name}
          </h2>
        </div>

        {/* Role, View Bio button, and Icons */}
        <div className="flex items-center justify-between pl-10 md:justify-end md:gap-6 md:pl-0 shrink-0">
          <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-neutral-600 transition-colors group-hover:text-neutral-400">
            {data.role}
          </span>

          {/* View Bio button */}
          <button
            onClick={(e) => { e.stopPropagation(); onViewBio(data) }}
            className="ml-4 text-[10px] md:text-xs uppercase tracking-[0.15em] text-neutral-600 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-3 py-1"
          >
            Bio
          </button>

          {/* Mobile Toggle */}
          <div className="block md:hidden text-neutral-500 ml-3">
            {isActive ? <Minus size={16} /> : <Plus size={16} />}
          </div>

          {/* Desktop Arrow */}
          <motion.div
            animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
            className="hidden md:block text-white ml-3"
          >
            <ArrowUpRight size={24} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* Mobile accordion image */}
      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-neutral-900/30 rounded-lg mx-2 mb-4"
          >
            <div className="p-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={data.image}
                  alt={data.name}
                  className="h-full w-full object-cover object-top"
                  fill
                  style={{ objectPosition: "center 15%", ...data.imageStyle }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); onViewBio(data) }}
                    className="text-[10px] uppercase tracking-widest text-white/80 border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
                  >
                    View Bio
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ---------- Main Page ---------- */
export default function TeamPage() {
  useTeamAnimations()

  const [activeId, setActiveId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [bioMember, setBioMember] = useState<TeamMember | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    mouseX.set(e.clientX + 20)
    mouseY.set(e.clientY + 20)
  }

  return (
    <main className="dark min-h-screen bg-black relative">
      <ShaderBackground />
      <SiteHeader activePage="team" />

      <div className="relative z-10 pt-20">
        {/* Dark scrim over shader for readability */}
        <div
          onMouseMove={handleMouseMove}
          className="relative min-h-screen w-full cursor-default px-4 py-16 sm:px-6 md:px-12 md:py-24 text-neutral-200"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />

          <div className="mx-auto max-w-6xl relative">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="gsap-team-heading mb-16 md:mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              <div className="shrink-0">
                <h1 className="text-4xl font-light tracking-tighter text-white sm:text-5xl md:text-7xl lg:text-8xl">
                  Meet the <span className="text-neutral-600">Team</span>
                </h1>
              </div>
              <div className="gsap-team-divider h-px flex-1 bg-neutral-800 mx-4 md:mx-8 hidden md:block origin-left" />
              <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 shrink-0">
                Leadership
              </p>
            </motion.header>

            <div className="flex flex-col" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
              {TEAM.map((member, index) => (
                <TeamRow
                  key={member.id}
                  data={member}
                  index={index}
                  isActive={activeId === member.id}
                  setActiveId={setActiveId}
                  isMobile={isMobile}
                  isAnyActive={activeId !== null}
                  onViewBio={(m) => setBioMember(m)}
                />
              ))}
            </div>
          </div>

          {/* Desktop floating cursor image */}
          {!isMobile && (
            <motion.div
              style={{ x: cursorX, y: cursorY }}
              className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
            >
              <AnimatePresence mode="wait">
                {activeId && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative h-72 w-56 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl"
                  >
                    {(() => {
                      const member = TEAM.find((t) => t.id === activeId)
                      return (
                        <Image
                          src={member?.image ?? ''}
                          alt="Preview"
                          fill
                          className="h-full w-full object-cover object-top"
                          style={{ objectPosition: "center 15%", ...member?.imageStyle }}
                        />
                      )
                    })()}
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest text-white/80">Active</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Bio popup */}
        <AnimatePresence>
          {bioMember && (
            <BioPopup member={bioMember} onClose={() => setBioMember(null)} />
          )}
        </AnimatePresence>

        <SiteFooter />
      </div>
    </main>
  )
}
