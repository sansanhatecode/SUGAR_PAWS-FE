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
  id: string | number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  colors: string;
  sizes: string;
  image: ImageDetail;
  productDetails: string[];
  moreDetails: string[];
};

export type ImageDetail = {
  id: number | string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

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
};

export type GetColorsRequest = {
  categoryName: string;
};

export type GetSizesRequest = {
  categoryName: string;
};
