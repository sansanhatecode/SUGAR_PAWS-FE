import React from "react";
import SizeCheckboxes from "./SizeCheckboxes";
import AvailabilityCheckboxes from "./AvailabilityCheckboxes";
import ColorCheckboxes, { Colors } from "./ColorCheckboxes";

interface FilterSectionProps {
  sizes: string[];
  selectedSizes: string[];
  handleSizeChange: (size: string) => void;
  availability: string[];
  selectedAvailability: string[];
  handleAvailabilityChange: (status: string) => void;
  colors: Colors[];
  selectedColors: Colors[];
  handleColorChange: (colorName: string) => void;
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
