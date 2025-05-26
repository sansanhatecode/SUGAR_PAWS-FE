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
  confirmedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  refundedAt?: Date;
  requestCancelAt?: Date;
  status: OrderStatus;
  payId?: number;
  userName?: string;
  phoneNumber?: string;

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
  | "PENDING"
  | "CONFIRMED"
  | "DELIVERED"
  | "COMPLETED"
  | "REQUESTCANCEL"
  | "CANCELLED"
  | "REFUNDED";
