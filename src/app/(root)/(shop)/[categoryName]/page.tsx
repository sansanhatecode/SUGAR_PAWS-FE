"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AccessoryPageBanner } from "@/types/accessory";
import {
  useGetColors,
  useGetProducts,
  useGetSizes,
} from "@/hooks/queries/useProducts";
import { getColorCode } from "@/helper/getColorCode";
import CategoryPageBanner from "@/components/category/CategoryPageBanner";
import CategoryPageFilters from "@/components/category/CategoryPageFilters";
import CategoryPageLayout from "@/components/category/CategoryPageLayout";

const CategoryPage = () => {
  const pathname = usePathname();
  const categoryName = pathname.split("/").pop();

  const { getProducts } = useGetProducts({
    categoryName: categoryName || "",
  });

  const { getColors } = useGetColors({
    categoryName: categoryName || "",
  });
  const { getSizes } = useGetSizes({
    categoryName: categoryName || "",
  });

  const { data: productsData, isLoading, error } = getProducts;

  const { data: sizes } = getSizes;
  const { data: colorsData } = getColors;
  const availability = ["In Stock", "Out of Stock"];
  const colors =
    colorsData?.map((color) => ({
      colorName: color,
      colorCode: getColorCode(color) || "",
    })) || [];

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [selectedColors, setSelectedColors] = useState<
    { colorName: string; colorCode: string }[]
  >([]);

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((s) => s !== size)
        : [...prevSelectedSizes, size]
    );
  };

  const handleAvailabilityChange = (status: string) => {
    setSelectedAvailability((prevSelectedAvailability) =>
      prevSelectedAvailability.includes(status)
        ? prevSelectedAvailability.filter((s) => s !== status)
        : [...prevSelectedAvailability, status]
    );
  };

  const handleColorChange = (colorCode: string) => {
    setSelectedColors((prevSelectedColors) => {
      const selectedColor = colors.find(
        (color) => color.colorCode === colorCode
      );
      if (!selectedColor) return prevSelectedColors;
      return prevSelectedColors.some((color) => color.colorCode === colorCode)
        ? prevSelectedColors.filter((color) => color.colorCode !== colorCode)
        : [...prevSelectedColors, selectedColor];
    });
  };

  const handleRemoveSize = (size: string) => {
    setSelectedSizes(selectedSizes.filter((s) => s !== size));
  };

  const handleRemoveAvailability = (status: string) => {
    setSelectedAvailability(selectedAvailability.filter((s) => s !== status));
  };

  const handleRemoveColor = (colorCode: string) => {
    setSelectedColors(
      selectedColors.filter((color) => color.colorCode !== colorCode)
    );
  };

  const handleClearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedAvailability([]);
    setSelectedColors([]);
  };

  const pageTitle = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "Sample Category";

  const products = productsData || [];

  return (
    <CategoryPageLayout
      isLoading={isLoading}
      error={error}
      products={products}
      isEmpty="No products found for this category."
      banner={
        <CategoryPageBanner
          title={pageTitle}
          description="Explore our exclusive collection."
          isLoading={isLoading}
        />
      }
      filters={
        <CategoryPageFilters
          pathname={pathname}
          categoryName={categoryName}
          sizes={sizes || []}
          selectedSizes={selectedSizes}
          handleSizeChange={handleSizeChange}
          availability={availability}
          selectedAvailability={selectedAvailability}
          handleAvailabilityChange={handleAvailabilityChange}
          colors={colors}
          selectedColors={selectedColors}
          handleColorChange={handleColorChange}
          handleRemoveSize={handleRemoveSize}
          handleRemoveColor={handleRemoveColor}
          handleRemoveAvailability={handleRemoveAvailability}
          handleClearAllFilters={handleClearAllFilters}
        />
      }
    />
  );
};

export default CategoryPage;
