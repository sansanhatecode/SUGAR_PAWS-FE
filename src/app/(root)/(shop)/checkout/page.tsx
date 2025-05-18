"use client";

import React from "react";
import CheckoutAddress from "@/components/checkout/CheckoutAddress";
import CheckoutProductList from "@/components/checkout/CheckoutProductList";
import CheckoutShipping from "@/components/checkout/CheckoutShipping";
import CheckoutVoucher from "@/components/checkout/CheckoutVoucher";
import CheckoutPayment from "@/components/checkout/CheckoutPayment";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { selectCartSelectedItems } from "@/store/slices/cartSlice";

export default function CheckoutPage() {
  const router = useRouter();
  const selectedItems = useAppSelector(selectCartSelectedItems);

  React.useEffect(() => {
    if (!selectedItems || selectedItems.length === 0) {
      router.replace("/cart");
    }
  }, [selectedItems, router]);

  return (
    <main className="min-h-screen bg-[#fff4dd] py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col gap-2">
        <CheckoutAddress />
        <CheckoutProductList selectedItems={selectedItems} />
        <CheckoutShipping />
        <CheckoutVoucher />
        <CheckoutPayment />
        <CheckoutSummary selectedItems={selectedItems} />
      </div>
    </main>
  );
}
