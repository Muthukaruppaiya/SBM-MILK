import { useEffect, useRef, useState } from 'react'
import { useSmoothScrollProgress } from '../hooks/useSmoothScrollProgress'

type Props = {
  onCompleteChange?: (complete: boolean) => void
}

const USEFUL_SECONDS = 4
/** Source video fps — snap seeks to frame edges for clearer steps */
const VIDEO_FPS = 24
const FRAME_STEP = 1 / VIDEO_FPS

export function ScrollVideoStory({ onCompleteChange }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const unlockedRef = useRef(false)
  const smoothTimeRef = useRef(0)
  const lastAppliedFrameRef = useRef(-1)
  // Softer ease + tiny UI step = more intermediate scroll “frames”
  const progress = useSmoothScrollProgress(sectionRef, { ease: 0.055, uiStep: 0.0008 })
  const progressRef = useRef(progress)
  const [ready, setReady] = useState(false)

  progressRef.current = progress

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('muted', 'true')
    video.pause()

    const markReady = () => {
      if (video.duration && !Number.isNaN(video.duration)) setReady(true)
    }

    const unlock = async () => {
      if (unlockedRef.current) return
      try {
        video.muted = true
        const playPromise = video.play()
        if (playPromise) await playPromise
        video.pause()
        unlockedRef.current = true
        if (video.readyState >= 1) video.currentTime = FRAME_STEP
      } catch {
        // retry on gesture
      }
    }

    const onGesture = () => {
      void unlock()
    }

    if (video.readyState >= 1) markReady()
    video.addEventListener('loadedmetadata', markReady)
    video.addEventListener('loadeddata', () => {
      markReady()
      void unlock()
    })
    video.addEventListener('canplay', markReady)

    window.addEventListener('touchstart', onGesture, { passive: true, once: true })
    window.addEventListener('scroll', onGesture, { passive: true, once: true })
    void unlock()

    return () => {
      video.removeEventListener('loadedmetadata', markReady)
      video.removeEventListener('loadeddata', markReady)
      video.removeEventListener('canplay', markReady)
      window.removeEventListener('touchstart', onGesture)
      window.removeEventListener('scroll', onGesture)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    let raf = 0

    const tick = () => {
      const video = videoRef.current
      if (video && video.duration && !Number.isNaN(video.duration)) {
        const usable = Math.min(video.duration, USEFUL_SECONDS)
        const target = Math.min(
          Math.max(progressRef.current * usable, 0),
          Math.max(usable - FRAME_STEP, 0),
        )

        // Lerp time for silkier scrubbing (less jump / lag)
        smoothTimeRef.current += (target - smoothTimeRef.current) * 0.14

        // Quantize to video frames so each step looks clear
        const frameIndex = Math.round(smoothTimeRef.current / FRAME_STEP)
        const frameTime = Math.min(frameIndex * FRAME_STEP, usable - 0.001)

        if (frameIndex !== lastAppliedFrameRef.current) {
          try {
            if (!video.paused) video.pause()
            video.currentTime = frameTime
            lastAppliedFrameRef.current = frameIndex
          } catch {
            // buffering seek miss — retry next frame
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready])

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
          src="/video/farm-story.mp4"
          muted
          autoPlay={false}
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
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
