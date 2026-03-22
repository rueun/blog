'use client'

import { useBannerHeight } from '@/components/AnnounceBanner'

export default function NavSpacer() {
  const bannerH = useBannerHeight()
  // 배너 높이 + GNB 높이(56px)
  return <div className="transition-[height] duration-200" style={{ height: bannerH + 56 }} />
}
