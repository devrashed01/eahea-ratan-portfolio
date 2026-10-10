import { useCallback, useEffect, useState } from 'react'
import { useLenis } from '@/lib/useLenis'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Work } from '@/components/Work'
import { FitCheck } from '@/components/FitCheck'
import { Career } from '@/components/Career'
import { Proof } from '@/components/Proof'
import { Contact } from '@/components/Contact'
import { CommandPalette } from '@/components/CommandPalette'
import { RecruiterBrief } from '@/components/RecruiterBrief'

const RECRUITER_PARAM = 'recruiter'

function readRecruiter() {
  return new URLSearchParams(window.location.search).has(RECRUITER_PARAM)
}

export default function App() {
  const [recruiter, setRecruiterState] = useState(readRecruiter)
  const [palette, setPalette] = useState(false)
  useLenis(!recruiter)

  // Recruiter mode lives in the URL so it can be linked straight from a CV.
  const setRecruiter = useCallback((on: boolean) => {
    const url = new URL(window.location.href)
    if (on) url.searchParams.set(RECRUITER_PARAM, '')
    else url.searchParams.delete(RECRUITER_PARAM)
    window.history.pushState({}, '', url.toString().replace(`${RECRUITER_PARAM}=`, RECRUITER_PARAM))
    setRecruiterState(on)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const onPop = () => setRecruiterState(readRecruiter())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest('input, textarea, [contenteditable]')
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((p) => !p)
      } else if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 'r') {
        setRecruiter(!readRecruiter())
      } else if (e.key === 'Escape') setPalette(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setRecruiter])

  return (
    <>
      {recruiter ? (
        <RecruiterBrief onExit={() => setRecruiter(false)} />
      ) : (
        <div className="grain">
          <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-ink">
            Skip to work
          </a>
          <Nav onPalette={() => setPalette(true)} onRecruiter={() => setRecruiter(true)} />
          <main>
            <Hero />
            <Marquee />
            <Work />
            <FitCheck />
            <Career />
            <Proof />
            <Contact />
          </main>
        </div>
      )}
      <CommandPalette open={palette} onClose={() => setPalette(false)} onRecruiter={() => setRecruiter(true)} />
    </>
  )
}
