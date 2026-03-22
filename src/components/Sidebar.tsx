'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useBannerHeight } from '@/components/AnnounceBanner'
import type { CategoryTreeItem } from '@/lib/types'

interface RecentPost {
  slug: string
  title: string
  date: string
}

interface Props {
  desktopOpen: boolean
  onDesktopToggle: (open: boolean) => void
  categoryTree: CategoryTreeItem[]
  recentPosts: RecentPost[]
  totalPosts: number
  navbarHeight?: number
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
    </svg>
  )
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/>
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SidebarContent({
  categoryTree,
  recentPosts,
  totalPosts,
  onClose,
}: {
  categoryTree: CategoryTreeItem[]
  recentPosts: RecentPost[]
  totalPosts: number
  onClose: () => void
}) {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const [search, setSearch] = useState('')
  const [expandedSet, setExpandedSet] = useState<Set<string>>(() => new Set())
  const searchRef = useRef<HTMLInputElement>(null)

  // "/" 단축키로 검색창 포커스
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !e.ctrlKey && !e.metaKey &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setSearch('')
        searchRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // 검색 시 매칭되는 부모 자동 펼치기
  useEffect(() => {
    if (!search.trim()) return
    const q = search.toLowerCase()
    const toExpand = new Set<string>()
    categoryTree.forEach((cat) => {
      const parentMatch = cat.name.toLowerCase().includes(q)
      const childMatch = cat.children.some((c) => c.name.toLowerCase().includes(q))
      if (parentMatch || childMatch) toExpand.add(cat.name)
    })
    setExpandedSet(toExpand)
  }, [search, categoryTree])

  const toggleExpand = (name: string) => {
    setExpandedSet((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  // 검색 필터링
  const q = search.trim().toLowerCase()
  const filteredTree = q === ''
    ? categoryTree
    : categoryTree
        .map((cat) => ({
          ...cat,
          _parentMatch: cat.name.toLowerCase().includes(q),
          children: cat.children.filter((c) => c.name.toLowerCase().includes(q)),
        }))
        .filter((cat) => cat._parentMatch || cat.children.length > 0)

  return (
    <div className="w-64 h-full bg-[#0d1117] flex flex-col overflow-y-auto border-r border-[#21262d]">
      {/* 닫기 버튼 */}
      <div className="flex justify-end px-4 pt-3 shrink-0">
        <button
          onClick={onClose}
            className="text-[#484f58] hover:text-[#e6edf3] p-1 transition-colors"
            aria-label="사이드바 닫기"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
      </div>

      {/* 프로필 */}
      <div className="flex flex-col items-center px-5 pt-2 pb-4 shrink-0">
        <Link href="/">
          <Image
            src="/profile.png"
            alt="Rueun"
            width={96}
            height={96}
            className="rounded-full bg-white mb-3"
          />
        </Link>
        <Link href="/" className="text-[#e6edf3] font-bold text-base hover:text-[#a78bfa] transition-colors">
          rueun.blog
        </Link>
        <p className="text-[#484f58] text-xs mt-1 font-mono">Software Architect</p>
      </div>

      {/* 네비게이션 */}
      <div className="px-5 pb-4 shrink-0">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Link href="/" className="flex flex-col items-center gap-0.5 text-[#484f58] hover:text-[#e6edf3] transition-colors" title="Home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="text-[9px] font-mono">Home</span>
          </Link>
          <Link href="/posts" className="flex flex-col items-center gap-0.5 text-[#484f58] hover:text-[#e6edf3] transition-colors" title="Posts">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span className="text-[9px] font-mono">Posts</span>
          </Link>
          <Link href="/series" className="flex flex-col items-center gap-0.5 text-[#484f58] hover:text-[#e6edf3] transition-colors" title="Series">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
            </svg>
            <span className="text-[9px] font-mono">Series</span>
          </Link>
          <Link href="/tag" className="flex flex-col items-center gap-0.5 text-[#484f58] hover:text-[#e6edf3] transition-colors" title="Tags">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <span className="text-[9px] font-mono">Tags</span>
          </Link>
          <a href="https://github.com/rueun" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 text-[#484f58] hover:text-[#e6edf3] transition-colors" title="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span className="text-[9px] font-mono">GitHub</span>
          </a>
        </div>

        {/* 검색창 */}
        <div className="flex items-center gap-2 bg-[#161b22] border border-[#21262d] rounded-lg px-3 py-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#484f58] shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색..."
            className="bg-transparent text-xs text-[#e6edf3] placeholder-[#484f58] outline-none w-full font-mono"
          />
          {search ? (
            <button onClick={() => setSearch('')} className="text-[#484f58] hover:text-[#8b949e] shrink-0">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          ) : (
            <span className="text-[#484f58] text-[10px] font-mono bg-[#0d1117] border border-[#21262d] rounded px-1.5 py-0.5 shrink-0">/</span>
          )}
        </div>
      </div>

      <div className="border-t border-[#21262d] mx-4 mb-2 shrink-0" />

      {/* 카테고리 트리 */}
      <nav className="px-3 py-2 flex-1">
        {/* 전체 */}
        <Link
          href="/posts"
          className={`flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors text-sm mb-0.5 ${
            !currentCategory && !search
              ? 'text-[#e6edf3] bg-[#161b22]'
              : 'text-[#8b949e] hover:bg-[#161b22] hover:text-[#e6edf3]'
          }`}
        >
          <FolderIcon className="text-yellow-400 shrink-0" />
          <span className="flex-1">전체</span>
          <span className="text-xs text-[#484f58]">({totalPosts})</span>
        </Link>

        {/* 카테고리 트리 */}
        {filteredTree.map((cat) => {
          const isExpanded = expandedSet.has(cat.name)
          const hasChildren = cat.children.length > 0
          const isActive = currentCategory === cat.name

          return (
            <div key={cat.name}>
              {/* 부모 카테고리 행 */}
              <div className="flex items-center gap-1 mb-0.5">
                <Link
                  href={`/posts?category=${encodeURIComponent(cat.name)}`}
                  className={`flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors text-sm flex-1 min-w-0 ${
                    isActive
                      ? 'text-[#e6edf3] bg-[#161b22]'
                      : 'text-[#8b949e] hover:bg-[#161b22] hover:text-[#e6edf3]'
                  }`}
                >
                  <FolderIcon className="text-yellow-400 shrink-0" />
                  <span className="flex-1 truncate">{cat.name}</span>
                  <span className="text-xs text-[#484f58] shrink-0">({cat.count})</span>
                </Link>
                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(cat.name)}
                    className="text-[#484f58] hover:text-[#8b949e] p-1 shrink-0 transition-colors"
                    aria-label={isExpanded ? '접기' : '펼치기'}
                  >
                    <ChevronIcon open={isExpanded} />
                  </button>
                )}
              </div>

              {/* 자식 카테고리 */}
              {hasChildren && isExpanded && (
                <div className="ml-4 mb-1">
                  {cat.children.map((child) => {
                    const isChildActive = currentCategory === child.name
                    return (
                      <Link
                        key={child.name}
                        href={`/posts?category=${encodeURIComponent(child.name)}`}
                        className={`flex items-center gap-2 py-1 px-2 rounded-lg transition-colors text-xs mb-0.5 ${
                          isChildActive
                            ? 'text-[#e6edf3] bg-[#161b22]'
                            : 'text-[#484f58] hover:bg-[#161b22] hover:text-[#8b949e]'
                        }`}
                      >
                        <FileIcon className="text-[#484f58] shrink-0" />
                        <span className="flex-1 truncate">{child.name}</span>
                        <span className="text-xs text-[#30363d]">({child.count})</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {filteredTree.length === 0 && search && (
          <p className="text-xs text-[#30363d] px-2 py-4 text-center">검색 결과가 없습니다</p>
        )}
      </nav>

      <div className="border-t border-[#21262d] mx-4 my-2 shrink-0" />

      {/* 최신글 */}
      <div className="px-4 pb-8 shrink-0">
        <p className="font-mono text-[11px] text-[#484f58] uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <span className="text-[#10b981]">§</span> 최신글
        </p>
        {recentPosts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="block mb-2.5 group">
            <p className="text-xs text-[#8b949e] group-hover:text-[#e6edf3] transition-colors line-clamp-1 leading-relaxed">
              {post.title}
            </p>
            <p className="font-mono text-[10px] text-[#484f58] mt-0.5">
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric', month: '2-digit', day: '2-digit',
              })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Sidebar({ desktopOpen, onDesktopToggle, categoryTree, recentPosts, totalPosts, navbarHeight = 56 }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveringEdge, setHoveringEdge] = useState(false)
  const bannerH = useBannerHeight()
  const topPx = bannerH + navbarHeight // 배너 + GNB
  const sidebarStyle = { top: topPx, height: `calc(100vh - ${topPx}px)` }

  const handleClose = () => {
    onDesktopToggle(false)
    setMobileOpen(false)
  }

  return (
    <>
      {/* 데스크탑 사이드바 */}
      <aside
        className={`hidden 2xl:block fixed left-0 z-30 transition-all duration-300 ${
          desktopOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={sidebarStyle}
      >
        <SidebarContent categoryTree={categoryTree} recentPosts={recentPosts} totalPosts={totalPosts} onClose={handleClose} />
      </aside>

      {/* 데스크탑: 닫혔을 때 왼쪽 끝 호버존 */}
      {!desktopOpen && (
        <div
          className="hidden 2xl:block fixed left-0 w-6 z-20"
          style={sidebarStyle}
          onMouseEnter={() => setHoveringEdge(true)}
          onMouseLeave={() => setHoveringEdge(false)}
        >
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-200 ${
              hoveringEdge ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={() => onDesktopToggle(true)}
              className="bg-[#161b22] border border-[#30363d] text-gray-400 hover:text-white p-2 rounded-r-lg shadow-lg transition-colors"
              aria-label="사이드바 열기"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 2l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 모바일: 햄버거 버튼 (닫혔을 때만) */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="2xl:hidden fixed left-4 z-40 bg-[#161b22] border border-[#30363d] text-gray-400 hover:text-white p-2 rounded-lg shadow transition-colors"
          style={{ top: topPx + 12 }}
          aria-label="메뉴 열기"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      {/* 모바일: 백드롭 */}
      {mobileOpen && (
        <div
          className="2xl:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 모바일: 사이드바 드로어 */}
      <aside
        className={`2xl:hidden fixed left-0 z-30 transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={sidebarStyle}
      >
        <SidebarContent categoryTree={categoryTree} recentPosts={recentPosts} totalPosts={totalPosts} onClose={handleClose} />
      </aside>
    </>
  )
}
