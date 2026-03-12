import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

interface Props {
  seriesName: string
  posts: PostMeta[]
  currentSlug: string
}

export default function SeriesToc({ seriesName, posts, currentSlug }: Props) {
  return (
    <div className="bg-[#f8f7ff] border border-[#e9d8fd] rounded-xl p-5 mb-8">
      <h3 className="font-bold text-base mb-3 text-[#1e1e2e]">📚 {seriesName}</h3>
      <ol className="space-y-2">
        {posts.map((post, idx) => (
          <li key={post.slug} className="flex gap-2 text-sm">
            <span className="text-gray-400 shrink-0 w-5">{idx + 1}.</span>
            {post.slug === currentSlug ? (
              <span className="font-semibold text-[#7c3aed]">{post.title}</span>
            ) : (
              <Link
                href={`/posts/${post.slug}`}
                className="text-gray-600 hover:text-[#7c3aed] transition-colors"
              >
                {post.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
