import { motion } from 'framer-motion'
import { ArrowLeft, Download, Printer } from 'lucide-react'
import { achievements, career, education, flagships, profile, projects, skills } from '@/content/site'

/**
 * A dense, single-screen brief for people screening dozens of candidates.
 * Shareable as /?recruiter and printable to a clean one-pager.
 */
export function RecruiterBrief({ onExit }: { onExit: () => void }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-paper text-ink print:bg-white"
    >
      <div className="no-print sticky top-0 z-10 border-b border-ink/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-8">
          <button onClick={onExit} className="flex items-center gap-2 text-sm hover:underline">
            <ArrowLeft size={16} /> Full experience
          </button>
          <span className="hidden font-mono text-xs text-ink/50 sm:block">Recruiter mode · 30-second read</span>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-full border border-ink/20 px-3 py-1.5 text-sm hover:border-ink">
              <Printer size={14} /> Print
            </button>
            <a href={profile.cvUrl} download className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-sm text-paper">
              <Download size={14} /> CV
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 print:py-0">
        <header className="grid gap-6 border-b border-ink/15 pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 className="font-serif text-6xl leading-none tracking-tight md:text-7xl">{profile.name}</h1>
            <p className="mt-3 text-lg">
              {profile.role} · <span className="text-ink/60">{profile.stackLine}</span>
            </p>
          </div>
          <div className="text-sm leading-relaxed md:text-right">
            <p>{profile.location}</p>
            <p className="text-ink/60">{profile.openTo}</p>
            <p>
              <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a> · {profile.phone}
            </p>
            <p className="text-ink/60">
              {profile.socials.map((s, i) => (
                <span key={s.label}>
                  {i > 0 && ' · '}
                  <a className="underline" href={s.href}>{s.label}</a>
                </span>
              ))}
            </p>
          </div>
        </header>

        <section className="grid gap-8 border-b border-ink/15 py-8 md:grid-cols-[160px_1fr]">
          <h2 className="font-mono text-xs tracking-wider text-ink/50 uppercase">TL;DR</h2>
          <div>
            <p className="text-lg leading-relaxed text-pretty">{profile.summary}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {achievements.map((a) => (
                <div key={a.title}>
                  <p className="font-serif text-4xl">{a.k}</p>
                  <p className="text-sm text-ink/60">{a.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-ink/15 py-8 md:grid-cols-[160px_1fr]">
          <h2 className="font-mono text-xs tracking-wider text-ink/50 uppercase">Experience</h2>
          <ol className="space-y-5">
            {career.map((r) => (
              <li key={r.hash} className="grid gap-1 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-medium">
                    {r.title} — {r.company}
                  </p>
                  <p className="text-sm text-ink/60 text-pretty">{r.points[0]}</p>
                </div>
                <p className="font-mono text-xs text-ink/50 sm:text-right">
                  {r.start} – {r.end}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 border-b border-ink/15 py-8 md:grid-cols-[160px_1fr]">
          <h2 className="font-mono text-xs tracking-wider text-ink/50 uppercase">Built & shipped</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[flagships.workpilot, flagships.agentboy].map((p) => (
              <li key={p.name}>
                <a href={p.links[0].href} className="font-medium underline">{p.name}</a>
                <span className="text-sm text-ink/60"> — {p.kind}</span>
                <p className="text-sm text-ink/70 text-pretty">{p.blurb.split('. ')[0]}.</p>
              </li>
            ))}
            {projects.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <span className="font-medium">{p.name}</span>
                <span className="text-sm text-ink/60"> — {p.kind}</span>
                <p className="text-sm text-ink/70 text-pretty">{p.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8 border-b border-ink/15 py-8 md:grid-cols-[160px_1fr]">
          <h2 className="font-mono text-xs tracking-wider text-ink/50 uppercase">Skills</h2>
          <dl className="space-y-2 text-sm">
            {skills.map((g) => (
              <div key={g.group} className="grid gap-1 sm:grid-cols-[140px_1fr]">
                <dt className="font-medium">{g.group}</dt>
                <dd className="text-ink/70">{g.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="grid gap-8 py-8 md:grid-cols-[160px_1fr]">
          <h2 className="font-mono text-xs tracking-wider text-ink/50 uppercase">Education</h2>
          <ul className="space-y-1 text-sm">
            {education.map((e) => (
              <li key={e.degree}>
                <span className="font-medium">{e.degree}</span> — {e.school} <span className="text-ink/50">· {e.when}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </motion.main>
  )
}
