import { getAllPostSlugs, getPost, getAdjacentPosts, getSeriesPosts } from '@/lib/posts'
import MdxContent from '@/components/MdxContent'
import PostNav from '@/components/PostNav'
import SeriesToc from '@/components/SeriesToc'
import TableOfContents from '@/components/TableOfContents'
import Link from 'next/link'
import GiscusComments from '@/components/GiscusComments'
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

function getCategoryColor(category: string): string {
  const cat = category.toLowerCase()
  if (cat.includes('spring') || cat.includes('java') || cat.includes('jpa')) return '#10b981'
  if (cat.includes('devops') || cat.includes('docker')) return '#22d3ee'
  if (cat.includes('cs') || cat.includes('network')) return '#22d3ee'
  if (cat.includes('db') || cat.includes('database')) return '#f59e0b'
  return '#8b949e'
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  const { prev, next } = getAdjacentPosts(slug)
  const seriesPosts = post.series ? getSeriesPosts(post.series) : []

  const formattedDate = post.date
    ? '@' + new Date(post.date).toISOString().split('T')[0]
    : ''

  const categories = Array.isArray(post.categories) ? post.categories : []
  const primaryCat = categories[0] ?? ''
  const catColor = primaryCat ? getCategoryColor(primaryCat) : '#8b949e'

  return (
    <div className="relative z-[1] max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-20">
      <article>
        {/* Breadcrumb */}
        <nav className="font-mono text-xs text-[#484f58] flex items-center gap-1.5 mb-6 flex-wrap">
          <Link href="/blog" className="hover:text-[#8b949e] transition-colors">
            blog
          </Link>
          {categories.map((cat, i) => (
            <span key={cat} className="flex items-center gap-1.5">
              <span className="text-[#30363d]">/</span>
              <Link
                href={`/category/${encodeURIComponent(cat)}`}
                className="hover:text-[#8b949e] transition-colors"
              >
                {cat}
              </Link>
            </span>
          ))}
          <span className="text-[#30363d]">/</span>
          <span className="text-[#8b949e] truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-9">
          {/* Category pill */}
          {primaryCat && (
            <div
              className="inline-flex items-center font-mono text-xs font-bold rounded-full px-3 py-1 mb-4"
              style={{
                color: catColor,
                background: `${catColor}18`,
                border: `1px solid ${catColor}33`,
              }}
            >
              #{primaryCat}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-[#e6edf3] leading-tight tracking-tight mb-5">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap font-mono text-xs text-[#484f58] pb-6 border-b border-[#30363d]">
            <span>{formattedDate}</span>
            <span className="text-[#30363d]">·</span>
            <span>{post.readingTime}</span>
            {post.series && (
              <>
                <span className="text-[#30363d]">·</span>
                <span className="text-[#a78bfa] flex items-center gap-1">
                  📖 series:{' '}
                  <Link href="/series" className="hover:underline">
                    {post.series}
                  </Link>
                </span>
              </>
            )}
          </div>
        </header>

        {/* Series TOC */}
        {seriesPosts.length > 1 && (
          <SeriesToc seriesName={post.series!} posts={seriesPosts} currentSlug={slug} />
        )}

        {/* Content */}
        <MdxContent html={post.contentHtml} />

        {/* Post Navigation */}
        <PostNav prev={prev} next={next} />

        {/* Comments */}
        <GiscusComments />
      </article>

      {/* TOC */}
      <TableOfContents headings={post.headings} />
    </div>
  )
}
