"use client";
import DemoCredentials from "@/components/marketplace/DemoCredentials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMarketplaceAuth } from "@/contexts/MarketplaceAuthContext";
import { Building2, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

export default function MarketplaceLoginPage() {
  const { signIn } = useMarketplaceAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    try {
      await signIn(email, password);
    } catch (e) {
      console.log({ e });
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Hero */}
      <div className="hidden lg:flex flex-col justify-between h-full bg-slate-900 px-12 py-16 text-white">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Job Marketplace
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Connect talent
            <br />
            with opportunity
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            Employers post openings. Candidates apply. Track every application
            from both sides.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: "2", description: "Roles: employer & candidate" },
            { label: "∞", description: "Job listings" },
            { label: "1", description: "Application per job per candidate" },
          ].map(({ label, description }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="text-2xl font-bold text-white w-12">
                {label}
              </span>
              <span className="text-sm text-slate-400">{description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center px-8 py-16 sm:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-400 tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Sign in — you&apos;ll be directed to your employer or candidate
              dashboard.
            </p>
          </div>
          <DemoCredentials setEmail={setEmail} setPassword={setPassword} />
          <br />
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mp-email">Email</Label>
              <Input
                id="mp-email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mp-password">Password</Label>
              <Input
                id="mp-password"
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
              className="w-full flex justify-center items-center"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                  Signing in
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
