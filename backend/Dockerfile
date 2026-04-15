# ==========================================
# Ghi chú: Chạy lệnh build ở thư mục gốc (laptop-store/)
# Lệnh: docker build -f backend/Dockerfile .
# ==========================================

FROM node:20-alpine AS builder
WORKDIR /app

ENV NODE_ENV=production

# 1. Copy config files của root và workspaces
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY backend/package*.json ./backend/

# 2. Cài đặt toàn bộ dependencies (giữ devDependencies để tsc build)
RUN npm install
RUN cd shared && npm install
RUN cd backend && npm install

# 3. Copy toàn bộ source code
COPY shared/ ./shared/
COPY backend/ ./backend/

# 4. Generate Prisma Client
RUN cd backend && npx prisma generate

# 5. Build code
RUN cd shared && npm run build || true
RUN cd backend && npm run build

# ==========================================
# STAGE 2: PRODUCTION
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy package info
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/shared/package*.json ./shared/
COPY --from=builder /app/backend/package*.json ./backend/

# Copy thư mục node_modules 
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/shared/node_modules ./shared/node_modules
COPY --from=builder /app/backend/node_modules ./backend/node_modules

# Copy source đã build
COPY --from=builder /app/shared/src ./shared/src
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/prisma ./backend/prisma

WORKDIR /app/backend
EXPOSE 3001

CMD ["npm", "start"]
