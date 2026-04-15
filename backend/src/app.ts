import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { env } from './lib/env'
import { globalRateLimiter } from './middleware/rateLimiter'
import { errorHandler } from './middleware/errorHandler'
import { sendError } from './lib/response'
import healthRouter from './routes/health.routes'
import authRouter from './routes/auth.routes'

const app = express()

// ============================================================
// Middleware Pipeline (theo thứ tự quan trọng)
// ============================================================

// 1. Security headers
app.use(helmet())

// 2. CORS — chỉ cho phép frontend domain
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true, // Quan trọng: cho phép gửi cookie (refreshToken)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// 3. Parse cookies (refreshToken)
app.use(cookieParser())

// 4. Parse JSON body (giới hạn 10kb để tránh payload attacks)
app.use(express.json({ limit: '10kb' }))

// 5. Global rate limiter
app.use(globalRateLimiter)

// ============================================================
// Routes
// ============================================================

// Health check
app.use('/health', healthRouter)
app.use('/api', healthRouter) // /api/ping

// Phase 2: Auth routes (rate limiter nằm trong router)
app.use('/api/auth', authRouter)

// TODO Phase 3: Product routes
// app.use('/api/products', productRouter)
// app.use('/api/categories', categoryRouter)
// app.use('/api/upload', authenticate, authorize('ADMIN'), uploadRouter)

// TODO Phase 4: Order routes
// app.use('/api/orders', orderRouter)

// TODO Phase 5: Payment routes
// app.use('/api/payment', paymentRouter)

// TODO Phase 3+: Review & Address routes
// app.use('/api/reviews', reviewRouter)
// app.use('/api/addresses', authenticate, addressRouter)

// TODO Phase 7: Admin routes
// app.use('/api/admin', authenticate, authorize('ADMIN'), adminRouter)

// ============================================================
// 404 Handler — Unknown routes
// ============================================================
app.use('*', (req, res) => {
  sendError(res, 404, `Route ${req.method} ${req.originalUrl} không tồn tại`, 'NOT_FOUND')
})

// ============================================================
// Global Error Handler (PHẢI ở cuối cùng)
// ============================================================
app.use(errorHandler)

export default app
