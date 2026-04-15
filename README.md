# Laptop Store VN 🛒💻

Hệ thống E-Commerce chuyên bán laptop văn phòng và gaming cao cấp, dành riêng cho thị trường Việt Nam.

## 🏗 Kiến trúc (Monorepo)
Dự án được ứng dụng kiến trúc 3-Tier với sự phân tách chuẩn rõ ràng thành các micro-packages độc lập:
1. **Frontend (`/frontend`)**: Giao diện khách hàng và Admin xây dựng trên **Next.js 14+ (App Router)** và **Tailwind CSS v4**. Tối ưu mạnh mẽ SEO và trải nghiệm mượt mà UX bằng SSR + React Query Cache.
2. **Backend (`/backend`)**: Hệ thống cốt lõi RESTful API cho phép giao tiếp phi đồng bộ thông qua **Node.js + Express.js**. Quản trị luồng thanh toán và cơ sở dữ liệu.
3. **Shared (`/shared`)**: Điểm hội tụ của sự chuẩn xác *(Single Source of Truth)*. Tất cả TypeScript interface, cấu trúc JSON response/error của cả Client và Server đều nằm tại đây để tranh rủi ro lệch kiểu.
4. **Database Infrastruture (`/docker`)**: Thiết lập Docker local giúp khởi tạo **MySQL 8.0** trong thời gian tính bằng giây.

## ⌨️ Bắt đầu (Get Started)

### 1. Chuẩn bị Môi trường
Tạo bản sao biến môi trường (Lấy các key thật hoặc setup sandbox nếu chạy ở env local):
- Sao chép `.env.example` -> đổi tên thành `.env` (trong thư mục `laptop-store/`)
- Sao chép `docker/.env.example` -> đổi tên thành `.env` (trong thư mục `docker/`)
- Sao chép `backend/.env.example` -> đổi tên thành `.env` (nếu có, trong thư mục `backend/`)

### 2. Cài đặt các modules
Lệnh này sẽ quét toàn bộ repo và lấy tất cả các dependency tĩnh từ NPM:
```bash
npm run install:all
```

### 3. Khởi chạy Database
Yêu cầu đã cài đặt Docker Desktop hoặc Docker Engine:
```bash
npm run dev:db
```

### 4. Đẩy schema và dữ liệu mẫu (Migrate & Seed)
```bash
cd backend
npm run db:push
npm run db:seed
```

### 5. Khởi động Ứng dụng (Chế độ phát triển)
```bash
# Ở Terminal gốc (laptop-store/)
npm run dev:fe # Bật giao diện
npm run dev:be # Bật Application server
```

## 📜 Các công nghệ tích hợp
- Thanh toán VNPay + MoMo Webhooks (Sandbox).
- Hệ thống Upload Ảnh tự động với cơ chế thu nhỏ từ dịch vụ CDN Cloudinary (`/images`).
- Bảo mật JWT Session xoay vòng token qua `httpOnly Cookie`.

## 📦 Triển khai (Deploy)
* Tham khảo sơ lược: (Tất cả được CI/CD định hình tự động).
- `Frontend` tự động trỏ tới `Vercel` Serverless architecture.
- `Backend` build ra Image Container thông qua file `Dockerfile` và thả lên nhà cung cấp `Railway.app`.
