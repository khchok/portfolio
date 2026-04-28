"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBrowseListingsQuery } from "@/services/marketplace/candidates/candidates-queries";
import { MarketplaceListing } from "@/types";
import { Search } from "lucide-react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useState } from "react";

interface JobListingsProps {
  appliedIds: Set<string>;
  onViewDetail: (listing: MarketplaceListing) => void;
  onApply: (listing: MarketplaceListing) => void;
}

export default function JobListings({
  appliedIds,
  onViewDetail,
  onApply,
}: JobListingsProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const debouncedSearch = useDebouncedValue(search, 400);

  const params = {
    search: debouncedSearch || undefined,
    category: category || undefined,
    location: location || undefined,
    page: 1,
    pageSize: 10,
  };

  const { data, isLoading } = useBrowseListingsQuery(params);

  const listings = data?.items || [];

  return (
    <div className="flex flex-col gap-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Input
          className="sm:w-40"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          className="sm:w-40"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No open listings match your filters.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {listings.map((listing) => {
            const hasApplied = appliedIds.has(listing.id);
            return (
              <div
                key={listing.id}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {listing.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="bg-slate-100 text-slate-700 border-0 text-xs">
                        {listing.location}
                      </Badge>
                      <Badge className="bg-slate-100 text-slate-700 border-0 text-xs">
                        {listing.category}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                        ${listing.salaryMin.toLocaleString()} – $
                        {listing.salaryMax.toLocaleString()} / yr
                      </Badge>
                      {hasApplied && (
                        <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">
                          Applied
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {listing.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetail(listing)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      disabled={hasApplied}
                      onClick={() => onApply(listing)}
                    >
                      {hasApplied ? "Applied" : "Apply"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
