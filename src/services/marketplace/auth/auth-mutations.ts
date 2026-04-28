import { MarketplaceUser } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiGetMarketplaceUser,
  apiMarketplaceSignIn,
  apiMarketplaceSignOut,
} from "./auth-service";

export const useSignInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<MarketplaceUser> => {
      await apiMarketplaceSignIn(email, password);
      return await apiGetMarketplaceUser();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["marketplace-user"], user);
    },
  });
};

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiMarketplaceSignOut,
    onSuccess: () => {
      queryClient.setQueryData(["marketplace-user"], null);
    },
  });
};
