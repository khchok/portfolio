import { IPageRequest } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import {
  apiBrowseListings,
  apiGetListingById,
  apiGetMyApplications,
  BrowseListingsParams,
} from "./candidates-service";

export const useBrowseListingsQuery = (params: BrowseListingsParams) =>
  useQuery({
    queryKey: ["candidate-listings", params],
    queryFn: () => apiBrowseListings(params),
  });

export const useListingDetailQuery = (id: string | null) =>
  useQuery({
    queryKey: ["candidate-listing", id],
    queryFn: () => apiGetListingById(id!),
    enabled: !!id,
  });

export const useMyApplicationsQuery = (params: IPageRequest) =>
  useQuery({
    queryKey: ["candidate-applications", params],
    queryFn: apiGetMyApplications.bind(null, params),
  });
