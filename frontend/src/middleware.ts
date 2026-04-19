import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Các route cần đăng nhập
const protectedRoutes = ['/tai-khoan', '/thanh-toan', '/don-hang']
// Các route chỉ admin mới được vào
const adminRoutes = ['/admin']

export function middleware(request: NextRequest) {
  // Lấy refresh token từ cookie
  const refreshToken = request.cookies.get('refresh_token')?.value
  const { pathname } = request.nextUrl

  // 1. Kiểm tra protected routes
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  if (isProtectedRoute && !refreshToken) {
    const loginUrl = new URL('/dang-nhap', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 2. Chặn route auth nếu đã đăng nhập (vd: vào /dang-nhap khi đã login)
  if (refreshToken && (pathname === '/dang-nhap' || pathname === '/dang-ky')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 3. Admin routes sẽ được check role bằng API ở component/layout hoặc RSC
  // Middleware không thể check JWT role vì JWT access token lưu trong memory của client (không phải cookie)
  // Chỉ có refresh_token là có thể đọc được ở middleware.

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/tai-khoan/:path*',
    '/thanh-toan/:path*',
    '/don-hang/:path*',
    '/admin/:path*',
    '/dang-nhap',
    '/dang-ky'
  ],
}
