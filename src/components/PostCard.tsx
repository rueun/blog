import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

function getCategoryColor(categories: string[]): string {
  const cat = (categories?.[0] ?? '').toLowerCase()
  if (cat.includes('spring') || cat.includes('java') || cat.includes('jpa')) return '#a78bfa'
  if (cat.includes('devops') || cat.includes('docker')) return '#10b981'
  if (cat.includes('cs') || cat.includes('network')) return '#22d3ee'
  if (cat.includes('db') || cat.includes('database')) return '#f59e0b'
  return '#8b949e'
}

export default function PostCard({ post }: { post: PostMeta }) {
  const color = getCategoryColor(post.categories ?? [])
  const cat = post.categories?.[0] ?? 'etc'
  const date = post.date
    ? '@' + new Date(post.date).toISOString().split('T')[0]
    : ''

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block bg-[#161b22] border border-[#30363d] rounded-xl p-4 mb-2 hover:bg-[#1c2230] hover:border-[#484f58] transition-all group"
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
        <p className="text-xs text-[#8b949e] mb-3 line-clamp-2 leading-relaxed">
          {post.description || post.summary}
        </p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-[#484f58] bg-white/4 border border-[#21262d] px-1.5 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
