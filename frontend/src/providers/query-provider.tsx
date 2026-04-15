'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Dữ liệu ít thay đổi, có thể stale lâu để tiết kiệm API call
            staleTime: 5 * 60 * 1000, // 5 phút
            retry: 1,                 // Retry 1 lần nếu lỗi
            refetchOnWindowFocus: false, // Không fetch lại khi qua lại các tab
          },
        },
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
