import colors from "@/const/colors";

export function getColorCode(color: string) {
  const foundColor = colors.find(
    (c) => c.colorName.toLowerCase() === color.toLowerCase()
  );
  return foundColor ? foundColor.colorCode : undefined;
}
