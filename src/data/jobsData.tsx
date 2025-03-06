import { JobCategory } from "../types/jobTypes";

export const JOBS_DATA: JobCategory[] = [
  {
    category: "Engineering",
    positions: [
      {
        id: "software-engineer",
        title: "Software Engineer",
        description: "Help us build the best UI toolkit for .NET developers",
        more_details:
          "We are looking for a Software Engineer to join our team and help us build the best UI toolkit for .NET developers. You will work on the development of our cross-platform UI components, and you will have the opportunity to contribute to the design and implementation of our product roadmap. You will work closely with our product and design teams to deliver high-quality software that meets the needs of our customers.",
        type: "Full Time",
        location: "Remote - EMEA",
      },
      {
        id: "ux-brand-designer",
        title: "UX & Brand Designer",
        description: "Help us design the future of cross-platform development",
        type: "Full Time",
        location: "Remote - EMEA",
        more_details: "We are looking for a UX & Brand Designer to join our team and help us design the future of cross-platform development. You will work on the design of our cross-platform UI components, and you will have the opportunity to contribute to the design and implementation of our product roadmap. You will work closely with our product and engineering teams to deliver high-quality software that meets the needs of our customers.",
      },
      {
        id: "frontend-engineer",
        title: "Frontend Engineer",
        description: "Build beautiful user experiences with React & TypeScript",
        type: "Full Time",
        location: "Remote - Global",
        more_details: "We are looking for a Frontend Engineer to join our team and help us build beautiful user experiences with React & TypeScript. You will work on the development of our cross-platform UI components, and you will have the opportunity to contribute to the design and implementation of our product roadmap. You will work closely with our product and design teams to deliver high-quality software that meets the needs of our customers.",
      },
    ],
  },
  {
    category: "Sales",
    positions: [
      {
        id: "head-of-sales",
        title: "Head of Sales & Business Development",
        description: "Lead the commercial evolution of our offerings",
        type: "Full Time",
        location: "Remote - EMEA",
        more_details: "We are looking for a Head of Sales & Business Development to join our team and lead the commercial evolution of our offerings. You will work closely with our product and engineering teams to deliver high-quality software that meets the needs of our customers. You will be responsible for developing and executing our sales strategy, and you will have the opportunity to build and lead a high-performing sales team.",
      },
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
