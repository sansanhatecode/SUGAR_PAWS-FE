import { useCartService } from "@/api/service/cartService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddProductToCart() {
  const { addToCart } = useCartService();
  const queryClient = useQueryClient();

  const addProductToCart = async (productId: number, quantity: number) => {
    try {
      const data = await addToCart(productId, quantity);
      // Invalidate and refetch cart items after adding product
      await queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      return data;
    } catch (error) {
      console.error("AddProductToCart Error:", error);
      throw new Error("Failed to add product to cart.");
    }
  };

  return { addProductToCart };
}

export function useGetCartItems() {
  const { getCartItems } = useCartService();

  const getCartItemsQuery = useQuery({
    queryKey: ["cartItems"],
    queryFn: () => getCartItems(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return { getCartItems: getCartItemsQuery };
}
