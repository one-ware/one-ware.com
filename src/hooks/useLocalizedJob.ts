import { useLocation } from "@docusaurus/router";
import { JobDetail, JobContentSection, JobFormField } from "../types/jobTypes";

type LocaleCode = "en" | "de";

function getLocale(pathname: string): LocaleCode {
  return pathname.startsWith("/de") ? "de" : "en";
}

function getLocalizedField<T>(obj: Record<string, T>, field: string, locale: LocaleCode): T | undefined {
  if (locale === "de") {
    const deKey = `${field}_de`;
    if (obj[deKey] !== undefined) {
      return obj[deKey] as T;
    }
  }
  return obj[field] as T;
}

export function useLocale(): LocaleCode {
  const location = useLocation();
  return getLocale(location.pathname);
}

export function useLocalizedJob(job: JobDetail): JobDetail {
  const locale = useLocale();

  if (locale === "en") {
    return job;
  }

  const localizeContentSection = (section?: JobContentSection): JobContentSection | undefined => {
    if (!section) return undefined;
    return {
      ...section,
      title: getLocalizedField(section as unknown as Record<string, string>, "title", locale) || section.title,
      content: getLocalizedField(section as unknown as Record<string, string>, "content", locale),
      points: getLocalizedField(section as unknown as Record<string, string[]>, "points", locale),
      subsections: section.subsections?.map(sub => ({
        ...sub,
        title: getLocalizedField(sub as unknown as Record<string, string>, "title", locale) || sub.title,
        points: getLocalizedField(sub as unknown as Record<string, string[]>, "points", locale) || sub.points,
      })),
    };
  };

  const localizeFormFields = (fields?: JobFormField[]): JobFormField[] | undefined => {
    if (!fields) return undefined;
    return fields.map(field => ({
      ...field,
      label: getLocalizedField(field as unknown as Record<string, string>, "label", locale) || field.label,
      options: getLocalizedField(field as unknown as Record<string, string[]>, "options", locale),
    }));
  };

  const localizeCustomSections = (sections?: JobContentSection[]): JobContentSection[] | undefined => {
    if (!sections) return undefined;
    return sections.map(section => localizeContentSection(section)!);
  };

  return {
    ...job,
    title: getLocalizedField(job as unknown as Record<string, string>, "title", locale) || job.title,
    category: getLocalizedField(job as unknown as Record<string, string>, "category", locale) || job.category,
    type: getLocalizedField(job as unknown as Record<string, string>, "type", locale) || job.type,
    location: getLocalizedField(job as unknown as Record<string, string>, "location", locale) || job.location,
    startDate: getLocalizedField(job as unknown as Record<string, string>, "startDate", locale),
    heroTitle: getLocalizedField(job as unknown as Record<string, string>, "heroTitle", locale),
    shortDescription: getLocalizedField(job as unknown as Record<string, string>, "shortDescription", locale),
    tasks: localizeContentSection(job.tasks),
    profile: localizeContentSection(job.profile),
    benefits: localizeContentSection(job.benefits),
    mission: localizeContentSection(job.mission),
    customSections: localizeCustomSections(job.customSections),
    formFields: localizeFormFields(job.formFields),
  };
}

export function useLocalizedDateFormat(): string {
  const locale = useLocale();
  return locale === "de" ? "de-DE" : "en-US";
}

export function useLocalizedPath(path: string): string {
  const locale = useLocale();
  return locale === "de" ? `/de${path}` : path;
}
