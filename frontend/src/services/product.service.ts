import apiClient from '../lib/api-client'
import { Product, ProductFilters, ProductListItem } from '@shared/types/product.types'

export interface GetProductsResponse {
  success: boolean
  data: ProductListItem[]
  facets: Record<string, Record<string, number>>
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface GetProductResponse {
  success: boolean
  data: Product
}

export const productService = {
  getProducts: async (filters: ProductFilters): Promise<GetProductsResponse> => {
    const { data } = await apiClient.get('/products', { params: filters })
    return data
  },
  
  getProductBySlug: async (slug: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${slug}`)
    return data.data
  },

  getRelatedProducts: async (slug: string): Promise<ProductListItem[]> => {
    const { data } = await apiClient.get(`/products/${slug}/related`)
    return data.data
  },

  getCategories: async (): Promise<{slug: string, name: string}[]> => {
    const { data } = await apiClient.get('/categories')
    return data.data
  }
}
