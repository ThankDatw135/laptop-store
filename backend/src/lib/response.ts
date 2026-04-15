import { Request, Response } from 'express'
import type { ApiSuccess, ApiPaginated, ApiError } from '../../../shared/src/types/api.types'

// ============================================================
// Response Helpers — Nhất quán 100% theo API contract
// ============================================================

/** Trả về response thành công — single item */
export function sendSuccess<T>(res: Response, data: T, statusCode = 200): Response {
  const body: ApiSuccess<T> = {
    success: true,
    data,
    error: null,
  }
  return res.status(statusCode).json(body)
}

/** Trả về response thành công — danh sách có phân trang */
export function sendPaginated<T>(
  res: Response,
  items: T[],
  total: number,
  page: number,
  limit: number,
  facets?: ApiPaginated<T>['data']['facets']
): Response {
  const body: ApiPaginated<T> = {
    success: true,
    data: {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      ...(facets && { facets }),
    },
    error: null,
  }
  return res.status(200).json(body)
}

/** Trả về response lỗi */
export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  code?: string
): Response {
  const body: ApiError = {
    success: false,
    data: null,
    error: message,
    ...(code && { code }),
  }
  return res.status(statusCode).json(body)
}
