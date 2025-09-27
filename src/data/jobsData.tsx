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
        url: "OneWare_NET_WebDeveloper.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      },
      {
        id: "software-engineer.2",
        title: ".NET Desktop Developer (Avalonia / WPF)",
        description: "Help us develop ONE WARE Studio",
        url: "OneWare_NET_DesktopDeveloper.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      }
    ],
  },
  {
    category: "Sales",
    positions: [
      {
        id: "sales-engineer.1",
        title: "Technical Sales Engineer",
        description: "Help us take sales to the next technological level",
        url: "OneWare_Sales_TechnicalSalesEngineer.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      }
    ],
  },
  {
    category: "Students & Interns",
    positions: [
      {
        id: "students-interns.2",
        title: "Working Student in Electrical Engineering/Computer Science/Mechatronics",
        description: "Help us create technical tutorials and documentation",
        url: "OneWare_Werkstudent_Technik_KI-Tutorials.pdf",
        type: "Part Time",
        location: "Osnabrück",
      }
    ],
  }
];
