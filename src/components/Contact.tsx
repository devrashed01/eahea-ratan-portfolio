import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Download } from 'lucide-react'
import { profile } from '@/content/site'
import { useClock } from '@/lib/useClock'
import { Reveal } from './Reveal'

const YEAR = new Date().getFullYear()

const zones = [
  { city: 'Dhaka', tz: 'Asia/Dhaka', me: true },
  { city: 'Stockholm', tz: 'Europe/Stockholm' },
  { city: 'London', tz: 'Europe/London' },
  { city: 'New York', tz: 'America/New_York' },
]

function Zone({ city, tz, me }: { city: string; tz: string; me?: boolean }) {
  const t = useClock(tz)
  return (
    <div className={'rounded-xl border p-4 ' + (me ? 'border-signal/50 bg-signal/5' : 'border-line')}>
      <p className="font-mono text-[11px] text-mute uppercase">{city}{me && ' · me'}</p>
      <p className="mt-1 font-serif text-3xl tabular-nums">{t}</p>
    </div>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
        <Reveal>
          <p className="font-mono text-xs tracking-wider text-mute uppercase">
            <span className="text-signal">05</span> / Contact
          </p>
          <h2 className="mt-6 font-serif text-[15vw] leading-[0.85] tracking-tight md:text-[9rem]">
            Let's build
            <br />
            <em className="text-signal">something good.</em>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-mute">{profile.openTo}. I reply within a day.</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            onClick={copy}
            className="group flex items-center justify-between gap-6 rounded-full bg-paper px-6 py-4 text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-base font-medium break-all md:text-lg">{profile.email}</span>
            {copied ? <Check size={18} /> : <Copy size={18} className="opacity-60 group-hover:opacity-100" />}
          </button>
          <a
            href={profile.cvUrl}
            download
            className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-4 transition-colors hover:border-paper"
          >
            <Download size={18} /> Download CV
          </a>
        </Reveal>
        <p aria-live="polite" className="mt-3 h-5 font-mono text-xs text-signal">
          {copied ? 'Copied to clipboard ✓' : ''}
        </p>

        <Reveal delay={0.15} className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-3 font-mono text-xs text-mute uppercase">Right now</p>
            <div className="grid grid-cols-2 gap-3">
              {zones.map((z) => (
                <Zone key={z.city} {...z} />
              ))}
            </div>
            <p className="mt-3 text-sm text-dim">I already work async every day with a team in Sweden.</p>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs text-mute uppercase">Elsewhere</p>
            <ul className="border-t border-line">
              {profile.socials.map((s) => (
                <li key={s.label} className="border-b border-line">
                  <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-5">
                    <span className="text-xl transition-transform duration-500 group-hover:translate-x-2">{s.label}</span>
                    <span className="flex items-center gap-2 font-mono text-xs text-mute group-hover:text-signal">
                      {s.handle} <ArrowUpRight size={14} />
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="group flex items-center justify-between py-5">
                  <span className="text-xl transition-transform duration-500 group-hover:translate-x-2">Phone</span>
                  <span className="font-mono text-xs text-mute group-hover:text-signal">{profile.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>

      <footer className="relative border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 font-mono text-[11px] text-dim md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {YEAR} {profile.name}. Designed & built by me — React, Three.js, Framer Motion.</span>
          <span>Press <kbd className="text-mute">⌘K</kbd> for shortcuts · <kbd className="text-mute">R</kbd> for recruiter mode</span>
        </div>
      </footer>
    </section>
  )
}
