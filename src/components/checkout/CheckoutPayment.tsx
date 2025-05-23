import React, { useState } from "react";
import { PaymentMethod } from "@/types/payment";
import PaymentMethodModal from "./PaymentMethodModal";
import { FaMoneyBillWave, FaCreditCard, FaUniversity } from "react-icons/fa";

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

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CASH:
        return <FaMoneyBillWave className="text-green-500 text-lg" />;
      case PaymentMethod.CREDIT_CARD:
        return <FaCreditCard className="text-blue-500 text-lg" />;
      case PaymentMethod.BANK_TRANSFER:
        return <FaUniversity className="text-purple-500 text-lg" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2 justify-center">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-custom-purple">Payment Method</div>
        <button
          className="text-custom-rose hover:underline text-sm"
          onClick={() => setModalOpen(true)}
        >
          Change
        </button>
      </div>
      <div className="flex items-center gap-2 text-[14px]">
        <span>{getPaymentMethodIcon(selectedMethod)}</span>
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
