// ============================================================
// API Response Envelope Types — Single Source of Truth
// Dùng ở cả frontend và backend
// ============================================================

/** Response thành công — single item */
export interface ApiSuccess<T> {
  success: true
  data: T
  error: null
}

/** Response thành công — danh sách có phân trang */
export interface ApiPaginated<T> {
  success: true
  data: {
    items: T[]
    total: number
    page: number
    limit: number
    totalPages: number
    facets?: FacetMap
  }
  error: null
}

/** Response lỗi */
export interface ApiError {
  success: false
  data: null
  error: string
  code?: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError
export type PaginatedResponse<T> = ApiPaginated<T> | ApiError

// ============================================================
// Facets cho Filter Panel
// ============================================================
export interface FacetMap {
  brand: FacetItem[]
  gpu: FacetItem[]
  ram: FacetItem[]
  cpu: FacetItem[]
  panel: FacetItem[]
  refreshRate: FacetItem[]
  os: FacetItem[]
  weight: FacetItem[]
}

export interface FacetItem {
  value: string
  label: string
  count: number
}

// ============================================================
// Error Codes — Nhất quán giữa FE và BE
// ============================================================
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  DUPLICATE: 'DUPLICATE',
  RATE_LIMITED: 'RATE_LIMITED',
  PAYMENT_SIGNATURE_FAIL: 'PAYMENT_SIGNATURE_FAIL',
  ORDER_ALREADY_PAID: 'ORDER_ALREADY_PAID',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]
