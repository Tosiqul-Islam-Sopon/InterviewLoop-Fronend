// hooks/useLogin.ts
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

type LoginInput = {
  email: string;
  password: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!res || res.error) {
        throw new Error("Invalid email or password");
      }

      return res;
    },
  });
}
