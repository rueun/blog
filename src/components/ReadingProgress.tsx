'use client'

import { useEffect, useRef, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const locked = useRef(false)
  const unlockTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const handleScroll = () => {
      if (locked.current) return
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }

    // TOC 클릭 시: 프로그래스바 즉시 목표값으로 세팅 후 스크롤 중 업데이트 잠금
    const handleTocNavigate = (e: Event) => {
      const { progress: target } = (e as CustomEvent).detail
      setProgress(target)
      locked.current = true
      clearTimeout(unlockTimer.current)
      unlockTimer.current = setTimeout(() => {
        locked.current = false
      }, 800)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('toc-navigate', handleTocNavigate)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('toc-navigate', handleTocNavigate)
      clearTimeout(unlockTimer.current)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#7c3aed]"
        style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
      />
    </div>
  )
}
