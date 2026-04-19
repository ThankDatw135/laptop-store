'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { FilterGroup } from './FilterGroup';

interface FilterPanelProps {
  facets: Record<string, Record<string, number>>;
}

export const FilterPanel = ({ facets }: FilterPanelProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper sync lên URL
  const updateQuery = useCallback((key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Nếu values rỗng -> xoá key
    if (values.length === 0) {
      params.delete(key);
    } else {
      // Vì array filter thường sẽ join thành comma separated hoặc dup key. Ta dùng dup key: ?brand=ASUS&brand=DELL
      params.delete(key);
      values.forEach(v => params.append(key, v));
    }

    // Reset page về 1 khi filter
    params.delete('page');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, searchParams, router]);

  const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
    const currentValues = searchParams.getAll(key);
    let newValues = [...currentValues];

    if (checked) {
      if (!newValues.includes(value)) newValues.push(value);
    } else {
      newValues = newValues.filter(v => v !== value);
    }

    updateQuery(key, newValues);
  };

  // Convert facets to options
  const buildOptions = (facetMap: Record<string, number> | undefined) => {
    if (!facetMap) return [];
    return Object.entries(facetMap).map(([label, count]) => ({
      label,
      value: label,
      count
    }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">Lọc sản phẩm</h2>

      <div className="space-y-2">
        <FilterGroup
          title="Thương hiệu"
          options={buildOptions(facets?.brand)}
          selectedValues={searchParams.getAll('brand')}
          onChange={(val, checked) => handleCheckboxChange('brand', val, checked)}
        />
        
        <FilterGroup
          title="CPU"
          options={buildOptions(facets?.cpu)}
          selectedValues={searchParams.getAll('cpu')}
          onChange={(val, checked) => handleCheckboxChange('cpu', val, checked)}
        />

        <FilterGroup
          title="Card Đồ Họa (GPU)"
          options={buildOptions(facets?.gpu)}
          selectedValues={searchParams.getAll('gpu')}
          onChange={(val, checked) => handleCheckboxChange('gpu', val, checked)}
        />

        <FilterGroup
          title="RAM"
          options={buildOptions(facets?.ram)}
          selectedValues={searchParams.getAll('ram')}
          onChange={(val, checked) => handleCheckboxChange('ram', val, checked)}
        />
      </div>
    </div>
  );
};
