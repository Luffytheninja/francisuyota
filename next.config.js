/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'assets.mixkit.co',
      'cdn.sanity.io',
      'img.youtube.com',
      'i.ytimg.com',
    ],
  },
}

module.exports = nextConfig
