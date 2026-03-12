import { getAllPostSlugs, getPost, getAdjacentPosts, getSeriesPosts } from '@/lib/posts'
import MdxContent from '@/components/MdxContent'
import PostNav from '@/components/PostNav'
import SeriesToc from '@/components/SeriesToc'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  const { prev, next } = getAdjacentPosts(slug)
  const seriesPosts = post.series ? getSeriesPosts(post.series) : []

  const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Post header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
          <span>{formattedDate}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#f3f0ff] text-[#7c3aed] px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Series TOC */}
      {seriesPosts.length > 1 && (
        <SeriesToc seriesName={post.series!} posts={seriesPosts} currentSlug={slug} />
      )}

      {/* Post content */}
      <MdxContent html={post.contentHtml} />

      {/* Prev / Next */}
      <PostNav prev={prev} next={next} />
    </article>
  )
}
