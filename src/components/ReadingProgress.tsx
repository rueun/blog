'use client'

import { useEffect, useRef, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const target = useRef(0)
  const current = useRef(0)
  const rafId = useRef<number>()

  useEffect(() => {
    const animate = () => {
      // 현재값 → 목표값으로 부드럽게 보간 (lerp factor 0.12)
      const next = current.current + (target.current - current.current) * 0.12
      if (Math.abs(next - target.current) < 0.05) {
        current.current = target.current
        setProgress(target.current)
      } else {
        current.current = next
        setProgress(next)
        rafId.current = requestAnimationFrame(animate)
      }
    }

    const updateTarget = (value: number) => {
      target.current = value
      cancelAnimationFrame(rafId.current!)
      rafId.current = requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      updateTarget(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }

    const handleTocNavigate = (e: Event) => {
      updateTarget((e as CustomEvent).detail.progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('toc-navigate', handleTocNavigate)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('toc-navigate', handleTocNavigate)
      cancelAnimationFrame(rafId.current!)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#7c3aed]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
