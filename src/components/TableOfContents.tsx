'use client'

import { useEffect, useState } from 'react'
import type { Heading } from '@/lib/types'

interface Props {
  headings: Heading[]
}

function TocList({
  headings,
  activeId,
  onClickItem,
}: {
  headings: Heading[]
  activeId: string
  onClickItem: (id: string) => void
}) {
  return (
    <ul className="space-y-0.5">
      {headings.map((h) => (
        <li key={h.id} style={{ paddingLeft: `${(h.level - 1) * 0.75}rem` }}>
          <button
            onClick={() => onClickItem(h.id)}
            className={`text-left text-xs leading-relaxed w-full transition-all py-1 px-2 rounded-md border-l-2 ${
              activeId === h.id
                ? 'text-[#a78bfa] font-semibold border-l-[#a78bfa] bg-[#7c3aed]/8'
                : 'text-[#484f58] hover:text-[#8b949e] border-l-transparent hover:bg-white/3'
            }`}
          >
            {h.text}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 24
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const targetProgress = totalHeight > 0 ? Math.min(100, (top / totalHeight) * 100) : 0
      window.dispatchEvent(new CustomEvent('toc-navigate', { detail: { progress: targetProgress } }))
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveId(id)
    }
    setMobileOpen(false)
  }

  if (headings.length === 0) return null

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <div className="hidden 2xl:block fixed top-24 right-8 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto bg-[#161b22] border border-[#30363d] rounded-xl shadow-sm p-4">
        <p className="font-mono text-[11px] font-bold text-[#484f58] uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <span className="text-[#10b981]">§</span> 목차
        </p>
        <TocList headings={headings} activeId={activeId} onClickItem={handleClick} />
      </div>

      {/* Mobile: floating button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="2xl:hidden fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#7c3aed] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#6d28d9] transition-colors"
        aria-label="목차 열기"
      >
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M0 1h20M0 8h20M0 15h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Mobile: backdrop */}
      {mobileOpen && (
        <div
          className="2xl:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile: bottom drawer */}
      <div
        className={`2xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#161b22] border-t border-[#30363d] rounded-t-2xl shadow-xl transition-transform duration-300 ${
          mobileOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-xs font-semibold text-[#484f58] uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-[#10b981]">§</span> 목차
            </p>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#484f58] hover:text-[#8b949e] transition-colors"
            >
              ✕
            </button>
          </div>
          <TocList headings={headings} activeId={activeId} onClickItem={handleClick} />
        </div>
      </div>
    </>
  )
}
