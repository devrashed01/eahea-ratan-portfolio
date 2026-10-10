import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { flagships, projects } from '@/content/site'
import { Reveal, SectionHead } from './Reveal'
import { WorkPilotDemo } from './WorkPilotDemo'
import { AgentBoyPill } from './AgentBoyPill'

type Flagship = (typeof flagships)[keyof typeof flagships]

function LinkPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-signal hover:text-signal"
    >
      {label}
      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

function FlagshipCase({ p, no, demo, flip }: { p: Flagship; no: string; demo: React.ReactNode; flip?: boolean }) {
  return (
    <article className="grid gap-10 border-t border-line py-16 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? 'lg:order-2' : ''}>
        <p className="font-mono text-xs text-mute">
          <span className="text-signal">{no}</span> — {p.kind} · {p.year}
        </p>
        <h3 className="mt-4 font-serif text-6xl tracking-tight md:text-7xl">{p.name}</h3>
        <p className="mt-2 font-serif text-2xl text-signal italic">{p.tagline}</p>
        <p className="mt-6 text-lg leading-relaxed text-mute text-pretty">{p.blurb}</p>
        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          {p.facts.map((f) => (
            <div key={f.v}>
              <dt className="font-serif text-3xl">{f.k}</dt>
              <dd className="text-xs text-mute">{f.v}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-8 space-y-3 text-[15px] leading-relaxed text-mute">
          {p.details.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-2.5 h-px w-4 shrink-0 bg-signal" />
              <span className="text-pretty">{d}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {p.links.map((l) => (
            <LinkPill key={l.href} {...l} />
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] text-dim">{p.stack.join(' · ')}</p>
      </Reveal>
      <Reveal delay={0.15} className={'lg:sticky lg:top-28 lg:self-start ' + (flip ? 'lg:order-1' : '')}>
        {demo}
      </Reveal>
    </article>
  )
}

function ProjectRow({ p, open, onToggle }: { p: (typeof projects)[number]; open: boolean; onToggle: () => void }) {
  return (
    <li className="border-t border-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[80px_1.3fr_1fr_auto]"
      >
        <span className="hidden font-mono text-xs text-dim md:block">{p.year}</span>
        <span className="font-serif text-3xl tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-signal md:text-4xl">
          {p.name}
        </span>
        <span className="hidden text-sm text-mute md:block">{p.kind}</span>
        <Plus size={20} className={'text-mute transition-transform duration-500 ' + (open ? 'rotate-45 text-signal' : '')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 md:grid-cols-[80px_1.3fr_1fr_auto]">
              <span className="hidden md:block" />
              <div>
                <p className="text-lg text-paper text-pretty">{p.blurb}</p>
                <ul className="mt-3 space-y-1 text-sm text-mute">
                  {p.details.map((d) => (
                    <li key={d}>— {d}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full bg-ink-3 px-2.5 py-1 font-mono text-[11px] text-mute">
                      {s}
                    </span>
                  ))}
                </div>
                {p.links && (
                  <div className="flex flex-wrap gap-2">
                    {p.links.map((l) => (
                      <LinkPill key={l.href} {...l} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function Work() {
  const [open, setOpen] = useState<string | null>(projects[0].slug)
  return (
    <section id="work" className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <SectionHead
        index="01"
        label="Selected work"
        title={
          <>
            Products I <em className="text-signal">ship</em>,<br />
            not just tickets I close.
          </>
        }
        intro="Two native macOS apps I designed, built and release on my own — both interactive below — followed by an index of production, client and side work."
      />

      <FlagshipCase p={flagships.workpilot} no="A" demo={<WorkPilotDemo />} />
      <FlagshipCase p={flagships.agentboy} no="B" demo={<AgentBoyPill />} flip />

      <Reveal className="mt-16">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="font-mono text-xs tracking-wider text-mute uppercase">Index — {projects.length} more</h3>
          <span className="font-mono text-xs text-dim">click a row</span>
        </div>
        <ul className="border-b border-line">
          {projects.map((p) => (
            <ProjectRow key={p.slug} p={p} open={open === p.slug} onToggle={() => setOpen(open === p.slug ? null : p.slug)} />
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
