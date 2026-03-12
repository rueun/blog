'use client'

import { useEffect, useRef } from 'react'

export default function MdxContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    container.querySelectorAll<HTMLElement>('.code-block').forEach((block) => {
      // Prevent duplicate actions bar on re-render
      if (block.querySelector('.code-actions')) return

      const pre = block.querySelector('pre')
      const lang = pre?.getAttribute('data-language') ?? ''

      const actions = document.createElement('div')
      actions.className = 'code-actions'

      if (lang) {
        const label = document.createElement('span')
        label.className = 'code-lang-label'
        label.textContent = lang.toUpperCase()
        actions.appendChild(label)
      }

      const copyBtn = document.createElement('button')
      copyBtn.className = 'code-copy-btn'
      copyBtn.textContent = 'COPY'
      copyBtn.addEventListener('click', async () => {
        const code = pre?.querySelector('code')?.textContent ?? ''
        await navigator.clipboard.writeText(code)
        copyBtn.textContent = 'COPIED'
        copyBtn.classList.add('copied')
        setTimeout(() => {
          copyBtn.textContent = 'COPY'
          copyBtn.classList.remove('copied')
        }, 2000)
      })
      actions.appendChild(copyBtn)

      block.appendChild(actions)
    })
  }, [html])

  return (
    <div
      ref={ref}
      className="prose prose-gray max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-a:text-[#7c3aed] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900
        prose-blockquote:border-l-[#cba6f7] prose-blockquote:text-gray-600
        prose-table:text-sm
        prose-img:rounded-xl
        prose-pre:p-0 prose-pre:bg-transparent prose-pre:rounded-none prose-pre:m-0
        [&_figure]:m-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
