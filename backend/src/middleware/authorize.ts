import { Request, Response, NextFunction } from 'express'
import { sendError } from '../lib/response'

/**
 * Middleware: Phân quyền theo Role (RBAC)
 * Phải dùng SAU middleware authenticate
 *
 * @example
 * router.delete('/products/:id', authenticate, authorize('ADMIN'), deleteProduct)
 */
export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Nếu không có user (chưa authenticate), trả 401
    if (!req.user) {
      sendError(res, 401, 'Bạn cần đăng nhập để thực hiện thao tác này', 'UNAUTHORIZED')
      return
    }

    // Nếu role không nằm trong danh sách cho phép, trả 403
    if (!roles.includes(req.user.role)) {
      sendError(
        res,
        403,
        'Bạn không có quyền thực hiện thao tác này',
        'FORBIDDEN'
      )
      return
    }

    next()
  }
}
