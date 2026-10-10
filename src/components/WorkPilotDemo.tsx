import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GitCommit, GitPullRequest, CalendarDays, Ticket, Sparkles, RotateCcw } from 'lucide-react'

const events = [
  { icon: GitCommit, time: '09:42', text: 'feat(widget): gift card balance check', meta: 'BOOK-212' },
  { icon: Ticket, time: '10:05', text: 'BOOK-212 moved to In Review', meta: 'Jira' },
  { icon: CalendarDays, time: '11:00', text: 'Sprint planning · 45 min', meta: 'Calendar' },
  { icon: GitPullRequest, time: '13:18', text: 'PR #482 opened: waitlist capacity rules', meta: 'BOOK-219' },
  { icon: GitCommit, time: '15:51', text: 'fix(portal): RangeError on empty timetable', meta: 'BOOK-224' },
]

const standup = `Yesterday
• BOOK-212 Gift card balance check — shipped to review (2h 30m)
• BOOK-219 Waitlist capacity rules — PR #482 opened (3h 15m)
• BOOK-224 Fixed RangeError on empty timetable (1h)
• Sprint planning (45m)

Today
• Address review on #482, start BOOK-230

Blockers
• None`

/**
 * A miniature, scripted WorkPilot: activity streams in, then a standup is
 * "written" from it. Nothing here is real data — it shows the product loop.
 */
export function WorkPilotDemo() {
  const [shown, setShown] = useState(0)
  const [typed, setTyped] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        events.forEach((_, i) => setTimeout(() => setShown(i + 1), 350 * (i + 1)))
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (typed < 0 || typed >= standup.length) return
    const id = setTimeout(() => setTyped((n) => Math.min(standup.length, n + 3)), 12)
    return () => clearTimeout(id)
  }, [typed])

  const done = typed >= standup.length
  const generating = typed >= 0 && !done

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_40px_120px_-40px_rgba(212,255,58,0.25)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-mute">WorkPilot — Today</span>
        <span className="ml-auto rounded-full bg-ink-3 px-2 py-0.5 font-mono text-[10px] text-mute">on-device</span>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="border-b border-line p-4 md:border-r md:border-b-0">
          <p className="mb-3 font-mono text-[11px] tracking-wider text-dim uppercase">Recorded activity</p>
          <ul className="space-y-2">
            {events.map((e, i) => (
              <motion.li
                key={i}
                initial={false}
                animate={{ opacity: i < shown ? 1 : 0, x: i < shown ? 0 : -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 rounded-lg bg-ink-3/60 px-3 py-2"
              >
                <e.icon size={15} className="mt-0.5 shrink-0 text-signal" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{e.text}</p>
                  <p className="font-mono text-[11px] text-dim">
                    {e.time} · {e.meta}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
          <button
            onClick={() => setTyped(done ? -1 : 0)}
            disabled={generating || shown < events.length}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-4 py-2.5 text-sm font-medium text-ink transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-40"
          >
            {done ? <RotateCcw size={15} /> : <Sparkles size={15} />}
            {done ? 'Reset' : generating ? 'Writing…' : 'Write my standup'}
          </button>
        </div>

        <div className="min-h-[300px] p-4">
          <p className="mb-3 font-mono text-[11px] tracking-wider text-dim uppercase">Standup draft</p>
          <AnimatePresence mode="wait">
            {typed < 0 ? (
              <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-dim">
                Press <span className="text-paper">Write my standup</span> — it’s built only from what was recorded.
                Nothing is posted until you confirm.
              </motion.p>
            ) : (
              <motion.pre
                key="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={'font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-paper ' + (done ? '' : 'caret')}
              >
                {standup.slice(0, typed)}
              </motion.pre>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
