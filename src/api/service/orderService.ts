import { Order, OrderStatus } from "@/types/order";
import { useRequest } from "../Request";
import API from "../api";
import { Payment, PaymentMethod } from "@/types/payment";

// Define types for creating orders
export type CreateOrderItemDto = {
  productDetailId: number;
  quantity: number;
};

export type CreateOrderDto = {
  shippingAddressId: number;
  paymentMethod: string; // 'COD' or 'ONLINE'
  trackingCode?: string;
  status?: OrderStatus;
  orderItems: CreateOrderItemDto[];
};

export function useOrderService() {
  const { Request } = useRequest();

  const createOrder = async (orderData: CreateOrderDto) => {
    try {
      const { data } = await Request.post<Order>(API.ORDERS, orderData);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "CreateOrder Error:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || "Failed to create order.",
      );
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await Request.get<Order[]>(API.ORDERS);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("GetOrders Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch orders.",
      );
    }
  };

  const getOrderById = async (orderId: number) => {
    try {
      const { data } = await Request.get<Order>(`${API.ORDERS}/${orderId}`);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "GetOrderById Error:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch order details.",
      );
    }
  };

  const calculateShippingFee = async (addressId: number) => {
    try {
      const { data } = await Request.get<{ shippingFee: number }>(
        `${API.SHIPPING_FEE}/${addressId}`,
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "CalculateShippingFee Error:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || "Failed to calculate shipping fee.",
      );
    }
  };

  const processPayment = async (
    orderId: number,
    paymentData: {
      method: PaymentMethod;
      amount: number;
      responseData?: Record<string, unknown>;
    },
  ) => {
    try {
      const { data } = await Request.post<Payment>(
        `${API.ORDERS}/${orderId}/payment`,
        paymentData,
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "ProcessPayment Error:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || "Failed to process payment.",
      );
    }
  };

  const cancelOrder = async (orderId: number) => {
    try {
      const { data } = await Request.patch<Order>(
        `${API.ORDERS}/${orderId}/cancel`,
        { status: "cancelled" as OrderStatus },
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "CancelOrder Error:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || "Failed to cancel order.",
      );
    }
  };

  return {
    createOrder,
    getOrders,
    getOrderById,
    calculateShippingFee,
    processPayment,
    cancelOrder,
  };
}
