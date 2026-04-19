import { useState } from 'react';
import { Product } from '@shared/types/product.types';
import { SpecTable } from './SpecTable';

export const ProductTabs = ({ product }: { product: Product }) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  return (
    <div>
      <div className="flex border-b border-gray-100 overflow-x-auto hide-scrollbar">
        <button
          className={`flex-1 min-w-[120px] py-4 text-center font-medium transition-colors border-b-2 ${
            activeTab === 'desc' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('desc')}
        >
          Mô Tả Sản Phẩm
        </button>
        <button
          className={`flex-1 min-w-[120px] py-4 text-center font-medium transition-colors border-b-2 ${
            activeTab === 'specs' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('specs')}
        >
          Thông Số Kỹ Thuật
        </button>
        <button
          className={`flex-1 min-w-[120px] py-4 text-center font-medium transition-colors border-b-2 ${
            activeTab === 'reviews' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          Đánh Giá ({product.reviewCount})
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'desc' && (
          <div className="prose max-w-none prose-sm sm:prose-base text-gray-700">
            {/* Nếu HTML (ví dụ từ rich text editor), dùng dangerouslySetInnerHTML. Hiện tại text trơn. */}
            {product.description.split('\n').map((para: string, idx: number) => (
              <p key={idx} className="mb-4">{para}</p>
            ))}
          </div>
        )}

        {activeTab === 'specs' && (
          <SpecTable specs={product.specs} />
        )}

        {activeTab === 'reviews' && (
          <div className="text-center py-10 text-gray-500">
            Tính năng đánh giá sẽ được cập nhật trong tương lai.
          </div>
        )}
      </div>
    </div>
  );
};
