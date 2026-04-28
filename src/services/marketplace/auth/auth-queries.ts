import { useQuery } from "@tanstack/react-query";
import { apiGetMarketplaceUser } from "./auth-service";

export const useMarketplaceUserQuery = () =>
  useQuery({
    queryKey: ["marketplace-user"],
    queryFn: apiGetMarketplaceUser,
    retry: false,
  });
