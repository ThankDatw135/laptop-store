import { Request, Response } from 'express'
import { asyncHandler } from '../lib/asyncHandler'
import { sendSuccess, sendError } from '../lib/response'
import { registerSchema, loginSchema } from '../schemas/auth.schema'
import * as authService from '../services/auth.service'
import { setRefreshTokenCookie, clearRefreshTokenCookie, REFRESH_TOKEN_COOKIE } from '../lib/cookie'

// ============================================================
// POST /api/auth/register
// ============================================================
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { body } = registerSchema.parse({ body: req.body })
  const { user, tokens } = await authService.registerUser(body)

  setRefreshTokenCookie(res, tokens.refreshToken)

  sendSuccess(res, { user, accessToken: tokens.accessToken }, 201)
})

// ============================================================
// POST /api/auth/login
// ============================================================
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { body } = loginSchema.parse({ body: req.body })
  const { user, tokens } = await authService.loginUser(body)

  setRefreshTokenCookie(res, tokens.refreshToken)

  sendSuccess(res, { user, accessToken: tokens.accessToken })
})

// ============================================================
// POST /api/auth/refresh
// ============================================================
export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE]

  if (!refreshToken) {
    sendError(res, 401, 'Không tìm thấy refresh token', 'UNAUTHORIZED')
    return
  }

  const tokens = await authService.refreshTokens(refreshToken)

  // Xoay vòng luôn refresh token mới
  setRefreshTokenCookie(res, tokens.refreshToken)

  sendSuccess(res, { accessToken: tokens.accessToken })
})

// ============================================================
// POST /api/auth/logout
// ============================================================
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearRefreshTokenCookie(res)
  sendSuccess(res, null)
})

// ============================================================
// GET /api/auth/me — Cần authenticate middleware
// ============================================================
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, 401, 'Chưa xác thực', 'UNAUTHORIZED')
    return
  }

  const user = await authService.getUserById(req.user.userId)
  sendSuccess(res, user)
})
