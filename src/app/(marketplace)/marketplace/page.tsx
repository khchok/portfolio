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
      console.log("root redirect to login");
      router.push("/marketplace/login");
    } else if (user.role === MarketplaceRoleEnums.EMPLOYER) {
      console.log("Root redirect to employers");
      router.replace("/marketplace/employers");
    } else if (user.role === MarketplaceRoleEnums.CANDIDATE) {
      console.log("Root redirect to candidate");
      router.replace("/marketplace/candidates");
    }
  }, [user, isLoading, router]);

  return <>Marketplace root</>;
}
