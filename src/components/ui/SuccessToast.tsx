import { toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import React from "react";

export function showSuccessToast(message: string) {
  toast.success(
    <div className="flex items-center gap-2">
      <FaCheckCircle size={40} />
      {message}
    </div>,
    {
      style: {
        background: "#22c55e",
        color: "#fff",
        minWidth: "250px",
        fontWeight: 500,
      },
      icon: null,
      position: "top-center",
    }
  );
}
