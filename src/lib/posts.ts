import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit'
import readingTime from 'reading-time'
import type { Node, Parent } from 'unist'
import type { Element } from 'hast'
import type { PostMeta, Post } from './types'

const postsDir = path.join(process.cwd(), 'posts')

function removeHugoShortcodes(content: string): string {
  return content.replace(/\{\{<\s*.*?\s*>\}\}/gs, '')
}

function rehypeMacCodeBlock() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element, index: number | undefined, parent: Parent | undefined) => {
      if (node.tagName !== 'figure') return
      const props = node.properties as Record<string, unknown>
      if (!props['dataRehypePrettyCodeFigure']) return

      const pre = node.children.find(
        (c): c is Element => c.type === 'element' && (c as Element).tagName === 'pre'
      )
      const lang = (pre?.properties as Record<string, unknown>)?.['dataLanguage'] as string | undefined

      if (parent && index !== undefined) {
        const wrapper: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['code-block'],
            'data-lang': lang ?? '',
          },
          children: [node],
        }
        ;(parent as Parent & { children: Node[] }).children[index] = wrapper
      }
    })
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace('.md', ''))
}

export function getAllPostMetas(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { data } = matter(fs.readFileSync(path.join(postsDir, `${slug}.md`), 'utf8'))
      return {
        slug,
        title: data.title ?? '',
        date: data.date ? new Date(data.date).toISOString() : '',
        description: data.description,
        summary: typeof data.summary === 'string' ? data.summary : undefined,
        series: data.series,
        tags: data.tags ?? [],
        categories: data.categories ?? [],
        cover: data.cover,
      } satisfies PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPost(slug: string): Promise<Post> {
  const source = fs.readFileSync(path.join(postsDir, `${slug}.md`), 'utf8')
  const { data, content } = matter(source)
  const clean = removeHugoShortcodes(content)

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: 'dracula',
      keepBackground: false,
    })
    .use(rehypeMacCodeBlock)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(clean)

  const rt = readingTime(content)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ? new Date(data.date).toISOString() : '',
    description: data.description,
    summary: typeof data.summary === 'string' ? data.summary : undefined,
    series: data.series,
    tags: data.tags ?? [],
    categories: data.categories ?? [],
    cover: data.cover,
    contentHtml: String(file),
    readingTime: rt.text,
  }
}

export function getSeriesPosts(seriesName: string): PostMeta[] {
  return getAllPostMetas()
    .filter((p) => p.series === seriesName)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getAdjacentPosts(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPostMetas()
  const idx = posts.findIndex((p) => p.slug === slug)
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  }
}
