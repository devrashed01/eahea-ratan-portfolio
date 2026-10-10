import { motion } from 'framer-motion'
import { ArrowDownRight, Download } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { profile, stats } from '@/content/site'
import { scrollToTarget } from '@/lib/useLenis'
import { CountUp } from './CountUp'

const Scene = lazy(() => import('@/three/Scene').then((m) => ({ default: m.Scene })))

const ease = [0.16, 1, 0.3, 1] as const

function SplitWord({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <Suspense fallback={null}>
        <Scene className="absolute inset-0 top-[30%] md:top-[22%] animate-[fadein_1.6s_ease_both]" />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--color-ink)_80%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-32 md:px-8 md:pt-40">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wider text-mute uppercase"
        >
          <span className="text-signal">●</span> {profile.role}
          <span className="text-dim">/</span> {profile.stackLine}
        </motion.p>

        <h1 className="font-serif text-[19vw] leading-[0.82] tracking-[-0.03em] md:text-[11.5rem]">
          <SplitWord text={profile.first} delay={0.15} />
          <br />
          <span className="italic text-signal">
            <SplitWord text={profile.last + '.'} delay={0.3} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease }}
          className="mt-8 grid max-w-5xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-end"
        >
          <p className="max-w-xl text-lg leading-relaxed text-mute text-pretty md:text-xl">
            I build fast, accessible React products for real customers — and the tools that make my team faster.
            <span className="text-paper"> 9+ years, two shipped macOS apps, one obsession with craft.</span>
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <button
              onClick={() => scrollToTarget('#work')}
              className="group flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              See the work
              <ArrowDownRight size={16} className="transition-transform group-hover:rotate-[-45deg]" />
            </button>
            <a
              href={profile.cvUrl}
              download
              className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-paper transition-colors hover:border-paper"
            >
              <Download size={16} /> CV
            </a>
          </div>
        </motion.div>

        <div className="mt-auto pb-8 pt-16">
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-ink/80 p-4 backdrop-blur-md md:p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-4xl md:text-5xl">
                  <CountUp to={s.value} />
                  <span className="text-signal">{s.suffix}</span>
                </dd>
                <p className="mt-1 text-xs leading-snug text-mute md:text-sm">{s.label}</p>
              </div>
            ))}
          </motion.dl>
          <p className="no-print mt-4 hidden text-center font-mono text-[11px] text-dim md:block">
            ↑ ten years × fifty-two weeks of shipping — move your cursor over it
          </p>
        </div>
      </div>
    </section>
  )
}
