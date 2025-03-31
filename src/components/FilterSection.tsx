import React from "react";
import SizeCheckboxes from "./SizeCheckboxes";
import AvailabilityCheckboxes from "./AvailabilityCheckboxes";
import ColorCheckboxes from "./ColorCheckboxes";

interface FilterSectionProps {
  sizes: string[];
  selectedSizes: string[];
  handleSizeChange: (size: string) => void;
  availability: string[];
  selectedAvailability: string[];
  handleAvailabilityChange: (status: string) => void;
  colors: { colorName: string; colorCode: string }[];
  selectedColors: { colorName: string; colorCode: string }[];
  handleColorChange: (colorCode: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  sizes,
  selectedSizes,
  handleSizeChange,
  availability,
  selectedAvailability,
  handleAvailabilityChange,
  colors,
  selectedColors,
  handleColorChange,
}) => {
  return (
    <>
      <SizeCheckboxes
        sizes={sizes}
        selectedSizes={selectedSizes}
        handleSizeChange={handleSizeChange}
      />
      <AvailabilityCheckboxes
        availability={availability}
        selectedAvailability={selectedAvailability}
        handleAvailabilityChange={handleAvailabilityChange}
      />
      <ColorCheckboxes
        colors={colors}
        selectedColors={selectedColors}
        handleColorChange={handleColorChange}
      />
    </>
  );
};

export default FilterSection;
