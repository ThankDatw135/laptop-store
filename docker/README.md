# Docker Infrastructure

Thư mục này chứa cấu hình Docker để cung cấp môi trường cơ sở dữ liệu khi phát triển và test ứng dụng.

## 🐳 Services
- **`mysql_db`**: Cơ sở dữ liệu MySQL version 8. Lưu ý: dữ liệu được lưu persistent tại `/var/lib/mysql`.
- **`phpmyadmin`**: Giao diện UI Web giúp bạn quản lý trực tiếp database qua trình duyệt. Nhanh và phổ biến hơn Prisma Studio tùy sở thích cá nhân. Truy cập tại: `http://localhost:8080`.

## ⚙️ Các tập lệnh tiện lợi

Mở Terminal của VSCode tại thư mục gốc **ngoài cùng (`laptop-store/`)**, và chạy:

- Chạy database:
  ```bash
  npm run dev:db
  ```
- Tắt database:
  ```bash
  npm run db:stop
  ```
- Tắt rớt dữ liệu hoàn toàn (Clean sweep):
  ```bash
  npm run db:reset
  ```

⚠️ **Chú ý:**
Chỉ dùng docker stack này khi bạn phát triển Local. Với môi trường Production (như Railway/Vercel), dịch vụ database đã được nhà cung cấp hosting quản lý độc lập.
