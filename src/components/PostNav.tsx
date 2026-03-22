import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

interface Props {
  prev: PostMeta | null
  next: PostMeta | null
}

export default function PostNav({ prev, next }: Props) {
  return (
    <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-surface border border-border rounded-xl p-5 hover:border-text-muted transition-colors">
        <span className="font-mono text-xs text-text-muted mb-2 block">← 이전 글</span>
        {prev ? (
          <Link href={`/posts/${prev.slug}`} className="block group">
            <span className="text-sm font-semibold text-text-primary group-hover:text-[#a78bfa] transition-colors line-clamp-2 leading-snug">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="text-sm text-border">이전 글이 존재하지 않습니다.</span>
        )}
      </div>
      <div className="bg-surface border border-border rounded-xl p-5 text-right hover:border-text-muted transition-colors">
        <span className="font-mono text-xs text-text-muted mb-2 block">다음 글 →</span>
        {next ? (
          <Link href={`/posts/${next.slug}`} className="block group">
            <span className="text-sm font-semibold text-text-primary group-hover:text-[#a78bfa] transition-colors line-clamp-2 leading-snug">
              {next.title}
            </span>
          </Link>
        ) : (
          <span className="text-sm text-border">다음 글이 존재하지 않습니다.</span>
        )}
      </div>
    </nav>
  )
}
