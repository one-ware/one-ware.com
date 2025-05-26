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
    category: "AI Engineer",
    positions: [
      {
        id: "ai-engineer.1",
        title: "AI Developer",
        description: "Help us improve the OneAI System",
        url: "OneWare_AI_Developer.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      },
      {
        id: "ai-engineer.2",
        title: "AI Developer (FPGA)",
        description: "Help us to integrate ONE AI onto FPGAs",
        url: "OneWare_AI_Developer_FPGA.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      },
      {
        id: "ai-engineer.3",
        title: "AI Developer Microcontrollers / TF Lite",
        description: "Help us integrate ONE AI onto Microcontrollers / TF Lite",
        url: "OneWare_AI_Developer_MicrocontrollerITF_Lite.pdf",
        type: "Full Time",
        location: "Osnabrück - Remote",
      }
    ],
  }
];
