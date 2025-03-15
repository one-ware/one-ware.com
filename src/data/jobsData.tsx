import { JobCategory } from "../types/jobTypes";

export const JOBS_DATA: JobCategory[] = [
  {
    category: "Software Engineer",
    positions: [
      {
        id: "software-engineer",
        title: ".ASP.NET / Blazor Backend Developer",
        description: "Help us build and maintain the OneWare Cloud",
        more_details:
          "We are looking for a .NET Developer to help us build a Server Backend for our OneAI Extension. The Server has a REST API to communicate with the OneAI Extension. The Server is written in C# and uses ASP.NET Core and Blazor for the Web UI. More details will be provided during the interview.",
        type: "Full Time",
        location: "Osnabrück - Remote",
      },
      {
        id: "software-engineer",
        title: ".NET Desktop Developer (Avalonia / WPF)",
        description: "Help us develop OneWare Studio!",
        more_details:
          "We are looking for a .NET Developer with experience in Avalonia or WPF to help us develop OneWare Studio and its extensions. OneWare Studio is an open source IDE for Electronics Development",
        type: "Full Time",
        location: "Osnabrück - Remote",
      }
    ],
  },
  {
    category: "Marketing",
    positions: [
      {
        id: "developer-marketing-lead",
        title: "Developer Marketing Lead",
        description: "Help us spread the word about one-ware.com",
        type: "Full Time",
        location: "Remote",
        more_details: "We are looking for a Developer Marketing Lead to join our team and help us spread the word about one-ware.com. You will work closely with our product and engineering teams to deliver high-quality software that meets the needs of our customers. You will be responsible for developing and executing our developer marketing strategy, and you will have the opportunity to build and lead a high-performing developer marketing team.",
      },
      {
        id: "content-marketing-manager",
        title: "Community Manager",
        description: "Engage with our developer community",
        type: "Full Time",
        location: "Remote",
        more_details: "We are looking for a Community Manager to join our team and engage with our developer community. You will work closely with our product and engineering teams to deliver high-quality software that meets the needs of our customers. You will be responsible for developing and executing our community engagement strategy, and you will have the opportunity to build and lead a high-performing community engagement team.",
      },
    ],
  },
];
