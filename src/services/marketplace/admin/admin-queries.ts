import { useInfiniteQuery } from "@tanstack/react-query";
import { apiGetEvents, EventModule } from "./admin-service";

export const useAdminEventsInfiniteQuery = (module: EventModule) =>
  useInfiniteQuery({
    queryKey: ["admin-events", module],
    queryFn: ({ pageParam = 1 }) =>
      apiGetEvents(module, { page: pageParam as number, pageSize: 20 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.hasNextPage) return undefined;
      return allPages.length + 1;
    },
  });
