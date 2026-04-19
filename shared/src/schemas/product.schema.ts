import { z } from 'zod';

export const productSpecsSchema = z.object({
  cpu: z.string().optional(),
  gpu: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  displaySize: z.string().optional(),
  displayResolution: z.string().optional(),
  displayRefresh: z.string().optional(),
  displayPanel: z.string().optional(),
  battery: z.string().optional(),
  batteryLife: z.string().optional(),
  chargerWatt: z.string().optional(),
  weight: z.string().optional(),
  color: z.string().optional(),
  ports: z.string().optional(),
  connectivity: z.string().optional(),
  os: z.string().optional(),
  warranty: z.string().optional(),
}).catchall(z.string().optional());

export const productImageSchema = z.object({
  url: z.string().url('URL ảnh không hợp lệ'),
  publicId: z.string(),
  isHero: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

export const createProductSchema = z.object({
  body: z.object({
    slug: z.string().min(1, 'Slug không được để trống'),
    name: z.string().min(1, 'Tên không được để trống'),
    description: z.string().min(1, 'Mô tả không được để trống'),
    metaTitle: z.string().optional().nullable(),
    metaDescription: z.string().optional().nullable(),
    price: z.number().int().min(0, 'Giá không hợp lệ'),
    originalPrice: z.number().int().min(0, 'Giá gốc không hợp lệ'),
    category: z.enum(['gaming', 'office', 'student', 'workstation']),
    brand: z.string().min(1, 'Thương hiệu không được để trống'),
    specs: productSpecsSchema,
    stock: z.number().int().min(0).default(0),
    status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).default('DRAFT'),
    images: z.array(productImageSchema).optional(),
  })
});

export const updateProductSchema = z.object({
  body: z.object({
    slug: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    metaTitle: z.string().optional().nullable(),
    metaDescription: z.string().optional().nullable(),
    price: z.number().int().min(0).optional(),
    originalPrice: z.number().int().min(0).optional(),
    category: z.enum(['gaming', 'office', 'student', 'workstation']).optional(),
    brand: z.string().min(1).optional(),
    specs: productSpecsSchema.optional(),
    stock: z.number().int().min(0).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).optional(),
    images: z.array(productImageSchema).optional(), // Thay thế toàn bộ mảng ảnh nếu truyền lên
  }).refine((data) => Object.keys(data).length > 0, {
    message: "Ít nhất một trường cần được cập nhật",
  })
});

export const productFiltersSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    brand: z.union([z.string(), z.array(z.string())]).optional(),
    minPrice: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().min(0)).optional(),
    maxPrice: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().min(0)).optional(),
    cpu: z.union([z.string(), z.array(z.string())]).optional(),
    gpu: z.union([z.string(), z.array(z.string())]).optional(),
    ram: z.union([z.string(), z.array(z.string())]).optional(),
    storage: z.union([z.string(), z.array(z.string())]).optional(),
    panel: z.union([z.string(), z.array(z.string())]).optional(),
    refreshRate: z.union([z.string(), z.array(z.string())]).optional(),
    os: z.union([z.string(), z.array(z.string())]).optional(),
    page: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().min(1)).optional().default(1),
    limit: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().min(1).max(100)).optional().default(10),
    sort: z.enum(['newest', 'price-asc', 'price-desc', 'popular']).optional().default('newest'),
    q: z.string().optional(),
  })
});

export type CreateProductInput = z.infer<typeof createProductSchema>['body'];
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body'];
export type ProductFiltersQuery = z.infer<typeof productFiltersSchema>['query'];
