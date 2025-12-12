export interface FAQ {
  id: string;
  question: string;
  question_de?: string;
  answer: string;
  answer_de?: string;
  category: string;
  [key: string]: string | undefined;
}

export const FAQ_CATEGORIES = [
  "Getting Started",
  "Training",
  "Export",
  "General",
] as const;

export const FAQ_CATEGORY_LABELS: Record<string, { en: string; de: string }> = {
  "Getting Started": { en: "Getting Started", de: "Erste Schritte" },
  "Training": { en: "Training", de: "Training" },
  "Export": { en: "Export", de: "Export" },
  "General": { en: "General", de: "Allgemein" },
};

export const FAQ_DATA: FAQ[] = [
  {
    id: "gs-1",
    question: "Lorem ipsum dolor sit amet consectetur?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    category: "Getting Started",
  },
  {
    id: "gs-2",
    question: "Ut enim ad minim veniam quis nostrud?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "Getting Started",
  },
  {
    id: "gs-3",
    question: "Excepteur sint occaecat cupidatat non proident?",
    answer:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    category: "Getting Started",
  },
  {
    id: "tr-1",
    question: "Nemo enim ipsam voluptatem quia voluptas?",
    answer:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    category: "Training",
  },
  {
    id: "tr-2",
    question: "Quis autem vel eum iure reprehenderit?",
    answer:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.",
    category: "Training",
  },
  {
    id: "tr-3",
    question: "At vero eos et accusamus et iusto odio?",
    answer:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    category: "Training",
  },
  {
    id: "ex-1",
    question: "Temporibus autem quibusdam et aut officiis?",
    answer:
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
    category: "Export",
  },
  {
    id: "ex-2",
    question: "Itaque earum rerum hic tenetur a sapiente?",
    answer:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    category: "Export",
  },
  {
    id: "ex-3",
    question: "Nam libero tempore cum soluta nobis?",
    answer:
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    category: "Export",
  },
  {
    id: "al-1",
    question: "Sed ut perspiciatis unde omnis iste natus?",
    answer:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    category: "General",
  },
  {
    id: "al-2",
    question: "Neque porro quisquam est qui dolorem?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    category: "General",
  },
  {
    id: "al-3",
    question: "Duis aute irure dolor in reprehenderit?",
    answer:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    category: "General",
  },
];
