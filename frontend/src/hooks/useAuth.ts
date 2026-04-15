'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/stores/auth.store'
import * as authService from '@/services/auth.service'
import type { RegisterPayload, LoginPayload } from '@/services/auth.service'

// ============================================================
// Hook Đăng ký
// ============================================================
export function useRegister() {
  const { setAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: ({ user, accessToken }) => {
      setAuth(user, accessToken)
      toast.success(`Chào mừng ${user.name}! Đăng ký thành công 🎉`)
      router.push('/')
    },
    onError: (error: { error?: string }) => {
      toast.error(error.error || 'Đăng ký thất bại, vui lòng thử lại')
    },
  })
}

// ============================================================
// Hook Đăng nhập
// ============================================================
export function useLogin() {
  const { setAuth } = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: ({ user, accessToken }) => {
      setAuth(user, accessToken)
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
      toast.success(`Chào mừng trở lại, ${user.name}!`)
      router.push('/')
    },
    onError: (error: { error?: string }) => {
      toast.error(error.error || 'Email hoặc mật khẩu không đúng')
    },
  })
}

// ============================================================
// Hook Đăng xuất
// ============================================================
export function useLogout() {
  const { clearAuth } = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth()
      queryClient.clear()
      toast.success('Đã đăng xuất thành công')
      router.push('/')
    },
    onError: () => {
      // Dù API lỗi, vẫn xóa state local để UX mượt
      clearAuth()
      queryClient.clear()
      router.push('/')
    },
  })
}

// ============================================================
// Hook lấy thông tin user hiện tại
// ============================================================
export function useMe() {
  const { isAuthenticated, accessToken } = useAuthStore()

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getMe,
    enabled: isAuthenticated && !!accessToken, // Chỉ gọi khi đã đăng nhập
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}
