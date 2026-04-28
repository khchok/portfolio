"use client";
import {
  useSignInMutation,
  useSignOutMutation,
} from "@/services/marketplace/auth/auth-mutations";
import { useMarketplaceUserQuery } from "@/services/marketplace/auth/auth-queries";
import { MarketplaceRoleEnums, MarketplaceUser } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

interface MarketplaceAuthContextValue {
  user: MarketplaceUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const MarketplaceAuthContext =
  createContext<MarketplaceAuthContextValue | null>(null);

export function MarketplaceAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: user = null, isLoading, isError } = useMarketplaceUserQuery();
  const signInMutation = useSignInMutation();
  const signOutMutation = useSignOutMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      if (!window.location.pathname.endsWith("/marketplace/login")) {
        router.replace("/marketplace/login");
      }
    }
  }, [isLoading, isError, router]);

  async function signIn(email: string, password: string) {
    const me = await signInMutation.mutateAsync({ email, password });
    if (me.role === MarketplaceRoleEnums.EMPLOYER) {
      router.push("/marketplace/employers");
    } else {
      router.push("/marketplace/candidates");
    }
  }

  async function signOut() {
    try {
      await signOutMutation.mutateAsync();
    } finally {
      router.push("/marketplace/login");
    }
  }

  return (
    <MarketplaceAuthContext.Provider
      value={{ user, isLoading, signIn, signOut }}
    >
      {children}
    </MarketplaceAuthContext.Provider>
  );
}

export function useMarketplaceAuth() {
  const ctx = useContext(MarketplaceAuthContext);
  if (!ctx)
    throw new Error(
      "useMarketplaceAuth must be used within MarketplaceAuthProvider",
    );
  return ctx;
}
