export type JobContentSection = {
  title: string;
  title_de?: string;
  content?: string;
  content_de?: string;
  points?: string[];
  points_de?: string[];
  subsections?: { title: string; title_de?: string; points: string[]; points_de?: string[] }[];
};

export type JobFormField = {
  name: string;
  label: string;
  label_de?: string;
  type: "text" | "textarea" | "select" | "multiselect" | "boolean";
  required?: boolean;
  options?: string[];
  options_de?: string[];
};

export type JobSectionKey = "hero" | "tasks" | "profile" | "benefits" | "mission" | "application";

export type JobDetail = {
  id: string;
  title: string;
  title_de?: string;
  category: string;
  category_de?: string;
  type: string;
  type_de?: string;
  location: string;
  location_de?: string;
  startDate?: string;
  startDate_de?: string;
  heroTitle?: string;
  heroTitle_de?: string;
  heroImage?: string;
  shortDescription?: string;
  shortDescription_de?: string;
  tasks?: JobContentSection;
  profile?: JobContentSection;
  benefits?: JobContentSection;
  mission?: JobContentSection;
  customSections?: JobContentSection[];
  sectionOrder?: JobSectionKey[];
  formFields?: JobFormField[];
  active?: boolean;
};
