import { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@shared/types/product.types';

export const ProductGallery = ({ images }: { images: ProductImage[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">Không có ảnh</div>;
  }

  const activeImage = images[activeIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm flex items-center justify-center p-4">
        <Image 
          src={activeImage.url} 
          alt="Product image" 
          fill 
          priority
          sizes="(max-width: 1024px) 100vw, 500px"
          className="object-contain" 
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2 scroll-snap-x snap-mandatory hide-scrollbar">
        {images.map((img, idx) => (
          <button
            key={img.id || idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              activeIndex === idx ? 'border-primary-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Image src={img.url} alt="Thumbnail" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
