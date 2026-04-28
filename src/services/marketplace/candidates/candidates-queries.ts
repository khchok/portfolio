import { IPageRequest } from "@/types/common";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

export const useBrowseListingsInfiniteQuery = (
  params: BrowseListingsParams,
) => {
  return useInfiniteQuery({
    queryKey: ["candidate-listings-infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      apiBrowseListings({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.items || lastPage.items.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};

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
