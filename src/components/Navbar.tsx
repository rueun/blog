'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const searchRef = useRef<HTMLInputElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') {
        searchRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isActive = (href: string) => {
    if (href === '/blog') return pathname === '/blog' || pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0d1117]/90 backdrop-blur border-b border-[#30363d] h-14 flex items-center px-4 sm:px-8 gap-2">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-6">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center text-[#0d1117] text-xs font-bold shadow-[0_0_0_2px_#0d1117,0_0_0_3px_rgba(16,185,129,0.4)]">
          RE
        </div>
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] text-base tracking-tight">
          Rueun.log
        </span>
      </Link>

      {/* Nav links - hidden on mobile */}
      <div className="hidden sm:flex items-center gap-0.5 shrink-0">
        <Link
          href="/blog"
          className={`text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors ${
            isActive('/blog')
              ? 'text-[#10b981] font-semibold'
              : 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
          }`}
        >
          Blog
        </Link>
        <Link
          href="/series"
          className={`text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors ${
            isActive('/series')
              ? 'text-[#10b981] font-semibold'
              : 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
          }`}
        >
          Series
        </Link>
        <a
          href="#"
          className="text-sm font-medium px-3.5 py-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#161b22] transition-colors"
        >
          About
        </a>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search - hidden on mobile */}
      <div className="hidden md:flex items-center gap-2 bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-1.5 w-56 focus-within:border-[#10b981] focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] transition-all cursor-text">
        <span className="text-[#484f58] text-sm shrink-0">⌕</span>
        <input
          ref={searchRef}
          type="text"
          placeholder="> 검색하세요... [/]"
          aria-label="검색"
          className="bg-transparent border-none outline-none text-[#e6edf3] text-xs font-mono flex-1 min-w-0 placeholder-[#484f58]"
        />
        <span className="text-[#484f58] text-[10px] font-mono font-semibold bg-[#0d1117] border border-[#30363d] rounded px-1.5 py-0.5 shrink-0">
          /
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 ml-2 shrink-0">
        <a
          href="https://github.com/rueun"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#10b981] hover:bg-[#1c2230] hover:-translate-y-px transition-all"
          title="GitHub"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
        <button
          className="w-9 h-9 rounded-lg border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#10b981] hover:bg-[#1c2230] hover:-translate-y-px transition-all"
          title="테마"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </button>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden w-9 h-9 rounded-lg border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#8b949e] hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <svg width="16" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M0 1h20M0 8h20M0 15h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-14 left-0 right-0 bg-[#0d1117] border-b border-[#30363d] px-4 py-4 flex flex-col gap-1 z-50">
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
              isActive('/blog') ? 'text-[#10b981]' : 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/series"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
              isActive('/series') ? 'text-[#10b981]' : 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
            }`}
          >
            Series
          </Link>
          <a
            href="#"
            className="text-sm font-medium px-3 py-2 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#161b22] transition-colors"
          >
            About
          </a>
          <div className="flex items-center gap-2 bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 mt-1">
            <span className="text-[#484f58] text-sm shrink-0">⌕</span>
            <input
              type="text"
              placeholder="> 검색하세요..."
              className="bg-transparent border-none outline-none text-[#e6edf3] text-xs font-mono flex-1 placeholder-[#484f58]"
            />
          </div>
        </div>
      )}
    </nav>
  )
}
