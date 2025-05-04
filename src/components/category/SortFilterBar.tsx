import React from "react";
import Select from "../ui/Select";

interface SortFilterBarProps {
  totalProducts: number;
  sortOption: string;
  handleSortChange: (option: string) => void;
}

const SortFilterBar = ({
  totalProducts,
  sortOption,
  handleSortChange,
}: SortFilterBarProps) => {
  const sortOptions = [
    { value: "", label: "Featured" },
    { value: "bestselling", label: "Best Selling" },
    { value: "newest", label: "Newest" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "price-low-high", label: "Price: Low to High" },
  ];

  return (
    <div className="flex justify-between items-center w-full pb-2 pr-10">
      <div>
        <span className="font-medium">{totalProducts}</span> products
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Sort by:</span>
        <Select
          options={sortOptions}
          value={sortOption}
          onChange={handleSortChange}
        />
      </div>
    </div>
  );
};

export default SortFilterBar;
