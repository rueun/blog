import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

interface Props {
  prev: PostMeta | null
  next: PostMeta | null
}

export default function PostNav({ prev, next }: Props) {
  return (
    <nav className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-2 gap-4">
      <div>
        {prev && (
          <Link href={`/posts/${prev.slug}`} className="block group">
            <span className="text-xs text-gray-400 mb-1 block">← 이전 글</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#7c3aed] transition-colors line-clamp-2">
              {prev.title}
            </span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link href={`/posts/${next.slug}`} className="block group">
            <span className="text-xs text-gray-400 mb-1 block">다음 글 →</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#7c3aed] transition-colors line-clamp-2">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
