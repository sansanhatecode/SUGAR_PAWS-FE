import { useUserService } from "@/api/service/userService";
import { useQuery } from "@tanstack/react-query";

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
