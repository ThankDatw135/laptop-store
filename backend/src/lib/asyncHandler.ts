import { Request, Response, NextFunction, RequestHandler } from 'express'

/**
 * Wrapper bắt lỗi async tự động — không cần try/catch trong mỗi controller
 *
 * Usage:
 *   router.get('/products', asyncHandler(getProducts))
 */
export function asyncHandler(fn: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
