import { getAllSeries } from '@/lib/posts'
import Link from 'next/link'

export default function SeriesPage() {
  const seriesList = getAllSeries()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">시리즈</h1>
        <p className="text-gray-400 text-sm">{seriesList.length}개의 시리즈</p>
      </div>

      <div className="grid gap-5">
        {seriesList.map((series) => (
          <div key={series.name} className="bg-white dark:bg-[#1e1e2e] rounded-xl overflow-hidden border border-gray-200 dark:border-[#2d2d44]">
            {/* 시리즈 헤더 */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <div className="flex items-center gap-3">
                <div className="text-blue-500 dark:text-[#93c5fd]">
                  <svg width="20" height="24" viewBox="0 0 22 26" fill="currentColor">
                    <path d="M3 0h16a2 2 0 0 1 2 2v22l-9-5-9 5V2a2 2 0 0 1 2-2z"/>
                  </svg>
                </div>
                <h2 className="font-bold text-gray-900 dark:text-white text-base">{series.name}</h2>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-[#313244] px-2.5 py-1 rounded-full">
                {series.posts.length}편
              </span>
            </div>

            {/* 포스트 목록 */}
            <ol className="px-5 pb-5 space-y-2">
              {series.posts.map((post, idx) => (
                <li key={post.slug} className="flex gap-3 text-sm">
                  <span className="text-gray-400 dark:text-gray-600 shrink-0 w-5 pt-px text-xs leading-relaxed">{idx + 1}.</span>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-[#93c5fd] transition-colors leading-relaxed flex-1"
                  >
                    {post.title}
                  </Link>
                  <span className="text-xs text-gray-400 dark:text-gray-600 shrink-0 pt-px">
                    {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}

        {seriesList.length === 0 && (
          <p className="text-gray-500 text-center py-20">아직 시리즈가 없습니다.</p>
        )}
      </div>
    </div>
  )
}
