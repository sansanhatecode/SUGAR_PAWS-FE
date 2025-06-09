import {
  useGetAllProducts,
  useUpdateProduct,
  useCreateProduct,
} from "@/hooks/queries/useProducts";
import { Button, Box, LoadingOverlay, Paper, Title } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { FiEye, FiEdit, FiPlus } from "react-icons/fi";

import PreviewProduct from "./ProductDetailModal";
import ProductDetailTableModal from "./ProductDetailTableModal";
import ProductModal from "./ProductModal";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { showSuccessToast } from "@/components/ui/SuccessToast";

const ProductTable: React.FC = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, // 0-based index
    pageSize: 10, // Default page size
  });

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
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [detailProductId, setDetailProductId] = useState<string | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: createProduct } = useCreateProduct();

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    setIsEditMode(true);
    setProductModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditProduct(null);
    setIsEditMode(false);
    setProductModalOpen(true);
  };

  const handleProductSubmit = async (data: {
    name: string;
    description: string;
    vendor?: string;
    categories?: number[];
    tags?: string[];
    images?: File[];
    displayImage?: string[];
  }) => {
    if (isEditMode && editProduct) {
      // Edit mode
      await updateProduct({
        id: editProduct.id,
        updateData: {
          name: data.name,
          description: data.description,
          vendor: data.vendor,
          categories: data.categories,
          tags: data.tags,
          displayImage: data.displayImage,
        },
        images: data.images,
      });
      showSuccessToast(`Product "${data.name}" updated successfully!`);
    } else {
      // Create mode
      await createProduct({
        productData: {
          name: data.name,
          description: data.description,
          categories: data.categories,
          vendor: data.vendor,
          tags: data.tags,
          displayImage: data.displayImage || [],
        },
        images: data.images,
      });
      showSuccessToast(`Product "${data.name}" created successfully!`);
    }
    setProductModalOpen(false);
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
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Button
            size="xs"
            variant="outline"
            color="blue"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(row.original);
            }}
          >
            <FiEye />
          </Button>
          <Button
            size="xs"
            variant="outline"
            color="orange"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(row.original);
            }}
          >
            <FiEdit />
          </Button>
        </div>
      ),
      size: 100,
    },
  ];

  if (error) {
    return (
      <div className="p-8">
        <Paper p="xl" shadow="md" className="bg-red-50">
          <Title order={3} className="text-red-600">
            Error loading products data
          </Title>
          <p className="mt-2">Please try again later or contact support.</p>
        </Paper>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <Box pos="relative">
          <LoadingOverlay
            visible={isLoading}
            loaderProps={{ size: "lg", color: "blue" }}
          />
          {products && products.length > 0 ? (
            <MantineReactTable
              columns={columns}
              data={products}
              enableRowSelection={true}
              enableColumnActions={false}
              enableColumnFilters={true}
              enableSorting={true}
              enablePagination={true}
              enableColumnFilterModes={true}
              enableColumnOrdering={true}
              enableColumnDragging={true}
              enableGlobalFilter={true}
              manualPagination={true}
              onPaginationChange={setPagination}
              rowCount={rowCount}
              state={{ pagination }}
              initialState={{
                pagination: { pageIndex: 0, pageSize: 10 },
                showGlobalFilter: true,
              }}
              mantineTableProps={{
                style: { border: "1px solid #e9ecef" },
                striped: true,
                highlightOnHover: true,
              }}
              mantineSearchTextInputProps={{
                placeholder: "Search all products...",
              }}
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
              renderTopToolbarCustomActions={() => (
                <Button
                  color="green"
                  onClick={handleCreateClick}
                  leftSection={<FiPlus size={16} />}
                  className="ml-2"
                >
                  Create New Product
                </Button>
              )}
            />
          ) : (
            !isLoading && <div className="text-center">No products found.</div>
          )}
        </Box>
      </div>
      {/* Product Detail Modal */}
      <PreviewProduct
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <ProductModal
        opened={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        product={isEditMode ? editProduct : null}
        onSubmit={handleProductSubmit}
        isEditMode={isEditMode}
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
