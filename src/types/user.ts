export type User = {
  name: string;
  email: string;
  phone?: string;
  username: string;
  role: "USER" | "ADMIN";
};
