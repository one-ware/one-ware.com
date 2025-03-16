export type Job = {
    id: string;
    title: string;
    description: string;
    pdf: string;
    type: string;
    location: string;
  };
  
  export type JobCategory = {
    category: string;
    positions: Job[];
  };
  