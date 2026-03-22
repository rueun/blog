import Link from 'next/link'

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-[#484f58] hover:text-[#e6edf3] transition-colors"
  >
    {children}
  </a>
)

export default function Footer() {
  return (
    <footer className="border-t border-[#30363d] bg-[#010409] relative z-[1]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* 링크 섹션 */}
        <div className="grid grid-cols-2 max-w-md gap-8 mb-8">
          <div>
            <h3 className="text-[#e6edf3] font-semibold text-sm mb-3">Feeds</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#e6edf3] transition-colors inline-flex items-center gap-1"
                >
                  RSS
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M3.5 3H9V8.5M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="/atom.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#e6edf3] transition-colors inline-flex items-center gap-1"
                >
                  Atom
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M3.5 3H9V8.5M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#e6edf3] font-semibold text-sm mb-3">More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-[#8b949e] hover:text-[#e6edf3] transition-colors">
                  Posts
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-[#8b949e] hover:text-[#e6edf3] transition-colors">
                  Series
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-[#30363d] pt-6">
          {/* Copyright */}
          <p className="text-center text-[#484f58] text-sm font-mono mb-4">
            Copyright © 2026{' '}
            <a
              href="https://github.com/rueun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10b981] hover:underline"
            >
              Rueun
            </a>
            . Built with Next.js.
          </p>

          {/* 소셜 아이콘 */}
          <div className="flex justify-center items-center gap-5">
            {/* Email */}
            <SocialIcon href="mailto:rueun0302@gmail.com" label="Email">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </SocialIcon>

            {/* GitHub */}
            <SocialIcon href="https://github.com/rueun" label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </SocialIcon>

            {/* LinkedIn */}
            <SocialIcon href="https://linkedin.com" label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialIcon>

            {/* X (Twitter) */}
            <SocialIcon href="https://x.com" label="X">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  )
}
