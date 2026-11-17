import { useEffect, useRef, useState } from 'react'
import { useSmoothScrollProgress } from '../hooks/useSmoothScrollProgress'

type Props = {
  onCompleteChange?: (complete: boolean) => void
}

export function ScrollVideoStory({ onCompleteChange }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const pendingTimeRef = useRef<number | null>(null)
  const seekingRef = useRef(false)
  const progress = useSmoothScrollProgress(sectionRef, { ease: 0.07, uiStep: 0.0015 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.muted = true

    const markReady = () => setReady(true)
    if (video.readyState >= 1) markReady()
    else video.addEventListener('loadedmetadata', markReady)

    const onSeeked = () => {
      seekingRef.current = false
      if (pendingTimeRef.current == null || !video.duration) return
      const next = pendingTimeRef.current
      pendingTimeRef.current = null
      if (Math.abs(video.currentTime - next) > 0.012) {
        seekingRef.current = true
        video.currentTime = next
      }
    }

    video.addEventListener('seeked', onSeeked)
    return () => {
      video.removeEventListener('loadedmetadata', markReady)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !ready || !video.duration) return

    // Only scrub 0 → 4s (file is trimmed; hard-cap as safety)
    const usable = Math.min(video.duration, 4)
    const targetTime = Math.min(Math.max(progress * usable, 0), Math.max(usable - 0.05, 0))

    if (Math.abs(video.currentTime - targetTime) < 0.02) return

    if (seekingRef.current) {
      pendingTimeRef.current = targetTime
      return
    }

    seekingRef.current = true
    pendingTimeRef.current = null
    video.currentTime = targetTime
  }, [progress, ready])

  useEffect(() => {
    onCompleteChange?.(progress >= 0.97)
  }, [progress, onCompleteChange])

  const contentOpacity = 1 - Math.min(progress * 1.05, 0.88)
  const contentY = progress * 28

  return (
    <section className="scroll-story" ref={sectionRef} aria-label="Farm story scroll animation">
      <div className="scroll-story-sticky">
        <video
          ref={videoRef}
          className="scroll-story-video"
          src={`/video/farm-story.mp4?v=4s`}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
        <div className="scroll-story-veil" />

        <div
          className="scroll-story-content"
          style={{
            opacity: contentOpacity,
            transform: `translate3d(0, ${contentY}px, 0)`,
          }}
        >
          <p className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
            Scroll to explore the farm
          </p>
          <h1 className="brand-hero">SBM Donkey Farm</h1>
          <p className="headline">Nature&apos;s original superfood, bottled at the source.</p>
          <p className="support">
            Fresh milk, powder, collected urine, zero-degree fruits, and living soil — one farm,
            pure products.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-primary" href="#products">
              View products
            </a>
            <a
              className="btn btn-ghost"
              href="#about"
              style={{ color: 'var(--cream)', borderColor: 'rgba(247,244,236,0.35)' }}
            >
              Our story
            </a>
          </div>
        </div>

        <div className="scroll-progress" aria-hidden="true">
          <span>{progress < 0.97 ? 'Keep scrolling' : 'Products ahead'}</span>
          <div className="scroll-progress-track">
            <div
              className="scroll-progress-fill"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
