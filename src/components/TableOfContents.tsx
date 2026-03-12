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
    <ul className="space-y-1">
      {headings.map((h) => (
        <li key={h.id} style={{ paddingLeft: `${(h.level - 1) * 0.75}rem` }}>
          <button
            onClick={() => onClickItem(h.id)}
            className={`text-left text-sm leading-relaxed w-full transition-colors py-0.5 ${
              activeId === h.id
                ? 'text-[#7c3aed] font-semibold'
                : 'text-gray-400 hover:text-gray-700'
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
      window.scrollTo({ top, behavior: 'instant' })
      setActiveId(id)
    }
    setMobileOpen(false)
  }

  if (headings.length === 0) return null

  return (
    <>
      {/* Desktop: fixed 사이드바 - 레이아웃에 영향 없이 오른쪽에 고정 */}
      <div className="hidden xl:block fixed top-24 right-8 w-52 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">목차</p>
        <TocList headings={headings} activeId={activeId} onClickItem={handleClick} />
      </div>

      {/* Mobile: floating hamburger button (xl 미만에서만) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#7c3aed] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#6d28d9] transition-colors"
        aria-label="목차 열기"
      >
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M0 1h20M0 8h20M0 15h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Mobile: backdrop */}
      {mobileOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile: bottom drawer */}
      <div
        className={`xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-xl transition-transform duration-300 ${
          mobileOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-700">목차</p>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
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
