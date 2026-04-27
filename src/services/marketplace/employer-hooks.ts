import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiCreateListing,
  apiGetApplicants,
  apiGetMyListings,
  apiToggleListingStatus,
  apiUpdateListing,
  CreateListingPayload,
} from "./employer";

export const useMyListingsQuery = () =>
  useQuery({ queryKey: ["employer-listings"], queryFn: apiGetMyListings });

export const useApplicantsQuery = (jobId: string | null) =>
  useQuery({
    queryKey: ["employer-applicants", jobId],
    queryFn: () => apiGetApplicants(jobId!),
    enabled: !!jobId,
  });

export const useCreateListingMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...mutation } = useMutation({
    mutationFn: (payload: CreateListingPayload) => apiCreateListing(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employer-listings"] }),
  });
  return { createListingMutation: mutateAsync, ...mutation };
};

export const useUpdateListingMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...mutation } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateListingPayload> }) =>
      apiUpdateListing(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employer-listings"] }),
  });
  return { updateListingMutation: mutateAsync, ...mutation };
};

export const useToggleListingMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...mutation } = useMutation({
    mutationFn: ({ id, isOpen }: { id: string; isOpen: boolean }) =>
      apiToggleListingStatus(id, isOpen),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employer-listings"] }),
  });
  return { toggleListingMutation: mutateAsync, ...mutation };
};
