import jwt, { SignOptions } from 'jsonwebtoken'
import { env } from './env'

// ============================================================
// Interfaces
// ============================================================

export interface AccessTokenPayload {
  userId: string   // cuid() string trong Prisma schema
  email: string
  role: string
}

export interface RefreshTokenPayload {
  userId: string
  tokenVersion: number
}

// ============================================================
// Access Token — ngắn hạn (15 phút), lưu trong memory
// ============================================================

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  } as SignOptions)
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload
}

// ============================================================
// Refresh Token — dài hạn (7 ngày), lưu trong httpOnly cookie
// ============================================================

export function signRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  } as SignOptions)
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload
}
