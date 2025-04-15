"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FilterSection from "../../../../components/FilterSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AccessoryPageBanner } from "@/types/accessory";
import { Product } from "@/types/product";
import ProductsSection from "@/components/product/ProductsSection";

const CategoryPage = () => {
  const pathname = usePathname();
  const categoryName = pathname.split("/").pop();

  const sizes = ["S", "M", "L", "XL"];
  const availability = ["In Stock", "Out of Stock"];
  const colors = [
    { colorName: "Red", colorCode: "#FF6961" },
    { colorName: "Green", colorCode: "#77DD77" },
    { colorName: "Blue", colorCode: "#AEC6CF" },
    { colorName: "Pink", colorCode: "#FFB7C5" },
    { colorName: "Yellow", colorCode: "#FDFD96" },
    { colorName: "Orange", colorCode: "#FFB347" },
    { colorName: "Purple", colorCode: "#CBAACB" },
    { colorName: "Cyan", colorCode: "#B2F4FF" },
    { colorName: "Magenta", colorCode: "#FF9CEE" },
    { colorName: "Brown", colorCode: "#D2B48C" },
    { colorName: "Gray", colorCode: "#D3D3D3" },
  ];

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    [],
  );
  const [selectedColors, setSelectedColors] = useState<
    { colorName: string; colorCode: string }[]
  >([]);

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((s) => s !== size)
        : [...prevSelectedSizes, size],
    );
  };

  const handleAvailabilityChange = (status: string) => {
    setSelectedAvailability((prevSelectedAvailability) =>
      prevSelectedAvailability.includes(status)
        ? prevSelectedAvailability.filter((s) => s !== status)
        : [...prevSelectedAvailability, status],
    );
  };

  const handleColorChange = (colorCode: string) => {
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.some((color) => color.colorCode === colorCode)
        ? prevSelectedColors.filter((color) => color.colorCode !== colorCode)
        : [
            ...prevSelectedColors,
            colors.find((color) => color.colorCode === colorCode)!,
          ],
    );
  };

  const handleRemoveSize = (size: string) => {
    setSelectedSizes(selectedSizes.filter((s) => s !== size));
  };

  const handleRemoveAvailability = (status: string) => {
    setSelectedAvailability(selectedAvailability.filter((s) => s !== status));
  };

  const handleRemoveColor = (colorCode: string) => {
    setSelectedColors(
      selectedColors.filter((color) => color.colorCode !== colorCode),
    );
  };

  const handleClearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedAvailability([]);
    setSelectedColors([]);
  };

  const sampleAccessoryPageBanner: AccessoryPageBanner = {
    title: "Sample Category",
    description: "Explore our exclusive collection of accessories.",
    imageSrc:
      "https://store.lolitacollective.com/cdn/shop/products/Candy-Shoppe-OTKs-Sax-x-Pink_a02047d9-622c-4238-8f34-7b4f1db67516_98x.png?v=1660765917",
  };

  const exampleProducts: Product[] = [
    {
      id: "1",
      name: "Váy Lolita Hồng Pastel",
      minPrice: 700000,
      maxPrice: 800000,
      imageUrl: [
        "https://example.com/images/lolita-pink-1.jpg",
        "https://example.com/images/lolita-pink-2.jpg",
      ],
      colors: [
        { colorName: "Hồng pastel", colorCode: "#F8C8DC" },
        { colorName: "Trắng", colorCode: "#FFFFFF" },
      ],
      availability: ["S", "M", "L"],
      discount: 15,
      sales: 120,
      sizes: ["S", "M", "L"],
      reviewStars: 4.5,
    },
    {
      id: "2",
      name: "Váy Lolita Xanh Pastel",
      minPrice: 750000,
      maxPrice: 850000,
      imageUrl: [
        "https://example.com/images/lolita-blue-1.jpg",
        "https://example.com/images/lolita-blue-2.jpg",
      ],
      colors: [
        { colorName: "Xanh pastel", colorCode: "#AEC6CF" },
        { colorName: "Trắng", colorCode: "#FFFFFF" },
      ],
      availability: ["M", "L"],
      discount: 10,
      sales: 95,
      sizes: ["M", "L"],
      reviewStars: 4.0,
    },
    {
      id: "3",
      name: "Váy Lolita Tím Pastel",
      minPrice: 800000,
      maxPrice: 900000,
      imageUrl: [
        "https://example.com/images/lolita-purple-1.jpg",
        "https://example.com/images/lolita-purple-2.jpg",
      ],
      colors: [
        { colorName: "Tím pastel", colorCode: "#CBAACB" },
        { colorName: "Trắng", colorCode: "#FFFFFF" },
      ],
      availability: ["S", "M"],
      discount: 20,
      sales: 80,
      sizes: ["S", "M"],
      reviewStars: 4.8,
    },
    {
      id: "4",
      name: "Váy Lolita Vàng Pastel",
      minPrice: 850000,
      maxPrice: 950000,
      imageUrl: [
        "https://example.com/images/lolita-yellow-1.jpg",
        "https://example.com/images/lolita-yellow-2.jpg",
      ],
      colors: [
        { colorName: "Vàng pastel", colorCode: "#FDFD96" },
        { colorName: "Trắng", colorCode: "#FFFFFF" },
      ],
      availability: ["L", "XL"],
      discount: 5,
      sales: 60,
      sizes: ["L", "XL"],
      reviewStars: 3.9,
    },
    {
      id: "5",
      name: "Váy Lolita Cam Pastel",
      minPrice: 900000,
      maxPrice: 1000000,
      imageUrl: [
        "https://example.com/images/lolita-orange-1.jpg",
        "https://example.com/images/lolita-orange-2.jpg",
      ],
      colors: [
        { colorName: "Cam pastel", colorCode: "#FFB347" },
        { colorName: "Trắng", colorCode: "#FFFFFF" },
      ],
      availability: ["M", "L", "XL"],
      discount: 25,
      sales: 150,
      sizes: ["M", "L", "XL"],
      reviewStars: 4.7,
    },
  ];

  return (
    <>
      <div className="w-full">
        <div className="bg-custom-pink h-[250px] flex items-center justify-center relative">
          {sampleAccessoryPageBanner.imageSrc && (
            <Image
              fill
              src={sampleAccessoryPageBanner.imageSrc}
              alt={sampleAccessoryPageBanner.title}
              className="absolute w-full h-full object-cover opacity-50"
            />
          )}
          <div className="relative text-center">
            <h1 className="text-white text-[32px] font-bold">
              {sampleAccessoryPageBanner.title}
            </h1>
            {sampleAccessoryPageBanner.description && (
              <p className="text-white text-[16px] mt-2">
                {sampleAccessoryPageBanner.description}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="px-10 flex gap-8 text-[12px]">
        <div className="flex flex-col w-[268px] sticky top-[52px] py-8 self-start">
          <div className="font-light italic">
            <Link href={"/"} className="hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link href={pathname} className="hover:underline">
              {(categoryName ?? "").charAt(0).toUpperCase() +
                (categoryName ?? "").slice(1)}
            </Link>
          </div>

          <div className="mt-4 mb-4 border-b-2 border-b-custom-rose">
            <div className="flex justify-between w-full">
              <h1 className="text-[14px] font-bold">
                Filters
                {(selectedSizes.length > 0 ||
                  selectedAvailability.length > 0 ||
                  selectedColors.length > 0) &&
                  `  (${selectedSizes.length + selectedAvailability.length + selectedColors.length})`}
              </h1>
              {(selectedSizes.length > 0 ||
                selectedAvailability.length > 0 ||
                selectedColors.length > 0) && (
                <button
                  className="underline font-light"
                  onClick={() => handleClearAllFilters()}
                >
                  Clear all
                </button>
              )}
            </div>
            <div
              className={`flex flex-wrap gap-2 mb-2 pb-1 ${selectedSizes.length > 0 || selectedAvailability.length > 0 || selectedColors.length > 0 ? "pt-4" : ""}`}
            >
              {selectedSizes.length > 0 &&
                selectedSizes.map((size) => (
                  <div
                    key={size}
                    className="flex items-center gap-2 bg-gray-200 py-1 px-3 rounded-full"
                  >
                    {size}
                    <button
                      onClick={() => handleRemoveSize(size)}
                      className="ml-2 text-custom-rose"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}

              {selectedAvailability.length > 0 &&
                selectedAvailability.map((status) => (
                  <div
                    key={status}
                    className="flex items-center gap-2 bg-gray-200 py-1 px-3 rounded-full"
                  >
                    {status}
                    <button
                      onClick={() => handleRemoveAvailability(status)}
                      className="ml-2 text-custom-rose"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}

              {selectedColors.length > 0 &&
                selectedColors.map((color) => (
                  <div
                    key={color.colorCode}
                    className="flex items-center gap-2 bg-gray-200 py-1 px-3 rounded-full"
                  >
                    {color.colorName}
                    <button
                      onClick={() => handleRemoveColor(color.colorCode)}
                      className="ml-2 text-custom-rose"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <FilterSection
            sizes={sizes}
            selectedSizes={selectedSizes}
            handleSizeChange={handleSizeChange}
            availability={availability}
            selectedAvailability={selectedAvailability}
            handleAvailabilityChange={handleAvailabilityChange}
            colors={colors}
            selectedColors={selectedColors}
            handleColorChange={handleColorChange}
          />
        </div>
        <ProductsSection products={exampleProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
