import { getAllPostMetas } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
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
    <div className="relative z-[1]">
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-10">
        {/* Breadcrumb */}
        <div className="font-mono text-xs text-[#484f58] mb-5 flex items-center gap-1.5">
          <Link href="/blog" className="hover:text-[#8b949e] transition-colors">
            blog
          </Link>
          <span className="text-[#30363d]">/</span>
          <span className="text-[#8b949e]">{category}</span>
        </div>

        <h1 className="text-3xl font-black text-[#e6edf3] mb-2">{category}</h1>
        <p className="font-mono text-sm text-[#484f58] mb-10">
          <span className="text-[#10b981]">{posts.length}개</span>의 글
        </p>

        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
