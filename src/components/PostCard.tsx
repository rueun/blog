import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

export default function PostCard({ post }: { post: PostMeta }) {
  const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="border border-gray-200 rounded-xl p-6 hover:border-[#cba6f7] hover:shadow-sm transition-all group">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-bold mb-2 group-hover:text-[#7c3aed] transition-colors">
          {post.title}
        </h2>
      </Link>
      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
        <span>{formattedDate}</span>
        {post.series && (
          <>
            <span>·</span>
            <span className="text-[#7c3aed]">{post.series}</span>
          </>
        )}
      </div>
      {post.description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.description}
        </p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
