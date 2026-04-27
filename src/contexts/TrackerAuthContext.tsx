"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGetUser, apiSignIn, apiSignOut, TrackerUser } from "@/services/tracker/user-service";

interface TrackerAuthContextValue {
  user: TrackerUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const TrackerAuthContext = createContext<TrackerAuthContextValue | null>(null);

export function TrackerAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<TrackerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiGetUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  async function signIn(email: string, password: string) {
    await apiSignIn(email, password);
    const me = await apiGetUser();
    setUser(me);
    router.push("/tracker");
  }

  async function signOut() {
    try {
      await apiSignOut();
    } finally {
      setUser(null);
      router.push("/tracker/login");
    }
  }

  return (
    <TrackerAuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </TrackerAuthContext.Provider>
  );
}

export function useTrackerAuth() {
  const ctx = useContext(TrackerAuthContext);
  if (!ctx) throw new Error("useTrackerAuth must be used within TrackerAuthProvider");
  return ctx;
}
