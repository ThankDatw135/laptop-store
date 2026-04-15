# Lớp Giao Diện Khách Hàng (Next.js Frontend)

Đây là phân hệ Front-end của dự án Laptop Store E-commerce, được khởi tạo dựa trên bộ thư viện `create-next-app` chính thức và sử dụng công nghệ App Router mới nhất của Next.js 14+.

## 🚀 Hướng Dẫn Chạy Môi Trường Phát Triển

Để chạy server Next.js ở môi trường development:

```bash
# Ưu tiên sử dụng lệnh này trên terminal ngoài cùng
npm run dev:fe

# Hoặc bên trong thư mục frontend:
npm run dev
```

Tiếp theo, mở trình duyệt ở đường dẫn [http://localhost:3000](http://localhost:3000) để xem trước website.

Mọi chỉnh sửa trong các compoenents và pages (ví dụ thư mục `src/app/`) đều sẽ kích hoạt Hot-Reloading, cập nhật ngay lập tức mà không cần F5 trình duyệt.

## 🗂 Cấu Trúc Khung

- `src/app/`: Chứa toàn bộ cấu trúc Route của website (Gồm Route Nhóm `(store)` và `(auth)`).
- `src/components/`: Nơi lưu trữ Components dùng chung phân chia theo khối UI.
- `src/lib/`: Các tiện ích cài đặt liên quan tới Request Data, Axios Interceptors (tự sửa lỗi kết nối).
- `src/providers/`: Hỗ trợ đóng gói React Context API (React Query Client).
- `src/stores/`: Thư mục chứa State Management được quản trị dựa vào kĩ thuật Zustand thay vì Redux cồng kềnh.

## ✨ Tính năng và Tài nguyên Nổi Bật

- Framework Web: [Next.js Documentation](https://nextjs.org/docs)
- Tối ưu Font: Tự động tải phông chữ tiếng việt **Be Vietnam Pro** tại layout gốc nhằm tránh hoàn toàn hiện tượng nhấp nháy Layout (CLS Core Web Vitals) khi Web load.
- Styling: Lược đồ giao diện **Tailwind V4** mạnh mẽ không cần file config js nặng nề.

## 🚀 Triển khai thực tế

Website này được thiết kế để tự động deploy suôn sẻ lên nền kinh tế đám mây hiện đại, đơn giản và ổn định nhất là **Vercel** serverless. Phân hệ App Router tương thích 100% với môi trường điện toán mây phân tán.
