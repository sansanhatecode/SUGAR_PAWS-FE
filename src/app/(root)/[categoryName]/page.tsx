"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import FilterSection from "../../../components/FilterSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div className="px-10 flex text-[12px]">
      <div className="flex flex-col w-[268px] sticky top-[52px] py-8 self-start">
        <div className="font-light italic">
          <Link href={"/"} className="hover:underline">
            Home /{" "}
          </Link>
          <Link href={pathname} className="hover:underline">
            {categoryName}
          </Link>
        </div>

        {/* Display selected filters */}
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
    </div>
  );
};

export default CategoryPage;
