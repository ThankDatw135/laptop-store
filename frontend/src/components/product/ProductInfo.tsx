import { Product } from '@shared/types/product.types';

export const ProductInfo = ({ product }: { product: Product }) => {
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{product.brand}</div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>
      
      <div className="flex items-center gap-4 text-sm mt-2 pb-4 border-b border-gray-100">
        <div className="flex items-center text-yellow-400">
          <span className="mr-1">★</span>
          <span className="font-medium text-gray-700">{product.averageRating.toFixed(1)}</span>
        </div>
        <div className="text-gray-400">|</div>
        <div className="text-gray-600">{product.reviewCount} Đánh giá</div>
        <div className="text-gray-400">|</div>
        <div className="text-gray-600">Đã bán {product.soldCount}</div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl space-y-2">
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-red-600">
            {new Intl.NumberFormat('vi-VN').format(product.price)}đ
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-lg text-gray-400 line-through mb-1">
                {new Intl.NumberFormat('vi-VN').format(product.originalPrice)}đ
              </span>
              <span className="text-sm font-bold text-white bg-red-500 px-2 py-0.5 rounded mb-1">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
        {discountPercent > 0 && (
          <div className="text-sm text-gray-600">
            Tiết kiệm: <span className="font-semibold text-green-600">{new Intl.NumberFormat('vi-VN').format(product.originalPrice - product.price)}đ</span>
          </div>
        )}
      </div>

      <div className="text-sm space-y-2 mt-4 text-gray-700">
        <div className="flex bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded-lg gap-2 mt-4">
          <span className="text-blue-500">🚚</span>
          Giao trong 2 giờ tại khu vực Nội thành
        </div>
      </div>
    </div>
  );
};
