'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRegister } from '@/hooks/useAuth'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Họ tên tối thiểu 2 ký tự').max(100),
    email: z.string().email('Email không hợp lệ'),
    phone: z
      .string()
      .regex(/^(0|\+84)[3-9]\d{8}$/, 'Số điện thoại Việt Nam không hợp lệ')
      .optional()
      .or(z.literal('')),
    password: z
      .string()
      .min(8, 'Mật khẩu tối thiểu 8 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function DangKyPage() {
  const { mutate: register, isPending } = useRegister()

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = ({ confirmPassword: _, ...data }: RegisterFormData) => {
    register({ ...data, phone: data.phone || undefined })
  }

  const inputClass = (hasError: boolean) =>
    `mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
      hasError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
    }`

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tạo tài khoản</h1>
        <p className="mt-1 text-sm text-gray-500">
          Đã có tài khoản?{' '}
          <Link href="/dang-nhap" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Họ tên */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...formRegister('name')}
            className={inputClass(!!errors.name)}
            placeholder="Nguyễn Văn A"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...formRegister('email')}
            className={inputClass(!!errors.email)}
            placeholder="email@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Số điện thoại */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Số điện thoại{' '}
            <span className="text-gray-400 text-xs">(tùy chọn)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...formRegister('phone')}
            className={inputClass(!!errors.phone)}
            placeholder="0901234567"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Mật khẩu */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...formRegister('password')}
            className={inputClass(!!errors.password)}
            placeholder="Tối thiểu 8 ký tự"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Xác nhận mật khẩu */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...formRegister('confirmPassword')}
            className={inputClass(!!errors.confirmPassword)}
            placeholder="Nhập lại mật khẩu"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          id="btn-register-submit"
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
        </button>

        <p className="text-center text-xs text-gray-500">
          Bằng cách đăng ký, bạn đồng ý với{' '}
          <Link href="/dieu-khoan" className="text-blue-600 hover:underline">
            Điều khoản sử dụng
          </Link>{' '}
          và{' '}
          <Link href="/chinh-sach-bao-mat" className="text-blue-600 hover:underline">
            Chính sách bảo mật
          </Link>
        </p>
      </form>
    </div>
  )
}
