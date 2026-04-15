import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/providers/query-provider'
import { Toaster } from 'react-hot-toast'

// Google Font với display: swap để tối ưu CLS
const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Laptop Store VN',
    default: 'Laptop Store VN - Laptop Gaming & Văn Phòng Chính Hãng',
  },
  description: 'Mua sắm laptop chính hãng, giá cực sốc tại Việt Nam.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} antialiased`}>
      <head>
        {/* Placeholder cho DNS Prefetch/Preconnect */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body>
        <QueryProvider>
          {children}
          <Toaster position="bottom-right" />
        </QueryProvider>
      </body>
    </html>
  )
}
