import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 text-center">
      <div className="max-w-md space-y-6 p-6">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-900">Không tìm thấy trang</h2>
        <p className="text-gray-600">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không thể truy cập.
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-brand-primary px-8 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-secondary"
        >
          Trở Về Trang Chủ
        </Link>
      </div>
    </div>
  )
}
