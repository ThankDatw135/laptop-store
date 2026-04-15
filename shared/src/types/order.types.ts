// ============================================================
// Order Types — Single Source of Truth
// ============================================================

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

export type PaymentMethod =
  | 'MOMO'
  | 'VNPAY'
  | 'ZALOPAY'
  | 'COD'
  | 'INSTALLMENT'
  | 'BANK_TRANSFER'

export interface ShippingAddress {
  recipientName: string
  phone: string
  province: string
  district: string
  ward: string
  detail: string // Số nhà, tên đường
}

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number                  // Snapshot giá lúc mua (VNĐ)
  productNameSnapshot: string    // Tên sản phẩm lúc mua
  productImageSnapshot: string   // URL ảnh lúc mua
}

export interface Order {
  id: string
  userId: string | null          // null nếu guest checkout
  guestEmail: string | null
  guestPhone: string | null
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  items: OrderItem[]
  subtotal: number               // Tổng tiền hàng (VNĐ)
  shippingFee: number            // Phí vận chuyển (VNĐ)
  totalAmount: number            // subtotal + shippingFee
  shippingAddress: ShippingAddress
  note: string | null
  createdAt: string
  updatedAt: string
}

/** Body gửi lên khi tạo đơn hàng */
export interface CreateOrderRequest {
  items: {
    productId: string
    quantity: number
  }[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  note?: string
  // Guest checkout fields
  guestEmail?: string
  guestPhone?: string
}
