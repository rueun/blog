'use client'

import { useState, Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import type { CategoryTreeItem } from '@/lib/types'

interface RecentPost {
  slug: string
  title: string
  date: string
}

interface Props {
  children: React.ReactNode
  categoryTree: CategoryTreeItem[]
  recentPosts: RecentPost[]
  totalPosts: number
}

export default function MainLayoutClient({ children, categoryTree, recentPosts, totalPosts }: Props) {
  const [desktopOpen, setDesktopOpen] = useState(true)

  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <Sidebar
          desktopOpen={desktopOpen}
          onDesktopToggle={setDesktopOpen}
          categoryTree={categoryTree}
          recentPosts={recentPosts}
          totalPosts={totalPosts}
        />
      </Suspense>
      <div className={`transition-all duration-300 ${desktopOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        {children}
      </div>
    </div>
  )
}
