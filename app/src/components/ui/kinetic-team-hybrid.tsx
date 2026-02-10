'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import Image from 'next/image';

/* ---------- Types ---------- */

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  imageStyle?: React.CSSProperties;
}

/* ---------- Data ---------- */

const TEAM: TeamMember[] = [
  {
    id: '01',
    name: 'Chad Neptune',
    role: 'Chief Executive Officer',
    image: '/team/chad-neptune.png',
  },
  {
    id: '02',
    name: 'Jorge Guillen',
    role: 'Chief Operating Officer',
    image: '/team/jorge-guillen.png',
    imageStyle: { objectPosition: "center 25%", transform: "scale(1.25)" },
  },
  {
    id: '03',
    name: 'Hiram Cavazos',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '04',
    name: 'Vanessa Cavazos',
    role: 'Chief Financial Officer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '05',
    name: 'Noah Neptune',
    role: 'Success Manager',
    image: '/team/noah-neptune.jpg',
  },
];

/* ---------- Main Component ---------- */

export default function KineticTeamHybrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full cursor-default px-4 py-16 sm:px-6 md:px-12 md:py-24 text-neutral-200"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />

      <div className="mx-auto max-w-6xl">
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

        {/* The List */}
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
            />
          ))}
        </div>
      </div>

      {/* DESKTOP ONLY: Global Floating Cursor Image */}
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
                  const member = TEAM.find((t) => t.id === activeId);
                  return (
                    <Image
                      src={member?.image ?? ''}
                      alt="Preview"
                      fill
                      className="h-full w-full object-cover object-top"
                      style={{ objectPosition: "center 15%", ...member?.imageStyle }}
                    />
                  );
                })()}

                {/* Overlay Metadata */}
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
  );
}

/* ---------- Row Component ---------- */

function TeamRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}: {
  data: TeamMember;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
}) {
  const isDimmed = isAnyActive && !isActive;

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

        {/* Name & Index Section */}
        <div className="flex items-center gap-4 md:gap-8 transition-transform duration-500 group-hover:translate-x-3">
          <span className="font-mono text-[11px] md:text-xs text-neutral-600 tabular-nums w-6 shrink-0">
            0{index + 1}
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-400 transition-colors duration-300 group-hover:text-white md:text-5xl lg:text-6xl leading-none">
            {data.name}
          </h2>
        </div>

        {/* Role & Icon Section */}
        <div className="flex items-center justify-between pl-10 md:justify-end md:gap-8 md:pl-0 shrink-0">
          <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-neutral-600 transition-colors group-hover:text-neutral-400">
            {data.role}
          </span>

          {/* Mobile Toggle Icon */}
          <div className="block md:hidden text-neutral-500 ml-4">
            {isActive ? <Minus size={16} /> : <Plus size={16} />}
          </div>

          {/* Desktop Arrow */}
          <motion.div
            animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
            className="hidden md:block text-white ml-4"
          >
            <ArrowUpRight size={24} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* MOBILE ONLY: Inline Accordion Image */}
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
                  <p className="text-[10px] uppercase tracking-widest text-white/80">View Profile</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
