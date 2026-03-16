'use client'

import { useRef, useState } from 'react'

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  'data-language'?: string
}

export function Pre({ children, 'data-language': lang, ...props }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const code = preRef.current?.querySelector('code')?.textContent ?? ''
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block" data-lang={lang ?? ''}>
      <div className="code-actions">
        {lang && <span className="code-lang-label">{lang.toUpperCase()}</span>}
        <button className={`code-copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <pre ref={preRef} data-language={lang} {...props}>
        {children}
      </pre>
    </div>
  )
}
