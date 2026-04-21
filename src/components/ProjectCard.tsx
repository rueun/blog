'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function renderBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-text-primary">{part}</strong> : part
  )
}

interface AchievementItem {
  text: string
  sub?: string[]
}

interface Achievement {
  title: string
  items: (string | AchievementItem)[]
}

interface Props {
  number: string
  title: string
  subtitle?: string
  period: string
  type: string
  description: string
  skills: string[]
  roles?: string[]
  achievements: Achievement[]
  reflection?: string | string[]
  reflectionLink?: { label: string; url: string }
  githubUrl?: string
  linkUrl?: string
  image?: string
  defaultOpen?: boolean
}

export default function ProjectCard({
  number,
  title,
  subtitle,
  period,
  type,
  description,
  skills,
  roles,
  achievements,
  reflection,
  reflectionLink,
  githubUrl,
  linkUrl,
  image,
  defaultOpen,
}: Props) {
  const [open, setOpen] = useState(defaultOpen ?? false)

  useEffect(() => {
    if (defaultOpen) setOpen(true)
  }, [defaultOpen])

  const externalUrl = linkUrl || githubUrl

  return (
    <div className="group rounded-xl border border-border bg-base transition-all duration-300 hover:border-text-muted/30 hover:shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08)]">
      {/* 접힌 상태 */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* 이미지 */}
          <div className="sm:w-64 sm:h-40 shrink-0 rounded-lg overflow-hidden border border-border-muted">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover object-top" />
            ) : (
              <div className="w-full aspect-[4/3] flex items-center justify-center bg-surface-alt">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted/30">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* 기간 + 외부 링크 */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-text-muted tabular-nums">{period}</span>
              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-primary transition-colors"
                  aria-label="외부 링크"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              )}
            </div>

            {/* 제목 */}
            <h3 className="text-[18px] font-bold text-text-primary leading-snug mb-2">
              {title}
              {subtitle && <span className="ml-2 text-[12px] font-normal text-text-muted">{subtitle}</span>}
            </h3>

            {/* 설명 */}
            <p className="text-[13.5px] text-text-secondary leading-[1.7] mb-4">{description}</p>

            {/* 기술 태그 */}
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="text-[11.5px] text-[#a78bfa] border border-[#a78bfa] bg-[#a78bfa]/5 rounded-md px-2.5 py-1">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 토글 */}
        <button
          onClick={() => setOpen(!open)}
          className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
        >
          {open ? '접기' : '자세히 보기'}
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </button>
      </div>

      {/* 펼친 상태 */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-8 pt-2">
              <div className="h-px bg-border mb-6" />

              {/* 담당 업무 + 주요 성과 2컬럼 */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8">
                {/* 담당 업무 */}
                {roles && roles.length > 0 && (
                  <div>
                    <h4 className="text-[13px] font-bold text-text-primary mb-4">담당 업무</h4>
                    <ul className="space-y-2">
                      {roles.map((role, i) => (
                        <li key={i} className="flex items-baseline gap-2 text-[13px] text-text-secondary leading-[1.6]">
                          <span className="text-text-muted shrink-0">·</span>
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 주요 성과 */}
                <div className="space-y-6">
                  <h4 className="text-[13px] font-bold text-text-primary mb-1">주요 성과</h4>
                  {achievements.map((a) => (
                    <div key={a.title}>
                      <h5 className="text-[13.5px] font-semibold text-text-primary mb-2">{a.title}</h5>
                      <ul className="space-y-2">
                        {a.items.map((item, i) => {
                          const text = typeof item === 'string' ? item : item.text
                          const sub = typeof item === 'string' ? undefined : item.sub
                          return (
                            <li key={i}>
                              <div className="flex items-baseline gap-2 text-[13px] text-text-secondary leading-[1.65]">
                                <span className="text-text-muted shrink-0">·</span>
                                <span>{renderBold(text)}</span>
                              </div>
                              {sub && sub.length > 0 && (
                                <ul className="ml-5 mt-1 space-y-1">
                                  {sub.map((s, j) => (
                                    <li key={j} className="flex items-baseline gap-2 text-[12px] text-text-muted leading-[1.6]">
                                      <span className="shrink-0">-</span>
                                      <span>{renderBold(s)}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 회고 */}
              {reflection && (
                <div className="mt-8 pt-6 border-t border-border-muted">
                  <h4 className="text-[13px] font-bold text-text-primary mb-3">회고</h4>
                  {Array.isArray(reflection) ? (
                    <ul className="space-y-2">
                      {reflection.map((item, i) => (
                        <li key={i} className="flex items-baseline gap-2 text-[13px] text-text-secondary leading-[1.7]">
                          <span className="text-text-muted shrink-0">·</span>
                          <span>{renderBold(item)}</span>
                        </li>
                      ))}
                      {reflectionLink && (
                        <li className="flex items-baseline gap-2 text-[13px] leading-[1.7]">
                          <span className="text-text-muted shrink-0">·</span>
                          <a href={reflectionLink.url} className="text-[#a78bfa] hover:underline font-medium">{reflectionLink.label} →</a>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-[13.5px] text-text-secondary leading-[1.75]">
                      {reflection}
                      {reflectionLink && (
                        <>
                          {' '}
                          <a href={reflectionLink.url} className="text-[#a78bfa] hover:underline font-medium">{reflectionLink.label} →</a>
                        </>
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
