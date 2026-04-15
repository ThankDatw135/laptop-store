import { create } from 'zustand'

// ============================================================
// Types
// ============================================================

export interface AuthUser {
  id: string
  email: string
  name: string
  phone: string | null
  role: string
  createdAt: string
}

interface AuthState {
  user: AuthUser | null
  accessToken: string | null        // Lưu trong memory — KHÔNG localStorage (bảo mật XSS)
  isAuthenticated: boolean
  isLoading: boolean                // Dùng khi gọi API

  // Actions
  setAuth: (user: AuthUser, accessToken: string) => void
  setAccessToken: (token: string) => void
  clearAuth: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,

  setAuth: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true, isLoading: false }),

  setAccessToken: (token) =>
    set({ accessToken: token }),

  clearAuth: () =>
    set({ user: null, accessToken: null, isAuthenticated: false }),

  setLoading: (loading) =>
    set({ isLoading: loading }),
}))
