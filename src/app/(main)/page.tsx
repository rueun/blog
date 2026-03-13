import { getAllPostMetas, getAllSeries } from '@/lib/posts'
import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

function getCategoryColor(categories: string[]): string {
  const cat = (categories?.[0] ?? '').toLowerCase()
  if (cat.includes('spring') || cat.includes('java') || cat.includes('jpa')) return '#a78bfa'
  if (cat.includes('devops') || cat.includes('docker')) return '#10b981'
  if (cat.includes('cs') || cat.includes('network')) return '#22d3ee'
  if (cat.includes('db') || cat.includes('database')) return '#f59e0b'
  return '#8b949e'
}

function getCategoryLabel(categories: string[]): string {
  const cat = categories?.[0] ?? 'etc'
  return `#${cat}`
}

function TerminalCommit({
  hash,
  color,
  message,
}: {
  hash: string
  color: string
  message: string
}) {
  return (
    <div className="flex gap-2.5 mb-1.5 font-mono text-xs">
      <span className="text-[#f1e05a] shrink-0">{hash}</span>
      <span style={{ color }} className="shrink-0">
        feat:
      </span>
      <span className="text-[#8b949e] truncate">{message}</span>
    </div>
  )
}

const COLORS = ['#e6edf3', '#a78bfa', '#22d3ee', '#e6edf3', '#f472b6']

