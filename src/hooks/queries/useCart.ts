import { useCartService } from "@/api/service/cartService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";

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
  const userInfo = useSelector(selectUser);
  const isLoggedIn = !!(userInfo && userInfo.username);

  const getCartItemsQuery = useQuery({
    queryKey: ["cartItems"],
    queryFn: () => getCartItems(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: isLoggedIn, // Only run the query if the user is logged in
  });

  return { getCartItems: getCartItemsQuery };
}
