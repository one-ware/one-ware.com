import { JobCategory } from "../types/jobTypes";

export const JOBS_DATA: JobCategory[] = [
  {
    category: "Software Engineer",
    positions: [
      {
        id: "software-engineer",
        title: ".ASP.NET / Blazor Backend Developer",
        description: "Help us build and maintain the OneWare Cloud",
        pdf: "/career/OneWare_NET_WebDeveloper.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      },
      {
        id: "software-engineer",
        title: ".NET Desktop Developer (Avalonia / WPF)",
        description: "Help us develop OneWare Studio!",
        pdf: "/career/OneWare_NET_DesktopDeveloper.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      }
    ],
  }
];
