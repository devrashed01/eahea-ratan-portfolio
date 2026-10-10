import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { flagships, profile } from '@/content/site'
import { scrollToTarget } from '@/lib/useLenis'

interface Cmd {
  label: string
  hint: string
  run: () => void
}

export function CommandPalette(props: { open: boolean; onClose: () => void; onRecruiter: () => void }) {
  // Remount on every open so the query and selection start fresh.
  return <Palette key={props.open ? 'open' : 'closed'} {...props} />
}

function Palette({ open, onClose, onRecruiter }: { open: boolean; onClose: () => void; onRecruiter: () => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)

  const cmds = useMemo<Cmd[]>(
    () => [
      { label: 'Recruiter mode — 30-second brief', hint: 'R', run: onRecruiter },
      { label: 'Go to selected work', hint: 'section', run: () => scrollToTarget('#work') },
      { label: 'Run the fit check', hint: 'section', run: () => scrollToTarget('#fit') },
      { label: 'Read the career log', hint: 'section', run: () => scrollToTarget('#career') },
      { label: 'See proof & toolkit', hint: 'section', run: () => scrollToTarget('#proof') },
      { label: 'Contact', hint: 'section', run: () => scrollToTarget('#contact') },
      { label: 'Copy email address', hint: profile.email, run: () => navigator.clipboard?.writeText(profile.email) },
      { label: 'Download CV (PDF)', hint: 'file', run: () => window.open(profile.cvUrl, '_blank') },
      ...profile.socials.map((s) => ({ label: `Open ${s.label}`, hint: s.handle, run: () => window.open(s.href, '_blank') })),
      { label: 'Open WorkPilot website', hint: 'link', run: () => window.open(flagships.workpilot.links[0].href, '_blank') },
      { label: 'Open AgentBoy website', hint: 'link', run: () => window.open(flagships.agentboy.links[0].href, '_blank') },
    ],
    [onRecruiter],
  )

  const list = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 30)
  }, [open])

  const exec = (c: Cmd | undefined) => {
    if (!c) return
    onClose()
    setTimeout(c.run, 60)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="no-print fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ y: -12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -8, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="text-mute" />
              <input
                ref={input}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setActive(0)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setActive((a) => Math.min(list.length - 1, a + 1))
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setActive((a) => Math.max(0, a - 1))
                  } else if (e.key === 'Enter') exec(list[active])
                  else if (e.key === 'Escape') onClose()
                }}
                placeholder="Type a command…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-dim"
              />
              <kbd className="font-mono text-[10px] text-dim">ESC</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {list.map((c, i) => (
                <li key={c.label}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => exec(c)}
                    className={
                      'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ' +
                      (i === active ? 'bg-ink-3 text-paper' : 'text-mute')
                    }
                  >
                    {c.label}
                    <span className="font-mono text-[11px] text-dim">{c.hint}</span>
                  </button>
                </li>
              ))}
              {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-dim">No matches.</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
