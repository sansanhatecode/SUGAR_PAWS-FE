import React from "react";

const CheckoutShipping = () => {
  // TODO: Replace with real shipping method data
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-custom-purple">
          Phương thức vận chuyển:
        </div>
        <button className="text-custom-rose hover:underline text-sm">
          Thay Đổi
        </button>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span>Nhanh</span>
        <span className="font-medium">₫5.000</span>
      </div>
      <div className="text-xs text-gray-500">
        Dự kiến nhận hàng từ 17 Tháng 5 - 19 Tháng 5
      </div>
    </div>
  );
};

export default CheckoutShipping;
