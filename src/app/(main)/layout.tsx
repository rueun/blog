import Navbar from '@/components/Navbar'
import ReadingProgress from '@/components/ReadingProgress'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReadingProgress />
      <div className="bg-[#010409] border-b border-[#30363d] flex items-center justify-center gap-2 px-6 py-1.5 font-mono text-xs text-[#484f58]">
        <span className="text-[#10b981]">$</span>
        <span className="inline-block w-0.5 h-3 bg-[#10b981] rounded-sm align-middle cursor-blink" />
        <span className="text-[#8b949e]">백엔드 개발자 Rueun의 기술 블로그</span>
        <span className="text-[#21262d]">|</span>
        <span>
          <span className="text-[#22d3ee]">Java</span>
          <span className="text-[#484f58]">{' · '}</span>
          <span className="text-[#22d3ee]">Spring</span>
          <span className="text-[#484f58]">{' · '}</span>
          <span className="text-[#22d3ee]">클린 아키텍처</span>
        </span>
        <span>🌱</span>
      </div>
      <Navbar />
      <main className="flex-1 relative z-[1]">{children}</main>
      <footer className="border-t border-[#30363d] py-8 text-center text-[#484f58] text-sm font-mono relative z-[1]">
        © 2026 Rueun. All rights reserved.
      </footer>
    </>
  )
}
