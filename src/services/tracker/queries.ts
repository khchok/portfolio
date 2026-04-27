import { useQuery } from "@tanstack/react-query";
import { apiGetJobById, apiGetJobs } from "./job-service";

export const useGetJobsQuery = () => {
  return useQuery({
    queryKey: ["tracker-jobs"],
    queryFn: apiGetJobs,
  });
};

export const useGetJobByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: ["tracker-job", id],
    queryFn: () => apiGetJobById(id!),
    enabled: !!id,
  });
};
