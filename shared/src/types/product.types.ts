// ============================================================
// Product Types — Single Source of Truth
// ============================================================

export interface ProductImage {
  id: string
  url: string          // Cloudinary URL
  publicId: string     // Cloudinary publicId (để delete)
  isHero: boolean      // Ảnh chính hiển thị đầu tiên
  displayOrder: number
}

export interface ProductSpecs {
  // Cấu hình
  cpu?: string         // "Intel Core i7-13700H"
  gpu?: string         // "NVIDIA RTX 4060 8GB"
  ram?: string         // "16GB DDR5 4800MHz"
  storage?: string     // "512GB NVMe PCIe 4.0"
  // Màn hình
  displaySize?: string    // "15.6\""
  displayResolution?: string // "1920x1080"
  displayRefresh?: string  // "144Hz"
  displayPanel?: string    // "IPS"
  // Pin & Sạc
  battery?: string     // "90Wh"
  batteryLife?: string // "8 giờ"
  chargerWatt?: string // "240W"
  // Thiết kế
  weight?: string      // "2.3kg"
  color?: string       // "Eclipse Gray"
  // Kết nối
  ports?: string       // "2x USB-A, 2x USB-C"
  connectivity?: string // "WiFi 6E, BT 5.3"
  // Phần mềm
  os?: string          // "Windows 11 Home"
  // Bảo hành
  warranty?: string    // "12 tháng tại ASUS VN"
  // Extensible cho các spec khác
  [key: string]: string | undefined
}

export type ProductCategory = 'gaming' | 'office' | 'student' | 'workstation'
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT'

/** Full product — dùng cho PDP */
export interface Product {
  id: string                  // cuid() — KHÔNG phải number!
  slug: string                // "asus-rog-strix-g15-rtx4060-2025"
  name: string                // "ASUS ROG Strix G15 RTX 4060"
  description: string
  metaTitle?: string | null
  metaDescription?: string | null
  price: number               // VNĐ integer, VD: 25000000
  originalPrice: number       // Giá gốc trước giảm
  category: ProductCategory
  brand: string               // "ASUS", "Dell", "HP"
  specs: ProductSpecs
  images: ProductImage[]      // KHÔNG phải single string!
  stock: number
  status: ProductStatus
  viewCount: number
  soldCount: number
  averageRating: number       // 0-5
  reviewCount: number
  createdAt: string           // ISO string
  updatedAt: string
}

/** List item — bỏ bớt fields nặng, dùng cho Category page */
export type ProductListItem = Pick<
  Product,
  | 'id'
  | 'slug'
  | 'name'
  | 'price'
  | 'originalPrice'
  | 'category'
  | 'brand'
  | 'images'
  | 'stock'
  | 'averageRating'
  | 'reviewCount'
  | 'soldCount'
  | 'status'
>

/** Query params cho GET /api/products */
export interface ProductFilters {
  category?: string
  brand?: string | string[]
  minPrice?: number
  maxPrice?: number
  cpu?: string | string[]
  gpu?: string | string[]
  ram?: string | string[]
  storage?: string | string[]
  panel?: string | string[]
  refreshRate?: string | string[]
  weight?: string
  os?: string | string[]
  page?: number
  limit?: number
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'popular'
  q?: string
}
