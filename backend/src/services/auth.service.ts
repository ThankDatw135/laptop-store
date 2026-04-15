import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt'
import type { RegisterInput, LoginInput } from '../schemas/auth.schema'

// ============================================================
// Interfaces
// ============================================================

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface UserProfile {
  id: string         // cuid() → string
  email: string
  name: string
  phone: string | null
  role: string
  createdAt: Date
}

// ============================================================
// REGISTER — Tạo tài khoản mới
// ============================================================
export async function registerUser(input: RegisterInput): Promise<{ user: UserProfile; tokens: AuthTokens }> {
  const { name, email, password, phone } = input

  // Check email trùng trước để trả message rõ ràng hơn
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    const error = Object.assign(new Error('Email đã được sử dụng'), { statusCode: 409, code: 'DUPLICATE' })
    throw error
  }

  // Hash password với bcrypt cost factor 12
  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone: phone ?? null,
      role: 'USER', // dùng đúng enum trong schema Prisma
    },
    select: {
      id: true, email: true, name: true, phone: true, role: true, createdAt: true,
    },
  })

  const tokens = generateTokens(user.id, user.email, user.role)
  return { user: { ...user, role: user.role as string }, tokens }
}

// ============================================================
// LOGIN — Xác thực tài khoản
// ============================================================
export async function loginUser(input: LoginInput): Promise<{ user: UserProfile; tokens: AuthTokens }> {
  const { email, password } = input

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true, email: true, name: true, phone: true, role: true, password: true, createdAt: true,
    },
  })

  // Dùng 1 message chung để tránh User Enumeration Attack
  if (!user) throwUnauthorized()

  const isPasswordValid = await bcrypt.compare(password, user!.password)
  if (!isPasswordValid) throwUnauthorized()

  const { password: _pwd, ...userWithoutPassword } = user!
  const tokens = generateTokens(userWithoutPassword.id, userWithoutPassword.email, userWithoutPassword.role as string)

  return {
    user: { ...userWithoutPassword, role: userWithoutPassword.role as string },
    tokens,
  }
}

// ============================================================
// REFRESH — Cấp mới accessToken từ refreshToken
// ============================================================
export async function refreshTokens(refreshToken: string): Promise<AuthTokens> {
  let payload: { userId: string; tokenVersion: number }
  try {
    payload = verifyRefreshToken(refreshToken) as unknown as { userId: string; tokenVersion: number }
  } catch {
    throwUnauthorized('Refresh token không hợp lệ hoặc đã hết hạn')
  }

  const user = await prisma.user.findUnique({
    where: { id: payload!.userId },
    select: { id: true, email: true, role: true },
  })

  if (!user) throwUnauthorized('Người dùng không tồn tại')

  return generateTokens(user!.id, user!.email, user!.role as string)
}

// ============================================================
// GET ME
// ============================================================
export async function getUserById(userId: string): Promise<UserProfile> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true, email: true, name: true, phone: true, role: true, createdAt: true,
    },
  })

  if (!user) {
    throw Object.assign(new Error('Người dùng không tồn tại'), { statusCode: 404, code: 'NOT_FOUND' })
  }

  return { ...user, role: user.role as string }
}

// ============================================================
// Helpers nội bộ
// ============================================================

function generateTokens(userId: string, email: string, role: string): AuthTokens {
  const accessToken = signAccessToken({ userId, email, role })
  const refreshToken = signRefreshToken({ userId, tokenVersion: 1 })
  return { accessToken, refreshToken }
}

function throwUnauthorized(message = 'Email hoặc mật khẩu không đúng'): never {
  throw Object.assign(new Error(message), { statusCode: 401, code: 'UNAUTHORIZED' })
}
