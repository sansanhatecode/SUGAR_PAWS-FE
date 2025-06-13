import React, { useState } from "react";
import CheckoutSectionHeader from "./CheckoutSectionHeader";

const CheckoutVoucher = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;

    setIsApplying(true);
    // TODO: Replace with real voucher logic
    setTimeout(() => {
      setIsApplying(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <CheckoutSectionHeader
        icon="🎫"
        title="Voucher & Discounts"
        gradient="from-custom-rose to-custom-pink"
      />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Voucher Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-custom-dark">
            Enter voucher code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Enter your voucher code"
              className="flex-1 px-3 py-2 border border-custom-pink/50 rounded-lg focus:ring-2 focus:ring-custom-rose focus:border-custom-rose transition-colors text-sm"
            />
            <button
              onClick={handleApplyVoucher}
              disabled={!voucherCode.trim() || isApplying}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                !voucherCode.trim() || isApplying
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-custom-wine hover:bg-custom-wine/90 text-white shadow-md hover:shadow-lg"
              }`}
            >
              {isApplying ? "Applying..." : "Apply"}
            </button>
          </div>
        </div>

        {/* Available Vouchers */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-custom-dark">Available Vouchers</h4>
            <button className="text-custom-wine hover:text-custom-rose text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">%</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Free Shipping</div>
                  <div className="text-xs text-gray-500">
                    On orders over 500,000 VND
                  </div>
                </div>
              </div>
              <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                Select
              </button>
            </div>
          </div>
        </div>

        {/* Reward Points */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-600">💎</span>
            <span className="font-medium text-blue-800">Reward Points</span>
          </div>
          <div className="text-sm text-blue-600">
            You have <span className="font-bold">0 points</span> available
          </div>
          <div className="text-xs text-blue-500 mt-1">
            Points cannot be used for this order
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutVoucher;
