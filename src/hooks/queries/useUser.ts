import { useUserService } from "@/api/service/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetMyInfo() {
  const { getMyInfo } = useUserService();

  const getMyInfoQuery = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => getMyInfo(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return { getMyInfo: getMyInfoQuery };
}

export function useUpdateMyInfo() {
  const { updateProfile } = useUserService();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      // Refetch user info after update
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });

  return mutation;
}
