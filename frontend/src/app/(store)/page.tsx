import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Laptop Store VN - Laptop Gaming & Văn Phòng Chính Hãng',
  description:
    'Mua laptop Gaming, Văn Phòng, Sinh Viên chính hãng giá tốt nhất Việt Nam. Bảo hành chính thức, giao hàng toàn quốc.',
}

const featuredCategories = [
  {
    id: 'gaming',
    title: 'Laptop Gaming',
    description: 'Hiệu năng đỉnh cao cho game thủ',
    emoji: '🎮',
    href: '/danh-muc/gaming',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'office',
    title: 'Laptop Văn Phòng',
    description: 'Nhẹ nhàng, pin bền cho dân công sở',
    emoji: '💼',
    href: '/danh-muc/office',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'student',
    title: 'Laptop Sinh Viên',
    description: 'Giá tốt dưới 15 triệu cho học sinh, sinh viên',
    emoji: '🎓',
    href: '/danh-muc/student',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-16 text-white md:px-16">
          {/* Background decoration */}
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative max-w-xl">
            <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
              🔥 Ưu đãi tháng 4/2026
            </div>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Laptop Chính Hãng
              <br />
              <span className="text-yellow-300">Giá Tốt Nhất</span>
            </h1>
            <p className="mt-4 text-blue-100">
              Hơn 200+ model từ ASUS, Dell, HP, Lenovo, Apple. Bảo hành chính hãng, giao hàng toàn quốc.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                id="btn-hero-shop-now"
                href="/danh-muc/gaming"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
              >
                Mua ngay
              </Link>
              <Link
                id="btn-hero-view-all"
                href="/danh-muc"
                className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Danh mục nổi bật</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              id={`btn-category-${cat.id}`}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-sm transition hover:shadow-md"
              style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90 transition group-hover:opacity-100`} />
              <div className="relative">
                <div className="text-4xl">{cat.emoji}</div>
                <h3 className="mt-3 text-xl font-bold">{cat.title}</h3>
                <p className="mt-1 text-sm text-white/80">{cat.description}</p>
                <div className="mt-4 text-xs font-semibold tracking-wide text-white/70 transition group-hover:text-white">
                  Xem ngay →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: '✅', label: 'Hàng Chính Hãng', desc: '100% chính thức từ nhà phân phối' },
            { icon: '🚚', label: 'Giao Toàn Quốc', desc: 'Miễn phí ship đơn từ 500k' },
            { icon: '🔧', label: 'Bảo Hành 12 Tháng', desc: 'Bảo hành tại trung tâm hãng' },
            { icon: '📞', label: 'Hỗ Trợ 24/7', desc: 'Hotline: 1800-xxxx miễn phí' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm"
            >
              <div className="text-3xl">{item.icon}</div>
              <p className="mt-2 text-sm font-semibold text-gray-800">{item.label}</p>
              <p className="mt-0.5 text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder — products sẽ load từ API Phase 3 */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
          <Link href="/danh-muc" className="text-sm font-medium text-blue-600 hover:underline">
            Xem tất cả →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="h-48 rounded-xl bg-gray-200" />
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
              <div className="mt-4 h-6 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-gray-400">
          Sản phẩm sẽ được load từ API thực tế trong Phase 3
        </p>
      </section>
    </div>
  )
}
