"use client";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import EventFeed from "@/components/marketplace/admin/EventFeed";
import { useMarketplaceAuth } from "@/contexts/MarketplaceAuthContext";
import { EventModule } from "@/services/marketplace/admin/admin-service";
import { MarketplaceRoleEnums } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TABS: { label: string; module: EventModule }[] = [
  { label: "Identity", module: "identity" },
  { label: "Jobs", module: "jobs" },
  { label: "Applications", module: "applications" },
];

export default function AdminPage() {
  const { user, isLoading } = useMarketplaceAuth();
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<EventModule>("identity");

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/marketplace/login");
    else if (user.role !== MarketplaceRoleEnums.ADMIN)
      router.replace("/marketplace/candidates");
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== MarketplaceRoleEnums.ADMIN) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader title="Admin Dashboard" />
      <main className="max-w-screen-lg mx-auto px-6 py-8">
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
          {TABS.map(({ label, module }) => (
            <button
              key={module}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeModule === module
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveModule(module)}
            >
              {label}
            </button>
          ))}
        </div>
        <EventFeed key={activeModule} module={activeModule} />
      </main>
    </div>
  );
}
