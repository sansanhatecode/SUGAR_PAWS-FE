export type Product = {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  imageUrl: string[];
  colors: { colorName: string; colorCode: string }[];
  availability: string[];
  discount?: number;
  sales?: number;
  sizes?: string[];
  reviewStars?: number;
};
