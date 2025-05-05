export type Product = {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  displayImage: string[];
  vendor?: string;
  colors: string[];
  totalStock: number;
  discount?: number;
  totalSales?: number;
  sizes?: string[];
  reviewStars?: number;
  tags?: string[];
  rating?: number;
  description?: string;
  productDetails?: ProductDetail[];
};

// components/types.ts
export type ProductDetail = {
  id: number;
  productId: string | number;
  name?: string;
  vendor?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  color: string;
  size: string;
  image: ImageDetail;
  moreDetails: string[];
};

export type ImageDetail = {
  id: number | string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
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
  colors?: string[];
  sizes?: string[];
  availability?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
};

export type GetColorsRequest = {
  categoryName: string;
};

export type GetSizesRequest = {
  categoryName: string;
};
