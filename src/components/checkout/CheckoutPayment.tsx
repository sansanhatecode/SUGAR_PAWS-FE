import React from "react";

const CheckoutPayment = () => {
  // TODO: Replace with real payment method logic
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-custom-purple">
          Phương thức thanh toán
        </div>
        <button className="text-custom-rose hover:underline text-sm">
          Thay Đổi
        </button>
      </div>
      <div className="flex justify-between items-center text-base">
        <span>Thanh toán khi nhận hàng</span>
      </div>
    </div>
  );
};

export default CheckoutPayment;
