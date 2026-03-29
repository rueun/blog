import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ReadingProgress from '@/components/ReadingProgress'
import NavSpacer from '@/components/NavSpacer'
import AnnounceBanner from '@/components/AnnounceBanner'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AnnounceBanner>
      <ReadingProgress />
      <Navbar />
      <NavSpacer />
      <main className="flex-1 relative z-[1]">{children}</main>
      <Footer />
    </AnnounceBanner>
  )
}
