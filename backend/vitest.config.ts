import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // Timeout dài hơn vì integration test cần kết nối DB thật
    testTimeout: 30000,
    hookTimeout: 30000,
    // Chạy test tuần tự (không parallel) tránh conflict DB
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    // Tự động load .env trước khi test
    env: {
      NODE_ENV: 'test',
    },
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src'),
    },
  },
})
