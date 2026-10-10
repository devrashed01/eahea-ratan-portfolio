import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { requirements } from '@/content/site'
import { Reveal, SectionHead } from './Reveal'

/**
 * Hiring managers pick what their role needs; every pick returns concrete,
 * verifiable evidence instead of adjectives.
 */
export function FitCheck() {
  const [picked, setPicked] = useState<string[]>(['react', 'lead', 'remote'])
  const toggle = (k: string) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]))
  const chosen = requirements.filter((r) => picked.includes(r.key))

  return (
    <section id="fit" className="border-y border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-36">
        <SectionHead
          index="02"
          label="Fit check"
          title={
            <>
              Hiring? Tell me what <em className="text-signal">the role needs.</em>
            </>
          }
          intro="Pick the requirements from your job description. You'll get evidence for each one, not adjectives."
        />

        <Reveal>
          <div className="flex flex-wrap gap-2">
            {requirements.map((r) => {
              const on = picked.includes(r.key)
              return (
                <button
                  key={r.key}
                  onClick={() => toggle(r.key)}
                  aria-pressed={on}
                  className={
                    'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 active:scale-95 ' +
                    (on ? 'border-signal bg-signal text-ink' : 'border-line text-mute hover:border-mute hover:text-paper')
                  }
                >
                  {on && <Check size={14} />}
                  {r.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
          <div className="rounded-2xl border border-line p-6">
            <p className="font-mono text-xs text-mute uppercase">Match</p>
            <p className="mt-2 font-serif text-7xl">
              {chosen.length}
              <span className="text-mute">/{requirements.length}</span>
            </p>
            <p className="mt-2 text-sm text-mute">
              {picked.length === 0 ? 'Pick a requirement to begin.' : 'Every pick comes with evidence from shipped work.'}
            </p>
            <a href="#contact" className="mt-6 inline-block text-sm text-signal underline-offset-4 hover:underline">
              Looks like a fit? Let's talk →
            </a>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {chosen.map((r) => (
                <motion.li
                  key={r.key}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-line bg-ink p-5"
                >
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-signal text-ink">
                      <Check size={12} />
                    </span>
                    {r.label}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-mute">
                    {r.evidence.map((e) => (
                      <li key={e} className="text-pretty">
                        {e}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>
  )
}
