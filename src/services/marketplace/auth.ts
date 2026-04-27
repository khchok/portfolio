import { MarketplaceUser } from "@/types";
import request from "@/services/request";

export const apiMarketplaceSignIn = async (
  email: string,
  password: string
): Promise<{ user: MarketplaceUser }> => {
  const response = await request.post("/api/job-marketplace/auth/login", { email, password });
  return response.data;
};

export const apiMarketplaceSignOut = async (): Promise<void> => {
  await request.post("/api/job-marketplace/auth/logout");
};

export const apiGetMarketplaceUser = async (): Promise<MarketplaceUser> => {
  const response = await request.get("/api/job-marketplace/auth/me");
  return response.data;
};
