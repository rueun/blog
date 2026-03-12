export interface CategoryChild {
  name: string
  count: number
}

export interface CategoryTreeItem {
  name: string
  count: number
  children: CategoryChild[]
}

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

export interface Heading {
  id: string
  text: string
  level: number
}

export interface Post extends PostMeta {
  contentHtml: string
  readingTime: string
  headings: Heading[]
}
