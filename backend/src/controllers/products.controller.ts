import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../lib/asyncHandler';
import { sendSuccess, sendError, sendPaginated } from '../lib/response';
import { productFiltersSchema, createProductSchema, updateProductSchema } from '@shared/schemas/product.schema';
import { buildWhereClause, getFacetCounts } from '../services/facet.service';
import { deleteImage } from '../services/cloudinary.service';
import { Prisma } from '@prisma/client';

// ============================================================
// Public APIs
// ============================================================

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { query } = productFiltersSchema.parse({ query: req.query });

  const where = buildWhereClause(query);
  
  // Sorting
  const orderBy: Prisma.ProductOrderByWithRelationInput = {};
  switch (query.sort) {
    case 'newest':
      orderBy.createdAt = 'desc';
      break;
    case 'price-asc':
      orderBy.price = 'asc';
      break;
    case 'price-desc':
      orderBy.price = 'desc';
      break;
    case 'popular':
      orderBy.soldCount = 'desc';
      break;
    default:
      orderBy.createdAt = 'desc';
  }

  const { page, limit } = query;
  const skip = (page - 1) * limit;

  // Lấy dữ liệu
  const [products, total, facets] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        images: true,
        reviews: { select: { rating: true } }
      }
    }),
    prisma.product.count({ where }),
    getFacetCounts(query)
  ]);

  // Aggregate review counts and rating inline
  const formattedProducts = products.map((p) => {
    const averageRating = p.reviews.length > 0 
      ? p.reviews.reduce((acc, curr) => acc + curr.rating, 0) / p.reviews.length 
      : 0;

    return {
      ...p,
      averageRating,
      reviewCount: p.reviews.length,
      reviews: undefined
    };
  });

  res.status(200).json({
    success: true,
    data: formattedProducts,
    facets,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  });
});

export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      reviews: true
    }
  });

  if (!product) {
    sendError(res, 404, 'Không tìm thấy sản phẩm');
    return;
  }

  // Update viewcount
  await prisma.product.update({
    where: { slug },
    data: { viewCount: { increment: 1 } }
  });

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, curr) => acc + curr.rating, 0) / product.reviews.length
    : 0;

  sendSuccess(res, {
    ...product,
    averageRating,
    reviewCount: product.reviews.length
  });
});

export const getRelated = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  
  const current = await prisma.product.findUnique({
    where: { slug },
    select: { category: true, brand: true, price: true }
  });

  if (!current) {
    sendError(res, 404, 'Không tìm thấy sản phẩm');
    return;
  }

  const products = await prisma.product.findMany({
    where: {
      category: current.category,
      slug: { not: slug },
      status: 'ACTIVE'
    },
    include: { images: true, reviews: { select: { rating: true } } },
    take: 4,
    orderBy: { soldCount: 'desc' }
  });

  const formattedProducts = products.map((p) => {
    const averageRating = p.reviews.length > 0 
      ? p.reviews.reduce((acc, curr) => acc + curr.rating, 0) / p.reviews.length 
      : 0;
    return { ...p, averageRating, reviewCount: p.reviews.length, reviews: undefined };
  });

  sendSuccess(res, formattedProducts);
});


// ============================================================
// Admin APIs
// ============================================================

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { body } = createProductSchema.parse({ body: req.body });

  const existingSlug = await prisma.product.findUnique({ where: { slug: body.slug } });
  if (existingSlug) {
    sendError(res, 400, 'Slug đã tồn tại');
    return;
  }

  const product = await prisma.product.create({
    data: {
      slug: body.slug,
      name: body.name,
      description: body.description,
      price: body.price,
      originalPrice: body.originalPrice,
      category: body.category as any,
      brand: body.brand,
      specs: body.specs as any,
      stock: body.stock,
      status: body.status as any,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      images: {
        create: body.images?.map((img: any) => ({
          url: img.url,
          publicId: img.publicId,
          displayOrder: img.displayOrder,
          isHero: img.isHero,
        })) || []
      }
    },
    include: { images: true }
  });

  sendSuccess(res, product, 201);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = updateProductSchema.parse({ body: req.body });

  const product = await prisma.product.findUnique({ where: { id }, include: { images: true } });
  if (!product) {
    sendError(res, 404, 'Không tìm thấy sản phẩm');
    return;
  }

  // Nếu update images: xoá ảnh cũ trên db (thực tế có thể gọi xoá trên cloudinary, 
  // nhưng để an toàn chỉ xoá trên db, ảnh xoá từ cloudinary được xử lý riêng nếu muốn)
  let imagesQuery = undefined;
  if (body.images) {
    imagesQuery = {
      deleteMany: {}, // xoá toàn bộ mapping cũ
      create: body.images.map((img: any) => ({
        url: img.url,
        publicId: img.publicId,
        displayOrder: img.displayOrder,
        isHero: img.isHero,
      }))
    };
  }

  const updated = await prisma.product.update({
    where: { id },
    data: {
      ...body,
      images: imagesQuery,
    },
    include: { images: true }
  });

  sendSuccess(res, updated);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true }
  });

  if (!product) {
    sendError(res, 404, 'Không tìm thấy sản phẩm');
    return;
  }

  // Xoá ảnh trên Cloudinary
  await Promise.all(
    product.images.map(img => deleteImage(img.publicId).catch(() => console.error(`Failed to delete img ${img.publicId}`)))
  );

  // Xoá trên db cascade
  await prisma.product.delete({ where: { id } });

  sendSuccess(res, null, 204);
});
