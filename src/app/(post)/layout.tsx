import ReadingProgress from '@/components/ReadingProgress'
import Footer from '@/components/Footer'
import AnnounceBanner from '@/components/AnnounceBanner'
import PostLayoutClient from '@/components/PostLayoutClient'
import { getCategoryTree, getAllPostMetas } from '@/lib/posts'

export default function PostGroupLayout({ children }: { children: React.ReactNode }) {
  const categoryTree = getCategoryTree()
  const allPosts = getAllPostMetas()
  const recentPosts = allPosts.slice(0, 5).map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
  }))

  return (
    <AnnounceBanner>
      <ReadingProgress />
      <PostLayoutClient
        categoryTree={categoryTree}
        recentPosts={recentPosts}
        totalPosts={allPosts.length}
      >
        <main className="flex-1 relative z-[1]">{children}</main>
      </PostLayoutClient>
      <Footer />
    </AnnounceBanner>
  )
}
