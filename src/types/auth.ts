export interface SigninRequest {
  identifier: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginResponseData {
  // username: string;
  // email: string;
  accessToken: string;
  // refreshToken: string;
}
