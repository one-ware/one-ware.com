import { JobDetail } from "../types/jobTypes";

import { aiEngineer } from "./jobs/ai-engineer";
import { webDeveloper } from "./jobs/web-developer";
import { desktopDeveloper } from "./jobs/desktop-developer";
import { productOwner } from "./jobs/product-owner";

export const JOBS: JobDetail[] = [
  webDeveloper,
  desktopDeveloper,
  aiEngineer,
  productOwner,
];

export const ACTIVE_JOBS = JOBS.filter(job => job.active !== false);

export function getJobById(id: string): JobDetail | undefined {
  return JOBS.find(job => job.id === id);
}
