import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { ProductFiltersQuery } from '@shared/schemas/product.schema';

export const buildWhereClause = (filters: ProductFiltersQuery): Prisma.ProductWhereInput => {
  const where: Prisma.ProductWhereInput = {
    status: 'ACTIVE',
  };

  if (filters.category) {
    where.category = filters.category as any;
  }

  if (filters.brand) {
    const brands = Array.isArray(filters.brand) ? filters.brand : [filters.brand];
    where.brand = { in: brands };
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {};
    if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
    if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
  }

  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q } },
      { description: { contains: filters.q } },
    ];
  }

  // Đối với specs (JSON field), Prisma hỗ trợ string_contains cho từng key
  const specFilters = [
    { key: 'cpu', value: filters.cpu },
    { key: 'gpu', value: filters.gpu },
    { key: 'ram', value: filters.ram },
    { key: 'storage', value: filters.storage },
    { key: 'panel', value: filters.panel },
    { key: 'refreshRate', value: filters.refreshRate },
    { key: 'os', value: filters.os },
  ];

  const specConditions: Prisma.ProductWhereInput[] = [];

  for (const { key, value } of specFilters) {
    if (!value) continue;
    const values = Array.isArray(value) ? value : [value];
    
    // Tạo điều kiện OR cho mảng [value] của JSON field
    const orConditions = values.map((val) => ({
      specs: {
        path: [key],
        string_contains: val,
      },
    }));
    
    specConditions.push({ OR: orConditions });
  }

  if (specConditions.length > 0) {
    where.AND = specConditions;
  }

  return where;
};

export const getFacetCounts = async (filters: ProductFiltersQuery) => {
  // Lấy danh sách sản phẩm khớp với bộ lọc thay vì count trong db
  // Vì tuỳ chọn filters trên JSON của prisma (ví dụ: gộp JSON field path) không hỗ trợ query aggregate mạnh mẽ
  const where = buildWhereClause(filters);
  const products = await prisma.product.findMany({
    where,
    select: {
      brand: true,
      category: true,
      specs: true,
    },
  });

  const facets = {
    brand: {} as Record<string, number>,
    category: {} as Record<string, number>,
    cpu: {} as Record<string, number>,
    gpu: {} as Record<string, number>,
    ram: {} as Record<string, number>,
  };

  for (const p of products) {
    // Brand 
    facets.brand[p.brand] = (facets.brand[p.brand] || 0) + 1;
    // Category
    facets.category[p.category] = (facets.category[p.category] || 0) + 1;

    // Specs
    if (p.specs && typeof p.specs === 'object') {
      const sp = p.specs as Record<string, string>;
      if (sp.cpu) facets.cpu[sp.cpu] = (facets.cpu[sp.cpu] || 0) + 1;
      if (sp.gpu) facets.gpu[sp.gpu] = (facets.gpu[sp.gpu] || 0) + 1;
      if (sp.ram) facets.ram[sp.ram] = (facets.ram[sp.ram] || 0) + 1;
    }
  }

  return facets;
};
