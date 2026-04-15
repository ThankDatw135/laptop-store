import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../../src/app'
import { prisma } from '../../src/lib/prisma'

// ============================================================
// Setup & Teardown
// ============================================================

const TEST_USER = {
  name: 'Test User Auth',
  email: 'test-auth@laptopstore.test',
  password: 'Password123',
  phone: '0901234567',
}

beforeAll(async () => {
  // Xóa user test trước để tránh conflict
  await prisma.user.deleteMany({ where: { email: TEST_USER.email } })
})

afterAll(async () => {
  // Dọn dẹp sau khi test xong
  await prisma.user.deleteMany({ where: { email: TEST_USER.email } })
  await prisma.$disconnect()
})

// ============================================================
// POST /api/auth/register
// ============================================================
describe('POST /api/auth/register', () => {
  it('✅ Đăng ký thành công với input hợp lệ', async () => {
    const res = await request(app).post('/api/auth/register').send(TEST_USER)

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.user.email).toBe(TEST_USER.email)
    expect(res.body.data.user.name).toBe(TEST_USER.name)
    expect(res.body.data.accessToken).toBeTruthy()
    // Không được trả về password
    expect(res.body.data.user.password).toBeUndefined()
    // Kiểm tra httpOnly cookie được set
    expect(res.headers['set-cookie']).toBeDefined()
  })

  it('❌ Báo lỗi 409 khi email đã tồn tại', async () => {
    const res = await request(app).post('/api/auth/register').send(TEST_USER)

    expect(res.status).toBe(409)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toMatch(/Email đã được sử dụng/)
  })

  it('❌ Báo lỗi 400 khi email không hợp lệ', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...TEST_USER, email: 'not-an-email' })

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('❌ Báo lỗi 400 khi password quá yếu', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...TEST_USER, email: 'other@test.com', password: 'weak' })

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })
})

// ============================================================
// POST /api/auth/login
// ============================================================
describe('POST /api/auth/login', () => {
  let accessToken: string
  let cookieHeader: string[]

  it('✅ Đăng nhập thành công với credentials đúng', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_USER.email, password: TEST_USER.password })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.accessToken).toBeTruthy()
    expect(res.body.data.user.email).toBe(TEST_USER.email)
    expect(res.headers['set-cookie']).toBeDefined()

    accessToken = res.body.data.accessToken
    cookieHeader = res.headers['set-cookie'] as string[]
  })

  it('❌ Báo lỗi 401 khi sai mật khẩu', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_USER.email, password: 'WrongPassword1' })

    expect(res.status).toBe(401)
    expect(res.body.success).toBe(false)
    // Không được tiết lộ "sai mật khẩu" hay "email không tồn tại"
    expect(res.body.error).toMatch(/Email hoặc mật khẩu không đúng/)
  })

  it('❌ Báo lỗi 401 khi email không tồn tại', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ghost@test.com', password: 'Password123' })

    expect(res.status).toBe(401)
    // Cùng message — tránh User Enumeration Attack
    expect(res.body.error).toMatch(/Email hoặc mật khẩu không đúng/)
  })

  // ============================================================
  // GET /api/auth/me — cần token
  // ============================================================
  describe('GET /api/auth/me', () => {
    it('✅ Trả về thông tin user khi có token hợp lệ', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.email).toBe(TEST_USER.email)
      expect(res.body.data.password).toBeUndefined()
    })

    it('❌ Trả về 401 khi không có token', async () => {
      const res = await request(app).get('/api/auth/me')

      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('❌ Trả về 401 khi token giả mạo', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.signature')

      expect(res.status).toBe(401)
    })
  })

  // ============================================================
  // POST /api/auth/refresh
  // ============================================================
  describe('POST /api/auth/refresh', () => {
    it('✅ Cấp lại accessToken mới khi có refresh token hợp lệ', async () => {
      const res = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', cookieHeader)

      expect(res.status).toBe(200)
      expect(res.body.data.accessToken).toBeTruthy()
      // Token mới phải khác token cũ
      expect(res.body.data.accessToken).not.toBe(accessToken)
    })

    it('❌ Trả về 401 khi không có cookie', async () => {
      const res = await request(app).post('/api/auth/refresh')

      expect(res.status).toBe(401)
    })
  })

  // ============================================================
  // POST /api/auth/logout
  // ============================================================
  describe('POST /api/auth/logout', () => {
    it('✅ Logout thành công và xóa cookie', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', cookieHeader)

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)

      // Cookie phải bị xóa (set-cookie với max-age=0 hoặc expires trong quá khứ)
      const setCookieHeader = res.headers['set-cookie'] as string[] | undefined
      if (setCookieHeader) {
        const refreshCookie = setCookieHeader.find((c) => c.includes('refresh_token'))
        expect(refreshCookie).toMatch(/Max-Age=0|Expires=Thu, 01 Jan 1970/i)
      }
    })
  })
})

// ============================================================
// Rate Limiting — Auth routes  
// ============================================================
describe('Rate Limiting on Auth routes', () => {
  it('✅ Cho phép request bình thường', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nonexist@test.com', password: 'Password123' })

    // Dù sai credentials vẫn không bị rate limit ngay lần đầu
    expect(res.status).not.toBe(429)
  })
})
