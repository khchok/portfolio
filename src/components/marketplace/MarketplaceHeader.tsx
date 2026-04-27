"use client";
import { Button } from "@/components/ui/button";
import { useMarketplaceAuth } from "@/contexts/MarketplaceAuthContext";
import { Building2, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

interface MarketplaceHeaderProps {
  title: string;
}

export default function MarketplaceHeader({ title }: MarketplaceHeaderProps) {
  const { user, signOut } = useMarketplaceAuth();
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setIsPending(true);
    try {
      await signOut();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Job Marketplace</p>
            <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user && <span className="text-xs text-gray-500 hidden sm:block">{user.email}</span>}
          <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isPending}>
            {isPending ? (
              <><LoaderCircleIcon className="h-4 w-4 animate-spin" /> Signing out</>
            ) : (
              "Sign out"
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
