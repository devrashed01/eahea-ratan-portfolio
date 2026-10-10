import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const states = [
  { label: 'working', color: '#d4ff3a' },
  { label: 'thinking', color: '#8ab4ff' },
  { label: 'waiting', color: '#ff6a3d' },
  { label: 'done', color: '#28c840' },
]

const sessions = ['portfolio', 'booking-widget', 'workpilot']

/** A looping mock of AgentBoy's floating pill with three live sessions. */
export function AgentBoyPill() {
  const [tick, setTick] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex min-h-[320px] items-start justify-center overflow-hidden rounded-2xl border border-line bg-[radial-gradient(circle_at_50%_0%,#23231f,#0b0b0a_70%)] p-6">
      <div className="absolute inset-x-0 top-0 h-6 bg-ink-3/80" />
      <motion.button
        layout
        onClick={() => setOpen((o) => !o)}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative mt-3 overflow-hidden border border-line bg-black text-left shadow-2xl"
        style={{ borderRadius: open ? 22 : 999 }}
        aria-expanded={open}
        aria-label="AgentBoy demo pill — click to expand"
      >
        <motion.div layout="position" className="flex items-center gap-3 px-4 py-2">
          <span className="text-base">🤖</span>
          <div className="flex gap-1.5">
            {sessions.map((s, i) => {
              const st = states[(tick + i * 2) % states.length]
              return <motion.span key={s} className="h-2 w-2 rounded-full" animate={{ backgroundColor: st.color, scale: st.label === 'working' ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.8 }} />
            })}
          </div>
          <span className="font-mono text-[11px] text-mute">3 agents · 5h 62%</span>
        </motion.div>
        {open && (
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-72 space-y-1.5 px-4 pb-4">
            {sessions.map((s, i) => {
              const st = states[(tick + i * 2) % states.length]
              return (
                <li key={s} className="flex items-center justify-between rounded-xl bg-ink-3 px-3 py-2">
                  <span className="font-mono text-xs">{s}</span>
                  <span className="font-mono text-[11px]" style={{ color: st.color }}>
                    {st.label}
                  </span>
                </li>
              )
            })}
            <li className="rounded-xl border border-ember/40 bg-ember/10 px-3 py-2 text-xs">
              <p className="text-paper">booking-widget wants to run <span className="font-mono">npm test</span></p>
              <div className="mt-2 flex gap-2">
                <span className="rounded-md bg-paper px-2 py-0.5 text-ink">Allow</span>
                <span className="rounded-md border border-line px-2 py-0.5">Deny</span>
              </div>
            </li>
          </motion.ul>
        )}
      </motion.button>
      <p className="absolute bottom-5 font-mono text-[11px] text-dim">click the pill</p>
    </div>
  )
}
