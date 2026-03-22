'use client'

import { useState, useEffect, useCallback } from 'react'

const TAGS = [
  '#Clean Architecture',
  '#Why부터 시작',
  '#Less is More',
  '#사용자 친화적',
  '#Product Thinking',
  '#Continuous Growth',
]

const TYPING_SPEED = 120
const DELETING_SPEED = 60
const PAUSE_AFTER_TYPE = 3000
const PAUSE_AFTER_DELETE = 600

export default function TypingTags() {
  const [tagIndex, setTagIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const currentTag = TAGS[tagIndex]

  const tick = useCallback(() => {
    if (!isDeleting) {
      // 타이핑 중
      if (charIndex < currentTag.length) {
        return setTimeout(() => setCharIndex((c) => c + 1), TYPING_SPEED)
      }
      // 타이핑 완료 → 잠시 대기 후 삭제 시작
      return setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE)
    }
    // 삭제 중
    if (charIndex > 0) {
      return setTimeout(() => setCharIndex((c) => c - 1), DELETING_SPEED)
    }
    // 삭제 완료 → 다음 태그로
    setIsDeleting(false)
    setTagIndex((i) => (i + 1) % TAGS.length)
    return setTimeout(() => {}, PAUSE_AFTER_DELETE)
  }, [charIndex, isDeleting, currentTag])

  useEffect(() => {
    const timer = tick()
    return () => clearTimeout(timer)
  }, [tick])

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#ec4899]">
      {currentTag.slice(0, charIndex)}
      <span
        className="inline-block w-0.5 h-7 bg-[#10b981] rounded-sm align-middle ml-1 cursor-blink"
        style={{ boxShadow: '0 0 10px rgba(16,185,129,0.4)' }}
      />
    </span>
  )
}
