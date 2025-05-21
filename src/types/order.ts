import { ShippingAddress } from "./address";
import { ProductDetail } from "./product";
import { Payment } from "./payment";

export type Order = {
  id: number;
  userId: number;
  shippingAddressId: number;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  deliveredAt?: Date;
  shippingFee?: number;
  totalAmount: number;
  trackingCode?: string;
  status: OrderStatus;
  payId?: number; // Replaced paymentMethod with payId to link with payment

  shippingAddress?: ShippingAddress;
  orderItems?: OrderItem[];
  payment?: Payment;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productDetailId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;

  productDetail?: ProductDetail;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "delivered"
  | "cancelled"
  | "returned";
