"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useListingDetailQuery } from "@/services/marketplace/candidates/candidates-queries";

interface JobDetailModalProps {
  listingId: string | null;
  onClose: () => void;
  onApply: (listingId: string) => void;
  appliedIds: Set<string>;
}

export default function JobDetailModal({
  listingId,
  onClose,
  onApply,
  appliedIds,
}: JobDetailModalProps) {
  const { data, isLoading } = useListingDetailQuery(listingId);
  const hasApplied = listingId ? appliedIds.has(listingId) : false;

  return (
    <Dialog open={!!listingId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isLoading ? <Skeleton className="h-5 w-48" /> : data?.title}
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex flex-col gap-3 mt-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full mt-4" />
          </div>
        ) : data ? (
          <div className="flex flex-col gap-5 mt-1">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-slate-100 text-slate-700 border-0 text-xs">
                {data.city}
              </Badge>
              <Badge className="bg-slate-100 text-slate-700 border-0 text-xs">
                {data.country}
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                ${data.salaryMin.toLocaleString()} – $
                {data.salaryMax.toLocaleString()} / yr
              </Badge>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                Description
              </p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {data.description}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                Requirements
              </p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {data.requirements}
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                disabled={hasApplied}
                onClick={() => listingId && onApply(listingId)}
              >
                {hasApplied ? "Applied" : "Apply Now"}
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
