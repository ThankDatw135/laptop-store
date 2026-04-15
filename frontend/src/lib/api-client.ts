import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

// Tạo instance với base URL — Next proxy sẽ forward /api/* tới backend
const apiClient = axios.create({
  baseURL: '',
  withCredentials: true, // Quan trọng: gửi kèm cookie httpOnly (refreshToken)
  headers: {
    'Content-Type': 'application/json',
  },
})

// ============================================================
// Request Interceptor — Gắn Access Token
// ============================================================
apiClient.interceptors.request.use(
  (config) => {
    // Lấy accessToken từ Zustand store (memory, không localStorage)
    const { accessToken } = useAuthStore.getState()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ============================================================
// Response Interceptor — Auto Refresh Token khi gặp 401
// ============================================================
let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  // Thành công: trả thẳng `response.data` (tức là ApiSuccess envelope)
  (response) => response.data,

  async (error) => {
    const originalRequest = error.config

    // Nếu lỗi 401 và chưa retry, thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Tránh vòng lặp vô tận khi chính route /refresh bị 401
      if (originalRequest.url?.includes('/auth/refresh')) {
        useAuthStore.getState().clearAuth()
        return Promise.reject(error.response?.data || error)
      }

      if (isRefreshing) {
        // Đang refresh → đưa vào hàng chờ
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((newToken) => {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return apiClient(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Gọi refresh — cookie tự động đính kèm do withCredentials
        const data = await axios.post<{ success: boolean; data: { accessToken: string } }>(
          '/api/auth/refresh',
          {},
          { withCredentials: true }
        )
        const newAccessToken = data.data.data.accessToken

        // Lưu vào Zustand store
        useAuthStore.getState().setAccessToken(newAccessToken)

        // Cập nhật default headers
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

        processQueue(null, newAccessToken)
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        // Refresh thất bại → logout
        useAuthStore.getState().clearAuth()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Mọi lỗi khác → ném theo định dạng ApiError của backend
    return Promise.reject(error.response?.data || error)
  }
)

export default apiClient
