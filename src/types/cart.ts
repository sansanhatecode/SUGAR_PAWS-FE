import { ProductDetail } from "./product";

export type CartItem = {
  id: string;
  product: ProductDetail;
  quantity: number;
};
