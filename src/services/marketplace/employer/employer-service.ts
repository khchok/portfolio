import request from "@/services/request";
import { MarketplaceApplicant, MarketplaceListing } from "@/types";
import { IPagedResponse, IPageRequest } from "@/types/common";

export interface CreateListingPayload {
  title: string;
  description: string;
  requirements: string;
  salaryMin: number;
  salaryMax: number;
  location: string;
  category: string;
}

export const apiGetMyListings = async (
  params: IPageRequest,
): Promise<IPagedResponse<MarketplaceListing>> => {
  const response = await request.get("/api/job-marketplace/jobs/mine", {
    params,
  });
  return response.data;
};

export const apiCreateListing = async (
  payload: CreateListingPayload,
): Promise<MarketplaceListing> => {
  const response = await request.post("/api/job-marketplace/jobs", payload);
  return response.data;
};

export const apiUpdateListing = async (
  id: string,
  payload: Partial<CreateListingPayload>,
): Promise<MarketplaceListing> => {
  const response = await request.put(
    `/api/job-marketplace/jobs/${id}`,
    payload,
  );
  return response.data;
};

export const apiToggleListingStatus = async (
  id: string,
  isOpen: boolean,
): Promise<MarketplaceListing> => {
  const response = await request.patch(
    `/api/job-marketplace/jobs/${id}/status`,
    { isOpen },
  );
  return response.data;
};

export const apiGetApplicants = async (
  jobId: string,
): Promise<MarketplaceApplicant[]> => {
  const response = await request.get(
    `/api/job-marketplace/jobs/${jobId}/applications`,
  );
  return response.data;
};
