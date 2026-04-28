import request from "@/services/request";
import { AdminEvent } from "@/types";
import { IPagedResponse, IPageRequest } from "@/types/common";

export type EventModule = "identity" | "jobs" | "applications";

const MODULE_PATHS: Record<EventModule, string> = {
  identity: "/api/job-marketplace/admin/events/identity",
  jobs: "/api/job-marketplace/admin/events/jobs",
  applications: "/api/job-marketplace/admin/events/applications",
};

export const apiGetEvents = async (
  module: EventModule,
  params: IPageRequest,
): Promise<IPagedResponse<AdminEvent>> => {
  const response = await request.get(MODULE_PATHS[module], { params });
  return response.data;
};
