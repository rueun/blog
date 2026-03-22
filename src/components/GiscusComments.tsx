'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/ThemeProvider'

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const giscusTheme = theme === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    if (!ref.current) return

    // 기존 스크립트 제거 후 재생성 (테마 변경 대응)
    const container = ref.current
    while (container.firstChild) container.removeChild(container.firstChild)

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'rueun/blog')
    script.setAttribute('data-repo-id', 'R_kgDORk5GaQ')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDORk5Gac4C4RbW')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', giscusTheme)
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    container.appendChild(script)
  }, [giscusTheme])

  return <div ref={ref} className="mt-16" />
}
