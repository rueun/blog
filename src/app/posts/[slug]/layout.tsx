import ReadingProgress from '@/components/ReadingProgress'

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReadingProgress />
      {children}
    </>
  )
}
