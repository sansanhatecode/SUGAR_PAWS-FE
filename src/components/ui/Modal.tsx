import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
};

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  size = "medium",
}) => {
  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-md",
    large: "max-w-lg",
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-full ${sizeClasses[size]} relative`}
      >
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
