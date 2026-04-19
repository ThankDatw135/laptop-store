'use client';

import { useProduct, useRelatedProducts } from '@/hooks/useProducts';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ActionButtons } from '@/components/product/ActionButtons';
import { TrustBadges } from '@/components/product/TrustBadges';
import { ProductTabs } from '@/components/product/ProductTabs';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { data: product, isLoading, isError } = useProduct(params.slug);
  const { data: relatedProducts } = useRelatedProducts(params.slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 aspect-square bg-gray-100 rounded-2xl"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2"></div>
            <div className="h-40 bg-gray-200 rounded w-full"></div>
            <div className="h-16 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    notFound();
  }

  return (
    <div className="bg-gray-50 pb-16">
      {/* Breadcrumb section */}
      <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
        Trang chủ / {product.category} / <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Gallery */}
            <div className="w-full lg:w-[500px] flex-shrink-0">
              <ProductGallery images={product.images} />
            </div>

            {/* Right: Info */}
            <div className="flex-1 flex flex-col">
              <ProductInfo product={product} />
              
              <div className="mt-8 border-t border-gray-100 pt-6">
                <ActionButtons product={product} />
              </div>

              <div className="mt-6">
                <TrustBadges />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Tabs */}
          <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm overflow-hidden">
            <ProductTabs product={product} />
          </div>

          {/* Related Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 line-clamp-none">
              <RelatedProducts products={relatedProducts || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
