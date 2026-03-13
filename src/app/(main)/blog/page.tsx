import { getAllPostMetas } from '@/lib/posts'
import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

type Props = {
  searchParams: Promise<{ category?: string }>
}

function getCategoryColor(categories: string[]): string {
  const cat = (categories?.[0] ?? '').toLowerCase()
  if (cat.includes('spring') || cat.includes('java') || cat.includes('jpa')) return '#a78bfa'
  if (cat.includes('devops') || cat.includes('docker')) return '#10b981'
  if (cat.includes('cs') || cat.includes('network')) return '#22d3ee'
  if (cat.includes('db') || cat.includes('database')) return '#f59e0b'
  return '#8b949e'
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const allPosts = getAllPostMetas()

  // Build category counts for filter tabs
  const categoryCounts: Record<string, number> = {}
  allPosts.forEach((p) => {
    const cat = p.categories?.[0] ?? 'etc'
    categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1
  })

  const filteredPosts = category
    ? allPosts.filter((p) => p.categories?.includes(category))
    : allPosts

  // Top-level category list (unique first categories)
  const topCategories = Array.from(
    new Set(allPosts.map((p) => p.categories?.[0]).filter(Boolean) as string[])
  ).sort()

  return (
    <div className="relative z-[1]">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-10">
        <div className="font-mono text-sm text-[#484f58] mb-5">
          <span className="text-[#10b981]">$</span> cd{' '}
          <span className="text-[#22d3ee]">~/blog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] mb-3">
          All Posts
        </h1>
        <p className="font-mono text-sm text-[#484f58]">
          {'// '}
          <span className="text-[#10b981]">{filteredPosts.length}개의 게시글</span>
          <span className="text-[#30363d]"> · </span>
          <span className="text-[#10b981]">{topCategories.length}개의 카테고리</span>
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-3xl mx-auto px-6 pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <FilterTab href="/blog" label="전체" count={allPosts.length} active={!category} />
          {topCategories.map((cat) => (
            <FilterTab
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              label={cat}
              count={categoryCounts[cat] ?? 0}
              active={category === cat}
            />
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 font-mono text-sm text-[#484f58]">
            <span className="text-[#484f58]">// </span>no posts found
          </div>
        ) : (
          filteredPosts.map((post) => <PostRow key={post.slug} post={post} />)
        )}
      </div>
    </div>
  )
}

function FilterTab({
  href,
  label,
  count,
  active,
}: {
  href: string
  label: string
  count: number
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={`font-mono text-xs font-semibold px-4 py-1.5 rounded-full border transition-all ${
        active
          ? 'bg-[#10b981] border-[#10b981] text-[#0d1117] shadow-[0_0_14px_rgba(16,185,129,0.3)]'
          : 'border-[#30363d] text-[#484f58] hover:text-[#8b949e] hover:border-[#484f58]'
      }`}
    >
      {label}
      <span className={`ml-1 text-[11px] ${active ? 'opacity-70' : 'opacity-75'}`}>
        ({count})
      </span>
    </Link>
  )
}

function PostRow({ post }: { post: PostMeta }) {
  const color = getCategoryColor(post.categories ?? [])
  const cat = post.categories?.[0] ?? 'etc'
  const date = post.date
    ? '@' + new Date(post.date).toISOString().split('T')[0]
    : ''

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block bg-[#161b22] border border-[#30363d] rounded-xl p-4 mb-3 hover:bg-[#1c2230] hover:border-[#484f58] transition-all group"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-xs font-bold" style={{ color }}>
          #{cat}
        </span>
        <span className="font-mono text-[11px] text-[#484f58]">{date}</span>
      </div>
      <div className="font-bold text-[#e6edf3] group-hover:text-[#a78bfa] transition-colors text-sm mb-1.5 leading-snug">
        {post.title}
      </div>
      {(post.description || post.summary) && (
        <div className="text-xs text-[#8b949e] mb-2.5 truncate leading-relaxed">
          {post.description || post.summary}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          {(post.tags ?? []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-[#484f58] bg-white/4 border border-[#21262d] px-1.5 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
          {post.series && (
            <span className="font-mono text-[10px] text-[#a78bfa] bg-[#7c3aed]/10 border border-[#7c3aed]/20 px-1.5 py-0.5 rounded">
              {post.series}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
