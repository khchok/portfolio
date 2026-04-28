"use client";
import { useMarketplaceAuth } from "@/contexts/MarketplaceAuthContext";
import { MarketplaceRoleEnums } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MarketplacePage() {
  const { user, isLoading } = useMarketplaceAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/marketplace/login");
    } else if (user.role === MarketplaceRoleEnums.EMPLOYER) {
      router.replace("/marketplace/employers");
    } else if (user.role === MarketplaceRoleEnums.CANDIDATE) {
      router.replace("/marketplace/candidates");
    } else if (user.role === MarketplaceRoleEnums.ADMIN) {
      router.replace("/marketplace/admin");
    }

    // router.replace("/marketplace/login");
  }, [user, isLoading, router]);

  return <>Marketplace root</>;
}
