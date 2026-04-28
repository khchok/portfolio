"use client";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import ApplicationHistory from "@/components/marketplace/candidate/ApplicationHistory";
import ApplyModal from "@/components/marketplace/candidate/ApplyModal";
import JobDetailModal from "@/components/marketplace/candidate/JobDetailModal";
import JobListings from "@/components/marketplace/candidate/JobListings";
import { useMarketplaceAuth } from "@/contexts/MarketplaceAuthContext";
import { useMyApplicationsQuery } from "@/services/marketplace/candidates/candidates-queries";
import { MarketplaceListing, MarketplaceRoleEnums } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CandidateDashboardPage() {
  const { user, isLoading } = useMarketplaceAuth();
  const router = useRouter();
  const [viewingListing, setViewingListing] =
    useState<MarketplaceListing | null>(null);
  const [applyingListing, setApplyingListing] =
    useState<MarketplaceListing | null>(null);
  const [activeTab, setActiveTab] = useState<"browse" | "history">("browse");

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/marketplace/login");
    } else if (user.role !== MarketplaceRoleEnums.CANDIDATE) {
      router.replace("/marketplace/employers");
    }
  }, [user, isLoading, router]);

  const { data } = useMyApplicationsQuery({
    page: 1,
    pageSize: 10,
  });
  const applications = data?.items ?? [];
  const appliedIds = new Set(applications.map((a) => a.jobId));

  function handleApply(listing: MarketplaceListing) {
    setViewingListing(null);
    setApplyingListing(listing);
  }

  function handleApplySuccess() {
    setApplyingListing(null);
  }

  if (isLoading || user?.role !== MarketplaceRoleEnums.CANDIDATE) return null;

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader title="Candidate Dashboard" />
      <main className="max-w-screen-lg mx-auto px-6 py-8">
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "browse"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("browse")}
          >
            Browse Jobs
          </button>
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "history"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("history")}
          >
            My Applications
          </button>
        </div>

        {activeTab === "browse" ? (
          <JobListings
            appliedIds={appliedIds}
            onViewDetail={setViewingListing}
            onApply={handleApply}
          />
        ) : (
          <ApplicationHistory />
        )}
      </main>

      <JobDetailModal
        listingId={viewingListing?.id ?? null}
        onClose={() => setViewingListing(null)}
        onApply={() => {
          const listing = viewingListing;
          setViewingListing(null);
          if (listing) setApplyingListing(listing);
        }}
        appliedIds={appliedIds}
      />

      <ApplyModal
        listingId={applyingListing?.id ?? null}
        listingTitle={applyingListing?.title ?? ""}
        onClose={() => setApplyingListing(null)}
        onSuccess={handleApplySuccess}
      />
    </div>
  );
}
