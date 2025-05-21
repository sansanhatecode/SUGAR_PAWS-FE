import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { PaymentMethod } from "@/types/payment";

interface PaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  open,
  onClose,
  selectedMethod,
  onSelectMethod,
}) => {
  const [method, setMethod] = useState<PaymentMethod>(selectedMethod);

  const handleSave = () => {
    onSelectMethod(method);
    onClose();
  };

  const paymentMethods = [
    { id: PaymentMethod.CASH, label: "Cash on Delivery" },
    { id: PaymentMethod.CREDIT_CARD, label: "Credit Card" },
    { id: PaymentMethod.BANK_TRANSFER, label: "Bank Transfer" },
  ];

  return (
    <Modal open={open} onClose={onClose} size="medium">
      <div className="p-4">
        <div className="space-y-2">
          {paymentMethods.map((paymentMethod) => (
            <div
              key={paymentMethod.id}
              className={`p-3 border rounded-lg cursor-pointer transition ${
                method === paymentMethod.id
                  ? "border-custom-purple bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setMethod(paymentMethod.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    method === paymentMethod.id
                      ? "border-custom-purple"
                      : "border-gray-400"
                  } flex items-center justify-center`}
                >
                  {method === paymentMethod.id && (
                    <div className="w-3 h-3 rounded-full bg-custom-purple"></div>
                  )}
                </div>
                <span className="text-sm font-medium">
                  {paymentMethod.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-custom-rose text-white rounded-lg hover:bg-pink-500"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentMethodModal;
