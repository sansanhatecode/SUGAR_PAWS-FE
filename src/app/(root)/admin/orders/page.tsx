"use client";

import {
  useGetAllOrders,
  useUpdateOrderStatus,
  useUpdatePaymentStatus,
} from "@/hooks/queries/useOrder";
import { Order } from "@/types/order";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useMemo, useState, useEffect } from "react";
import {
  FaShoppingBag,
  FaEdit,
  FaTrash,
  FaTimes,
  FaDollarSign,
} from "react-icons/fa";
import {
  Button,
  Group,
  Title,
  Box,
  LoadingOverlay,
  Paper,
  Modal,
  Select,
  Text,
  Badge,
} from "@mantine/core";
import { formatCurrency } from "@/helper/renderNumber";
import {
  formatOrderStatus,
  getMantineOrderStatusColor,
  getOrderStatusSelectOptions,
} from "@/helper/orderHelper";
import { useDisclosure } from "@mantine/hooks";
import OrderDetailModal from "./OrderDetailModal";

export default function OrderAdminPage() {
  const { getAllOrders } = useGetAllOrders();
  const { data: orders, isLoading, isError, refetch } = getAllOrders;
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const updatePaymentStatusMutation = useUpdatePaymentStatus();

  // Status update modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  // Order detail modal state
  const [detailOpened, { open: openDetail, close: closeDetail }] =
    useDisclosure(false);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  // Selected orders for batch operations
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // Update selectedOrderIds when rowSelection changes
  useEffect(() => {
    const selectedIds = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map(Number);
    setSelectedOrderIds(selectedIds);
  }, [rowSelection]);

  // Handle status change
  const handleStatusChange = async () => {
    if (!selectedOrder || !newStatus) return;

    try {
      await updateOrderStatusMutation.mutateAsync({
        orderId: selectedOrder.id,
        status: newStatus,
      });
      close();
      refetch();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  // Format date
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  // Handle order deletion (in a real app, this would typically be a soft delete)
  const handleDeleteOrder = (orderId: number) => {
    // Implementation would depend on your API
    console.log("Delete order", orderId);
  };

  // Handle marking selected orders as paid
  const handleMarkAsPaid = async () => {
    if (selectedOrderIds.length === 0) return;

    try {
      const selectedOrders =
        orders?.filter((order) => selectedOrderIds.includes(order.id)) || [];

      const promises = selectedOrders.map((order) => {
        if (order.payment?.id && order.payment.status !== "PAID") {
          return updatePaymentStatusMutation.mutateAsync({
            paymentId: order.payment.id,
            status: "PAID",
            paidAt: new Date(),
          });
        }
        return Promise.resolve();
      });

      await Promise.all(promises);
      setRowSelection({});
      refetch();
    } catch (error) {
      console.error("Failed to mark orders as paid:", error);
    }
  };

  // Column definitions
  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Order ID",
        size: 40,
      },
      {
        accessorKey: "userId",
        header: "User ID",
        size: 40,
      },
      {
        accessorKey: "userName",
        header: "User Name",
        size: 120,
        Cell: ({ cell }) => cell.getValue<string>() || "N/A",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 120,
        Cell: ({ cell }) => cell.getValue<string>() || "N/A",
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        Cell: ({ cell }) => (
          <Badge color={getMantineOrderStatusColor(cell.getValue<string>())}>
            {formatOrderStatus(cell.getValue<string>())}
          </Badge>
        ),
        filterVariant: "select",
        filterSelectOptions: [
          "PENDING",
          "CONFIRMED",
          "DELIVERED",
          "COMPLETED",
          "REQUESTCANCEL",
          "CANCELLED",
          "REFUNDED",
        ],
      },
      {
        accessorKey: "totalAmount",
        header: "Total Amount",
        size: 120,
        Cell: ({ cell }) => `${formatCurrency(cell.getValue<number>())} VND`,
        filterVariant: "range",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 160,
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
        filterVariant: "date-range",
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        size: 160,
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
        filterVariant: "date-range",
      },
      {
        accessorKey: "shippingFee",
        header: "Shipping Fee",
        size: 120,
        Cell: ({ cell }) => {
          const fee = cell.getValue<number | null>();
          return fee ? `${formatCurrency(fee)} VND` : "N/A";
        },
      },
      {
        accessorKey: "trackingCode",
        header: "Tracking Code",
        size: 120,
        Cell: ({ cell }) => cell.getValue<string>() || "N/A",
      },
      {
        accessorKey: "paidAt",
        header: "Paid At",
        size: 160,
        Cell: ({ cell }) => {
          const paidAt = cell.row.original.payment?.paidAt;
          return paidAt ? formatDate(paidAt) : "N/A";
        },
        filterVariant: "date-range",
      },
      {
        id: "paymentMethod",
        header: "Payment Method",
        size: 120,
        Cell: ({ row }) => {
          const payment = row.original.payment;
          const method = payment?.method;
          const getMethodDisplay = (method: string) => {
            switch (method) {
              case "CASH":
                return "Cash on Delivery";
              case "CREDIT_CARD":
                return "Credit Card";
              case "BANK_TRANSFER":
                return "Bank Transfer";
              default:
                return method || "N/A";
            }
          };

          const getMethodColor = (method: string) => {
            switch (method) {
              case "CASH":
                return "green";
              case "CREDIT_CARD":
                return "blue";
              case "BANK_TRANSFER":
                return "purple";
              default:
                return "gray";
            }
          };

          return (
            <Badge color={getMethodColor(method || "")}>
              {getMethodDisplay(method || "")}
            </Badge>
          );
        },
        filterVariant: "select",
        filterSelectOptions: ["CASH", "CREDIT_CARD", "BANK_TRANSFER"],
      },
      {
        id: "paidStatus",
        header: "Payment Status",
        size: 120,
        Cell: ({ row }) => {
          const payment = row.original.payment;
          const isPaid = payment?.paidAt || payment?.status === "PAID";
          return (
            <Badge color={isPaid ? "green" : "red"}>
              {isPaid ? "Paid" : "Unpaid"}
            </Badge>
          );
        },
        filterVariant: "select",
        filterSelectOptions: ["Paid", "Unpaid"],
      },
      {
        id: "actions",
        header: "Actions",
        size: 200,
        Cell: ({ row }) => (
          <Group spacing="xs">
            <Button
              size="xs"
              variant="outline"
              color="blue"
              onClick={() => {
                setSelectedOrder(row.original);
                setNewStatus(row.original.status);
                open();
              }}
              title="Change Status"
            >
              <FaEdit />
            </Button>
            <Button
              size="xs"
              variant="outline"
              color="green"
              onClick={() => {
                setDetailOrder(row.original);
                openDetail();
              }}
              title="View Details"
            >
              <FaShoppingBag />
            </Button>
            <Button
              size="xs"
              variant="outline"
              color="red"
              onClick={() => handleDeleteOrder(row.original.id)}
              title="Delete Order"
            >
              <FaTrash />
            </Button>
          </Group>
        ),
      },
    ],
    [open, openDetail],
  );

  const table = useMantineReactTable({
    columns,
    data: orders || [],
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFilters: true,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    enableColumnDragging: true,
    enableGlobalFilter: true,
    mantineTableProps: {
      withBorder: true,
      striped: true,
      highlightOnHover: true,
    },
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
      sorting: [{ id: "createdAt", desc: true }], // Sort by most recent first
      rowSelection: {},
    },
    mantineSearchTextInputProps: {
      placeholder: "Search all orders...",
    },
    getRowId: (row) => row.id.toString(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    renderTopToolbarCustomActions: () => (
      <Group spacing="xs">
        <Button
          color="red"
          onClick={() => {
            console.log("Bulk delete not implemented");
          }}
          disabled={selectedOrderIds.length === 0}
          leftIcon={<FaTimes />}
        >
          Delete Selected
        </Button>
        <Button
          color="yellow"
          onClick={handleMarkAsPaid}
          disabled={selectedOrderIds.length === 0}
          loading={updatePaymentStatusMutation.isPending}
          leftIcon={<FaDollarSign />}
        >
          Mark Selected as Paid
        </Button>
      </Group>
    ),
  });

  if (isError) {
    return (
      <div className="p-8">
        <Paper p="xl" shadow="md" className="bg-red-50">
          <Title order={3} className="text-red-600">
            Error loading orders data
          </Title>
          <p className="mt-2">Please try again later or contact support.</p>
        </Paper>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading || updateOrderStatusMutation.isPending}
          loaderProps={{ size: "lg", color: "blue" }}
        />
        <MantineReactTable table={table} />
      </Box>

      {/* Status Change Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={`Change Status for Order #${selectedOrder?.id}`}
        centered
        zIndex={1001}
      >
        <Box p="md">
          <Text size="sm" mb="md">
            Current Status:{" "}
            <Badge
              color={getMantineOrderStatusColor(selectedOrder?.status || "")}
            >
              {formatOrderStatus(selectedOrder?.status || "")}
            </Badge>
          </Text>

          <Select
            label="New Status"
            placeholder="Select new status"
            data={getOrderStatusSelectOptions()}
            value={newStatus}
            onChange={(value) => setNewStatus(value || "")}
            mb="md"
            zIndex={1002}
            withinPortal
          />

          <Group position="right" mt="md">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button
              onClick={handleStatusChange}
              loading={updateOrderStatusMutation.isPending}
              disabled={!newStatus || newStatus === selectedOrder?.status}
            >
              Update Status
            </Button>
          </Group>
        </Box>
      </Modal>

      {/* Order Detail Modal */}
      <OrderDetailModal
        opened={detailOpened}
        onClose={closeDetail}
        order={detailOrder}
      />
    </div>
  );
}
