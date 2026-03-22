'use client'

import { useState, useRef, useEffect, createContext, useContext } from 'react'

// 배너 높이(px)를 공유하는 context. 0이면 배너 닫힘
const BannerHeightContext = createContext(0)

export function useBannerHeight() {
  return useContext(BannerHeightContext)
}

export default function AnnounceBanner({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true)
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible || !ref.current) {
      setHeight(0)
      return
    }
    const measure = () => setHeight(ref.current?.offsetHeight ?? 0)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [visible])

  return (
    <BannerHeightContext.Provider value={height}>
      {visible && (
        <div
          ref={ref}
          className="fixed top-0 left-0 right-0 z-[55] bg-[#161b22] px-4 py-1.5 flex items-center justify-center"
        >
          <p className="text-xs text-[#8b949e] text-center">
            배우고, 기록하고, 성장합니다{' '}
            <span className="text-[#30363d]">|</span>{' '}
            <a href="https://github.com/rueun" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:underline">
              GitHub
            </a>
          </p>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-4 text-[#484f58] hover:text-[#8b949e] transition-colors"
            aria-label="배너 닫기"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
      {children}
    </BannerHeightContext.Provider>
  )
}
