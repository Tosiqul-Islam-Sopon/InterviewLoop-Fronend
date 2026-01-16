// hooks/useAuth.ts
import { useSession } from "next-auth/react";

export function useAuth() {
  const { data, status } = useSession();

  return {
    user: data?.user,
    accessToken: data?.accessToken,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
