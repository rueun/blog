import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Rueun's Blog",
    template: "%s | Rueun's Blog",
  },
  description: 'Rueun의 개발 블로그 - Java, Spring, 백엔드 개발',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 py-8 text-center text-gray-400 text-sm mt-16">
          © 2026 Rueun. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
