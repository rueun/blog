import { getAllSeries } from '@/lib/posts'
import Link from 'next/link'

export default function SeriesPage() {
  const seriesList = getAllSeries()

  return (
    <div className="relative z-[1]">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-16 pb-12">
        <div className="font-mono text-sm text-[#484f58] mb-4 flex items-center gap-1.5">
          <span className="text-[#10b981]">$</span>
          <span>ls -la ./series</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#ec4899]">
            Series
          </span>
        </h1>
        <div className="flex items-center gap-2.5 font-mono text-sm text-[#484f58]">
          <span className="bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full px-3 py-0.5 text-xs font-semibold">
            총 {seriesList.length}개의 시리즈
          </span>
        </div>
      </div>

      {/* Series List */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pb-24 flex flex-col gap-8">
        {seriesList.map((series, idx) => (
          <SeriesCard key={series.name} series={series} index={idx + 1} />
        ))}

        {seriesList.length === 0 && (
          <div className="text-center py-20 font-mono text-sm text-[#484f58]">
            <span>// </span>아직 시리즈가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

function SeriesCard({
  series,
  index,
}: {
  series: { name: string; posts: import('@/lib/types').PostMeta[] }
  index: number
}) {
  const lastUpdated = series.posts.at(-1)?.date
    ? '@' + new Date(series.posts.at(-1)!.date).toISOString().split('T')[0]
    : ''

  return (
    <div className="bg-[#161b22] border border-[#30363d] border-l-[3px] border-l-[#10b981] rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_0_1px_#30363d]">
      <div className="flex gap-0 px-6 sm:px-8 py-6 items-start">
        {/* Series number */}
        <div className="shrink-0 font-mono text-5xl font-bold text-white/[0.04] leading-none mr-6 mt-[-4px] select-none tracking-tighter">
          #{String(index).padStart(2, '0')}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h2 className="text-xl font-black text-[#e6edf3] tracking-tight">{series.name}</h2>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap font-mono text-xs text-[#484f58] mb-5">
            <span className="bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full px-2.5 py-0.5 font-semibold">
              {series.posts.length} posts
            </span>
            <span className="bg-[#7c3aed]/12 text-[#a78bfa] border border-[#7c3aed]/20 rounded-full px-2.5 py-0.5 font-semibold">
              진행중
            </span>
            {lastUpdated && <span>최종 업데이트 {lastUpdated}</span>}
          </div>

          {/* Post list */}
          <div className="flex flex-col gap-0.5 mb-6">
            {series.posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/4 transition-colors group"
              >
                <span className="font-mono text-[11px] text-[#484f58] w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#30363d] shrink-0 group-hover:bg-[#a78bfa] transition-colors" />
                <span className="text-sm text-[#8b949e] group-hover:text-[#e6edf3] transition-colors flex-1 leading-snug">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#21262d]">
            <Link
              href={`/blog?series=${encodeURIComponent(series.name)}`}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#a78bfa] border border-[#7c3aed]/30 bg-[#7c3aed]/8 px-4 py-2 rounded-lg hover:bg-[#7c3aed]/15 hover:border-[#7c3aed]/50 transition-all"
            >
              시리즈 보기 →
            </Link>
            <div className="flex items-center gap-2 font-mono text-xs text-[#484f58]">
              <span>
                {series.posts.length}/{series.posts.length}
              </span>
              <div className="w-20 h-1 bg-[#21262d] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
