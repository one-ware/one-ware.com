import { useLocation } from "@docusaurus/router";
import { Event, AgendaItem, ContentSection, Resource, Table, SessionColumn } from "../types/eventTypes";

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

export function useLocalizedEvent(event: Event): Event {
  const locale = useLocale();

  if (locale === "en") {
    return event;
  }

  const localizeAgendaItems = (items?: AgendaItem[]): AgendaItem[] | undefined => {
    if (!items) return undefined;
    return items.map(item => ({
      ...item,
      title: getLocalizedField(item as unknown as Record<string, string>, "title", locale) || item.title,
      points: getLocalizedField(item as unknown as Record<string, string[]>, "points", locale) || item.points,
    }));
  };

  const localizeResources = (resources?: Resource[]): Resource[] | undefined => {
    if (!resources) return undefined;
    return resources.map(res => ({
      ...res,
      title: getLocalizedField(res as unknown as Record<string, string>, "title", locale) || res.title,
      description: getLocalizedField(res as unknown as Record<string, string>, "description", locale),
    }));
  };

  const localizeSections = (sections?: ContentSection[]): ContentSection[] | undefined => {
    if (!sections) return undefined;
    return sections.map(section => ({
      ...section,
      title: getLocalizedField(section as unknown as Record<string, string>, "title", locale) || section.title,
      content: getLocalizedField(section as unknown as Record<string, string>, "content", locale),
      points: getLocalizedField(section as unknown as Record<string, string[]>, "points", locale),
      resources: localizeResources(section.resources),
    }));
  };

  const localizeColumns = (columns: SessionColumn[]): SessionColumn[] => {
    return columns.map(col => ({
      ...col,
      header: getLocalizedField(col as unknown as Record<string, string>, "header", locale) || col.header,
    }));
  };

  const localizeTables = (tables?: Table[]): Table[] | undefined => {
    if (!tables) return undefined;
    return tables.map(table => ({
      ...table,
      title: getLocalizedField(table as unknown as Record<string, string>, "title", locale) || table.title,
      buttonLabel: getLocalizedField(table as unknown as Record<string, string>, "buttonLabel", locale),
      columns: localizeColumns(table.columns),
    }));
  };

  return {
    ...event,
    title: getLocalizedField(event as unknown as Record<string, string>, "title", locale) || event.title,
    shortDescription: getLocalizedField(event as unknown as Record<string, string>, "shortDescription", locale),
    subtitle: getLocalizedField(event as unknown as Record<string, string>, "subtitle", locale),
    description: getLocalizedField(event as unknown as Record<string, string>, "description", locale),
    location: getLocalizedField(event as unknown as Record<string, string>, "location", locale),
    highlights: getLocalizedField(event as unknown as Record<string, string[]>, "highlights", locale),
    requirements: getLocalizedField(event as unknown as Record<string, string>, "requirements", locale),
    targetAudience: getLocalizedField(event as unknown as Record<string, string>, "targetAudience", locale),
    agenda: localizeAgendaItems(event.agenda),
    sections: localizeSections(event.sections),
    tables: localizeTables(event.tables),
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
