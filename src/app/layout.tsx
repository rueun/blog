import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import AnnounceBanner from '@/components/AnnounceBanner'
import ThemeProvider from '@/components/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: "Rueun's Blog",
    template: "%s | Rueun's Blog",
  },
  description: 'Rueun의 개발 블로그 - Java, Spring, 백엔드 개발',
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
      'application/atom+xml': '/atom.xml',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className} bg-base min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AnnounceBanner>{children}</AnnounceBanner>
        </ThemeProvider>
      </body>
    </html>
  )
}
