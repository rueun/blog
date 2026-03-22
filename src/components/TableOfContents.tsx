'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useBannerHeight } from '@/components/AnnounceBanner'
import { useSidebarOpen } from '@/components/PostLayoutClient'
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
                : 'text-text-muted hover:text-text-secondary border-l-transparent hover:bg-surface-alt'
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
  const bannerH = useBannerHeight()
  const topPx = bannerH + 24 // 배너 + 여유 (GNB 없는 레이아웃)
  let sidebarOpen = true
  try { sidebarOpen = useSidebarOpen() } catch { /* PostLayoutClient 외부에서는 기본값 사용 */ }
  // LNB 열림: 2xl(1536px) 이상에서 TOC 표시, 그 미만 플로팅
  // LNB 닫힘: xl(1280px) 이상에서 TOC 표시, 그 미만 플로팅
  const desktopShow = sidebarOpen ? '2xl' : 'xl'
  const [showFloating, setShowFloating] = useState(false)

  useEffect(() => {
    const breakpoint = sidebarOpen ? 1536 : 1280
    const check = () => setShowFloating(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [sidebarOpen])

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
      {/* Desktop: 오른쪽 고정 사이드바 (LNB 열려있으면 숨김) */}
      <aside
        className={`hidden ${desktopShow === '2xl' ? '2xl:block' : 'xl:block'} fixed right-4 w-56 overflow-y-auto transition-opacity duration-300`}
        style={{ top: topPx, maxHeight: `calc(100vh - ${topPx + 24}px)` }}
      >
        <div className="bg-surface border border-border rounded-xl shadow-sm p-4">
          <p className="font-mono text-[11px] font-bold text-text-muted uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <span className="text-[#10b981]">§</span> 목차
          </p>
          <TocList headings={headings} activeId={activeId} onClickItem={handleClick} />
        </div>
      </aside>

      {/* 플로팅/드로어: 포탈로 body에 직접 렌더링 */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* 플로팅 버튼 */}
          {showFloating && (
            <button
              onClick={() => setMobileOpen(true)}
              className="fixed bottom-6 right-6 z-[70] w-12 h-12 bg-[#7c3aed] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#6d28d9] transition-colors"
              aria-label="목차 열기"
            >
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M0 1h20M0 8h20M0 15h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}

          {/* 백드롭 */}
          {mobileOpen && (
            <div
              className="fixed inset-0 z-[70] bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
          )}

          {/* 하단 드로어 */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-[71] bg-surface border-t border-border rounded-t-2xl shadow-xl transition-transform duration-300 ${
              mobileOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-[#10b981]">§</span> 목차
                </p>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-muted hover:text-text-secondary transition-colors"
                >
                  ✕
                </button>
              </div>
              <TocList headings={headings} activeId={activeId} onClickItem={handleClick} />
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  )
}
