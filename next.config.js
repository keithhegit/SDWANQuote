/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    domains: [], // 如果Logo来自外部域名，需要在这里添加
  }
}

module.exports = nextConfig 