import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { logoutApi } from "@/lib/auth";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      try {
        await logoutApi(); // call backend logout
      } catch (error) {
        console.error("Backend logout failed", error);
      }
      await signOut({ redirect: false }); // clear NextAuth session
    },
  });
}
