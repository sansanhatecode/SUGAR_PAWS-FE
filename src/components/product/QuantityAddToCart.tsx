// components/product/QuantityAddToCart.tsx
import React from "react";
// Import an icon, e.g., from react-icons
import { FaShoppingBag } from "react-icons/fa";
// Assuming CtaButton is not used anymore or modified elsewhere
// import CtaButton from "../ui/CtaButton";

interface QuantityAddToCartProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

const QuantityAddToCart: React.FC<QuantityAddToCartProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  onQuantityChange,
  onAddToCart,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueString = e.target.value;
    if (valueString === "") {
      // Handle intermediate empty state if needed, or directly set minimal logic
      // For simplicity, we can just ensure it's at least 1 on change if parsed,
      // or rely on blur/submit logic elsewhere if more complex behavior is needed.
      onQuantityChange(1); // Or pass the empty string if parent handles it? Setting 1 is safer.
    } else {
      const value = parseInt(valueString);
      // Update only if it's a valid number >= 1
      if (!isNaN(value) && value >= 1) {
        onQuantityChange(value);
      } else if (isNaN(value) || value < 1) {
        // If invalid number (e.g., 'abc', 0, -5), reset to 1
        onQuantityChange(1);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      e.target.value === "" ||
      parseInt(e.target.value) < 1 ||
      isNaN(parseInt(e.target.value))
    ) {
      onQuantityChange(1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-6">
      {" "}
      {/* Reduced gap slightly */}
      {/* Quantity Input - Styled like the image */}
      <div className="flex items-center bg-white rounded-full">
        <button
          onClick={onDecrement}
          className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed rounded-l-full" // Added rounding consistency
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number" // Keep type number for semantics, but styling overrides browser spinner
          min="1"
          value={quantity}
          onChange={handleInputChange}
          onBlur={handleBlur} // Add blur handler to ensure minimum value
          // Basic styling for number input - no borders, transparent background
          className="w-10 text-center py-2 focus:outline-none text-md font-[600] text-gray-700 appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          aria-label="Quantity"
        />
        <button
          onClick={onIncrement}
          className="px-4 py-2 text-custom-rose text-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-none rounded-r-full" // Added rounding consistency
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      {/* Add To Cart Button - Styled like the image */}
      <button
        onClick={onAddToCart}
        className="flex-grow w-full sm:w-auto bg-custom-rose hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-full flex items-center justify-center gap-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-pink" // Adjusted padding slightly
      >
        <FaShoppingBag className="w-4 h-4" /> {/* Added Icon */}
        <span>Add To Cart</span>
      </button>
    </div>
  );
};

export default QuantityAddToCart;
