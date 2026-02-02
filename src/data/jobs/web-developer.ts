import { JobDetail } from "../../types/jobTypes";

export const webDeveloper: JobDetail = {
  id: "web-developer",
  title: ".ASP.NET / Blazor Developer",
  title_de: ".ASP.NET / Blazor Developer",
  category: "Development",
  category_de: "Entwicklung",
  type: "Full-time",
  type_de: "Vollzeit",
  location: "Osnabrück - Hybrid",
  location_de: "Osnabrück - Hybrid",
  startDate: "immediately",
  startDate_de: "ab sofort",
  heroTitle: "Join us. Build the Next Gen AI Platform.",
  heroTitle_de: "Join us. Build the Next Gen AI Platform.",
  shortDescription: "Develop the server backend for our AI platform and build real-time APIs.",
  shortDescription_de: "Entwickle das Server-Backend für unsere KI-Plattform und baue APIs, die in Echtzeit laufen.",

  customSections: [
    {
      title: "About the Role",
      title_de: "Über die Rolle",
      content: "With us, you develop the server backend for our AI platform, build APIs that run in real-time, and work directly with our CTO. Small teams, fast decisions, lots of room for your own ideas.",
      content_de: "Bei uns entwickelst du das Server-Backend für unsere KI-Plattform, baust APIs, die in Echtzeit laufen, und arbeitest direkt mit unserem CTO zusammen. Kleine Teams, schnelle Entscheidungen, viel Raum für eigene Ideen."
    }
  ],

  tasks: {
    title: "Your Tasks",
    title_de: "Deine Aufgaben",
    subsections: [
      {
        title: "Take Responsibility",
        title_de: "Verantwortung übernehmen",
        points: [
          "Further development of our .NET backend (C#, EF Core, SQL)",
          "Building and optimization of APIs for OneWare Studio"
        ],
        points_de: [
          "Weiterentwicklung unseres .NET-Backends (C#, EF Core, SQL)",
          "Aufbau und Optimierung von APIs für OneWare Studio"
        ]
      },
      {
        title: "Drive Innovation",
        title_de: "Innovation vorantreiben",
        points: [
          "Bring your ideas into the development of our cloud-based solutions"
        ],
        points_de: [
          "Bringe deine Ideen in die Entwicklung unserer Cloud-basierten Lösungen ein"
        ]
      },
      {
        title: "Collaboration",
        title_de: "Zusammenarbeit",
        points: [
          "Work closely with a dedicated team to actively shape the future of AI development tools"
        ],
        points_de: [
          "Arbeite eng mit einem engagierten Team zusammen, um die Zukunft von AI-Entwicklungstools aktiv mitzugestalten"
        ]
      }
    ]
  },

  profile: {
    title: "Your Profile",
    title_de: "Dein Profil",
    points: [
      "Experience in .NET / C# web development",
      "Knowledge of EF Core, relational databases, Git/GitHub",
      "Independent, structured work style",
      "Fluent in English",
      "Interest in AI and modern software development"
    ],
    points_de: [
      "Erfahrung in der .NET / C# Webentwicklung",
      "Kenntnisse in EF Core, relationalen Datenbanken, Git/GitHub",
      "Selbstständige, strukturierte Arbeitsweise",
      "Englisch fließend",
      "Interesse an KI und moderner Softwareentwicklung"
    ]
  },

  benefits: {
    title: "What to Expect",
    title_de: "Was dich bei uns erwartet",
    points: [
      "Agile startup environment with direct impact",
      "Hybrid, flexible working hours",
      "Short paths and lots of responsibility",
      "Fair compensation, benefits and 30 days vacation"
    ],
    points_de: [
      "Agiles Startup-Umfeld mit direktem Impact",
      "Hybrid, flexible Arbeitszeiten",
      "Kurze Wege und viel Verantwortung",
      "Faire Vergütung, Benefits und 30 Tage Urlaub"
    ]
  },

  mission: {
    title: "Our Mission",
    title_de: "Unsere Mission",
    content: "Everyone talks about AI. Hardly anyone builds it right. We do.\n\nAI engineers train foundation models that were originally developed for completely different applications and then sell them as \"individual AI systems\". A little fine-tuning, a new name, done. Meanwhile, worldwide research on specific application areas is completely ignored. Nevertheless, such developments often take several months and cost a fortune. This has nothing to do with real innovation.\n\nNo wonder that individual AI has so far been used in significantly fewer products, machines and companies than, for example, the LLM support chatbot, which is integrated in ten minutes and saves twenty minutes of work.\n\nWe do it differently.\n\nOur software ONE AI uses all the knowledge of global AI research, combines it with our own experience, and builds the right AI for any task from scratch in seconds. The resulting models are so efficient that no latest and fastest AI hardware is required, yet they are more precise and powerful than anything currently available on the market.\n\nWhether industry, medical technology or aerospace - we are creating the foundation for a new generation of AI applications. Generative AI was the beginning. Individual AI is the future. And we make it accessible for businesses and society.",
    content_de: "Alle reden über KI. Kaum einer baut sie richtig. Wir schon.\n\nAI-Engineers trainieren Foundation Models, die ursprünglich für völlig andere Anwendungen entwickelt wurden und verkaufen sie anschließend als \"individuelle KI-Systeme\". Ein bisschen Feintuning, ein neuer Name, fertig. Dabei wird die weltweite Forschung zu spezifischen Anwendungsgebieten vollständig ignoriert. Trotzdem dauern solche Entwicklungen oft mehrere Monate und kosten ein Vermögen. Mit echter Innovation hat das nichts zu tun.\n\nKein Wunder also, dass individuelle KI bislang in deutlich weniger Produkten, Maschinen und Unternehmen eingesetzt wird als etwa der LLM-Support-Chatbot, der in zehn Minuten integriert ist und zwanzig Minuten Arbeit spart.\n\nWir machen es anders.\n\nUnsere Software ONE AI nutzt das gesamte Wissen der globalen KI-Forschung, kombiniert es mit eigener Erfahrung und baut in Sekunden von Grund auf die passende KI für jede Aufgabe. Die resultierenden Modelle sind so effizient, dass keine der neuesten und schnellsten KI-Hardwares mehr erforderlich sind und gleichzeitig sind sie präziser und leistungsfähiger als alles, was derzeit am Markt verfügbar ist.\n\nOb Industrie, Medizintechnik oder Luftfahrt, wir schaffen das Fundament für eine neue Generation von KI-Anwendungen. Generative KI war der Anfang. Individuelle KI ist die Zukunft. Und wir machen sie für Unternehmen und Gesellschaft zugänglich."
  },

  sectionOrder: ["tasks", "profile", "benefits", "mission", "application"],

  active: true
};
