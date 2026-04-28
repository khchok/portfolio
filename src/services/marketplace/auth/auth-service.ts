import request from "@/services/request";
import { MarketplaceUser } from "@/types";

export const apiMarketplaceSignIn = async (
  email: string,
  password: string,
): Promise<void> => {
  await request.post("/api/job-marketplace/auth/login", { email, password });
};

export const apiMarketplaceSignOut = async (): Promise<void> => {
  await request.post("/api/job-marketplace/auth/logout");
};

export const apiGetMarketplaceUser = async (): Promise<MarketplaceUser> => {
  const response = await request.get("/api/job-marketplace/auth/me");
  return response.data;
};
