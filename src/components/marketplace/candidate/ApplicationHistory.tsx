"use client";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { useMyApplicationsQuery } from "@/services/marketplace/candidates/candidates-queries";
import { ApplicationStatus } from "@/types";
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  reviewed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  accepted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

export default function ApplicationHistory() {
  const { data, isLoading } = useMyApplicationsQuery({
    page: 1,
    pageSize: 10,
  });

  const applications = data?.items ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground text-sm">
        No applications yet. Browse listings and apply.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {applications.map((app) => (
        <div
          key={app.id}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">
                {app.listing?.title ?? app.jobId}
              </p>
              {app.listing && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {app.listing.city} · {app.listing.country}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">
                Applied {formatDate(app.submittedAt)}
              </p>
            </div>
            <Badge
              className={`text-xs border ${STATUS_COLORS[app.status] ?? ""} shrink-0`}
            >
              {ApplicationStatus[
                app.status as unknown as keyof typeof ApplicationStatus
              ] ?? app.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
