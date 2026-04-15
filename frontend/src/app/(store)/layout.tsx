import { Header } from '@/components/layout/Header'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      {/* Footer — Phase 7 */}
      <footer className="w-full border-t border-gray-200 bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2026 Laptop Store VietNam. All rights reserved.</p>
          <p className="mt-1 text-xs">Hàng chính hãng • Bảo hành chính thức • Giao hàng toàn quốc</p>
        </div>
      </footer>
    </div>
  )
}
