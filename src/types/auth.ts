export interface SigninRequest {
  identifier: string;
  password: string;
}

export interface SignupRequest extends SigninRequest {
  name: string;
}

export interface LoginResponseData {
  // username: string;
  // email: string;
  accessToken: string;
  // refreshToken: string;
}