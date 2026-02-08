'use client'

import { cn } from "@/lib/utils"

interface ContextBoxProps {
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  href?: string
  linkLabel?: string
  className?: string
}

export function ContextBox({
  eyebrow,
  title,
  body,
  bullets,
  href,
  linkLabel = "Learn more",
  className,
}: ContextBoxProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between",
        "border-t border-white/10 pt-8 pb-10",
        "transition-colors duration-300",
        className
      )}
      role="article"
      aria-label={title}
    >
      {/* Eyebrow */}
      <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-4 font-medium">
        {eyebrow}
      </p>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-white mb-4 leading-tight">
        {title}
      </h3>

      {/* Body */}
      <p className="text-[15px] leading-relaxed text-neutral-400 mb-6 max-w-md">
        {body}
      </p>

      {/* Bullets */}
      <ul className="space-y-2 mb-6" role="list">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="text-sm text-neutral-500 flex items-baseline gap-2"
          >
            <span className="inline-block w-1 h-1 rounded-full bg-neutral-600 flex-shrink-0 mt-1.5" aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Optional link */}
      {href && (
        <a
          href={href}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors duration-200 group/link"
          aria-label={`${linkLabel} about ${title}`}
        >
          {linkLabel}
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5" aria-hidden="true">
            &rarr;
          </span>
        </a>
      )}
    </article>
  )
}
