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

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const { data } = await Request.patch<User>(API.ME, profileData);
      return data;
    } catch (error) {
      console.error("UpdateProfile Error:", error);
      throw error;
    }
  };

  return { getMyInfo, updateProfile };
}
