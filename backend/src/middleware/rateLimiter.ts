import rateLimit from 'express-rate-limit'

/** Global rate limiter — 200 requests / 15 phút */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: 'Quá nhiều request, vui lòng thử lại sau',
    code: 'RATE_LIMITED',
  },
})

/** Auth rate limiter — 10 requests / 15 phút (chặn brute force login) */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'test' ? 1000 : 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: 'Quá nhiều lần thử đăng nhập, vui lòng thử lại sau 15 phút',
    code: 'RATE_LIMITED',
  },
})

/** Upload rate limiter — 20 uploads / 15 phút */
export const uploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    data: null,
    error: 'Quá nhiều lần upload, vui lòng thử lại sau',
    code: 'RATE_LIMITED',
  },
})
