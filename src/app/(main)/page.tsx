import { getAllPostMetas } from '@/lib/posts'
import PostCard from '@/components/PostCard'

type Props = {
  searchParams: Promise<{ category?: string }>
}

export default async function Home({ searchParams }: Props) {
  const { category } = await searchParams
  const allPosts = getAllPostMetas()
  const posts = category ? allPosts.filter(p => p.categories?.includes(category)) : allPosts

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 pt-16 lg:pt-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {category ? category : 'All Posts'}
        </h1>
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
