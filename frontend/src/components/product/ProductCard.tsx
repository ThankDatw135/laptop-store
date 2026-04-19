import Link from 'next/link';
import Image from 'next/image';
import { ProductListItem } from '@shared/types/product.types';

export const ProductCard = ({ product }: { product: ProductListItem }) => {
  const heroImage = product.images.find((img: any) => img.isHero) || product.images[0];
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/san-pham/${product.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square w-full p-4 bg-gray-50 flex items-center justify-center">
        {heroImage && (
          <div className="relative w-full h-full">
            <Image
              src={heroImage.url}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        {/* Badges */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{product.brand}</div>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[40px] group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="pt-2">
          <div className="text-lg font-bold text-red-600">
            {new Intl.NumberFormat('vi-VN').format(product.price)}đ
          </div>
          {discountPercent > 0 && (
            <div className="text-sm text-gray-400 line-through">
              {new Intl.NumberFormat('vi-VN').format(product.originalPrice)}đ
            </div>
          )}
        </div>

        {/* Footer (Rating + Sold) */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span>{product.averageRating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
          <div>Đã bán {product.soldCount}</div>
        </div>
      </div>
    </Link>
  );
};
