import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { sendError } from '../lib/response'
import { ERROR_CODES } from '../../../shared/src/types/api.types'

/**
 * Global Error Handler — middleware cuối cùng trong pipeline
 * Bắt tất cả lỗi từ asyncHandler và next(error)
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log lỗi (production: chỉ log error, dev: log full stack)
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err)
  } else {
    console.error('❌ Error:', err.message)
  }

  // Zod validation error
  if (err instanceof ZodError) {
    const messages = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')
    sendError(res, 400, messages, ERROR_CODES.VALIDATION_ERROR)
    return
  }

  // Prisma: Unique constraint violation (email đã tồn tại, slug trùng...)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[])?.join(', ') || 'field'
      sendError(res, 409, `${field} đã tồn tại`, ERROR_CODES.DUPLICATE)
      return
    }
    // Record not found
    if (err.code === 'P2025') {
      sendError(res, 404, 'Không tìm thấy dữ liệu', ERROR_CODES.NOT_FOUND)
      return
    }
  }

  // Prisma: Validation error
  if (err instanceof Prisma.PrismaClientValidationError) {
    sendError(res, 400, 'Dữ liệu không hợp lệ', ERROR_CODES.VALIDATION_ERROR)
    return
  }

  // JWT errors — được xử lý trong auth middleware, nhưng phòng thủ thêm
  if (err.name === 'JsonWebTokenError') {
    sendError(res, 401, 'Token không hợp lệ', ERROR_CODES.UNAUTHORIZED)
    return
  }
  if (err.name === 'TokenExpiredError') {
    sendError(res, 401, 'Token đã hết hạn', ERROR_CODES.TOKEN_EXPIRED)
    return
  }

  // Default: Internal Server Error
  sendError(res, 500, 'Đã xảy ra lỗi, vui lòng thử lại sau', ERROR_CODES.INTERNAL_ERROR)
}
