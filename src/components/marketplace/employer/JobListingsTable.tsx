"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToggleListingMutation } from "@/services/marketplace/employer/employer-mutations";
import { useMyListingsQuery } from "@/services/marketplace/employer/employer-queries";
import { MarketplaceListing } from "@/types";
import { Pencil, Users } from "lucide-react";
import { toast } from "sonner";

interface JobListingsTableProps {
  onEdit: (listing: MarketplaceListing) => void;
  onViewApplicants: (listing: MarketplaceListing) => void;
}

export default function JobListingsTable({
  onEdit,
  onViewApplicants,
}: JobListingsTableProps) {
  const { data, isLoading } = useMyListingsQuery({
    page: 1,
    pageSize: 10,
  });
  const listings = data?.items || [];
  const { toggleListingMutation } = useToggleListingMutation();

  async function handleToggle(listing: MarketplaceListing) {
    try {
      await toggleListingMutation({ id: listing.id, isOpen: !listing.isOpen });
      toast.success(listing.isOpen ? "Listing closed" : "Listing opened");
    } catch {
      toast.error("Failed to update listing status");
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        No listings yet. Post your first job.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="rounded-xl border border-gray-200 bg-white p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {listing.title}
                </h3>
                <Badge
                  className={`text-xs border ${listing.isOpen ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                >
                  {listing.isOpen ? "Open" : "Closed"}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                {listing.location} · {listing.category}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                ${listing.salaryMin.toLocaleString()} – $
                {listing.salaryMax.toLocaleString()} / yr
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-gray-700"
                onClick={() => onViewApplicants(listing)}
              >
                <Users className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-gray-700"
                onClick={() => onEdit(listing)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggle(listing)}
              >
                {listing.isOpen ? "Close" : "Reopen"}
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 line-clamp-2">
            {listing.description}
          </p>
        </div>
      ))}
    </div>
  );
}
