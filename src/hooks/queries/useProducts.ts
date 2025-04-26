import { useQuery } from "@tanstack/react-query";
import { useGetProductservice } from "@/api/service/productService";
import {
  GetColorsRequest,
  GetProductsRequest,
  GetSizesRequest,
} from "@/types/product";

export function useGetProducts(params: GetProductsRequest) {
  const { getProducts } = useGetProductservice();

  const getProductsQuery = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
  return {
    getProducts: getProductsQuery,
  };
}

export function useGetColors(params: GetColorsRequest) {
  const { getColors } = useGetProductservice();

  const getColorsQuery = useQuery({
    queryKey: ["colors", params],
    queryFn: () => getColors(params),
  });

  return {
    getColors: getColorsQuery,
  };
}

export function useGetSizes(params: GetSizesRequest) {
  const { getSizes } = useGetProductservice();

  const getSizesQuery = useQuery({
    queryKey: ["sizes", params],
    queryFn: () => getSizes(params),
  });

  return {
    getSizes: getSizesQuery,
  };
}
