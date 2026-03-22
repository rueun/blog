import ReadingProgress from '@/components/ReadingProgress'
import Navbar from '@/components/Navbar'
import NavSpacer from '@/components/NavSpacer'
import Footer from '@/components/Footer'
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
    <>
      <ReadingProgress />
      <Navbar />
      <NavSpacer />
      <PostLayoutClient
        categoryTree={categoryTree}
        recentPosts={recentPosts}
        totalPosts={allPosts.length}
      >
        <main className="flex-1 relative z-[1]">{children}</main>
        <Footer />
      </PostLayoutClient>
    </>
  )
}
