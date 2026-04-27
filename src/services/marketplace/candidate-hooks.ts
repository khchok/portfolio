import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiApplyToJob,
  apiBrowseListings,
  apiGetListingById,
  apiGetMyApplications,
  BrowseListingsParams,
} from "./candidate";

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

export const useMyApplicationsQuery = () =>
  useQuery({ queryKey: ["candidate-applications"], queryFn: apiGetMyApplications });

export const useApplyMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...mutation } = useMutation({
    mutationFn: ({ jobId, coverText }: { jobId: string; coverText: string }) =>
      apiApplyToJob(jobId, coverText),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["candidate-applications"] }),
  });
  return { applyMutation: mutateAsync, ...mutation };
};
