import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Bật externalDir để import được @laptop-store/shared ngoài thư mục frontend
  experimental: {
    externalDir: true,
  },
  
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Proxy tất cả /api/* tới backend (chạy ở 3001) để tránh CORS lúc dev.
        // Chỉ dùng trong môi trường dev, product Vercel có cách config khác
        destination: process.env.NEXT_PUBLIC_API_URL 
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` 
          : 'http://localhost:3001/api/:path*',
      },
    ]
  },
}

export default nextConfig
