"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteScroll } from "@/hooks/useDebouncedValue";
import { useAdminEventsInfiniteQuery } from "@/services/marketplace/admin/admin-queries";
import { EventModule } from "@/services/marketplace/admin/admin-service";
import { AdminEvent } from "@/types";

const MODULE_BADGE_COLORS: Record<EventModule, string> = {
  identity: "bg-blue-100 text-blue-800",
  jobs: "bg-amber-100 text-amber-800",
  applications: "bg-green-100 text-green-800",
};

function EventCard({
  event,
  module,
}: {
  event: AdminEvent;
  module: EventModule;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${MODULE_BADGE_COLORS[module]}`}
        >
          {event.type}
        </span>
        <span className="text-xs text-gray-400 ml-auto shrink-0">
          {new Date(event.occurredAt).toLocaleString()}
        </span>
      </div>
      {event.aggregateId && (
        <p className="mt-2 font-mono text-xs text-gray-500 bg-gray-50 rounded px-2 py-1 w-fit">
          {event.aggregateId.slice(0, 8)}…
        </p>
      )}
      {event.data && (
        <pre className="mt-2 text-xs text-gray-600 bg-gray-50 rounded p-2 overflow-x-auto">
          {JSON.stringify(event.data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default function EventFeed({ module }: { module: EventModule }) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAdminEventsInfiniteQuery(module);

  const events = data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const observerTarget = useInfiniteScroll(
    hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        No events found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} module={module} />
      ))}
      <div ref={observerTarget} className="h-10 m-auto text-xs text-gray-400">
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
            ? "Load more"
            : "No more events"}
      </div>
    </div>
  );
}
