import { ProductSpecs } from '@shared/types/product.types';

export const SpecTable = ({ specs }: { specs: ProductSpecs }) => {
  const renderRow = (label: string, value: string | undefined) => {
    if (!value) return null;
    return (
      <div className="flex border-b border-gray-100 py-3 last:border-0 hover:bg-gray-50 transition-colors px-2">
        <div className="w-1/3 text-sm text-gray-500 font-medium">{label}</div>
        <div className="w-2/3 text-sm text-gray-900">{value}</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 font-bold border-b border-gray-200 text-gray-900">
        Thông số kỹ thuật chi tiết
      </div>
      <div className="p-2">
        {/* Nhóm cấu hình cơ bản */}
        <div className="font-semibold text-sm text-primary-600 px-2 py-2 mt-2 bg-primary-50 rounded">Bộ Xử Lý & Bộ Nhớ</div>
        {renderRow('CPU', specs.cpu)}
        {renderRow('Card đồ hoạ (GPU)', specs.gpu)}
        {renderRow('RAM', specs.ram)}
        {renderRow('Ổ cứng (Storage)', specs.storage)}

        {/* Nhóm màn hình */}
        <div className="font-semibold text-sm text-primary-600 px-2 py-2 mt-4 bg-primary-50 rounded">Màn Hình</div>
        {renderRow('Kích thước màn hình', specs.displaySize)}
        {renderRow('Độ phân giải', specs.displayResolution)}
        {renderRow('Tần số quét', specs.displayRefresh)}
        {renderRow('Tấm nền', specs.displayPanel)}

        {/* Cổng & Pin */}
        <div className="font-semibold text-sm text-primary-600 px-2 py-2 mt-4 bg-primary-50 rounded">Thiết kế & Kết nối</div>
        {renderRow('Trọng lượng', specs.weight)}
        {renderRow('Màu sắc', specs.color)}
        {renderRow('Cổng kết nối', specs.ports)}
        {renderRow('Kết nối không dây', specs.connectivity)}
        {renderRow('Pin', specs.battery)}
        {renderRow('Công suất sạc', specs.chargerWatt)}

        {/* Khác */}
        <div className="font-semibold text-sm text-primary-600 px-2 py-2 mt-4 bg-primary-50 rounded">Thông tin khác</div>
        {renderRow('Hệ điều hành', specs.os)}
        {renderRow('Bảo hành', specs.warranty)}
      </div>
    </div>
  );
};
