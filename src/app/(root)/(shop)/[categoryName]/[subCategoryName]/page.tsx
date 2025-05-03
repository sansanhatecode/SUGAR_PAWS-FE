/* eslint-disable prettier/prettier */
"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  useGetColors,
  useGetProducts,
  useGetSizes,
} from "@/hooks/queries/useProducts";
import { getColorCode } from "@/helper/colorHelper";
import CategoryPageFilters from "@/components/category/CategoryPageFilters";
import CategoryPageLayout from "@/components/category/CategoryPageLayout";
import { Colors } from "@/components/ColorCheckboxes";

const CategoryPage = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const subCategoryName = pathSegments.pop();
  const categoryName = pathSegments.pop();

  // Fetch products, colors, and sizes based on subcategory
  const { getProducts } = useGetProducts({
    categoryName: subCategoryName || "",
  });

  const { getColors } = useGetColors({
    categoryName: subCategoryName || "",
  });
  const { getSizes } = useGetSizes({
    categoryName: subCategoryName || "",
  });

  const { data: productsData, isLoading, error } = getProducts;

  const { data: sizes } = getSizes;
  const { data: colorsData } = getColors;
  const availability = ["In Stock", "Out of Stock"];
  const colors =
    colorsData?.map(
      (color) =>
        ({
          colorName: color,
          colorCode: getColorCode(color) || "",
        }) as Colors
    ) || [];

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [selectedColors, setSelectedColors] = useState<Colors[] | []>([]);

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

  const handleColorChange = (colorName: string) => {
    setSelectedColors((prevSelectedColors) => {
      const selectedColor = colors.find(
        (color) => color.colorName === colorName
      );
      if (!selectedColor) return prevSelectedColors;
      return prevSelectedColors.some((color) => color.colorName === colorName)
        ? prevSelectedColors.filter((color) => color.colorName !== colorName)
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

  const pageTitle = subCategoryName
    ? subCategoryName.charAt(0).toUpperCase() + subCategoryName.slice(1)
    : "Sample Category";

  // Replace example products with data from API
  const products = productsData || [];

  return (
    <CategoryPageLayout
      isLoading={isLoading}
      error={error}
      products={products}
      isEmpty="Sorry, there are no products in this collection."
      filters={
        <CategoryPageFilters
          pathname={pathname}
          categoryName={categoryName}
          subCategoryName={subCategoryName}
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
