"use client";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import ApplicantsModal from "@/components/marketplace/employer/ApplicantsModal";
import JobListingsTable from "@/components/marketplace/employer/JobListingsTable";
import PostJobModal from "@/components/marketplace/employer/PostJobModal";
import { Button } from "@/components/ui/button";
import { MarketplaceListing } from "@/types";
import { useState } from "react";

export default function EmployerDashboardPage() {
  const [postOpen, setPostOpen] = useState(false);
  const [editListing, setEditListing] = useState<MarketplaceListing | null>(null);
  const [applicantsListing, setApplicantsListing] = useState<MarketplaceListing | null>(null);

  function handleEdit(listing: MarketplaceListing) {
    setEditListing(listing);
    setPostOpen(true);
  }

  function handlePostClose() {
    setPostOpen(false);
    setEditListing(null);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader title="Employer Dashboard" />
      <main className="max-w-screen-lg mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Job Listings</h2>
            <p className="text-sm text-gray-500 mt-0.5">Post and manage your open positions</p>
          </div>
          <Button onClick={() => setPostOpen(true)}>+ Post a Job</Button>
        </div>

        <JobListingsTable
          onEdit={handleEdit}
          onViewApplicants={setApplicantsListing}
        />
      </main>

      <PostJobModal
        open={postOpen}
        onClose={handlePostClose}
        editListing={editListing}
      />

      <ApplicantsModal
        listing={applicantsListing}
        onClose={() => setApplicantsListing(null)}
      />
    </div>
  );
}
