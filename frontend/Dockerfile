# ==========================================
# Ghi chú: Chạy lệnh build ở thư mục gốc (laptop-store/)
# Lệnh: docker build -f frontend/Dockerfile .
# Yêu cầu cấu hình next.config.ts với output: 'standalone' nếu build Production.
# Trên Vercel, dockerfile này sẽ bị bỏ qua và Vercel tự xử lý. File này hữu ích khi host trên VPS/Railway.
# ==========================================

FROM node:20-alpine AS builder
WORKDIR /app

# Khai báo môi trường tĩnh (Dành cho quá trình build time)
ENV NODE_ENV=production

# 1. Copy config packages
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY frontend/package*.json ./frontend/

# 2. Cài dependency cho FrontEnd và Shared 
RUN npm install
RUN cd shared && npm install
RUN cd frontend && npm install

# 3. Copy Code
COPY shared/ ./shared/
COPY frontend/ ./frontend/

# 4. Cấp quyền Nextjs Telemetry opt-out
ENV NEXT_TELEMETRY_DISABLED=1

# 5. Build code
RUN cd shared && npm run build || true
# Cần set NEXT_PUBLIC_API_URL ở production args nếu cần
RUN cd frontend && npm run build

# ==========================================
# STAGE 2: PRODUCTION
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Vì Next.js output standalone sinh ra một thư mục đầy đủ thư viện node_modules ở folder con:
# Tham khảo thêm https://nextjs.org/docs/pages/api-reference/next-config-js/output
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/.next/standalone ./
COPY --from=builder /app/frontend/.next/static ./frontend/.next/static

WORKDIR /app/frontend
EXPOSE 3000

CMD ["node", "server.js"]
