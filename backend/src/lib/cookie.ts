import { Response } from 'express'

// Tên cookie — nhất quán giữa set và clear
export const REFRESH_TOKEN_COOKIE = 'refresh_token'

// Số ms của 7 ngày
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

/**
 * Đặt refreshToken vào httpOnly cookie — không thể đọc bằng JS
 * (Bảo vệ chống XSS)
 */
export function setRefreshTokenCookie(res: Response, token: string): void {
  res.cookie(REFRESH_TOKEN_COOKIE, token, {
    httpOnly: true,                                    // Không thể đọc bằng JS
    secure: process.env.NODE_ENV === 'production',     // Chỉ HTTPS trên production
    sameSite: 'strict',                                // Chống CSRF
    maxAge: SEVEN_DAYS_MS,
    path: '/api/auth',                                 // Chỉ gửi cookie khi gọi /api/auth
  })
}

/**
 * Xóa refreshToken cookie — khi logout
 */
export function clearRefreshTokenCookie(res: Response): void {
  res.clearCookie(REFRESH_TOKEN_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth',
  })
}
