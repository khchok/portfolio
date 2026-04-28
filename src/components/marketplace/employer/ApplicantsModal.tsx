"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useApplicantsQuery } from "@/services/marketplace/employer/employer-queries";
import { MarketplaceListing } from "@/types";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  accepted: "bg-green-100 text-green-800",
};

interface ApplicantsModalProps {
  listing: MarketplaceListing | null;
  onClose: () => void;
}

export default function ApplicantsModal({ listing, onClose }: ApplicantsModalProps) {
  const { data: applicants = [], isLoading } = useApplicantsQuery(listing?.id ?? null);

  return (
    <Dialog open={!!listing} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Applicants — {listing?.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-2">
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </>
          ) : applicants.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No applicants yet.</p>
          ) : (
            applicants.map((applicant) => (
              <div key={applicant.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{applicant.candidateEmail}</p>
                  <Badge className={`text-xs border ${STATUS_COLORS[applicant.status] ?? ""}`}>
                    {applicant.status}
                  </Badge>
                </div>
                {applicant.coverText && (
                  <p className="text-xs text-gray-500 line-clamp-3">{applicant.coverText}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Applied {new Date(applicant.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
