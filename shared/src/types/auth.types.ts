// ============================================================
// Auth Types — Single Source of Truth
// ============================================================

export type UserRole = 'USER' | 'ADMIN'

export interface User {
  id: string
  email: string
  name: string
  phone: string | null
  avatar: string | null
  role: UserRole
  createdAt: string
}

/** Response body khi login/register thành công */
export interface LoginResponse {
  user: User
  accessToken: string
  // refreshToken: KHÔNG có trong body — chỉ Set-Cookie httpOnly
}

/** Body gửi lên khi login */
export interface LoginRequest {
  email: string
  password: string
}

/** Body gửi lên khi register */
export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone?: string
}
