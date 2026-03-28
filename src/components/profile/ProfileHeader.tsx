'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/ThemeProvider'
import { motion } from 'framer-motion'

export default function ProfileHeader() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const tabs = [
    { href: '/resume', label: 'Resume' },
    { href: '/portfolio', label: 'Portfolio' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-base/80 backdrop-blur-xl">
      <div className="max-w-[860px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/resume" className="group flex items-center gap-2">
          <span className="text-[13px] font-semibold tracking-tight text-text-primary">
            신은정
          </span>
          <span className="text-[11px] text-text-muted font-normal hidden sm:inline">
            Backend Developer
          </span>
        </Link>

        <nav className="flex items-center gap-0.5">
          {tabs.map((tab) => {
            const active = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative px-3 py-1.5 text-[13px] font-medium transition-colors"
              >
                <span className={active ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'}>
                  {tab.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="profile-tab"
                    className="absolute inset-x-1 -bottom-[1px] h-[2px] bg-text-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}

          <div className="w-px h-4 bg-border mx-2" />

          <button
            onClick={toggleTheme}
            className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-alt transition-all"
            aria-label="테마 전환"
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </nav>
      </div>
      <div className="h-px bg-border" />
    </header>
  )
}
