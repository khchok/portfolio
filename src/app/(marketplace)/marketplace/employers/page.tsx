"use client";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import ApplicantsModal from "@/components/marketplace/employer/ApplicantsModal";
import JobListingsTable from "@/components/marketplace/employer/JobListingsTable";
import PostJobModal from "@/components/marketplace/employer/PostJobModal";
import { Button } from "@/components/ui/button";
import { useMarketplaceAuth } from "@/contexts/MarketplaceAuthContext";
import { MarketplaceListing, MarketplaceRoleEnums } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmployerDashboardPage() {
  const { user, isLoading } = useMarketplaceAuth();
  const router = useRouter();
  const [postOpen, setPostOpen] = useState(false);
  const [editListing, setEditListing] = useState<MarketplaceListing | null>(
    null,
  );
  const [applicantsListing, setApplicantsListing] =
    useState<MarketplaceListing | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/marketplace/login");
    else if (user.role !== MarketplaceRoleEnums.EMPLOYER)
      router.replace("/marketplace/candidates");
  }, [user, isLoading, router]);

  function handleEdit(listing: MarketplaceListing) {
    setEditListing(listing);
    setPostOpen(true);
  }

  function handlePostClose() {
    setPostOpen(false);
    setEditListing(null);
  }

  if (isLoading || user?.role !== MarketplaceRoleEnums.EMPLOYER) return null;

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader title="Employer Dashboard" />
      <main className="max-w-screen-lg mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-primary">
              Your Job Listings
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Post and manage your open positions
            </p>
          </div>
          <Button onClick={() => setPostOpen(true)}>+ Post a Job</Button>
        </div>

        <JobListingsTable
          onEdit={handleEdit}
          onViewApplicants={setApplicantsListing}
        />
      </main>

      <PostJobModal
        key={editListing?.id ?? "new"}
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
