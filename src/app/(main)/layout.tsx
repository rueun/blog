import { getAllPostMetas, getCategoryGroups } from '@/lib/posts'
import MainLayoutClient from '@/components/MainLayoutClient'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const posts = getAllPostMetas()
  const categories = getCategoryGroups()
  const recentPosts = posts.slice(0, 5).map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
  }))

  return (
    <MainLayoutClient categories={categories} recentPosts={recentPosts} totalPosts={posts.length}>
      {children}
    </MainLayoutClient>
  )
}
