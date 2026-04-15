// ============================================================
// Review Types
// ============================================================

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string      // Tên hiển thị (from User)
  userAvatar: string | null
  rating: number        // 1-5
  title: string | null
  content: string
  images: string[]      // Cloudinary URLs
  isVerifiedPurchase: boolean
  createdAt: string
}

export interface CreateReviewRequest {
  productId: string
  rating: number
  title?: string
  content: string
  images?: string[]
}

// ============================================================
// Address Types
// ============================================================

export interface Address {
  id: string
  userId: string
  recipientName: string
  phone: string
  province: string
  district: string
  ward: string
  detail: string
  isDefault: boolean
}
