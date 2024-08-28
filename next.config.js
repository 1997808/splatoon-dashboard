/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn-1.webcatalog.io'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
