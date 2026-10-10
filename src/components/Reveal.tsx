import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Fades and lifts its children into view once, as they scroll in. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Small mono eyebrow + big serif heading used by every section. */
export function SectionHead({ index, label, title, intro }: { index: string; label: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <Reveal className="mb-14 grid gap-6 md:grid-cols-[180px_1fr] md:gap-10">
      <p className="font-mono text-xs tracking-wider text-mute uppercase">
        <span className="text-signal">{index}</span> / {label}
      </p>
      <div>
        <h2 className="font-serif text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl">{title}</h2>
        {intro && <p className="mt-6 max-w-2xl text-lg text-mute text-pretty">{intro}</p>}
      </div>
    </Reveal>
  )
}
