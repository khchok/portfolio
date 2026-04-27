"use client";
import { Button } from "@/components/ui/button";
import { useTrackerAuth } from "@/contexts/TrackerAuthContext";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

export default function SignOutButton() {
  const { signOut } = useTrackerAuth();
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
    <Button
      variant="outline"
      size="sm"
      className="flex flex-row justify-center items-center"
      onClick={handleSignOut}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <LoaderCircleIcon className="h-4 w-4 animate-spin" />
          Signing out
        </>
      ) : (
        "Sign out"
      )}
    </Button>
  );
}
