import React, { useState } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
import CtaButton from "../ui/CtaButton";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    id,
    name,
    minPrice,
    maxPrice,
    imageUrl,
    colors,
    discount,
    availability,
    sales,
    sizes,
    reviewStars,
  } = product;

  const [hovered, setHovered] = useState<boolean>(false);
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const finalMinPrice = discount ? minPrice * (1 - discount / 100) : minPrice;
  const finalMaxPrice = discount ? maxPrice * (1 - discount / 100) : maxPrice;

  return (
    <div className="rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 p-3 bg-white w-full text-[12px] leading-[1.4]">
      <div
        className="relative w-full h-48 mb-3 rounded-xl overflow-hidden group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={hovered && imageUrl[1] ? imageUrl[1] : imageUrl[0]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute bottom-2 right-2 group">
          <button
            className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-custom-rose text-white 
            transition-all duration-300 hover:w-32 hover:gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 
            hover:flex hover:justify-center"
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            onClick={handleAddToCartClick}
          >
            <FontAwesomeIcon icon={faCartPlus} size="lg" />
            <span
              className={`text-[12px] whitespace-nowrap transition-all duration-300 ease-in-out
              ${
                buttonHovered
                  ? "opacity-100 max-w-[100px] translate-x-0"
                  : "opacity-0 max-w-0 -translate-x-2"
              }`}
            >
              ADD TO CART
            </span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} size="small">
          <h3 className="text-lg font-semibold mb-4">Select Options</h3>
          {sizes && sizes.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Sizes:</h4>
              <div className="flex gap-2">
                {sizes.map((size, idx) => (
                  <button
                    key={idx}
                    className="px-3 py-1 border rounded hover:bg-gray-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          {colors && colors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Colors:</h4>
              <div className="flex gap-2">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color.colorCode }}
                  />
                ))}
              </div>
            </div>
          )}
          <CtaButton
            className="m-auto"
            text="Add to Cart"
            onClick={handleCloseModal}
          />
        </Modal>
      )}

      <Link
        className="font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-custom-rose transition-all duration-300"
        href={`/collections/${id}`}
      >
        {name}
      </Link>

      {!availability && (
        <div className="text-sm font-medium mb-2 text-red-600">
          OUT OF STOCK
        </div>
      )}

      <div className="flex items-center gap-1 mb-2">
        {colors.map((color, idx) => (
          <div
            key={idx}
            title={color.colorName}
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: color.colorCode }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        {discount ? (
          <div className="flex flex-col">
            <span className="text-gray-400 line-through">
              {minPrice.toLocaleString()}₫ - {maxPrice.toLocaleString()}₫
            </span>
            <span className="text-red-500 font-semibold">
              {finalMinPrice.toLocaleString()}₫ -{" "}
              {finalMaxPrice.toLocaleString()}₫
            </span>
          </div>
        ) : (
          <span className="text-gray-800 font-semibold">
            {minPrice.toLocaleString()}₫ - {maxPrice.toLocaleString()}₫
          </span>
        )}
        {discount && (
          <span className="text-green-600 font-medium whitespace-nowrap">
            -{discount}% OFF
          </span>
        )}
      </div>

      <div className="flex justify-between text-gray-500 text-[11px]">
        <span className="text-yellow-500 font-medium">{reviewStars}★</span>
        {sales !== undefined && <span>{sales.toLocaleString()} sold</span>}
      </div>
    </div>
  );
};

export default ProductCard;
