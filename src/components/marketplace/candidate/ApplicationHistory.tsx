"use client";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyApplicationsQuery } from "@/services/marketplace/candidate-hooks";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  accepted: "bg-green-100 text-green-800",
};

export default function ApplicationHistory() {
  const { data: applications = [], isLoading } = useMyApplicationsQuery();

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
      <div className="text-center py-10 text-gray-400 text-sm">
        No applications yet. Browse listings and apply.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {applications.map((app) => (
        <div key={app.id} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {app.listing?.title ?? app.jobId}
              </p>
              {app.listing && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {app.listing.location} · {app.listing.category}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-0.5">
                Applied {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge className={`text-xs border ${STATUS_COLORS[app.status] ?? ""} shrink-0`}>
              {app.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
