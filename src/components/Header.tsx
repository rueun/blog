import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-[#1e1e2e] text-white sticky top-0 z-50 border-b border-[#313244]">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-[#cba6f7] hover:text-[#d4b4f8] transition-colors">
          Rueun&apos;s Blog
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[#cdd6f4]">
          <Link href="/" className="hover:text-[#cba6f7] transition-colors">
            Posts
          </Link>
          <Link
            href="https://github.com/rueun"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#cba6f7] transition-colors"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </header>
  )
}
