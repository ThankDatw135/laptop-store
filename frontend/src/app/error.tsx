'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('UI Error Boundary caught an error:', error)
  }, [error])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 text-center">
      <div className="max-w-md space-y-6 p-6">
        <h2 className="text-3xl font-bold text-gray-900">Đã xảy ra lỗi hệ thống!</h2>
        <p className="text-gray-600">
          Rất xin lỗi vì sự bất tiện này. Chúng tôi đã nhận được thông báo và đang khắc phục.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-md bg-brand-primary px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-brand-secondary"
          >
            Thử lại
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="rounded-md border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            Về Trang Chủ
          </button>
        </div>
      </div>
    </div>
  )
}
