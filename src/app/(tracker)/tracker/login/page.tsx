import LoginCard from "@/components/tracker/LoginCard";
import LoginHero from "@/components/tracker/LoginHero";

export default function TrackerLoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <LoginHero />
      <LoginCard />
    </div>
  );
}
