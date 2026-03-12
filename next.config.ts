import type { NextConfig } from 'next'

const config: NextConfig = {
  pageExtensions: ['ts', 'tsx'],
  images: {
    remotePatterns: [
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'dl.dropboxusercontent.com' },
    ],
  },
}

export default config
