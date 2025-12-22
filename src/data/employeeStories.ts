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
    quote: "I joined OneWare in May as an AI Developer during the early growth phase after the first investment. Growing together with the team gave me the chance to shape processes, contribute ideas, and learn along the way. Watching OneAI evolve while growing personally and professionally has been especially rewarding.",
    quote_de: "Ich bin im Mai als KI-Entwicklerin zu OneWare gekommen, während der frühen Wachstumsphase nach der ersten Investition. Gemeinsam mit dem Team zu wachsen gab mir die Chance, Prozesse mitzugestalten, Ideen einzubringen und dabei zu lernen. Zu sehen, wie sich OneAI entwickelt, während ich persönlich und beruflich wachse, war besonders bereichernd.",
    name: "Annalena Bebenroth",
    position: "AI Engineer",
    position_de: "KI-Ingenieurin",
    cyanText: "",
    image: require("@site/static/img/AboutUs/annalena_2.png").default,
  },
];
