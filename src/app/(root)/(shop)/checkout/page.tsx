"use client";

import React, { useState } from "react";
import CheckoutProductList from "@/components/checkout/CheckoutProductList";
import CheckoutShipping from "@/components/checkout/CheckoutShipping";
import CheckoutVoucher from "@/components/checkout/CheckoutVoucher";
import CheckoutPayment from "@/components/checkout/CheckoutPayment";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import NewCheckoutAddress from "@/components/checkout/NewCheckoutAddress";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { selectCartSelectedItems } from "@/store/slices/cartSlice";
import { PaymentMethod } from "@/types/payment";
import { Toaster } from "react-hot-toast";
import { useCalculateShippingFee } from "@/hooks/queries/useOrder";

export default function CheckoutPage() {
  const router = useRouter();
  const selectedItems = useAppSelector(selectCartSelectedItems);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH,
  );

  // Get shipping fee based on selected address
  const { data: shippingFeeData } = useCalculateShippingFee(
    selectedAddressId || 0,
  );

  React.useEffect(() => {
    if (!selectedItems || selectedItems.length === 0) {
      router.replace("/cart");
    }
  }, [selectedItems, router]);

  return (
    <main className="min-h-screen bg-[#fff4dd] py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col gap-2">
        <NewCheckoutAddress setSelectedAddressId={setSelectedAddressId} />
        <CheckoutProductList selectedItems={selectedItems} />
        <CheckoutShipping addressId={selectedAddressId} />
        <CheckoutVoucher />
        <CheckoutPayment
          selectedMethod={paymentMethod}
          onSelectMethod={setPaymentMethod}
        />
        <CheckoutSummary
          selectedItems={selectedItems}
          selectedAddressId={selectedAddressId}
          shippingFee={shippingFeeData?.shippingFee ?? 0}
          paymentMethod={paymentMethod}
        />
      </div>
      <Toaster position="top-center" />
    </main>
  );
}
