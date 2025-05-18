import React from "react";
import { CartItem } from "@/types/cart";

interface CheckoutSummaryProps {
  selectedItems: CartItem[];
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ selectedItems }) => {
  // Calculate subtotal
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.productDetail.price * item.quantity,
    0,
  );
  const shipping = selectedItems.length > 0 ? 5000 : 0;
  const total = subtotal + shipping;

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
          {shipping.toLocaleString("en-US", {
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
      <button className="mt-4 bg-custom-rose text-white font-semibold py-2 rounded-lg hover:bg-pink-500 transition">
        Place Order
      </button>
    </div>
  );
};

export default CheckoutSummary;
