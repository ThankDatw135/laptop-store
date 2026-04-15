import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 theme-office">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="text-4xl font-bold text-brand-primary">
            LAPTOP STORE
          </Link>
        </div>
        {/* Main Content (Trang Đăng nhập/Đăng ký) */}
        {children}
      </div>
    </div>
  )
}
