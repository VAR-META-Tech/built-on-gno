/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.thedapplist.com',
      }
    ],
  },
}

export default nextConfig
