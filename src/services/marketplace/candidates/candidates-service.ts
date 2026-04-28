import request from "@/services/request";
import { MarketplaceApplication, MarketplaceListing } from "@/types";
import { IPagedResponse } from "@/types/common";

export interface BrowseListingsParams {
  search?: string;
  category?: string;
  location?: string;
}

export const apiBrowseListings = async (
  params: BrowseListingsParams = {},
): Promise<IPagedResponse<MarketplaceListing>> => {
  const response = await request.get("/api/job-marketplace/jobs", { params });
  return response.data;
};

export const apiGetListingById = async (id: string): Promise<MarketplaceListing> => {
  const response = await request.get(`/api/job-marketplace/jobs/${id}`);
  return response.data;
};

export const apiApplyToJob = async (
  jobId: string,
  coverText: string,
): Promise<MarketplaceApplication> => {
  const response = await request.post(`/api/job-marketplace/jobs/${jobId}/apply`, { coverText });
  return response.data;
};

export const apiGetMyApplications = async (): Promise<MarketplaceApplication[]> => {
  const response = await request.get("/api/job-marketplace/applications/mine");
  return response.data;
};
