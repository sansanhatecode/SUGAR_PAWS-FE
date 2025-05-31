import { Product } from "@/types/product";
import React from "react";
import { getColorCode } from "@/helper/colorHelper";

interface ProductOptionsProps {
  colors: Product["colors"];
  sizes: Product["sizes"];
  types?: Product["types"];
  selectedColor: string;
  selectedSize: string;
  selectedType: string;
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
  onTypeSelect: (type: string) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  colors,
  sizes,
  types,
  selectedColor,
  selectedSize,
  selectedType,
  onColorSelect,
  onSizeSelect,
  onTypeSelect,
}) => {
  const renderColorButton = (color: string, isSelected: boolean) => {
    const colorCode = getColorCode(color);
    let backgroundStyle: string;

    if (Array.isArray(colorCode) && colorCode.length === 2) {
      backgroundStyle = `linear-gradient(to bottom right, ${colorCode[0]} 50%, ${colorCode[1]} 50%)`;
    } else {
      backgroundStyle =
        typeof colorCode === "string"
          ? colorCode
          : (colorCode && colorCode[0]) || "transparent";
    }

    return (
      <button
        aria-label={`Select color ${color}`}
        onClick={() => onColorSelect(color)}
        className={`w-8 h-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-custom-rose transition-all duration-150 ${
          isSelected
            ? "ring-2 ring-offset-1 ring-custom-rose border-white shadow-md"
            : "border-gray-300 hover:border-gray-400"
        }`}
        style={{ background: backgroundStyle }}
      >
        {isSelected && <span className="sr-only">(Selected)</span>}
      </button>
    );
  };

  return (
    <div className="space-y-4 mt-4">
      {colors.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">
            Choose a Color
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, idx) => (
              <React.Fragment key={idx}>
                {renderColorButton(color, selectedColor === color)}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {sizes && sizes.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-700">Choose a Size</p>
            <a href="#" className="text-sm text-custom-rose hover:underline">
              Size Guide
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size, index) => (
              <button
                key={index}
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
      )}

      {types && types.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">
            Choose a Type
          </p>
          <div className="flex flex-wrap gap-2">
            {types.map((type, index) => (
              <button
                key={index}
                onClick={() => onTypeSelect(type)}
                className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-custom-pink ${
                  selectedType === type
                    ? "bg-custom-rose text-white border-custom-rose"
                    : "bg-white text-gray-700 border-custom-pink hover:border-custom-rose"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOptions;
