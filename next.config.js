/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port:'',
        pathname: '/u/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port:'3000',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
