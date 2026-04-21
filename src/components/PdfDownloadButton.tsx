'use client'

interface Props {
  onBeforePrint?: () => void
}

export default function PdfDownloadButton({ onBeforePrint }: Props) {
  const handlePrint = () => {
    if (onBeforePrint) onBeforePrint()
    setTimeout(() => window.print(), 300)
  }

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-1.5 text-[12px] text-text-muted border border-border rounded-lg px-3 py-1.5 hover:border-[#a78bfa]/40 hover:text-[#a78bfa] transition-colors print:hidden"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      PDF 다운로드
    </button>
  )
}
