import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken, AccessTokenPayload } from '../lib/jwt'
import { sendError } from '../lib/response'

// Mở rộng Express Request để gắn user vào req
declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload
    }
  }
}

/**
 * Middleware: Xác thực JWT Bearer Token
 * Gắn req.user nếu token hợp lệ, ngược lại trả 401
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  // Lấy token từ Authorization header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 401, 'Bạn cần đăng nhập để thực hiện thao tác này', 'UNAUTHORIZED')
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = verifyAccessToken(token)
    req.user = payload
    next()
  } catch (err) {
    // TokenExpiredError hay JsonWebTokenError đều trả 401
    const isExpired = (err as Error).name === 'TokenExpiredError'
    sendError(
      res,
      401,
      isExpired ? 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' : 'Token không hợp lệ',
      isExpired ? 'TOKEN_EXPIRED' : 'UNAUTHORIZED'
    )
  }
}

/**
 * Middleware: Tùy chọn xác thực — không báo lỗi nếu không có token
 * Dùng cho các route vừa hỗ trợ guest vừa hỗ trợ user đã đăng nhập
 */
export function optionalAuthenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Không có token → tiếp tục với req.user = undefined
    next()
    return
  }

  const token = authHeader.split(' ')[1]
  try {
    req.user = verifyAccessToken(token)
  } catch {
    // Token lỗi → bỏ qua, tiếp tục như guest
  }
  next()
}
