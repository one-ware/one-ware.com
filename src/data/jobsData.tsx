import { JobCategory } from "../types/jobTypes";

export const JOBS_DATA: JobCategory[] = [
  {
    category: "Software Engineer",
    positions: [
      {
        id: "software-engineer",
        title: ".ASP.NET / Blazor Developer",
        description: "Help us build and maintain the ONE WARE Cloud",
        url: "/career/OneWare_NET_WebDeveloper.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      },
      {
        id: "software-engineer",
        title: ".NET Desktop Developer (Avalonia / WPF)",
        description: "Help us develop ONE WARE Studio",
        url: "/career/OneWare_NET_DesktopDeveloper.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      }
    ],
  },
  {
    category: "AI Engineer",
    positions: [
      {
        id: "ai-engineer",
        title: "AI Developer",
        description: "Help us improve the OneAI System",
        url: "/career/OneWare_AI_Developer.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      }
    ],
  }
];
