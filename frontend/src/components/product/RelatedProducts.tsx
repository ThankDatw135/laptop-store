import { ProductListItem } from '@shared/types/product.types';
import { ProductCard } from './ProductCard';

export const RelatedProducts = ({ products }: { products: ProductListItem[] }) => {
  if (!products || products.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">Sản Phẩm Tương Tự</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
