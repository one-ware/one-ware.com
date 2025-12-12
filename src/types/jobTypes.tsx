export type Job = {
  id: string;
  title: string;
  title_de?: string;
  description: string;
  description_de?: string;
  url: string;
  type: string;
  type_de?: string;
  location: string;
  location_de?: string;
};

export type JobCategory = {
  category: string;
  category_de?: string;
  positions: Job[];
};
