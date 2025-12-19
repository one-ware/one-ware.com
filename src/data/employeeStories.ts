export interface EmployeeStory {
  id: number;
  quote: string;
  quote_de?: string;
  name: string;
  position: string;
  position_de?: string;
  cyanText: string;
  cyanText_de?: string;
  image?: string;
  [key: string]: string | number | undefined;
}

export const EMPLOYEE_STORIES: EmployeeStory[] = [
  {
    id: 1,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    name: "Max Mustermann",
    position: "Software Engineer",
    cyanText: "Lorem ipsum dolor sit amet consectetur.",
  }
];
