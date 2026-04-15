import axios from 'axios'
import type { RefreshTokenResponse } from '@shared/types/auth.types'
// Sẽ import từ Zustand store sau: import { useAuthStore } from '@/stores/auth.store'

// Tạo instance với base URL từ env (hoặc dùng next rewrites)
const apiClient = axios.create({
  // Khi ở frontend Next.js (client components), gọi API qua Next Proxy (`/api/*`) để không lo CORS.
  // Hoặc gọi thẳng backend `http://localhost:3001/api`.
  // Trong dev ta setup Next proxy cho `/api/*` -> backend, nên baseURL có thể là rỗng 
  // (`/api` sẽ được tự proxy tới http://localhost:3001/api)
  baseURL: process.env.NEXT_PUBLIC_API_URL || '', 
  withCredentials: true, // Quan trọng: Gửi kèm cookie httpOnly
})

// Request interceptor — gắn Access Token
apiClient.interceptors.request.use(
  (config) => {
    // TODO Phase 2: Lấy accessToken từ Zustand store
    // const { accessToken } = useAuthStore.getState()
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`
    // }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — Xử lý Token Expired
let isRefreshing = false
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => {
    // Axios luôn trả về structure: { data: { success, data, error } }
    // Trả về thẳng data để app dùng cho gọn
    return response.data
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Bỏ qua nếu route bị 401 là /refresh (ngăn lặp vô tận)
      if (originalRequest.url?.includes('/auth/refresh')) {
        return Promise.reject(error.response?.data || error)
      }

      if (isRefreshing) {
        // Nếu đang refresh -> đưa vào hàng chờ
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return apiClient(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Call refresh token API (cookie tự gắn do withCredentials)
        const { data } = await axios.post<{ success: boolean; data: { accessToken: string } }>(
          `${apiClient.defaults.baseURL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        )

        const newAccessToken = data.data.accessToken

        // TODO Phase 2: Lưu new token vào Zustand
        // useAuthStore.getState().setAccessToken(newAccessToken)

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

        processQueue(null, newAccessToken)
        return apiClient(originalRequest)
      } catch (err) {
        processQueue(err, null)
        // Refresh token cũng fail -> logout
        // TODO Phase 2: useAuthStore.getState().logout()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    // Luôn ném lỗi theo định dạng ApiError
    return Promise.reject(error.response?.data || error)
  }
)

export default apiClient
