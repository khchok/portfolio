import { IPageRequest } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { apiGetApplicants, apiGetMyListings } from "./employer-service";

export const useMyListingsQuery = (params: IPageRequest) =>
  useQuery({
    queryKey: ["employer-listings", params],
    queryFn: () => apiGetMyListings(params),
  });

export const useApplicantsQuery = (jobId: string | null) =>
  useQuery({
    queryKey: ["employer-applicants", jobId],
    queryFn: () => apiGetApplicants(jobId!),
    enabled: !!jobId,
  });
