import { useOrderService, CreateOrderDto } from "@/api/service/orderService";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";
import { PaymentMethod } from "@/types/payment";

export function useCreateOrder() {
  const { createOrder } = useOrderService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderDto) => {
      return await createOrder(orderData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useGetOrders() {
  const { getOrders } = useOrderService();
  const userInfo = useSelector(selectUser);
  const isLoggedIn = !!(userInfo && userInfo.username);

  const getOrdersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    enabled: isLoggedIn,
  });

  return { getOrders: getOrdersQuery };
}

export function useGetOrderById(orderId: number) {
  const { getOrderById } = useOrderService();

  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

export function useCalculateShippingFee(addressId: number) {
  const { calculateShippingFee } = useOrderService();

  return useQuery({
    queryKey: ["shippingFee", addressId],
    queryFn: () => calculateShippingFee(addressId),
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
  });
}

export function useProcessPayment() {
  const { processPayment } = useOrderService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      paymentData,
    }: {
      orderId: number;
      paymentData: {
        method: PaymentMethod;
        amount: number;
        responseData?: Record<string, unknown>;
      };
    }) => {
      return await processPayment(orderId, paymentData);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useCancelOrder() {
  const { cancelOrder } = useOrderService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      return await cancelOrder(orderId);
    },
    onSuccess: (_data, orderId) => {
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
