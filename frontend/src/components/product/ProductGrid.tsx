import { ProductListItem } from '@shared/types/product.types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: ProductListItem[];
  isLoading?: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-xl aspect-[3/4]"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-gray-400 mb-4 text-6xl">🔍</div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">Không tìm thấy sản phẩm</h3>
        <p className="text-gray-500">Vui lòng thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khoá khác.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
