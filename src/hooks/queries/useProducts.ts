import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductservice } from "@/api/service/productService";
import {
  GetColorsRequest,
  GetProductsRequest,
  GetSizesRequest,
  UploadProductDto,
} from "@/types/product";
import { Product } from "@/types/product";

export function useGetProducts(params: GetProductsRequest) {
  const { getProducts } = useProductservice();

  const getProductsQuery = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
  return {
    getProducts: getProductsQuery,
  };
}

export function useGetAllProducts({
  page = 1,
  itemPerPage = 10,
}: {
  page?: number;
  itemPerPage?: number;
}) {
  const { getAllProducts } = useProductservice();
  const getAllProductsQuery = useQuery<
    { products: Product[]; totalProducts: number } | undefined,
    Error
  >({
    queryKey: ["allProducts", page, itemPerPage],
    queryFn: () => getAllProducts({ page, itemPerPage }),
  });

  return {
    getAllProducts: getAllProductsQuery,
  };
}

export function useGetColors(params: GetColorsRequest) {
  const { getColors } = useProductservice();

  const getColorsQuery = useQuery({
    queryKey: ["colors", params],
    queryFn: () => getColors(params),
  });

  return {
    getColors: getColorsQuery,
  };
}

export function useGetSizes(params: GetSizesRequest) {
  const { getSizes } = useProductservice();

  const getSizesQuery = useQuery({
    queryKey: ["sizes", params],
    queryFn: () => getSizes(params),
  });

  return {
    getSizes: getSizesQuery,
  };
}

export function useGetProductDetail(productId: string) {
  const { getProductDetail } = useProductservice();

  const getProductDetailQuery = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    getProductDetail: getProductDetailQuery,
  };
}

export function useCreateProduct() {
  const { createProduct } = useProductservice();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productData,
      images,
    }: {
      productData: Omit<UploadProductDto, "id">;
      images?: File[];
    }) => createProduct(productData, images),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { updateProduct } = useProductservice();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updateData,
      images,
    }: {
      id: string;
      updateData: Partial<UploadProductDto>;
      images?: File[];
    }) => updateProduct(id, updateData, images),
    onSuccess: (_, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["productDetail", variables.id],
      });
    },
  });
}
