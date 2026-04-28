"use client";
import AuthorRibbon from "@/components/author/AuthorRibbon";
import { TrackerAuthProvider } from "@/contexts/TrackerAuthContext";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TrackerAuthProvider>
        {children}
        <AuthorRibbon />
      </TrackerAuthProvider>
    </QueryClientProvider>
  );
}
