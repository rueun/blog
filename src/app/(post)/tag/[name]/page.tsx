import { getAllPostMetas } from '@/lib/posts'
import Link from 'next/link'
import type { PostMeta } from '@/lib/types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ name: string }> }

export async function generateStaticParams() {
  const allPosts = getAllPostMetas()
  const tagSet = new Set<string>()
  allPosts.forEach((p) => (p.tags ?? []).forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).map((name) => ({ name }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params
  const tag = decodeURIComponent(name)
  return { title: `#${tag}` }
}

export default async function TagPage({ params }: Props) {
  const { name } = await params
  const tag = decodeURIComponent(name)
  const allPosts = getAllPostMetas()
  const filteredPosts = allPosts.filter((p) => (p.tags ?? []).includes(tag))

  // 관련 태그 수집
  const relatedTags: Record<string, number> = {}
  filteredPosts.forEach((p) => {
    (p.tags ?? []).forEach((t) => {
      if (t !== tag) relatedTags[t] = (relatedTags[t] ?? 0) + 1
    })
  })
  const sortedRelatedTags = Object.entries(relatedTags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return (
    <div className="relative z-[1] max-w-4xl mx-auto px-6 sm:px-8 pt-24 2xl:pt-20 pb-20">
      {/* 페이지 헤더 */}
      <div className="mb-10">
        <div className="font-mono text-sm text-[#484f58] mb-4 flex items-center gap-1.5">
          <span className="text-[#10b981]">$</span>
          <span>ls -la ./tags/{tag}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#22d3ee]">
            #{tag}
          </span>
        </h1>
        <div className="flex items-center gap-2.5 font-mono text-xs text-[#484f58]">
          <span className="bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full px-3 py-0.5 font-semibold">
            {filteredPosts.length} posts
          </span>
        </div>
      </div>

      {/* 관련 태그 */}
      {sortedRelatedTags.length > 0 && (
        <div className="mb-8 border-t border-[#21262d] pt-5">
          <p className="font-mono text-[11px] text-[#484f58] uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <span className="text-[#10b981]">§</span> 관련 태그
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {sortedRelatedTags.map(([t, count]) => (
              <Link
                key={t}
                href={`/tag/${encodeURIComponent(t)}`}
                className="inline-flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-xs text-[#8b949e] hover:text-[#10b981] hover:border-[#10b981] transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                {t}
                <span className="text-[#484f58]">({count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 게시글 목록 */}
      <div className="border-t border-[#21262d] pt-5">
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} currentTag={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PostCard({ post, currentTag }: { post: PostMeta; currentTag: string }) {
  const categories = post.categories ?? []
  const tags = post.tags ?? []
  const date = post.date
    ? new Date(post.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#484f58] transition-all group">
      <div className="flex gap-5">
        <div className="flex-1 min-w-0">
          {/* 날짜 + 카테고리 */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-[#484f58]">{date}</span>
            <div className="flex items-center gap-1.5">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/posts?category=${encodeURIComponent(cat)}`}
                  className="inline-flex items-center gap-1 text-xs text-[#8b949e] bg-[#21262d] border border-[#30363d] rounded-full px-2.5 py-0.5 hover:text-[#e6edf3] hover:border-[#484f58] transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                  </svg>
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <Link href={`/posts/${post.slug}`}>
            <h3 className="font-bold text-[#e6edf3] group-hover:text-[#a78bfa] transition-colors text-base sm:text-lg mb-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          {/* 설명 */}
          {(post.description || post.summary) && (
            <p className="text-sm text-[#8b949e] mb-4 line-clamp-2 leading-relaxed">
              {post.description || post.summary}
            </p>
          )}

          {/* 태그 */}
          {tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {tags.slice(0, 5).map((t) => (
                <Link
                  key={t}
                  href={`/tag/${encodeURIComponent(t)}`}
                  className={`inline-flex items-center gap-1 font-mono text-[11px] border rounded-full px-2 py-0.5 transition-colors ${
                    t === currentTag
                      ? 'text-[#10b981] border-[#10b981]'
                      : 'text-[#484f58] border-[#30363d] hover:text-[#10b981] hover:border-[#10b981]'
                  }`}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  {t}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 커버 이미지 / 기본 이미지 */}
        <Link href={`/posts/${post.slug}`} className="hidden sm:block shrink-0">
          <div className="w-36 h-28 rounded-lg overflow-hidden bg-[#21262d]">
            {post.cover ? (
              <img src={post.cover} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#30363d]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}
