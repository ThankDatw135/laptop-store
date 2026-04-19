'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export const SortDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') || 'newest';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    // Về trang 1 khi sort
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-gray-600 font-medium whitespace-nowrap">
        Sắp xếp:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleChange}
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 max-w-[200px]"
      >
        <option value="newest">Mới nhất</option>
        <option value="price-asc">Giá thấp đến cao</option>
        <option value="price-desc">Giá cao đến thấp</option>
        <option value="popular">Bán chạy nhất</option>
      </select>
    </div>
  );
};
