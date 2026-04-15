import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import { authenticate } from '../middleware/authenticate'
import { authRateLimiter } from '../middleware/rateLimiter'

const router = Router()

// Áp dụng rate limiter cho tất cả auth routes (chống brute-force)
router.use(authRateLimiter)

// ----- Public routes -----
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)

// ----- Protected routes -----
router.get('/me', authenticate, authController.getMe)

export default router
