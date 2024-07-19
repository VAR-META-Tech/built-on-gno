/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.thedapplist.com',
      },
      {
        hostname: 'img.freepik.com',
      },
      {
        hostname: 'dummyimage.com',
      },
    ],
  },
}

export default nextConfig
