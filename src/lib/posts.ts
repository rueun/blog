import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { PostMeta, Post, CategoryTreeItem } from './types'

const postsDir = path.join(process.cwd(), 'posts')

/** slug → 파일 경로 캐시 (재귀 탐색 결과를 저장하여 반복 탐색 방지) */
let postFileCache: Map<string, { filePath: string; isMdx: boolean }> | null = null

function removeHugoShortcodes(content: string): string {
  return content.replace(/\{\{<\s*.*?\s*>\}\}/gs, '')
}

/** posts 디렉토리를 재귀 탐색하여 모든 md/mdx 파일을 slug → 경로로 매핑 */
function buildPostFileCache(): Map<string, { filePath: string; isMdx: boolean }> {
  if (postFileCache) return postFileCache

  const cache = new Map<string, { filePath: string; isMdx: boolean }>()

  function scanDir(dir: string): void {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        scanDir(path.join(dir, entry.name))
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        const slug = entry.name.replace(/\.mdx?$/, '')
        const filePath = path.join(dir, entry.name)
        const isMdx = entry.name.endsWith('.mdx')
        // mdx 우선: 같은 slug의 mdx가 이미 있으면 md로 덮어쓰지 않음
        if (!cache.has(slug) || isMdx) {
          cache.set(slug, { filePath, isMdx })
        }
      }
    }
  }

  if (fs.existsSync(postsDir)) scanDir(postsDir)
  postFileCache = cache
  return cache
}

function findPostFile(slug: string): { filePath: string; isMdx: boolean } {
  const cache = buildPostFileCache()
  const entry = cache.get(slug)
  if (entry) return entry
  // fallback: 캐시에 없으면 기본 경로로
  return { filePath: path.join(postsDir, `${slug}.md`), isMdx: false }
}

export function getAllPostSlugs(): string[] {
  return Array.from(buildPostFileCache().keys())
}

export function getAllPostMetas(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { filePath } = findPostFile(slug)
      const { data } = matter(fs.readFileSync(filePath, 'utf8'))
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

export function getPost(slug: string): Post {
  const { filePath, isMdx } = findPostFile(slug)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const clean = removeHugoShortcodes(content)
  const rt = readingTime(clean)

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
    source: clean,
    isMdx,
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
