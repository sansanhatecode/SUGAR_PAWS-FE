import { ProductDetail } from "@/types/product";
import React from "react";

interface ProductOptionsProps {
  colors: ProductDetail["colors"];
  sizes: ProductDetail["sizes"];
  selectedColor: string;
  selectedSize: string;
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
}) => {
  return (
    <div className="space-y-4 mt-4">
      {/* Color Selector */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Choose a Color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, idx) => (
            <button
              key={idx}
              aria-label={`Select color ${color}`}
              onClick={() => onColorSelect(color)}
              className={`w-8 h-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-custom-rose transition-all duration-150 ${
                selectedColor === color
                  ? "ring-2 ring-offset-1 ring-custom-rose border-white shadow-md"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color }}
            >
              {selectedColor === color && (
                <span className="sr-only">(Selected)</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-700">Choose a Size</p>
          <a href="#" className="text-sm text-custom-rose hover:underline">
            Size Guide
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeSelect(size)}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-custom-pink ${
                selectedSize === size
                  ? "bg-custom-rose text-white border-custom-rose"
                  : "bg-white text-gray-700 border-custom-pink hover:border-custom-rose"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;
