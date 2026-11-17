import { useEffect, useRef, useState, type RefObject } from 'react'

type Options = {
  /** How quickly smoothed progress catches the scroll target (0.04–0.2). Lower = silkier. */
  ease?: number
  /** Minimum change before React state updates (keeps UI smooth without thrashing). */
  uiStep?: number
}

function readProgress(el: HTMLElement) {
  const viewport = window.visualViewport?.height ?? window.innerHeight
  const total = el.offsetHeight - viewport
  if (total <= 0) return 1
  const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
  return scrolled / total
}

export function useSmoothScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { ease = 0.085, uiStep = 0.002 }: Options = {},
) {
  const [progress, setProgress] = useState(0)
  const targetRef = useRef(0)
  const smoothRef = useRef(0)
  const rafRef = useRef(0)
  const lastUiRef = useRef(-1)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const syncTarget = () => {
      targetRef.current = readProgress(el)
    }

    const tick = () => {
      const target = targetRef.current
      const prev = smoothRef.current
      const next = prev + (target - prev) * ease

      smoothRef.current = Math.abs(target - next) < 0.00035 ? target : next

      if (Math.abs(smoothRef.current - lastUiRef.current) >= uiStep || smoothRef.current === target) {
        lastUiRef.current = smoothRef.current
        setProgress(smoothRef.current)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    syncTarget()
    smoothRef.current = targetRef.current
    setProgress(targetRef.current)
    lastUiRef.current = targetRef.current

    window.addEventListener('scroll', syncTarget, { passive: true })
    window.addEventListener('touchmove', syncTarget, { passive: true })
    window.addEventListener('resize', syncTarget)
    window.visualViewport?.addEventListener('resize', syncTarget)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', syncTarget)
      window.removeEventListener('touchmove', syncTarget)
      window.removeEventListener('resize', syncTarget)
      window.visualViewport?.removeEventListener('resize', syncTarget)
      cancelAnimationFrame(rafRef.current)
    }
  }, [ref, ease, uiStep])

  return progress
}
