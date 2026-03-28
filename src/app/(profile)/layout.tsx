import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileFooter from '@/components/profile/ProfileFooter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: '신은정 | Backend Developer', template: '신은정 | %s' },
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProfileHeader />
      <main className="flex-1">{children}</main>
      <ProfileFooter />
    </div>
  )
}
