'use client';

import { useSearchParams } from 'next/navigation';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterPanel } from '@/components/filter/FilterPanel';
import { SortDropdown } from '@/components/filter/SortDropdown';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const searchParams = useSearchParams();
  
  // Xây dựng product filters từ URL
  const filters = {
    category: params.category === 'tat-ca' ? undefined : params.category,
    brand: searchParams.getAll('brand'),
    cpu: searchParams.getAll('cpu'),
    gpu: searchParams.getAll('gpu'),
    ram: searchParams.getAll('ram'),
    sort: searchParams.get('sort') as any,
    page: Number(searchParams.get('page')) || 1,
  };

  const { data: categoryData } = useCategories();
  const categoryName = categoryData?.find(c => c.slug === params.category)?.name || 'Tất cả sản phẩm';

  const { data, isLoading } = useProducts(filters);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cấu trúc breadcrumb có thể để đây */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{categoryName}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 flex-shrink-0">
          <FilterPanel facets={data?.facets || {}} />
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Top Bar: Sort + Result Count */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              {isLoading ? 'Đang tải...' : (
                <span>Tìm thấy <span className="font-bold text-gray-900">{data?.total || 0}</span> sản phẩm</span>
              )}
            </div>
            <SortDropdown />
          </div>

          {/* Product Grid */}
          <ProductGrid products={data?.data || []} isLoading={isLoading} />

          {/* Code phân trang có thể để đây -> dùng Pagination Component... */}
        </div>
      </div>
    </div>
  );
}
