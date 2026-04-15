// Import env validation TRƯỚC TIÊN — crash nếu thiếu env vars
import './lib/env'

import app from './app'
import { env } from './lib/env'
import { prisma } from './lib/prisma'

const PORT = parseInt(env.PORT, 10)

async function main() {
  // Test database connection
  try {
    await prisma.$connect()
    console.log('✅ Database connected')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`
🚀 Laptop Store API đang chạy!
📍 URL:         http://localhost:${PORT}
🌍 Environment: ${env.NODE_ENV}
🔗 Frontend:    ${env.FRONTEND_URL}
🏥 Health:      http://localhost:${PORT}/health
    `)
  })
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

main()
