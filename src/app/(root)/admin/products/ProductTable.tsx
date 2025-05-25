import { useGetAllProducts } from "@/hooks/queries/useProducts";
import { useUpdateProduct } from "@/hooks/queries/useUpdateProduct";
import { Button } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { FiEye, FiEdit } from "react-icons/fi";

import EditProductModal from "./EditProductModal";
import PreviewProduct from "./ProductDetailModal";
import ProductDetailTableModal from "./ProductDetailTableModal";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { showSuccessToast } from "@/components/ui/SuccessToast";

const ProductTable: React.FC = () => {
  // Pagination state using Mantine React Table's pagination format
  const [pagination, setPagination] = useState({
    pageIndex: 0, // 0-based index
    pageSize: 10, // Default page size
  });

  // Fetch products with server-side pagination
  const { getAllProducts } = useGetAllProducts({
    page: pagination.pageIndex + 1, // Convert to 1-based index for API
    itemPerPage: pagination.pageSize,
  });
  const { data: productsData, isLoading, error } = getAllProducts;
  const products = productsData?.products;
  const totalProducts = productsData?.totalProducts || 0;
  const rowCount = totalProducts;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailProductId, setDetailProductId] = useState<string | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const { updateProductMutation } = useUpdateProduct();

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (data: {
    name: string;
    description: string;
    vendor?: string;
    categories?: Category[];
    tags?: string[];
  }) => {
    if (!editProduct) return;
    await updateProductMutation.mutateAsync({
      id: editProduct.id,
      data: {
        name: data.name,
        description: data.description,
        vendor: data.vendor,
        categories: data.categories,
        tags: data.tags,
      },
    });
    showSuccessToast(`Product "${data.name}" updated successfully!`);
    setEditModalOpen(false);
    setEditProduct(null);
  };

  const columns: MRT_ColumnDef<Product>[] = [
    {
      accessorKey: "displayImage",
      header: "Image",
      Cell: ({ cell }) => {
        const images = cell.getValue<string[]>();
        const imgSrc =
          images && images[0]
            ? images[0].startsWith("//")
              ? `https:${images[0]}`
              : images[0]
            : "/assets/images/loading/no-image.png";
        return (
          <div className="w-16 h-16 mx-auto relative">
            <Image
              src={imgSrc}
              alt="Product Image"
              fill
              className="object-cover rounded"
              sizes="64px"
              priority={false}
            />
          </div>
        );
      },
      size: 80,
    },
    {
      accessorKey: "name",
      header: "Product Name",
      Cell: ({ cell }) => {
        const value = cell.getValue<string>();
        return (
          <div
            className="line-clamp-2 hover:cursor-help"
            title={value}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      Cell: ({ cell }) => {
        const value = cell.getValue<string>();
        return (
          <div
            className="line-clamp-2 hover:cursor-help"
            title={value || "Unknown Vendor"}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value || "Unknown Vendor"}
          </div>
        );
      },
      size: 120,
    },
    {
      accessorKey: "minPrice",
      header: "Min Price",
      Cell: ({ cell }) => {
        const value = cell.getValue<number>();
        return `${value?.toLocaleString()}₫`;
      },
      size: 100,
    },
    {
      accessorKey: "maxPrice",
      header: "Max Price",
      Cell: ({ cell }) => {
        const value = cell.getValue<number>();
        return `${value?.toLocaleString()}₫`;
      },
      size: 100,
    },
    {
      accessorKey: "totalStock",
      header: "Stock",
      size: 60,
    },
    {
      accessorKey: "totalSales",
      header: "Sold",
      Cell: ({ cell }) => {
        const value = cell.getValue<number | undefined>();
        return value ?? 0;
      },
      size: 60,
    },
    {
      accessorKey: "discount",
      header: "Discount (%)",
      Cell: ({ cell }) => {
        const value = cell.getValue<number | undefined>();
        return value ?? 0;
      },
      size: 80,
    },
    {
      accessorKey: "categories",
      header: "Category",
      Cell: ({ cell }) => {
        const categories = cell.getValue<Category[] | undefined>();
        const value =
          categories && categories.length > 0
            ? categories
                .map(
                  (cat) => cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
                )
                .join(", ")
            : "-";

        return (
          <div
            className="line-clamp-2 hover:cursor-help"
            title={value}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              position: "relative",
            }}
            data-tooltip={value}
          >
            {value}
            <div className="absolute z-10 bg-gray-800 text-white text-sm rounded p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-normal max-w-xs top-full left-0" />
          </div>
        );
      },
      size: 120,
    },
    {
      accessorKey: "tags",
      header: "Tags",
      Cell: ({ cell }) => {
        const tags = cell.getValue<string[] | undefined>();
        const value = tags && tags.length > 0 ? tags.join(", ") : "-";

        return (
          <div
            className="line-clamp-2 hover:cursor-help group"
            title={value}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              position: "relative",
            }}
            data-tooltip={value}
          >
            {value}
            <div className="absolute z-10 bg-gray-800 text-white text-sm rounded p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-normal max-w-xs top-full left-0" />
          </div>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      Cell: ({ row }) => (
        <div style={{ display: "flex", gap: 0, justifyContent: "center" }}>
          <Button
            size="md"
            bg={"transparent"}
            variant="light"
            color="blue"
            radius="xl"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(row.original);
            }}
          >
            <FiEye size={16} />
          </Button>
          <Button
            size="md"
            variant="light"
            bg={"transparent"}
            color="orange"
            radius="xl"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(row.original);
            }}
          >
            <FiEdit size={16} />
          </Button>
        </div>
      ),
      size: 100,
    },
  ];

  return (
    <>
      {isLoading && <div>Loading products...</div>}
      {error && (
        <div className="text-red-500 text-center my-4">
          An error occurred while loading products
        </div>
      )}
      {products ? (
        <>
          <MantineReactTable
            columns={columns}
            data={products || []}
            enableRowSelection={false}
            enableColumnActions={false}
            enableColumnFilters={false}
            enableSorting={true}
            enablePagination={true}
            manualPagination={true}
            onPaginationChange={setPagination}
            rowCount={rowCount}
            state={{ pagination }}
            initialState={{ pagination: { pageIndex: 0, pageSize: 10 } }}
            mantinePaginationProps={{
              rowsPerPageOptions: ["10", "20", "30", "50"],
              withEdges: true,
            }}
            mantineTableBodyRowProps={({ row }) => ({
              style: { cursor: "pointer" },
              onClick: () => {
                setDetailProductId(row.original.id);
                setDetailModalOpen(true);
              },
            })}
          />
        </>
      ) : (
        !isLoading && <div className="text-center">No products found.</div>
      )}
      {/* Product Detail Modal */}
      <PreviewProduct
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <EditProductModal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={editProduct}
        onSubmit={handleEditSubmit}
      />

      {/* Product Detail Table Modal */}
      <ProductDetailTableModal
        productId={detailProductId}
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />
    </>
  );
};

export default ProductTable;
