export type Product = {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  displayImage: string[];
  vendor?: string;
  colors: string[];
  totalStock: string[];
  discount?: number;
  sales?: number;
  sizes?: string[];
  reviewStars?: number;
  tags?: string[];
  rating?: number;
  description?: string;
  productDetails?: unknown[];
};

// components/types.ts
export type ProductDetail = {
  id: string | number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  colors: string;
  sizes: string;
  images: string;
  productDetails: string[];
  moreDetails: string[];
};

export type Review = {
  id: number;
  name: string;
  rating: number;
  time: string;
  title: string;
  comment: string;
};

export type GetProductsRequest = {
  categoryName: string;
  minPrice?: number;
  maxPrice?: number;
};

export type GetColorsRequest = {
  categoryName: string;
};

export type GetSizesRequest = {
  categoryName: string;
};
