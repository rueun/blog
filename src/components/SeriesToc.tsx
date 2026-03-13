'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { PostMeta } from '@/lib/types'

interface Props {
  seriesName: string
  posts: PostMeta[]
  currentSlug: string
}

export default function SeriesToc({ seriesName, posts, currentSlug }: Props) {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const currentIndex = posts.findIndex((p) => p.slug === currentSlug)
  const total = posts.length
  const position = currentIndex + 1
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex < total - 1 ? posts[currentIndex + 1] : null

  return (
    <div className="bg-[#161b22] border border-[#30363d] border-l-[3px] border-l-[#10b981] rounded-2xl mb-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5 flex-1 pr-4">
          <span className="text-lg">📚</span>
          <h3 className="font-bold text-[#e6edf3] text-sm leading-snug">{seriesName}</h3>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="font-mono text-[11px] text-[#484f58] bg-transparent border border-[#30363d] rounded-md px-2.5 py-1 hover:text-[#8b949e] hover:border-[#484f58] transition-colors shrink-0"
        >
          {open ? '숨기기' : '펼치기'}
        </button>
      </div>

      {/* Post list */}
      {open && (
        <ol className="px-5 pb-4 flex flex-col gap-0.5">
          {posts.map((post, idx) => (
            <li key={post.slug}>
              {post.slug === currentSlug ? (
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#7c3aed]/12">
                  <span className="font-mono text-[11px] text-[#a78bfa] w-5 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shrink-0" />
                  <span className="text-[13px] text-[#a78bfa] font-semibold leading-snug flex-1">
                    {post.title}
                    <span className="font-mono text-[10px] text-[#10b981] ml-2">← 현재</span>
                  </span>
                </div>
              ) : (
                <Link
                  href={`/posts/${post.slug}`}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/4 transition-colors group"
                >
                  <span className="font-mono text-[11px] text-[#484f58] w-5 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30363d] shrink-0 group-hover:bg-[#a78bfa] transition-colors" />
                  <span className="text-[13px] text-[#8b949e] group-hover:text-[#e6edf3] transition-colors leading-snug flex-1">
                    {post.title}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#21262d]">
        <span className="font-mono text-[11px] text-[#484f58]">
          {position} / {total}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => prevPost && router.push(`/posts/${prevPost.slug}`)}
            disabled={!prevPost}
            className="w-7 h-7 rounded-md border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#484f58] hover:text-[#a78bfa] hover:border-[#a78bfa] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="이전 글"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => nextPost && router.push(`/posts/${nextPost.slug}`)}
            disabled={!nextPost}
            className="w-7 h-7 rounded-md border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#484f58] hover:text-[#a78bfa] hover:border-[#a78bfa] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="다음 글"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
