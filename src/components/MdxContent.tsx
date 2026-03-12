'use client'

import { useEffect, useRef } from 'react'

export default function MdxContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    // rehype-pretty-code가 생성한 figure 또는 pre 요소를 찾아서 Mac 스타일 wrapper 적용
    const targets: Element[] = [
      // figure로 감싸진 경우 (rehype-pretty-code 기본 동작)
      ...Array.from(container.querySelectorAll('figure[data-rehype-pretty-code-figure]')),
      // figure 없이 pre만 있는 경우 (언어 있는 경우 fallback)
      ...Array.from(container.querySelectorAll('pre[data-language]')).filter(
        (pre) => !pre.closest('figure[data-rehype-pretty-code-figure]')
      ),
      // 언어 없는 plain code block (rehype-pretty-code가 처리 안 한 pre)
      ...Array.from(container.querySelectorAll('pre')).filter(
        (pre) =>
          !pre.hasAttribute('data-language') &&
          !pre.closest('figure[data-rehype-pretty-code-figure]')
      ),
    ]

    targets.forEach((target) => {
      if (target.parentElement?.classList.contains('code-block')) return

      const pre = target.tagName === 'PRE' ? target : target.querySelector('pre')
      const lang = pre?.getAttribute('data-language') ?? ''

      // wrapper div 생성
      const wrapper = document.createElement('div')
      wrapper.className = 'code-block'
      wrapper.setAttribute('data-lang', lang)

      target.parentNode?.insertBefore(wrapper, target)
      wrapper.appendChild(target)

      // 우측 상단 actions (lang label + copy button)
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
      wrapper.appendChild(actions)
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
