import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

type Colors = {
  colorName: string;
  colorCode: string;
};

interface ColorCheckboxesProps {
  colors: Colors[];
  selectedColors: Colors[];
  handleColorChange: (color: string) => void;
}

const ColorCheckboxes = ({
  colors,
  selectedColors,
  handleColorChange,
}: ColorCheckboxesProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        className="flex items-center justify-between mt-4 mb-3 cursor-pointer"
        onClick={toggleOpen}
      >
        <h2 className="text-[12px] font-[600]">Color</h2>
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          whileHover={{ scale: 1.2 }}
        >
          <FontAwesomeIcon
            icon={isOpen ? faMinus : faPlus}
            className="text-sm"
            size="xs"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-3 gap-4">
          {colors.map(({ colorCode, colorName }) => (
            <div key={colorCode} className="flex flex-col items-center">
              <input
                type="checkbox"
                id={colorCode}
                name={colorCode}
                value={colorCode}
                checked={selectedColors.some(
                  (color) => color.colorCode === colorCode,
                )}
                onChange={() => handleColorChange(colorCode)}
                className="w-6 h-6 appearance-none rounded-full checked:border-[1px] checked:border-black"
                style={{ backgroundColor: colorCode }}
              />
              <label
                htmlFor={colorCode}
                className="text-[12px] font-light mt-1"
              >
                {colorName}
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ColorCheckboxes;
