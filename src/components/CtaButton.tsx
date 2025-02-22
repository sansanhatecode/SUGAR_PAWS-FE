import React from 'react'

interface CtaButtonProps {
  text: string;
  onClick: () => void;
}

const CtaButton: React.FC<CtaButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="px-5 flex justify-center items-center bg-custom-wine text-white font-medium h-10 rounded-full text-[13px]" 
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default CtaButton