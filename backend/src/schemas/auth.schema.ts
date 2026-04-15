import { z } from 'zod'

// ============================================================
// Register Schema
// ============================================================
export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Họ tên tối thiểu 2 ký tự')
      .max(100, 'Họ tên tối đa 100 ký tự')
      .trim(),

    email: z
      .string()
      .email('Email không hợp lệ')
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(8, 'Mật khẩu tối thiểu 8 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
      ),

    phone: z
      .string()
      .regex(/^(0|\+84)[3-9]\d{8}$/, 'Số điện thoại Việt Nam không hợp lệ')
      .optional(),
  }),
})

// ============================================================
// Login Schema
// ============================================================
export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('Email không hợp lệ')
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(1, 'Vui lòng nhập mật khẩu'),
  }),
})

// TypeScript types suy ra từ schema
export type RegisterInput = z.infer<typeof registerSchema>['body']
export type LoginInput = z.infer<typeof loginSchema>['body']
