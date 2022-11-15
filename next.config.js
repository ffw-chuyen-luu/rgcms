/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ]
  },
  images: {
    domains: ['images.ctfassets.net'],
  }
}

module.exports = nextConfig
