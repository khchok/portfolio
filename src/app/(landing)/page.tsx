import { getSocialLinks } from "@/services/author/author-services";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FiBriefcase } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

interface ProjectCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tech: string[];
  href: string;
  label: string;
}

function ProjectCard({
  icon,
  title,
  description,
  tech,
  href,
  label,
}: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {t}
          </span>
        ))}
      </div>
      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function LandingPage() {
  const socialLinks = getSocialLinks();
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-slate-400">
          Portfolio
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900">
          Chok Khar Hui
        </h1>
        <p className="mx-auto max-w-xl text-lg text-slate-500 leading-relaxed">
          Full-stack engineer. Below are two demo projects — a personal
          job-application tracker and a Jobs marketplace.
        </p>
        <p className="mx-auto max-w-xl text-lg text-slate-500 leading-relaxed flex flex-col items-center justify-center gap-2 mt-2">
          {socialLinks.map(({ link, label, icon }) => {
            return (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                {icon({})}
                {label}
              </a>
            );
          })}
        </p>
      </section>

      {/* Project cards */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          <ProjectCard
            icon={<FiBriefcase className="h-5 w-5" />}
            title="Job Tracker"
            description="Kanban board for managing personal job applications — drag cards across stages, add notes, and track the full status history of every application."
            tech={[
              "Fastify",
              "Nodejs",
              "Supabase + Postgres",
              "Next.js",
              "TanStack Query",
              "DnD Kit",
              "Tailwind",
            ]}
            href="/tracker/login"
            label="Open Job Tracker"
          />
          <ProjectCard
            icon={<LuBuilding2 className="h-5 w-5" />}
            title="Job Marketplace"
            description="A job marketplace platform where employers post openings and candidates browse, apply, and track their applications — with role-based dashboards for both sides."
            tech={[
              ".Net Core",
              "MSSQL",
              "Event-driven",
              "CQRS Pattern",
              "EFCore",
              "DDD",
              "Next.js",
              "Tailwind",
            ]}
            href="/marketplace/login"
            label="Open Marketplace"
          />
        </div>
      </section>
    </main>
  );
}
