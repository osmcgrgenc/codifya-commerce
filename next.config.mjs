import withNextIntl from 'next-intl/plugin'

const nextConfig = withNextIntl()({
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
})

export default nextConfig
