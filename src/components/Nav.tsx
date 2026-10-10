import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '@/content/site'
import { scrollToTarget } from '@/lib/useLenis'
import { useClock } from '@/lib/useClock'

const links = [
  { id: '#work', label: 'Work' },
  { id: '#fit', label: 'Fit check' },
  { id: '#career', label: 'Career' },
  { id: '#contact', label: 'Contact' },
]

export function Nav({ onPalette, onRecruiter }: { onPalette: () => void; onRecruiter: () => void }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [scrolled, setScrolled] = useState(false)
  const time = useClock(profile.timezone)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <motion.div className="h-px origin-left bg-signal" style={{ scaleX: progress }} />
      <div
        className={
          'mx-auto mt-3 flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2 transition-all duration-500 md:px-5 ' +
          (scrolled ? 'mx-3 border border-line bg-ink/70 backdrop-blur-xl md:mx-auto' : 'border border-transparent')
        }
      >
        <button onClick={() => scrollToTarget('#top')} className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-paper font-mono text-xs font-medium text-ink transition-transform group-hover:rotate-[360deg] duration-700">
            {profile.initials}
          </span>
          <span className="hidden font-mono text-xs text-mute sm:block">
            Dhaka <span className="text-paper">{time}</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToTarget(l.id)}
              className="rounded-full px-3 py-1.5 text-sm text-mute transition-colors hover:bg-ink-3 hover:text-paper"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onPalette}
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-mute transition-colors hover:border-mute hover:text-paper sm:flex"
          >
            <kbd>⌘K</kbd>
          </button>
          <button
            onClick={onRecruiter}
            className="flex items-center gap-2 rounded-full bg-signal px-3.5 py-1.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            Recruiter mode
          </button>
        </div>
      </div>
    </header>
  )
}
