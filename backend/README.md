# Laptop Store Backend (API)

Đây là phân hệ Backend của dự án Laptop Store E-commerce, cung cấp RESTful API cho Next.js Frontend.

## 🛠 Tech Stack
- **Runtime:** Node.js + Express.js
- **Network Pipeline:** Helmet, CORS, Rate Limiters
- **Database:** Prisma ORM + MySQL 8.0
- **Validation:** Zod schemas
- **Auth:** JWT (Access + Refresh Tokens in httpOnly Cookie)
- **Upload:** Cloudinary integration

## 📂 Cấu trúc thư mục
- `prisma/`: Chứa file `schema.prisma`, schema DB, và `seed.ts` để sinh dữ liệu mẫu.
- `src/lib/`: Các tiện ích cấu hình chính như DB singleton (`prisma.ts`), Error Types, Axios setup.
- `src/middleware/`: Pipeline xác thực auth, chặn spam API (`rateLimiter.ts`), bắt lỗi global (`errorHandler.ts`).
- `src/routes/`: Định nghĩa các API endpoints cho User, Product, Auth, Order.
- `src/app.ts`: Express application với đầy đủ configuration.
- `src/server.ts`: Entry point gọi app và kết nối thử CSDL.

## 🚀 Các lệnh phổ biến

- Xóa toàn hệ thống Data và nhét dữ liệu mẫu vào (Chỉ dùng khi Dev):
  ```bash
  npm run db:migrate && npm run db:seed
  ```
- Mở Prisma Studio để xem nội dung Database trên trình duyệt:
  ```bash
  npm run db:studio
  ```
- Build cho Production:
  ```bash
  npm run build
  ```

Biến môi trường cần có (Xác định trong root `docker/.env` và `backend/.env`):
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CLOUDINARY_URL` (nếu upload ảnh)
