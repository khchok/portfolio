"use client";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import ApplyModal from "@/components/marketplace/candidate/ApplyModal";
import ApplicationHistory from "@/components/marketplace/candidate/ApplicationHistory";
import JobDetailModal from "@/components/marketplace/candidate/JobDetailModal";
import JobListings from "@/components/marketplace/candidate/JobListings";
import { useMyApplicationsQuery } from "@/services/marketplace/candidate-hooks";
import { MarketplaceListing } from "@/types";
import { useState } from "react";

export default function CandidateDashboardPage() {
  const [viewingListing, setViewingListing] = useState<MarketplaceListing | null>(null);
  const [applyingListing, setApplyingListing] = useState<MarketplaceListing | null>(null);
  const [activeTab, setActiveTab] = useState<"browse" | "history">("browse");

  const { data: applications = [] } = useMyApplicationsQuery();
  const appliedIds = new Set(applications.map((a) => a.jobId));

  function handleApply(listing: MarketplaceListing) {
    setViewingListing(null);
    setApplyingListing(listing);
  }

  function handleApplySuccess() {
    setApplyingListing(null);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader title="Candidate Dashboard" />
      <main className="max-w-screen-lg mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "browse"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("browse")}
          >
            Browse Jobs
          </button>
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "history"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
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
        onApply={(id) => {
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
