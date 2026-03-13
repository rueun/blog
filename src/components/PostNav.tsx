import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

interface Props {
  prev: PostMeta | null
  next: PostMeta | null
}

export default function PostNav({ prev, next }: Props) {
  return (
    <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-[#484f58] transition-colors">
        <span className="font-mono text-xs text-[#484f58] mb-2 block">← 이전 글</span>
        {prev ? (
          <Link href={`/posts/${prev.slug}`} className="block group">
            <span className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#a78bfa] transition-colors line-clamp-2 leading-snug">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="text-sm text-[#30363d]">이전 글이 존재하지 않습니다.</span>
        )}
      </div>
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 text-right hover:border-[#484f58] transition-colors">
        <span className="font-mono text-xs text-[#484f58] mb-2 block">다음 글 →</span>
        {next ? (
          <Link href={`/posts/${next.slug}`} className="block group">
            <span className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#a78bfa] transition-colors line-clamp-2 leading-snug">
              {next.title}
            </span>
          </Link>
        ) : (
          <span className="text-sm text-[#30363d]">다음 글이 존재하지 않습니다.</span>
        )}
      </div>
    </nav>
  )
}
