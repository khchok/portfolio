import { IPagedResponse } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export const useInfiniteScroll = (
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  fetchNextPage: () => void,
) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return observerTarget;
};

// params: T,
//   queryKey: string[] | ((params: T) => (string | T)[]),
//   apiFn: (params: T) => Promise<IPagedListResponse<K>>,
//   enabled = true
export const useAppInfiteQuery = <T, K>({
  params,
  queryKey,
  apiFn,
  enabled = true,
}: {
  params: T;
  queryKey: (string | T)[];
  apiFn: (params: T) => Promise<IPagedResponse<K>>;
  select?: (data: IPagedResponse<K>) => IPagedResponse<K>;
  enabled?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam = 1 }) =>
      apiFn({
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.items || lastPage.items.length < 10) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled,
  });
};
