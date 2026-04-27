"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TrackerAuthProvider } from "@/contexts/TrackerAuthContext";

export default function TrackerLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TrackerAuthProvider>
        {children}
      </TrackerAuthProvider>
    </QueryClientProvider>
  );
}
