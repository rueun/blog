import { getAllPostSlugs, getPost, getAdjacentPosts, getSeriesPosts } from '@/lib/posts'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit'
import PostNav from '@/components/PostNav'
import SeriesToc from '@/components/SeriesToc'
import TableOfContents from '@/components/TableOfContents'
import Link from 'next/link'
import GiscusComments from '@/components/GiscusComments'
import { mdxComponents } from '@/components/mdx'
import type { Metadata } from 'next'
import type { Heading } from '@/lib/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
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

function createHeadingsExtractor(headings: Heading[]) {
  return () => (tree: any) => {
    visit(tree, 'element', (node: any) => {
      const match = /^h([1-3])$/.exec(node.tagName)
      if (!match || !node.properties?.id) return

      function getText(nodes: any[]): string {
        return nodes
          .map((n: any) => {
            if (n.type === 'text') return n.value
            if (n.children) return getText(n.children)
            return ''
          })
          .join('')
      }

      headings.push({
        level: parseInt(match[1]),
        id: String(node.properties.id),
        text: getText(node.children ?? []).trim(),
      })
    })
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  const { prev, next } = getAdjacentPosts(slug)
  const seriesPosts = post.series ? getSeriesPosts(post.series) : []

  const headings: Heading[] = []
  const { content } = await compileMDX({
    source: post.source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        format: post.isMdx ? 'mdx' : 'md',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          createHeadingsExtractor(headings),
          [rehypePrettyCode, { theme: 'dracula', keepBackground: false }],
        ],
      },
    },
  })

  const formattedDate = post.date
    ? '@' + new Date(post.date).toISOString().split('T')[0]
    : ''

  const categories = Array.isArray(post.categories) ? post.categories : []
  const tags = Array.isArray(post.tags) ? post.tags : []
  const primaryCat = categories[0] ?? ''
  const catColor = primaryCat ? getCategoryColor(primaryCat) : '#8b949e'

  return (
    <div className="relative z-[1]">
      {/* 본문 영역 */}
      <div className="max-w-4xl 2xl:max-w-3xl mx-auto px-8 sm:px-14 pt-10 pb-20">
        <article>
          {/* 카테고리 */}
          <div className="font-mono text-sm text-[#484f58] mb-6 text-center">
            {categories.map((cat, i) => (
              <span key={cat}>
                {i > 0 && <span className="text-[#30363d]"> / </span>}
                <Link
                  href={`/posts?category=${encodeURIComponent(cat)}`}
                  className="hover:text-[#8b949e] transition-colors"
                >
                  {cat}
                </Link>
              </span>
            ))}
          </div>

          {/* Article Header */}
          <header className="mb-9 text-center">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-black text-[#e6edf3] leading-tight tracking-tight mb-5">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="font-mono text-xs text-[#484f58] pb-6 border-b border-[#30363d]">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="text-[#10b981]">{formattedDate}</span>
                <span className="text-[#30363d]">·</span>
                <span className="text-[#10b981]">{post.readingTime}</span>
              </div>
              {post.series && (
                <div className="mt-2 text-[#a78bfa]">
                  series: {post.series}
                </div>
              )}
            </div>
          </header>

          {/* Series TOC */}
          {seriesPosts.length > 1 && (
            <SeriesToc seriesName={post.series!} posts={seriesPosts} currentSlug={slug} />
          )}

          {/* Content */}
          <div
            className="prose prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-a:text-[#7c3aed] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-blockquote:border-l-[#cba6f7] prose-blockquote:text-gray-600
              prose-table:text-sm
              prose-img:rounded-xl
              prose-pre:p-0 prose-pre:bg-transparent prose-pre:rounded-none prose-pre:m-0
              [&_figure]:m-0
              [&>h1:first-child]:hidden"
          >
            {content}
          </div>

          {/* 태그 */}
          {tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-12 pb-8 mb-10 border-b border-[#21262d]">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center font-mono text-xs text-[#8b949e] bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-1.5 hover:text-[#10b981] hover:border-[#10b981] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Post Navigation */}
          <PostNav prev={prev} next={next} />

          {/* Comments */}
          <GiscusComments />
        </article>
      </div>

      {/* TOC - 오른쪽 고정 사이드바 */}
      <TableOfContents headings={headings} />
    </div>
  )
}
