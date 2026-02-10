"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type VelarixGooBlobProps = {
  className?: string;
  size?: number;
};

export function VelarixGooBlob({
  className,
  size = 400,
}: VelarixGooBlobProps) {
  const [hovered, setHovered] = React.useState(false);
  const container = Math.round(size * 1.15);

  // Pure white chrome — clean white to light grey, no color
  const chromeCore = `radial-gradient(circle at 32% 30%,
    #ffffff 0%, #f8f8f8 15%, #f0f0f0 30%,
    #f5f5f5 45%, #fafafa 60%, #ffffff 75%,
    #f4f4f4 88%, #ffffff 100%)`;

  const chromeDot1 = `radial-gradient(circle at 38% 28%,
    #ffffff 0%, #f6f6f6 25%, #f0f0f0 50%, #fafafa 75%, #ffffff 100%)`;

  const chromeDot2 = `radial-gradient(circle at 55% 38%,
    #ffffff 0%, #f4f4f4 22%, #f8f8f8 45%, #f0f0f0 70%, #ffffff 100%)`;

  const chromeDot3 = `radial-gradient(circle at 35% 55%,
    #ffffff 0%, #f2f2f2 22%, #f8f8f8 48%, #f5f5f5 72%, #ffffff 100%)`;

  const chromeDot4 = `radial-gradient(circle at 48% 32%,
    #ffffff 0%, #f6f6f6 30%, #f0f0f0 55%, #fafafa 80%, #ffffff 100%)`;

  const chromeDot5 = `radial-gradient(circle at 42% 48%,
    #ffffff 0%, #f4f4f4 28%, #f8f8f8 55%, #f2f2f2 80%, #ffffff 100%)`;

  // Flyaway — pure white/grey
  const chromeFly = `radial-gradient(circle, #f6f6f6 0%, #f0f0f0 50%, #fafafa 100%)`;

  return (
    <div
      className={cn("relative select-none cursor-default mx-auto", className)}
      style={{ width: container, height: container }}
      aria-label="Velarix"
      role="img"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* High-quality SVG filters */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          {/* Main goo merge filter — high-res blur */}
          <filter id="velarix-goo" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 50 -22"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" mode="normal" />
          </filter>

          {/* Specular shine overlay */}
          <filter id="velarix-shine" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="shineBlur" />
            <feSpecularLighting
              in="shineBlur"
              surfaceScale="3"
              specularConstant="1.2"
              specularExponent="28"
              result="specOut"
            >
              <fePointLight x={size * 0.3} y={size * 0.2} z={size * 0.8} />
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceGraphic" operator="in" result="specClip" />
            <feComposite in="SourceGraphic" in2="specClip" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" />
          </filter>
        </defs>
      </svg>

      {/* Blob stage — free roaming, GPU accelerated */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible">
        <div
          className={cn(
            "relative",
            "transition-transform duration-700 ease-out",
            hovered ? "scale-108" : "scale-100"
          )}
          style={{
            width: size,
            height: size,
            filter: "url(#velarix-goo)",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          {/* Core blob — chromatic gradient */}
          <div
            className="velarix-core absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: Math.round(size * 0.58),
              height: Math.round(size * 0.58),
              transform: "translate(-50%, -50%)",
              background: chromeCore,
            }}
          />

          {/* Orbiting goo particles — chromatic */}
          <span
            className="velarix-goo-dot absolute rounded-full"
            style={{
              width: Math.round(size * 0.42),
              height: Math.round(size * 0.42),
              background: chromeDot1,
            }}
          />
          <span
            className="velarix-goo-dot2 absolute rounded-full"
            style={{
              width: Math.round(size * 0.38),
              height: Math.round(size * 0.38),
              background: chromeDot2,
            }}
          />
          <span
            className="velarix-goo-dot3 absolute rounded-full"
            style={{
              width: Math.round(size * 0.34),
              height: Math.round(size * 0.34),
              background: chromeDot3,
            }}
          />
          <span
            className="velarix-goo-dot4 absolute rounded-full"
            style={{
              width: Math.round(size * 0.30),
              height: Math.round(size * 0.30),
              background: chromeDot4,
            }}
          />
          <span
            className="velarix-goo-dot5 absolute rounded-full"
            style={{
              width: Math.round(size * 0.28),
              height: Math.round(size * 0.28),
              background: chromeDot5,
            }}
          />
        </div>
      </div>

      {/* Specular shine layer — hard chrome highlight */}
      <div className="velarix-shine-layer absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
        <div
          className="rounded-full"
          style={{
            width: Math.round(size * 0.52),
            height: Math.round(size * 0.52),
            background: `
              radial-gradient(ellipse at 28% 22%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 20%, transparent 55%),
              radial-gradient(ellipse at 65% 70%, rgba(245,245,245,0.15) 0%, transparent 40%)
            `,
            filter: `blur(${Math.round(size * 0.015)}px)`,
            willChange: "transform",
          }}
        />
      </div>

      {/* Neutral chrome sweep — pure white/grey luminance rotation */}
      <div className="velarix-hue-overlay absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none mix-blend-luminosity">
        <div
          className="rounded-full"
          style={{
            width: Math.round(size * 0.6),
            height: Math.round(size * 0.6),
            background: `conic-gradient(from 0deg, #f0f0f0, #e8e8e8, #ffffff, #ececec, #f8f8f8, #f0f0f0)`,
            opacity: 0.15,
            filter: `blur(${Math.round(size * 0.1)}px)`,
            animation: "velarixHueRotate 12s linear infinite",
          }}
        />
      </div>

      {/* Flyaway bits — chromatic */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
        <div className="relative" style={{ width: size, height: size }}>
          <span className="velarix-fly1 absolute rounded-full" style={{ width: Math.round(size * 0.06), height: Math.round(size * 0.06), background: chromeFly, boxShadow: "0 0 8px rgba(230,230,230,0.5)" }} />
          <span className="velarix-fly2 absolute rounded-full" style={{ width: Math.round(size * 0.05), height: Math.round(size * 0.05), background: chromeFly, boxShadow: "0 0 6px rgba(225,225,225,0.5)" }} />
          <span className="velarix-fly3 absolute rounded-full" style={{ width: Math.round(size * 0.04), height: Math.round(size * 0.04), background: chromeFly, boxShadow: "0 0 5px rgba(230,230,230,0.5)" }} />
          <span className="velarix-fly4 absolute rounded-full" style={{ width: Math.round(size * 0.07), height: Math.round(size * 0.07), background: chromeFly, boxShadow: "0 0 10px rgba(225,225,225,0.5)" }} />
          <span className="velarix-fly5 absolute rounded-full" style={{ width: Math.round(size * 0.035), height: Math.round(size * 0.035), background: chromeFly, boxShadow: "0 0 4px rgba(230,230,230,0.5)" }} />
          <span className="velarix-fly6 absolute rounded-full" style={{ width: Math.round(size * 0.045), height: Math.round(size * 0.045), background: chromeFly, boxShadow: "0 0 6px rgba(225,225,225,0.5)" }} />
        </div>
      </div>

      {/* VELARIX brand text — now with chromatic text shadow */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <span
          className={cn(
            "font-black",
            "text-center",
            "leading-none",
            "uppercase",
            "transition-all duration-500 ease-out",
            hovered && "tracking-[0.6em] scale-105"
          )}
          style={{
            fontSize: Math.max(34, Math.round(size * 0.16)),
            fontFamily: "'Courier New', 'SF Mono', 'Fira Code', monospace",
            letterSpacing: hovered ? "0.6em" : "0.45em",
            color: "rgba(30,30,40,0.9)",
            textShadow: `
              0 0 20px rgba(255,255,255,0.95),
              0 0 40px rgba(230,230,230,0.5),
              0 0 80px rgba(220,220,220,0.3),
              0 1px 0 rgba(255,255,255,0.8)
            `,
          }}
        >
          VELARIX
        </span>
      </div>

      {/* Animations — GPU-accelerated, smooth 60fps */}
      <style>{`
        .velarix-core,
        .velarix-goo-dot, .velarix-goo-dot2, .velarix-goo-dot3,
        .velarix-goo-dot4, .velarix-goo-dot5,
        .velarix-fly1, .velarix-fly2, .velarix-fly3,
        .velarix-fly4, .velarix-fly5, .velarix-fly6,
        .velarix-shine-layer, .velarix-hue-overlay {
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
        }

        .velarix-core {
          animation: velarixPulse 7s ease-in-out infinite;
        }
        .velarix-goo-dot {
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          animation: velarixOrbit1 10s ease-in-out infinite;
        }
        .velarix-goo-dot2 {
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          animation: velarixOrbit2 12s ease-in-out infinite;
        }
        .velarix-goo-dot3 {
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          animation: velarixOrbit3 14s ease-in-out infinite;
        }
        .velarix-goo-dot4 {
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          animation: velarixOrbit4 9s ease-in-out infinite;
        }
        .velarix-goo-dot5 {
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          animation: velarixOrbit5 11s ease-in-out infinite;
        }

        .velarix-fly1 { left: 50%; top: 50%; animation: velarixFly1 8s ease-in-out infinite; opacity: 0.9; }
        .velarix-fly2 { left: 50%; top: 50%; animation: velarixFly2 10s ease-in-out infinite; opacity: 0.8; }
        .velarix-fly3 { left: 50%; top: 50%; animation: velarixFly3 7s ease-in-out infinite; opacity: 0.7; }
        .velarix-fly4 { left: 50%; top: 50%; animation: velarixFly4 12s ease-in-out infinite; opacity: 0.85; }
        .velarix-fly5 { left: 50%; top: 50%; animation: velarixFly5 9s ease-in-out infinite; opacity: 0.6; }
        .velarix-fly6 { left: 50%; top: 50%; animation: velarixFly6 10.5s ease-in-out infinite; opacity: 0.75; }

        @keyframes velarixHueRotate {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes velarixPulse {
          0%   { transform: translate(-50%, -50%) scale(1.00); }
          50%  { transform: translate(-50%, -50%) scale(1.04); }
          100% { transform: translate(-50%, -50%) scale(1.00); }
        }

        @keyframes velarixOrbit1 {
          0%   { transform: translate(-50%, -50%) translate(145px, 0px) scale(1.00); }
          25%  { transform: translate(-50%, -50%) translate(30px, 138px) scale(1.22); }
          50%  { transform: translate(-50%, -50%) translate(-135px, 38px) scale(0.85); }
          75%  { transform: translate(-50%, -50%) translate(-30px, -130px) scale(1.18); }
          100% { transform: translate(-50%, -50%) translate(145px, 0px) scale(1.00); }
        }
        @keyframes velarixOrbit2 {
          0%   { transform: translate(-50%, -50%) translate(-138px, -30px) scale(1.00); }
          25%  { transform: translate(-50%, -50%) translate(-30px, 135px) scale(0.85); }
          50%  { transform: translate(-50%, -50%) translate(130px, 45px) scale(1.22); }
          75%  { transform: translate(-50%, -50%) translate(30px, -125px) scale(0.88); }
          100% { transform: translate(-50%, -50%) translate(-138px, -30px) scale(1.00); }
        }
        @keyframes velarixOrbit3 {
          0%   { transform: translate(-50%, -50%) translate(30px, -145px) scale(1.10); }
          25%  { transform: translate(-50%, -50%) translate(138px, -18px) scale(0.85); }
          50%  { transform: translate(-50%, -50%) translate(-18px, 140px) scale(1.20); }
          75%  { transform: translate(-50%, -50%) translate(-135px, 12px) scale(0.88); }
          100% { transform: translate(-50%, -50%) translate(30px, -145px) scale(1.10); }
        }
        @keyframes velarixOrbit4 {
          0%   { transform: translate(-50%, -50%) translate(-18px, 135px) scale(1.15); }
          25%  { transform: translate(-50%, -50%) translate(125px, 45px) scale(0.85); }
          50%  { transform: translate(-50%, -50%) translate(30px, -138px) scale(1.20); }
          75%  { transform: translate(-50%, -50%) translate(-125px, -42px) scale(0.88); }
          100% { transform: translate(-50%, -50%) translate(-18px, 135px) scale(1.15); }
        }
        @keyframes velarixOrbit5 {
          0%   { transform: translate(-50%, -50%) translate(110px, 100px) scale(0.90); }
          25%  { transform: translate(-50%, -50%) translate(-100px, 115px) scale(1.20); }
          50%  { transform: translate(-50%, -50%) translate(-122px, -72px) scale(0.85); }
          75%  { transform: translate(-50%, -50%) translate(85px, -110px) scale(1.18); }
          100% { transform: translate(-50%, -50%) translate(110px, 100px) scale(0.90); }
        }

        @keyframes velarixFly1 {
          0%   { transform: translate(-50%, -50%) translate(160px, -60px) scale(1); opacity: 0.9; }
          30%  { transform: translate(-50%, -50%) translate(200px, -95px) scale(0.7); opacity: 0.5; }
          50%  { transform: translate(-50%, -50%) translate(170px, 30px) scale(0.4); opacity: 0.2; }
          70%  { transform: translate(-50%, -50%) translate(120px, 75px) scale(0.8); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) translate(160px, -60px) scale(1); opacity: 0.9; }
        }
        @keyframes velarixFly2 {
          0%   { transform: translate(-50%, -50%) translate(-170px, 45px) scale(1); opacity: 0.8; }
          25%  { transform: translate(-50%, -50%) translate(-210px, 85px) scale(0.6); opacity: 0.4; }
          50%  { transform: translate(-50%, -50%) translate(-145px, -45px) scale(0.3); opacity: 0.15; }
          75%  { transform: translate(-50%, -50%) translate(-100px, -85px) scale(0.7); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) translate(-170px, 45px) scale(1); opacity: 0.8; }
        }
        @keyframes velarixFly3 {
          0%   { transform: translate(-50%, -50%) translate(45px, -185px) scale(1); opacity: 0.7; }
          35%  { transform: translate(-50%, -50%) translate(80px, -220px) scale(0.5); opacity: 0.3; }
          60%  { transform: translate(-50%, -50%) translate(-30px, -155px) scale(0.3); opacity: 0.15; }
          100% { transform: translate(-50%, -50%) translate(45px, -185px) scale(1); opacity: 0.7; }
        }
        @keyframes velarixFly4 {
          0%   { transform: translate(-50%, -50%) translate(-72px, 170px) scale(1); opacity: 0.85; }
          30%  { transform: translate(-50%, -50%) translate(-108px, 210px) scale(0.6); opacity: 0.4; }
          55%  { transform: translate(-50%, -50%) translate(-42px, 140px) scale(0.35); opacity: 0.2; }
          80%  { transform: translate(-50%, -50%) translate(15px, 125px) scale(0.7); opacity: 0.55; }
          100% { transform: translate(-50%, -50%) translate(-72px, 170px) scale(1); opacity: 0.85; }
        }
        @keyframes velarixFly5 {
          0%   { transform: translate(-50%, -50%) translate(195px, 85px) scale(0.8); opacity: 0.6; }
          40%  { transform: translate(-50%, -50%) translate(225px, 125px) scale(0.4); opacity: 0.25; }
          70%  { transform: translate(-50%, -50%) translate(140px, 55px) scale(0.3); opacity: 0.1; }
          100% { transform: translate(-50%, -50%) translate(195px, 85px) scale(0.8); opacity: 0.6; }
        }
        @keyframes velarixFly6 {
          0%   { transform: translate(-50%, -50%) translate(-185px, -100px) scale(0.9); opacity: 0.75; }
          30%  { transform: translate(-50%, -50%) translate(-220px, -135px) scale(0.5); opacity: 0.35; }
          60%  { transform: translate(-50%, -50%) translate(-135px, -65px) scale(0.3); opacity: 0.15; }
          100% { transform: translate(-50%, -50%) translate(-185px, -100px) scale(0.9); opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}
