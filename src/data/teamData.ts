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
  {
    name: "Helmut Plötz",
    role: "Vice President of Global Sales",
    image: require("@site/static/img/AboutUs/helmut.png").default,
    linkedIn: "https://www.linkedin.com/in/helmut-ploetz-853342160/",
    email: "sales@one-ware.com",
  },
  {
    name: "Christopher",
    role: "AI Engineer",
    image: require("@site/static/img/support_christopher.webp").default,
    linkedIn: "",
    email: "support@one-ware.com",
  },
  {
    name: "Annalena",
    role: "AI Engineer",
    image: require("@site/static/img/AboutUs/annalena.png").default,
    linkedIn: "",
    email: "support@one-ware.com",
  },
  {
    name: "Thimo",
    role: "Embedded AI Engineer",
    image: require("@site/static/img/AboutUs/default.png").default,
    linkedIn: "",
    email: "support@one-ware.com",
  },
  {
    name: "Matthias",
    role: "Software Engineer",
    image: require("@site/static/img/AboutUs/Matthias.png").default,
    linkedIn: "",
    email: "support@one-ware.com",
  },
  {
    name: "Nils",
    role: "Software Engineer",
    image: require("@site/static/img/AboutUs/default.png").default,
    linkedIn: "",
    email: "support@one-ware.com",
  },
  {
    name: "Sebastian",
    role: "Founders Associate",
    image: require("@site/static/img/AboutUs/default.png").default,
    linkedIn: "",
    email: "info@one-ware.com",
  },
  {
    name: "Till",
    role: "Working Student - AI",
    image: require("@site/static/img/AboutUs/default.png").default,
    linkedIn: "",
    email: "support@one-ware.com",
  },
  {
    name: "Allen",
    role: "Working Student - AI",
    image: require("@site/static/img/AboutUs/Allen.jpg").default,
    linkedIn: "",
    email: "support@one-ware.com",
  },
  {
    name: "Dominik",
    role: "Working Student - Sales",
    image: require("@site/static/img/AboutUs/default.png").default,
    linkedIn: "",
    email: "sales@one-ware.com",
  },
  {
    name: "Nele",
    role: "Working Student - Marketing",
    image: require("@site/static/img/AboutUs/default.png").default,
    linkedIn: "",
    email: "sales@one-ware.com",
  },
];
