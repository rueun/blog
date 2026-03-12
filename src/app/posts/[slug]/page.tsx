import { getAllPostSlugs, getPost, getAdjacentPosts, getSeriesPosts } from '@/lib/posts'
import MdxContent from '@/components/MdxContent'
import PostNav from '@/components/PostNav'
import SeriesToc from '@/components/SeriesToc'
import TableOfContents from '@/components/TableOfContents'
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
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const categories = Array.isArray(post.categories) ? post.categories : []

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <article>
        {/* 포스트 헤더 */}
        <header className="text-center mb-10">
          {categories.length > 0 && (
            <p className="text-sm text-gray-400 mb-6">
              {categories.join(' / ')}
            </p>
          )}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-sm text-gray-400">
            {formattedDate}&nbsp;·&nbsp;{post.readingTime}
          </p>
        </header>

        <hr className="border-gray-200 mb-10" />

        {seriesPosts.length > 1 && (
          <SeriesToc seriesName={post.series!} posts={seriesPosts} currentSlug={slug} />
        )}

        <MdxContent html={post.contentHtml} />

        <PostNav prev={prev} next={next} />
      </article>

      <TableOfContents headings={post.headings} />
    </div>
  )
}
