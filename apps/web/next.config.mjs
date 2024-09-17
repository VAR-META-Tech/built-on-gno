/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.thedapplist.com',
      },
      {
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  output: 'standalone',
}

export default nextConfig
