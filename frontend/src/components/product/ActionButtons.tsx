import { Product } from '@shared/types/product.types';

export const ActionButtons = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-3">
        <button 
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex flex-col items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.stock <= 0}
          onClick={() => { alert('Đã thêm vào giỏ hàng và chuyển đến checkout!'); }}
        >
          <span className="text-lg uppercase">Mua Ngay</span>
          <span className="text-xs font-normal opacity-90">Giao hàng miễn phí tận nơi</span>
        </button>

        <button 
          className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-bold py-3 px-6 rounded-lg transition-colors flex flex-col items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          disabled={product.stock <= 0}
          onClick={() => { alert('Đã thêm vào giỏ hàng!'); }}
        >
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-xs whitespace-nowrap">Thêm Giỏ</span>
        </button>
      </div>
      
      {product.stock <= 0 && (
        <div className="text-red-500 text-center font-medium mt-2">
          Sản phẩm hiện đang tạm hết hàng.
        </div>
      )}
    </div>
  );
};
