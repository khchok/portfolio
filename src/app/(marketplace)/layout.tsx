"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { MarketplaceAuthProvider } from "@/contexts/MarketplaceAuthContext";

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MarketplaceAuthProvider>
        {children}
      </MarketplaceAuthProvider>
    </QueryClientProvider>
  );
}
