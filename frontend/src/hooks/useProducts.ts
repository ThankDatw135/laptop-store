import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import { ProductFilters } from '@shared/types/product.types';

export const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });
};

export const useRelatedProducts = (slug: string) => {
  return useQuery({
    queryKey: ['product-related', slug],
    queryFn: () => productService.getRelatedProducts(slug),
    enabled: !!slug,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
  });
};
