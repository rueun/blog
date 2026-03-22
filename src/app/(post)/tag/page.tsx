import { getAllPostMetas } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tags',
}

export default function TagsPage() {
  const allPosts = getAllPostMetas()

  // 태그별 개수 집계
  const tagCounts: Record<string, number> = {}
  allPosts.forEach((p) => {
    (p.tags ?? []).forEach((t) => {
      tagCounts[t] = (tagCounts[t] ?? 0) + 1
    })
  })

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="relative z-[1] max-w-4xl mx-auto px-6 sm:px-8 pt-24 2xl:pt-20 pb-20">
      {/* 페이지 헤더 */}
      <div className="mb-10">
        <div className="font-mono text-sm text-[#484f58] mb-4 flex items-center gap-1.5">
          <span className="text-[#10b981]">$</span>
          <span>ls -la ./tags</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#22d3ee]">
            Tags
          </span>
        </h1>
        <div className="flex items-center gap-2.5 font-mono text-xs text-[#484f58]">
          <span className="bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full px-3 py-0.5 font-semibold">
            {sortedTags.length} tags
          </span>
        </div>
      </div>

      {/* 태그 목록 */}
      <div className="flex items-center gap-2 flex-wrap">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className="inline-flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-1.5 text-xs text-[#8b949e] hover:text-[#10b981] hover:border-[#10b981] transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            {tag}
            <span className="text-[#484f58]">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
