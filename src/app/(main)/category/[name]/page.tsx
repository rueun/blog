import { getAllPostMetas, getAllPostSlugs } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ name: string }> }

export async function generateStaticParams() {
  const posts = getAllPostMetas()
  const names = new Set<string>()
  posts.forEach((p) => (p.categories ?? []).forEach((c) => names.add(c)))
  return Array.from(names).map((name) => ({ name: encodeURIComponent(name) }))
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params
  const category = decodeURIComponent(name)
  const allPosts = getAllPostMetas()
  const posts = allPosts.filter((p) => p.categories?.includes(category))

  if (posts.length === 0) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 pt-16 lg:pt-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{category}</h1>
        <p className="text-gray-400 text-sm">{posts.length}개의 글</p>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
