export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 bg-white">
        <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">100% Chính Hãng</div>
          <div className="text-xs text-gray-500">Hoàn tiền 200% nếu phát hiện giả</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 bg-white">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Bảo Hành 12 Tháng</div>
          <div className="text-xs text-gray-500">Tại các trung tâm ủy quyền</div>
        </div>
      </div>

      <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 bg-white">
        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Đổi Trả 15 Ngày</div>
          <div className="text-xs text-gray-500">Miễn phí nếu có lỗi phần cứng</div>
        </div>
      </div>

      <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 bg-white">
        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Hỗ Trợ 24/7</div>
          <div className="text-xs text-gray-500">Tư vấn miễn phí qua Zalo</div>
        </div>
      </div>
    </div>
  );
};
