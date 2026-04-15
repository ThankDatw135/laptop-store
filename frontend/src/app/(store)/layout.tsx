import Link from 'next/link'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col theme-office">
      {/* TODO Phase 7: React Header Component */}
      <header className="sticky top-0 z-50 w-full border-b border-border-base bg-bg-surface/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-brand-primary">
            LAPTOP STORE
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="text-text-primary hover:text-brand-primary">Trang Chủ</Link>
            <Link href="/danh-muc/gaming" className="text-text-primary hover:text-brand-primary">Gaming</Link>
            <Link href="/danh-muc/office" className="text-text-primary hover:text-brand-primary">Văn Phòng</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Placeholder Cart / User */}
            <span className="cursor-pointer text-text-primary">Giỏ hàng (0)</span>
            <span className="cursor-pointer text-text-primary">Đăng nhập</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-bg-base">
        {children}
      </main>

      {/* TODO Phase 7: React Footer Component */}
      <footer className="w-full border-t border-border-base bg-bg-surface py-8">
        <div className="container mx-auto px-4 text-center text-text-secondary">
          <p>© 2026 Laptop Store VietNam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
