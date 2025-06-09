import React from "react";
import { Spinner } from "@/components/ui/Spinner";
import { useCalculateShippingFee } from "@/hooks/queries/useOrder";

interface CheckoutShippingProps {
  addressId: number | null;
}

const CheckoutShipping: React.FC<CheckoutShippingProps> = ({ addressId }) => {
  const { data: shippingFeeData, isLoading } = useCalculateShippingFee(
    addressId || 0,
  );

  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 2);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 4);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-custom-purple">Shipping Method</div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span>Express Delivery</span>
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <span className="font-medium">
            {shippingFeeData?.shippingFee?.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        )}
      </div>
      <div className="text-xs text-gray-500">
        Estimated delivery: {formatDate(deliveryStart)} -{" "}
        {formatDate(deliveryEnd)}
      </div>
    </div>
  );
};

export default CheckoutShipping;
