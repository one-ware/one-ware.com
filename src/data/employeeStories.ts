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
  },
  {
    id: 2,
    quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    name: "Anna Schmidt",
    position: "Product Manager",
    cyanText: "Sed ut perspiciatis unde omnis iste natus.",
  },
  {
    id: 3,
    quote: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
    name: "Thomas Weber",
    position: "UX Designer",
    cyanText: "At vero eos et accusamus et iusto odio.",
  },
];
