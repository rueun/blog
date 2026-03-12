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
    <div className="bg-white dark:bg-[#1e1e2e] rounded-xl mb-8 overflow-hidden border border-gray-200 dark:border-[#2d2d44]">
      {/* 헤더 */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug flex-1 pr-4">
          {seriesName}
        </h3>
        <div className="text-blue-500 dark:text-[#93c5fd] shrink-0 mt-0.5">
          <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor">
            <path d="M3 0h16a2 2 0 0 1 2 2v22l-9-5-9 5V2a2 2 0 0 1 2-2z"/>
          </svg>
        </div>
      </div>

      {/* 목록 */}
      {open && (
        <ol className="px-5 pb-3 space-y-2.5">
          {posts.map((post, idx) => (
            <li key={post.slug} className="flex gap-3 text-sm">
              <span className="text-gray-400 dark:text-gray-600 shrink-0 w-5 pt-px text-xs leading-relaxed">
                {idx + 1}.
              </span>
              {post.slug === currentSlug ? (
                <span className="text-blue-600 dark:text-[#93c5fd] font-semibold leading-relaxed">
                  {post.title}
                </span>
              ) : (
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-gray-200 transition-colors leading-relaxed"
                >
                  {post.title}
                </Link>
              )}
            </li>
          ))}
        </ol>
      )}

      {/* 하단 바 */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-[#2d2d44]">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            className={`transition-transform duration-200 ${open ? '' : 'rotate-180'}`}
          >
            <path d="M1 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {open ? '숨기기' : '펼치기'}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-600">{position}/{total}</span>
          <button
            onClick={() => prevPost && router.push(`/posts/${prevPost.slug}`)}
            disabled={!prevPost}
            className="w-7 h-7 rounded-full border border-gray-200 dark:border-[#3d3d5a] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="이전 글"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => nextPost && router.push(`/posts/${nextPost.slug}`)}
            disabled={!nextPost}
            className="w-7 h-7 rounded-full border border-gray-200 dark:border-[#3d3d5a] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="다음 글"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
