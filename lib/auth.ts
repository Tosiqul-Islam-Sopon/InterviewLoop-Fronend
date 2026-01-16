// lib/auth.ts
import { api } from "./axios";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  user: {
    id: number;
    email: string;
    role: string;
    is_verified: boolean;
  };
};

export async function loginApi(payload: LoginPayload) {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
}

export async function logoutApi() {
  await api.post("/auth/logout", {})
}
