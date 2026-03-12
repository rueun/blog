'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
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
    <div className="w-64 h-full bg-[#1e1e2e] flex flex-col overflow-y-auto border-r border-[#313244]">
      {/* 닫기 버튼 */}
      <div className="flex justify-end p-4 shrink-0">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white p-1 transition-colors"
          aria-label="사이드바 닫기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* 프로필 */}
      <div className="flex flex-col items-center px-6 pb-5 shrink-0">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#313244] mb-3">
          <Image
            src="https://avatars.githubusercontent.com/u/64256409"
            alt="Rueun"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <p className="text-white font-bold text-base">Rueun&apos;s Blog</p>
        <p className="text-gray-500 text-xs mt-1">Backend Developer</p>
      </div>

      {/* 아이콘 링크 */}
      <div className="flex justify-center gap-5 px-6 pb-5 shrink-0">
        <Link
          href="https://github.com/rueun"
          target="_blank" rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white transition-colors" aria-label="전체 글">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </Link>
        <Link href="/series" className="text-gray-400 hover:text-[#93c5fd] transition-colors" aria-label="시리즈">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
          </svg>
        </Link>
      </div>

      {/* 검색창 */}
      <div className="px-4 pb-4 shrink-0">
        <div className="flex items-center gap-2 bg-[#313244] rounded-lg px-3 py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="/ 를 눌러 검색하세요"
            className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none w-full"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-600 hover:text-gray-400 shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-[#313244] mx-4 mb-2 shrink-0" />

      {/* 카테고리 트리 */}
      <nav className="px-3 py-2 flex-1">
        {/* 전체 */}
        <Link
          href="/"
          className={`flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors text-sm mb-0.5 ${
            !currentCategory && !search
              ? 'text-white bg-[#313244]'
              : 'text-gray-400 hover:bg-[#313244] hover:text-white'
          }`}
        >
          <FolderIcon className="text-yellow-400 shrink-0" />
          <span className="flex-1">전체</span>
          <span className="text-xs text-gray-500">({totalPosts})</span>
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
                  href={`/?category=${encodeURIComponent(cat.name)}`}
                  className={`flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors text-sm flex-1 min-w-0 ${
                    isActive
                      ? 'text-white bg-[#313244]'
                      : 'text-gray-400 hover:bg-[#313244] hover:text-white'
                  }`}
                >
                  <FolderIcon className="text-yellow-400 shrink-0" />
                  <span className="flex-1 truncate">{cat.name}</span>
                  <span className="text-xs text-gray-500 shrink-0">({cat.count})</span>
                </Link>
                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(cat.name)}
                    className="text-gray-600 hover:text-gray-300 p-1 shrink-0 transition-colors"
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
                        href={`/?category=${encodeURIComponent(child.name)}`}
                        className={`flex items-center gap-2 py-1 px-2 rounded-lg transition-colors text-xs mb-0.5 ${
                          isChildActive
                            ? 'text-white bg-[#313244]'
                            : 'text-gray-500 hover:bg-[#313244] hover:text-gray-300'
                        }`}
                      >
                        <FileIcon className="text-gray-500 shrink-0" />
                        <span className="flex-1 truncate">{child.name}</span>
                        <span className="text-xs text-gray-600">({child.count})</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {filteredTree.length === 0 && search && (
          <p className="text-xs text-gray-600 px-2 py-4 text-center">검색 결과가 없습니다</p>
        )}
      </nav>

      <div className="border-t border-[#313244] mx-4 my-2 shrink-0" />

      {/* 최신글 */}
      <div className="px-4 pb-8 shrink-0">
        <p className="text-xs text-gray-400 mb-3 font-semibold">🕐 최신글</p>
        {recentPosts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="block mb-3 group">
            <p className="text-xs text-gray-300 group-hover:text-white transition-colors line-clamp-1 leading-relaxed">
              {post.title}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
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

export default function Sidebar({ desktopOpen, onDesktopToggle, categoryTree, recentPosts, totalPosts }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveringEdge, setHoveringEdge] = useState(false)

  const handleClose = () => {
    onDesktopToggle(false)
    setMobileOpen(false)
  }

  return (
    <>
      {/* 데스크탑 사이드바 */}
      <aside
        className={`hidden lg:block fixed left-0 top-0 h-full z-30 transition-transform duration-300 ${
          desktopOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent categoryTree={categoryTree} recentPosts={recentPosts} totalPosts={totalPosts} onClose={handleClose} />
      </aside>

      {/* 데스크탑: 닫혔을 때 왼쪽 끝 호버존 */}
      {!desktopOpen && (
        <div
          className="hidden lg:block fixed left-0 top-0 h-full w-6 z-20"
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
              className="bg-[#1e1e2e] border border-[#313244] text-gray-400 hover:text-white p-2 rounded-r-lg shadow-lg transition-colors"
              aria-label="사이드바 열기"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 2l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 모바일: 햄버거 버튼 */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-[#1e1e2e] border border-[#313244] text-gray-400 hover:text-white p-2 rounded-lg shadow transition-colors"
        aria-label="메뉴 열기"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* 모바일: 백드롭 */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 모바일: 사이드바 드로어 */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-full z-30 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent categoryTree={categoryTree} recentPosts={recentPosts} totalPosts={totalPosts} onClose={handleClose} />
      </aside>
    </>
  )
}
