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
        title: "AI Engineer",
        description: "Help us to build the next generation of AI development",
        url: "AI.pdf",
        type: "Full Time",
        location: "Osnabrück - Hybrid",
      }
    ],
  },
  // {
  //  category: "Sales",
  //  positions: [
  //    {
  //      id: "sales-engineer.1",
  //      title: "Technical Sales Engineer",
  //      description: "Help us take sales to the next technological level",
  //      url: "OneWare_Sales_TechnicalSalesEngineer.pdf",
  //      type: "Full Time",
  //      location: "Osnabrück - Hybrid",
  //    }
  //  ],
  //},
  // {
  //   category: "Technical",
  //   positions: [
  //     {
  //       id: "technical.1",
  //       title: "Technician/Mechatronics Engineer/Electronics Technician/IT Specialist (m/f/d)",
  //       description: "Develop hardware setups, integrate AI functions and create tutorials for exciting AI applications",
  //       url: "OneWare_Technik_KI-Tutorials.pdf",
  //       type: "Full Time",
  //       location: "Osnabrück at ICO",
  //     }
  //   ],
  // },
  {
    category: "Students & Interns",
    positions: [
      {
        id: "students-interns.2",
        title: "Working Student - AI Engineering and Prototyping ",
        description: "Help us create AI demos, technical tutorials and documentation",
        url: "Student.pdf",
        type: "Part Time",
        location: "Osnabrück",
      }
    ],
  }
];
