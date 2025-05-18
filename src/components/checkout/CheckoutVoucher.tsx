import React from "react";

const CheckoutVoucher = () => {
  // TODO: Replace with real voucher logic
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-custom-purple">Shopee Voucher</div>
        <button className="text-custom-rose hover:underline text-sm">
          Chọn Voucher
        </button>
      </div>
      <div className="text-xs text-gray-500">
        Shopee Xu: <span className="text-gray-400">Không thể sử dụng Xu</span>
      </div>
    </div>
  );
};

export default CheckoutVoucher;
