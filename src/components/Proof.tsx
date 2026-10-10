import { achievements, skills } from '@/content/site'
import { Reveal, SectionHead } from './Reveal'

export function Proof() {
  return (
    <section id="proof" className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
        <SectionHead
          index="04"
          label="Proof & toolkit"
          title={
            <>
              Receipts, <em className="text-signal">not buzzwords.</em>
            </>
          }
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08} className="group bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink">
              <p className="font-serif text-6xl transition-colors duration-500 group-hover:text-signal">{a.k}</p>
              <p className="mt-4 font-medium">{a.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-mute text-pretty">{a.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 0.08}>
              <p className="mb-4 border-b border-line pb-3 font-mono text-xs tracking-wider text-mute uppercase">{g.group}</p>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-3 py-1 text-sm text-paper/90 transition-colors hover:border-signal hover:text-signal"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
