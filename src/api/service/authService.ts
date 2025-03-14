import API from "@/api/api";
import { useRequest } from "@/api/Request";
import { SigninRequest, LoginResponseData, SignupRequest } from "@/types/auth";

export function useAuthService() {
  const { Request } = useRequest();

  const signIn = async ({ identifier, password }: SigninRequest) => {
    try {
      const {data} = await Request.post<LoginResponseData>(API.LOGIN, { identifier, password });
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("SignIn Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Sign in failed.");
    }
  };

  const signUp = async ({ name, identifier, password }: SignupRequest) => {
    try {
      const { data } = await Request.post(API.REGISTER, { name, identifier, password });
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("SignUp Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Sign up failed.");
    }
  };

  const verify = async (code: string) => {
    try {
      const { data } = await Request.get(API.VERIFY, { code });
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Verify Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Verification failed.");
    }
  };

  return { signIn, signUp, verify };
}
