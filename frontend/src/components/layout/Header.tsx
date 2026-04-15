'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuthStore } from '@/stores/auth.store'
import { useLogout } from '@/hooks/useAuth'
import { ShoppingCart, User, Menu, X, Laptop, LogOut, ChevronDown } from 'lucide-react'

export function Header() {
  const { isAuthenticated, user } = useAuthStore()
  const { mutate: logout, isPending: isLoggingOut } = useLogout()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-blue-600">
          <Laptop className="h-6 w-6" />
          <span className="text-lg tracking-tight">LAPTOP STORE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/danh-muc/gaming"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            🎮 Laptop Gaming
          </Link>
          <Link
            href="/danh-muc/office"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            💼 Laptop Văn Phòng
          </Link>
          <Link
            href="/danh-muc/student"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            🎓 Laptop Sinh Viên
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            id="btn-header-cart"
            href="/gio-hang"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="h-5 w-5" />
            {/* Badge số lượng — Phase 4 */}
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              0
            </span>
          </Link>

          {/* User Menu */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                id="btn-header-user-menu"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden max-w-[100px] truncate md:block">{user.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </button>

              {/* Dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-1 w-52 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                  <div className="border-b border-gray-100 px-4 py-2.5">
                    <p className="text-xs text-gray-500">Đã đăng nhập với</p>
                    <p className="truncate text-sm font-medium text-gray-800">{user.email}</p>
                  </div>
                  <Link
                    id="link-header-profile"
                    href="/tai-khoan"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <User className="h-4 w-4 text-gray-400" />
                    Tài khoản của tôi
                  </Link>
                  <Link
                    id="link-header-orders"
                    href="/don-hang"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <ShoppingCart className="h-4 w-4 text-gray-400" />
                    Đơn hàng của tôi
                  </Link>
                  <div className="my-1 border-t border-gray-100" />
                  <button
                    id="btn-header-logout"
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      logout()
                    }}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4" />
                    {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                id="btn-header-login"
                href="/dang-nhap"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Đăng nhập
              </Link>
              <Link
                id="btn-header-register"
                href="/dang-ky"
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            id="btn-header-mobile-menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Mở menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/danh-muc/gaming"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              🎮 Laptop Gaming
            </Link>
            <Link
              href="/danh-muc/office"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              💼 Laptop Văn Phòng
            </Link>
            <Link
              href="/danh-muc/student"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              🎓 Laptop Sinh Viên
            </Link>
            {!isAuthenticated && (
              <div className="mt-2 flex gap-2 border-t border-gray-100 pt-2">
                <Link
                  href="/dang-nhap"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
