"use client";
import AuthorRibbon from "@/components/author/AuthorRibbon";
import { MarketplaceAuthProvider } from "@/contexts/MarketplaceAuthContext";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <MarketplaceAuthProvider>
        {children}
        <AuthorRibbon />
      </MarketplaceAuthProvider>
    </QueryClientProvider>
  );
}
