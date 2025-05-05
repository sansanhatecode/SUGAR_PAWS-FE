import React, { useState, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  // Set isOpen to true after component mounts for entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Delay actual closing to allow exit animation to play
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-md",
    large: "max-w-lg",
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${
        isOpen ? "bg-black bg-opacity-50" : "bg-black bg-opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-full ${sizeClasses[size]} relative transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition-colors duration-200"
          onClick={handleClose}
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