export default function Home() {
  const allPosts = getAllPostMetas()
  const recentPosts = allPosts.slice(0, 6)
  const terminalPosts = allPosts.slice(0, 5)
  const allSeries = getAllSeries().slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-3.5rem)] flex items-center px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full py-16">
          {/* Left column */}
          <div className="flex-1 max-w-xl">
            {/* Eyebrow */}
            <div className="font-mono text-sm text-[#10b981] mb-5 flex items-center gap-1.5">
              <span>$</span>
              <span>whoami</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-black text-[#e6edf3] leading-tight tracking-tight mb-0">
              백엔드 개발자
            </h1>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#ec4899]">
                #Rueun
              </span>
              <span
                className="inline-block w-0.5 h-9 bg-[#10b981] rounded-sm align-middle ml-1 cursor-blink"
                style={{ boxShadow: '0 0 10px rgba(16,185,129,0.4)' }}
              />
            </h1>

            {/* Subtitle */}
            <p className="font-mono text-sm text-[#484f58] mb-3">
              {'// '}
              <span className="text-[#06b6d4]">Java</span>
              {' · '}
              <span className="text-[#06b6d4]">Spring Boot</span>
              {' · '}
              <span className="text-[#06b6d4]">Clean Architecture</span>
            </p>

            {/* Description */}
            <p className="text-[#8b949e] text-base leading-relaxed mb-8">
              끊임없이 배우고 기록합니다. 기술 부채 없는 코드를 지향합니다.
            </p>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 flex-wrap mb-7">
              <Link
                href="/series"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
              >
                Series →
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-[#22d3ee] text-[#22d3ee] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#22d3ee]/10 transition-colors"
              >
                Blog →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5 font-mono text-xs text-[#484f58] flex-wrap">
              <span>
                📝 <span className="text-[#8b949e] font-semibold">{allPosts.length}</span> posts
              </span>
              <span>
                📚 <span className="text-[#8b949e] font-semibold">Backend Dev</span>
              </span>
              <span>☕ Java · Spring</span>
            </div>
          </div>

          {/* Right column: Terminal */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div
              className="w-full max-w-sm bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(48,54,61,0.5), 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(16,185,129,0.08)',
              }}
            >
              {/* Terminal header */}
              <div className="bg-[#161b22] border-b border-[#21262d] px-4 py-3 flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-xs text-[#484f58] flex-1 text-center">
                  rueun@blog — zsh
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-xs">
                <div className="flex gap-2 mb-3">
                  <span className="text-[#10b981]">$</span>
                  <span className="text-[#e6edf3]">git log --oneline -5</span>
                </div>

                {terminalPosts.length > 0 ? (
                  terminalPosts.map((post, i) => (
                    <TerminalCommit
                      key={post.slug}
                      hash={post.slug.slice(0, 7)}
                      color={COLORS[i % COLORS.length]}
                      message={post.title}
                    />
                  ))
                ) : (
                  <>
                    <TerminalCommit hash="a3f2b1c" color="#e6edf3" message="Spring Security JWT" />
                    <TerminalCommit hash="b8e4d2a" color="#a78bfa" message="JPA 엔티티 매핑" />
                    <TerminalCommit hash="c1f9a3e" color="#22d3ee" message="Docker Compose" />
                    <TerminalCommit hash="d4b7c8f" color="#e6edf3" message="TCP/IP 정리" />
                    <TerminalCommit hash="e2a5f1d" color="#f472b6" message="Java Stream API" />
                  </>
                )}

                <div className="flex gap-2 mt-3">
                  <span className="text-[#10b981]">$</span>
                  <span
                    className="inline-block w-2 h-3.5 bg-[#10b981] rounded-sm align-middle cursor-blink"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#21262d] max-w-7xl mx-auto" />

      {/* Recent Posts Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="font-mono text-xs text-[#484f58] mb-1.5">
              <span className="text-[#10b981]">$</span> ls -la ./posts | head -6
            </div>
            <h2 className="text-xl font-bold text-[#e6edf3] flex items-center gap-2.5">
              <span
                className="inline-block w-1 h-5 rounded-sm"
                style={{ background: 'linear-gradient(180deg, #10b981, #06b6d4)' }}
              />
              최근 게시글
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-mono text-xs font-semibold text-[#10b981] hover:gap-2 flex items-center gap-1 transition-all"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPosts.map((post) => (
            <RecentPostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#10b981] border border-[#30363d] px-5 py-2.5 rounded-lg hover:bg-[#161b22] hover:border-[#484f58] transition-all"
          >
            전체 게시글 보기 →
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#21262d] max-w-7xl mx-auto" />

      {/* Series Section */}
      {allSeries.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-mono text-xs text-[#484f58] mb-1.5">
                <span className="text-[#10b981]">$</span> ls ./series
              </div>
              <h2 className="text-xl font-bold text-[#e6edf3] flex items-center gap-2.5">
                <span
                  className="inline-block w-1 h-5 rounded-sm"
                  style={{ background: 'linear-gradient(180deg, #a78bfa, #ec4899)' }}
                />
                시리즈
              </h2>
            </div>
            <Link
              href="/series"
              className="font-mono text-xs font-semibold text-[#a78bfa] hover:gap-2 flex items-center gap-1 transition-all"
            >
              전체 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allSeries.map((series) => (
              <Link
                key={series.name}
                href={`/posts/${series.posts[0].slug}`}
                className="block bg-[#161b22] border border-[#30363d] border-l-[3px] border-l-[#a78bfa] rounded-xl p-5 hover:border-[#484f58] hover:border-l-[#a78bfa] transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📚</span>
                    <h3 className="font-bold text-[#e6edf3] text-sm group-hover:text-[#a78bfa] transition-colors leading-snug">
                      {series.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20 rounded-full px-2 py-0.5 shrink-0 ml-2">
                    {series.posts.length}편
                  </span>
                </div>
                <ol className="flex flex-col gap-1">
                  {series.posts.slice(0, 3).map((post, idx) => (
                    <li key={post.slug} className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#484f58] w-4 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] text-[#8b949e] truncate">{post.title}</span>
                    </li>
                  ))}
                  {series.posts.length > 3 && (
                    <li className="font-mono text-[10px] text-[#484f58] pl-6">
                      +{series.posts.length - 3}개 더
                    </li>
                  )}
                </ol>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/series"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#a78bfa] border border-[#30363d] px-5 py-2.5 rounded-lg hover:bg-[#161b22] hover:border-[#484f58] transition-all"
            >
              시리즈 전체 보기 →
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

function RecentPostCard({ post }: { post: PostMeta }) {
  const color = getCategoryColor(post.categories ?? [])
  const label = getCategoryLabel(post.categories ?? [])
  const date = post.date
    ? '@' + new Date(post.date).toISOString().split('T')[0]
    : ''

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-[#8b949e] transition-all group"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full"
          style={{
            color,
            background: `${color}18`,
            border: `1px solid ${color}33`,
          }}
        >
          {label}
        </span>
        <span className="font-mono text-xs text-[#484f58]">{date}</span>
      </div>
      <h3 className="font-bold text-[#e6edf3] group-hover:text-[#a78bfa] transition-colors mt-2 mb-3 line-clamp-2 text-sm leading-snug">
        {post.title}
      </h3>
      {(post.description || post.summary) && (
        <p className="text-xs text-[#8b949e] line-clamp-2 mb-3 leading-relaxed">
          {post.description || post.summary}
        </p>
      )}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex flex-wrap gap-1">
          {(post.tags ?? []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-[#484f58] bg-white/4 border border-[#21262d] px-1.5 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-xs text-[#10b981] group-hover:tracking-wide transition-all">
          read →
        </span>
      </div>
    </Link>
  )
}
