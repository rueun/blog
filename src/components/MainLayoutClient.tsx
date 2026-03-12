'use client'

import { useState, Suspense } from 'react'
import Sidebar from '@/components/Sidebar'

interface Category {
  name: string
  count: number
}

interface RecentPost {
  slug: string
  title: string
  date: string
}

interface Props {
  children: React.ReactNode
  categories: Category[]
  recentPosts: RecentPost[]
  totalPosts: number
}

export default function MainLayoutClient({ children, categories, recentPosts, totalPosts }: Props) {
  const [desktopOpen, setDesktopOpen] = useState(true)

  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <Sidebar
          desktopOpen={desktopOpen}
          onDesktopToggle={setDesktopOpen}
          categories={categories}
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
