export const siteConfig = {
  title: "Rueun's Blog",
  description: 'Rueun의 개발 블로그 - Java, Spring, 백엔드 개발',
  author: 'Rueun',
  email: 'rueun0302@gmail.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rueun.dev',
} as const
