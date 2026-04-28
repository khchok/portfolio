// JobTracker types (inlined from shared-types in job-tracker-fullstack)
export enum JobStatus {
  NEW = "NEW",
  PENDING_INTERVIEW = "PENDING_INTERVIEW",
  PENDING_OFFER = "PENDING_OFFER",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
}

export interface Job {
  id: string;
  name: string;
  status: JobStatus;
  remarks: string;
}

export interface JobStatusEntry {
  id: string;
  status: JobStatus;
  createdAt: string;
}

export interface JobDetail {
  id: string;
  name: string;
  remarks: string;
  statuses: JobStatusEntry[];
}

export enum MarketplaceRoleEnums {
  EMPLOYER = "Employer",
  CANDIDATE = "Candidate",
}
// JobMarketplace types
export type MarketplaceRole =
  | MarketplaceRoleEnums.EMPLOYER
  | MarketplaceRoleEnums.CANDIDATE;

export interface MarketplaceUser {
  id: string;
  email: string;
  role: MarketplaceRole;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  requirements: string;
  salaryMin: number;
  salaryMax: number;
  location: string;
  category: string;
  isOpen: boolean;
  employerId: string;
  city: string;
  country: string;
  createdAt: string;
}

export interface MarketplaceApplication {
  id: string;
  jobId: string;
  candidateId: string;
  coverText: string;
  status: "pending" | "reviewed" | "rejected" | "accepted";
  createdAt: string;
  listing?: MarketplaceListing;
}

export interface MarketplaceApplicant {
  id: string;
  candidateId: string;
  candidateEmail: string;
  coverText: string;
  status: "pending" | "reviewed" | "rejected" | "accepted";
  createdAt: string;
}
