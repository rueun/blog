'use client'

import { useEffect, useRef, useId } from 'react'

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    if (!ref.current) return
    import('mermaid').then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          background: '#161b22',
          primaryColor: '#7c3aed',
          primaryTextColor: '#e6edf3',
          primaryBorderColor: '#30363d',
          lineColor: '#484f58',
          secondaryColor: '#161b22',
          tertiaryColor: '#0d1117',
        },
      })
      m.default
        .render(`mermaid-${id}`, chart)
        .then(({ svg }) => {
          if (ref.current) ref.current.innerHTML = svg
        })
        .catch(console.error)
    })
  }, [chart, id])

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center overflow-x-auto bg-[#161b22] border border-[#30363d] rounded-xl p-6"
    />
  )
}
