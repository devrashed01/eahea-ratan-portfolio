import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { career, education } from '@/content/site'
import { Reveal, SectionHead } from './Reveal'

/** Career told as a git log — newest commit on top, a playhead tracks scroll. */
export function Career() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="career" className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <SectionHead
        index="03"
        label="git log --career"
        title={
          <>
            Nine years, <em className="text-signal">one branch:</em> main.
          </>
        }
        intro="From hand-coding landing pages in 2017 to leading features on a production SaaS used across Europe."
      />

      <ol ref={ref} className="relative md:ml-[180px] md:pl-10">
        <div className="absolute top-2 bottom-2 left-[5px] w-px bg-line md:left-0" />
        <motion.div className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-signal md:left-0" style={{ scaleY: line }} />

        {career.map((r, i) => (
          <li key={r.hash} className="relative pb-16 pl-8 last:pb-0 md:pl-0">
            <span
              className={
                'absolute top-2 left-0 h-[11px] w-[11px] rounded-full border-2 md:-left-[45px] ' +
                (i === 0 ? 'border-signal bg-signal shadow-[0_0_20px_#d4ff3a]' : 'border-signal bg-ink')
              }
            />
            <Reveal>
              <p className="font-mono text-xs text-mute">
                <span className="text-ember">commit {r.hash}</span>
                {i === 0 && <span className="ml-2 rounded bg-signal/15 px-1.5 py-0.5 text-signal">HEAD → main</span>}
                <span className="ml-3 text-dim">
                  {r.start} — {r.end}
                </span>
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                {r.title} <span className="font-serif text-mute italic">at</span> {r.company}
              </h3>
              <p className="mt-1 text-sm text-dim">{r.place}</p>
              <ul className="mt-5 max-w-3xl space-y-2 text-[15px] leading-relaxed text-mute">
                {r.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="font-mono text-signal">+</span>
                    <span className="text-pretty">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-mute">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-20 grid gap-4 md:ml-[180px] md:grid-cols-2">
        {education.map((e) => (
          <div key={e.degree} className="rounded-2xl border border-line p-6">
            <p className="font-mono text-xs text-mute">{e.when}</p>
            <p className="mt-2 text-lg">{e.degree}</p>
            <p className="text-sm text-mute">{e.school}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
