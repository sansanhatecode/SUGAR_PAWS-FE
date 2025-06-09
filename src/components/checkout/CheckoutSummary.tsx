import React from "react";
import { CartItem } from "@/types/cart";
import { useCreateOrder } from "@/hooks/queries/useOrder";
import { CreateOrderDto, CreateOrderItemDto } from "@/api/service/orderService";
import { PaymentMethod } from "@/types/payment";
import { Spinner } from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";
import { showSuccessToast } from "@/components/ui/SuccessToast";
import { showErrorToast } from "@/components/ui/ErrorToast";

interface CheckoutSummaryProps {
  selectedItems: CartItem[];
  selectedAddressId: number | null;
  shippingFee: number;
  paymentMethod: PaymentMethod;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  selectedItems,
  selectedAddressId,
  shippingFee,
  paymentMethod,
}) => {
  const router = useRouter();
  const createOrderMutation = useCreateOrder();

  // Calculate subtotal
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.productDetail.price * item.quantity,
    0,
  );
  const total = subtotal + (shippingFee || 0);

  const handleCreateOrder = async () => {
    if (!selectedAddressId) {
      showErrorToast("Please select a shipping address");
      return;
    }

    if (selectedItems.length === 0) {
      showErrorToast("No items to checkout");
      return;
    }

    try {
      const orderItems: CreateOrderItemDto[] = selectedItems.map((item) => ({
        productDetailId: item.productDetail.id,
        quantity: item.quantity,
      }));

      const orderData: CreateOrderDto = {
        shippingAddressId: selectedAddressId,
        paymentMethod: paymentMethod,
        orderItems: orderItems,
      };

      const result = await createOrderMutation.mutateAsync(orderData);

      showSuccessToast("Order created successfully!");

      if (result) {
        if (paymentMethod === PaymentMethod.BANK_TRANSFER) {
          router.push(`/user/orders/${result.id}/qr-code`);
        } else {
          router.push(`/user/orders/${result.id}`);
        }
      } else {
        showErrorToast("Error retrieving order details");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      showErrorToast("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
      <div className="flex justify-between items-center text-base">
        <span>Subtotal</span>
        <span>
          {subtotal.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className="flex justify-between items-center text-base">
        <span>Shipping Fee</span>
        <span>
          {shippingFee?.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className="flex justify-between items-center text-lg font-bold text-custom-purple border-t pt-2 mt-2">
        <span>Total Payment</span>
        <span>
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <button
        className="mt-4 bg-custom-wine text-white font-semibold py-2 rounded-lg hover:bg-custom-rose transition flex items-center justify-center"
        onClick={handleCreateOrder}
        disabled={createOrderMutation.isPending || !selectedAddressId}
      >
        {createOrderMutation.isPending ? <Spinner size="sm" /> : null}
        Place Order
      </button>
    </div>
  );
};

export default CheckoutSummary;
