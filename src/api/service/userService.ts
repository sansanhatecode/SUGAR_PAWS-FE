import { User } from "@/types/user";
import { useRequest } from "../Request";
import API from "../api";

export function useUserService() {
  const { Request } = useRequest();

  const getMyInfo = async () => {
    try {
      const { data } = await Request.get<User>(API.ME);
      return data;
    } catch (error) {
      console.error("GetMyInfo Error:", error);
    }
  };

  return { getMyInfo };
}
