import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiApplyToJob } from "./candidates-service";

export const useApplyMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...mutation } = useMutation({
    mutationFn: ({ jobId, coverText }: { jobId: string; coverText: string }) =>
      apiApplyToJob(jobId, coverText),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["candidate-applications"] }),
  });
  return { applyMutation: mutateAsync, ...mutation };
};
