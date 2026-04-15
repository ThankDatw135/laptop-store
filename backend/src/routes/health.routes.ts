import { Router } from 'express'
import { sendSuccess } from '../lib/response'

const router = Router()

/** GET /health — Health check */
router.get('/', (req, res) => {
  sendSuccess(res, {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  })
})

/** GET /api/ping — API ping */
router.get('/ping', (req, res) => {
  sendSuccess(res, { message: 'pong', timestamp: new Date().toISOString() })
})

export default router
