import { ShippingAddress } from "./address";
import { Product } from "./product";

export type Order = {
  id: number;
  userId: number;
  shippingAddressId: number;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  deliveredAt?: Date;
  paymentMethod?: string;
  shippingFee?: number;
  totalAmount: number;
  trackingCode?: string;
  status: OrderStatus;

  shippingAddress?: ShippingAddress;
  orderItems?: OrderItem[];
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;

  product?: Product;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "delivered"
  | "cancelled"
  | "returned";
