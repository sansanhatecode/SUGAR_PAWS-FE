import { OrderStatus } from "@/types/order";

/**
 * Format order status for display
 * @param status - The order status in uppercase format
 * @returns Formatted status string for display
 */
export const formatOrderStatus = (status: OrderStatus | string): string => {
  const statusMap: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    DELIVERED: "Delivered",
    COMPLETED: "Completed",
    REQUESTCANCEL: "Request Cancel",
    CANCELLED: "Cancelled",
    REFUNDED: "Refunded",
  };
  return statusMap[status] || status;
};

/**
 * Get color class for order status badge
 * @param status - The order status
 * @returns CSS color class
 */
export const getOrderStatusColor = (status: OrderStatus | string): string => {
  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
    COMPLETED: "bg-emerald-100 text-emerald-800",
    REQUESTCANCEL: "bg-orange-100 text-orange-800",
    CANCELLED: "bg-red-100 text-red-800",
    REFUNDED: "bg-gray-200 text-gray-700",
  };
  return statusColors[status] || "bg-gray-100 text-gray-700";
};

/**
 * Get Mantine color for order status badge
 * @param status - The order status
 * @returns Mantine color string
 */
export const getMantineOrderStatusColor = (
  status: OrderStatus | string,
): string => {
  const statusColors: Record<string, string> = {
    PENDING: "yellow",
    CONFIRMED: "blue",
    DELIVERED: "green",
    COMPLETED: "teal",
    REQUESTCANCEL: "orange",
    CANCELLED: "red",
    REFUNDED: "gray",
  };
  return statusColors[status] || "gray";
};

/**
 * Check if an order status allows cancellation
 * @param status - The order status
 * @returns true if the order can be cancelled
 */
export const canCancelOrder = (status: OrderStatus | string): boolean => {
  return status === "PENDING" || status === "CONFIRMED";
};

/**
 * Get the next possible status transitions for an order
 * @param currentStatus - The current order status
 * @returns Array of possible next statuses
 */
export const getNextPossibleStatuses = (
  currentStatus: OrderStatus | string,
): OrderStatus[] => {
  const transitions: Record<string, OrderStatus[]> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["DELIVERED", "REQUESTCANCEL", "CANCELLED"],
    DELIVERED: ["COMPLETED", "REQUESTCANCEL"],
    COMPLETED: ["REFUNDED"],
    REQUESTCANCEL: ["CANCELLED", "REFUNDED"],
    CANCELLED: [],
    REFUNDED: [],
  };
  return transitions[currentStatus] || [];
};

/**
 * Get select options for order status dropdown
 * @returns Array of select options with value and label
 */
export const getOrderStatusSelectOptions = () => {
  return [
    { value: "PENDING", label: "Pending" },
    { value: "CONFIRMED", label: "Confirmed" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "COMPLETED", label: "Completed" },
    { value: "REQUESTCANCEL", label: "Request Cancel" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "REFUNDED", label: "Refunded" },
  ];
};
