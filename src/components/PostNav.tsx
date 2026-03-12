import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

interface Props {
  prev: PostMeta | null
  next: PostMeta | null
}

export default function PostNav({ prev, next }: Props) {
  return (
    <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-[#cba6f7] transition-colors">
        <span className="text-xs text-gray-400 mb-1 block">← 이전 글</span>
        {prev ? (
          <Link href={`/posts/${prev.slug}`} className="block group">
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#7c3aed] transition-colors line-clamp-2">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="text-sm text-gray-300">이전 글이 존재하지 않습니다.</span>
        )}
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-right hover:border-[#cba6f7] transition-colors">
        <span className="text-xs text-gray-400 mb-1 block">다음 글 →</span>
        {next ? (
          <Link href={`/posts/${next.slug}`} className="block group">
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#7c3aed] transition-colors line-clamp-2">
              {next.title}
            </span>
          </Link>
        ) : (
          <span className="text-sm text-gray-300">다음 글이 존재하지 않습니다.</span>
        )}
      </div>
    </nav>
  )
}
