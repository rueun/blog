export interface PostMeta {
  slug: string
  title: string
  date: string
  description?: string
  summary?: string
  series?: string
  tags?: string[]
  categories?: string[]
  cover?: string
}

export interface Post extends PostMeta {
  contentHtml: string
  readingTime: string
}
