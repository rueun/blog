'use client'

import { useState, Suspense, createContext, useContext } from 'react'
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

// LNB 열림 상태를 공유하는 context
const SidebarOpenContext = createContext(true)

export function useSidebarOpen() {
  return useContext(SidebarOpenContext)
}

export default function PostLayoutClient({ children, categoryTree, recentPosts, totalPosts }: Props) {
  const [desktopOpen, setDesktopOpen] = useState(true)

  return (
    <SidebarOpenContext.Provider value={desktopOpen}>
      <div className="min-h-screen">
        <Suspense fallback={null}>
          <Sidebar
            desktopOpen={desktopOpen}
            onDesktopToggle={setDesktopOpen}
            categoryTree={categoryTree}
            navbarHeight={0}
            recentPosts={recentPosts}
            totalPosts={totalPosts}
          />
        </Suspense>
        <div className={`transition-all duration-300 ${desktopOpen ? '2xl:ml-64' : '2xl:ml-0'}`}>
          {children}
        </div>
      </div>
    </SidebarOpenContext.Provider>
  )
}
