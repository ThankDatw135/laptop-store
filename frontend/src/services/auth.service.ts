import apiClient from '@/lib/api-client'
import type { AuthUser } from '@/stores/auth.store'

interface AuthResponse {
  user: AuthUser
  accessToken: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  phone?: string
}

export interface LoginPayload {
  email: string
  password: string
}

// POST /api/auth/register
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await apiClient.post<{ success: true; data: AuthResponse }>('/api/auth/register', payload)
  return (res as unknown as { success: true; data: AuthResponse }).data
}

// POST /api/auth/login
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await apiClient.post<{ success: true; data: AuthResponse }>('/api/auth/login', payload)
  return (res as unknown as { success: true; data: AuthResponse }).data
}

// POST /api/auth/logout
export async function logout(): Promise<void> {
  await apiClient.post('/api/auth/logout')
}

// GET /api/auth/me
export async function getMe(): Promise<AuthUser> {
  const res = await apiClient.get<{ success: true; data: AuthUser }>('/api/auth/me')
  return (res as unknown as { success: true; data: AuthUser }).data
}
