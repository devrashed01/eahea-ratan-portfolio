import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from './useReducedMotion'

let instance: Lenis | null = null

/** Scrolls smoothly to a selector or element, using Lenis when it's running. */
export function scrollToTarget(target: string | HTMLElement) {
  if (instance) instance.scrollTo(target, { offset: -72, duration: 1.4 })
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/** Mounts a smooth-scroll instance for the lifetime of the app shell. */
export function useLenis(enabled = true) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !enabled) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    instance = lenis

    let frameId: number
    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      instance = null
    }
  }, [prefersReducedMotion, enabled])
}
