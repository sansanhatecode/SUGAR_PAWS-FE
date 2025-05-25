import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetProductservice } from "@/api/service/productService";
import { Product } from "@/types/product";

export function useUpdateProduct() {
  const { updateProduct } = useGetProductservice();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Product>;
    }) => {
      return await updateProduct(id, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      queryClient.invalidateQueries({
        queryKey: ["productDetail", variables.id],
      });
    },
  });

  return { updateProductMutation: mutation };
}
