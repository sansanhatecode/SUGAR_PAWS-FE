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

// components/types.ts
export type ProductDetail = {
  id: string | number; // Thêm ID cho sản phẩm
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number; // Đổi tên từ reviews
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  benefits: string[];
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
