export type AgendaItem = {
  title: string;
  title_de?: string;
  points: string[];
  points_de?: string[];
};

export type Resource = {
  title: string;
  title_de?: string;
  url: string;
  description?: string;
  description_de?: string;
};

export type SessionColumn = {
  key: string;
  header: string;
  header_de?: string;
  format?: "date";
};

export type SessionRow = {
  [key: string]: string;
};

export type Table = {
  title: string;
  title_de?: string;
  buttonUrl?: string;
  buttonLabel?: string;
  buttonLabel_de?: string;
  columns: SessionColumn[];
  rows: SessionRow[];
};

export type ContentSection = {
  title: string;
  title_de?: string;
  content?: string;
  content_de?: string;
  points?: string[];
  points_de?: string[];
  image?: string;
  video?: string;
  resources?: Resource[];
};

export type EventStatus = "upcoming" | "past";

export type SectionKey = "highlights" | "description" | "agenda" | "sections" | "tables" | "registration";

export type FormField = {
  name: string;
  label: string;
  label_de?: string;
  type: "text" | "textarea" | "select" | "multiselect" | "boolean";
  required?: boolean;
  options?: string[];
  options_de?: string[];
};

export type Event = {
  id: string;
  status: EventStatus;
  date: string;
  time: string;
  category: string;
  type: "workshop" | "event" | "webinar";
  image: string;

  title: string;
  title_de?: string;

  shortDescription?: string;
  shortDescription_de?: string;

  subtitle?: string;
  subtitle_de?: string;

  description?: string;
  description_de?: string;

  location?: string;
  location_de?: string;

  language?: string;
  speakers?: string[];

  highlights?: string[];
  highlights_de?: string[];

  agenda?: AgendaItem[];
  sections?: ContentSection[];
  gallery?: string[];
  formFields?: FormField[];
  tables?: Table[];

  requirements?: string;
  requirements_de?: string;

  targetAudience?: string;
  targetAudience_de?: string;

  sectionOrder?: SectionKey[];
};
