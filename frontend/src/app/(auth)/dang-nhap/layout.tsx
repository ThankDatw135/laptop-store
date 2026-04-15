import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập vào tài khoản Laptop Store của bạn để mua sắm và theo dõi đơn hàng.',
}

export default function DangNhapLayout({ children }: { children: React.ReactNode }) {
  return children
}
