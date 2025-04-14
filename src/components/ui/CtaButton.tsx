import React from "react";

interface CtaButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const CtaButton: React.FC<CtaButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      className={`px-5 uppercase flex justify-center items-center bg-custom-wine text-white font-medium h-10 rounded-full text-[13px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:shadow-[inset_0_3px_7px_rgba(0,0,0,0.5)] ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CtaButton;
