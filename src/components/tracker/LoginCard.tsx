"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTrackerAuth } from "@/contexts/TrackerAuthContext";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import DemoCredentials from "./DemoCredentials";

const DEMO_EMAIL = "alice@job-tracker.com";
const DEMO_PASSWORD = "P@ssword123";

export default function LoginCard() {
  const { signIn } = useTrackerAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    try {
      await signIn(email, password);
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col justify-center px-8 py-16 sm:px-16">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-400 tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to your recruiter account
          </p>
        </div>
        <DemoCredentials setEmail={setEmail} setPassword={setPassword} />
        <br />
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full flex flex-row justify-center items-center"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Signing in
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
