import React, { useState } from "react";
import { PaymentMethod } from "@/types/payment";
import PaymentMethodModal from "./PaymentMethodModal";

interface CheckoutPaymentProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
}

const CheckoutPayment: React.FC<CheckoutPaymentProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getPaymentMethodText = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CASH:
        return "Cash on Delivery";
      case PaymentMethod.CREDIT_CARD:
        return "Credit Card";
      case PaymentMethod.BANK_TRANSFER:
        return "Bank Transfer";
      default:
        return "Cash on Delivery";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-custom-purple">Payment Method</div>
        <button
          className="text-custom-rose hover:underline text-sm"
          onClick={() => setModalOpen(true)}
        >
          Change
        </button>
      </div>
      <div className="flex justify-between items-center text-base">
        <span>{getPaymentMethodText(selectedMethod)}</span>
      </div>

      <PaymentMethodModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedMethod={selectedMethod}
        onSelectMethod={onSelectMethod}
      />
    </div>
  );
};

export default CheckoutPayment;
