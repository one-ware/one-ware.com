export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedIn: string;
  email: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Leon Beier",
    role: "CEO",
    image: require("@site/static/img/AboutUs/Leon.png").default,
    linkedIn: "https://www.linkedin.com/in/leon-beier-55bbb7230/",
    email: "lbeier@one-ware.com",
  },
  {
    name: "Ali Durmaz",
    role: "COO",
    image: require("@site/static/img/AboutUs/Ali.png").default,
    linkedIn: "https://www.linkedin.com/in/ali-durmaz-1a0799215/",
    email: "adurmaz@one-ware.com",
  },
  {
    name: "Leo Wiegand",
    role: "CRO",
    image: require("@site/static/img/AboutUs/Leo.png").default,
    linkedIn: "https://www.linkedin.com/in/leo-wiegand-b27aa0272/",
    email: "lwiegand@one-ware.com",
  },
  {
    name: "Hendrik Mennen",
    role: "CTO",
    image: require("@site/static/img/AboutUs/Hendrik.png").default,
    linkedIn: "https://www.linkedin.com/in/hendrik-mennen-3b9a04230/",
    email: "hmennen@one-ware.com",
  },
];
