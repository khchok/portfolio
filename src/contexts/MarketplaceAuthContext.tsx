"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MarketplaceUser } from "@/types";
import {
  apiGetMarketplaceUser,
  apiMarketplaceSignIn,
  apiMarketplaceSignOut,
} from "@/services/marketplace/auth";

interface MarketplaceAuthContextValue {
  user: MarketplaceUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const MarketplaceAuthContext = createContext<MarketplaceAuthContextValue | null>(null);

export function MarketplaceAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<MarketplaceUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiGetMarketplaceUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  async function signIn(email: string, password: string) {
    const { user: me } = await apiMarketplaceSignIn(email, password);
    setUser(me);
    if (me.role === "employer") {
      router.push("/marketplace/employers");
    } else {
      router.push("/marketplace/candidates");
    }
  }

  async function signOut() {
    try {
      await apiMarketplaceSignOut();
    } finally {
      setUser(null);
      router.push("/marketplace/login");
    }
  }

  return (
    <MarketplaceAuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </MarketplaceAuthContext.Provider>
  );
}

export function useMarketplaceAuth() {
  const ctx = useContext(MarketplaceAuthContext);
  if (!ctx) throw new Error("useMarketplaceAuth must be used within MarketplaceAuthProvider");
  return ctx;
}
