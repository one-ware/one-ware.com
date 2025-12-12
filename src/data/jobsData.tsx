import { JobCategory } from "../types/jobTypes";
import Translate, { translate } from "@docusaurus/Translate";

export const JOBS_DATA: JobCategory[] = [
  {
    category: "Software Engineer",
    positions: [
      {
        id: "software-engineer.1",
        title: ".ASP.NET / Blazor Developer",
        description: "Help us build and maintain the ONE WARE Cloud",
        url: "Web.pdf",
        type: "Full Time",
        location: "Osnabrück - Hybrid",
      },
      {
        id: "software-engineer.2",
        title: ".NET Desktop Developer (Avalonia / WPF)",
        description: "Help us develop ONE WARE Studio",
        url: "Desktop.pdf",
        type: "Full Time",
        location: "Osnabrück - Hybrid",
      }
    ],
  },
  {
    category: "AI Engineer",
    positions: [
      {
        id: "ai-engineer.1",
        title: "AI Engineer",
        description: "Help us to build the next generation of AI development",
        url: "AI.pdf",
        type: "Full Time",
        location: "Osnabrück - Hybrid",
      }
    ],
  },
];
