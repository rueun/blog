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
import readingTime from 'reading-time'
import type { PostMeta, Post, Heading, CategoryTreeItem } from './types'

function extractHeadings(html: string): Heading[] {
  const matches = [...html.matchAll(/<h([1-3])[^>]*\sid="([^"]*)"[^>]*>(.*?)<\/h[1-3]>/gs)]
  return matches.map((m) => ({
    level: parseInt(m[1]),
    id: m[2],
    text: m[3].replace(/<[^>]+>/g, '').trim(),
  }))
}

const postsDir = path.join(process.cwd(), 'posts')

function removeHugoShortcodes(content: string): string {
  return content.replace(/\{\{<\s*.*?\s*>\}\}/gs, '')
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
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(clean)

  const rt = readingTime(content)
  const contentHtml = String(file)

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
    contentHtml,
    readingTime: rt.text,
    headings: extractHeadings(contentHtml),
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

export function getAllSeries(): { name: string; posts: PostMeta[] }[] {
  const posts = getAllPostMetas()
  const seriesMap: Record<string, PostMeta[]> = {}
  posts.forEach((post) => {
    if (post.series) {
      if (!seriesMap[post.series]) seriesMap[post.series] = []
      seriesMap[post.series].push(post)
    }
  })
  return Object.entries(seriesMap)
    .map(([name, posts]) => ({
      name,
      posts: posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getCategoryTree(): CategoryTreeItem[] {
  const posts = getAllPostMetas()
  const tree: Record<string, { count: number; children: Record<string, number> }> = {}

  posts.forEach((post) => {
    const cats = post.categories ?? []
    if (cats.length === 0) return
    const parent = cats[0]
    if (!tree[parent]) tree[parent] = { count: 0, children: {} }
    tree[parent].count++
    for (let i = 1; i < cats.length; i++) {
      const child = cats[i]
      tree[parent].children[child] = (tree[parent].children[child] ?? 0) + 1
    }
  })

  return Object.entries(tree)
    .map(([name, { count, children }]) => ({
      name,
      count,
      children: Object.entries(children)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
