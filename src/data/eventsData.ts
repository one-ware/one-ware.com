import { Event } from "../types/eventTypes";

export const EVENTS: Event[] = [
  {
    id: "arrow-agilex3",
    status: "past",
    title: "Worldwide Agilex 3 AI Workshop",
    title_de: "Weltweiter Agilex 3 AI Workshop",
    date: "2025-09-30",
    time: "Full Day",
    category: "FPGA",
    type: "workshop",
    image: "/img/ai/one_ai_plugin/seminars/axe3000.webp",
    shortDescription: "Global hands-on workshop series: Learn FPGA development, build AI with ONE AI, and win an AXC3000 Board!",
    shortDescription_de: "Globale Hands-on Workshop-Reihe: Lernen Sie FPGA-Entwicklung, bauen Sie KI mit ONE AI und gewinnen Sie ein AXC3000 Board!",
    subtitle: "Global hands-on workshop by Arrow Electronics - Learn FPGA development for FREE and build your own ultra-efficient AI",
    subtitle_de: "Globaler Hands-on Workshop von Arrow Electronics - Lernen Sie FPGA-Entwicklung KOSTENLOS und bauen Sie Ihre eigene ultra-effiziente KI",
    description: "This global workshop series brings together the latest Agilex™ 3 FPGA technology from Altera, the expertise of Arrow Electronics, and the innovative AI platform of ONE WARE.\n\nWhether you are just starting with FPGA development or already experienced in AI acceleration, these sessions are designed to provide you with practical skills and real-world applications.",
    description_de: "Diese globale Workshop-Reihe vereint die neueste Agilex™ 3 FPGA-Technologie von Altera, die Expertise von Arrow Electronics und die innovative KI-Plattform von ONE WARE.\n\nOb Sie gerade erst mit der FPGA-Entwicklung beginnen oder bereits Erfahrung in der KI-Beschleunigung haben - diese Sessions vermitteln Ihnen praktische Fähigkeiten und reale Anwendungen.",
    location: "Multiple Locations",
    location_de: "Mehrere Standorte",
    language: "English",
    highlights: [
      "Learn about FPGA development for FREE",
      "Build your own ultra-efficient and high-speed AI with ONE AI",
      "Get a coupon for 500 € worth in credits for AI training on top of the welcome credits",
      "Win an AXC3000 Board at each event"
    ],
    highlights_de: [
      "Lernen Sie FPGA-Entwicklung KOSTENLOS",
      "Bauen Sie Ihre eigene ultra-effiziente und schnelle KI mit ONE AI",
      "Erhalten Sie einen Gutschein im Wert von 500 € für KI-Training zusätzlich zu den Willkommens-Credits",
      "Gewinnen Sie ein AXC3000 Board bei jedem Event"
    ],
    agenda: [
      {
        title: "Agilex™ 3 FPGA Foundations",
        title_de: "Agilex™ 3 FPGA Grundlagen",
        points: [
          "Your first Agilex™ 3 design",
          "Power estimation and debugging with Signal Tap",
          "Introduction to Nios® V",
          "Timing closure best practices"
        ],
        points_de: [
          "Ihr erstes Agilex™ 3 Design",
          "Leistungsabschätzung und Debugging mit Signal Tap",
          "Einführung in Nios® V",
          "Best Practices für Timing Closure"
        ]
      },
      {
        title: "Video Processing",
        title_de: "Videoverarbeitung",
        points: [
          "MIPI CSI-to-DSI video pipeline lab"
        ],
        points_de: [
          "MIPI CSI-zu-DSI Video-Pipeline Labor"
        ]
      },
      {
        title: "Artificial Intelligence with ONE AI",
        title_de: "Künstliche Intelligenz mit ONE AI",
        points: [
          "From dataset preparation to training, testing, and deployment",
          "Model visualization and implementation on FPGA hardware",
          "Seamless integration with ONE AI for cloud-to-edge workflows"
        ],
        points_de: [
          "Von der Datensatzvorbereitung über Training und Testen bis zur Bereitstellung",
          "Modellvisualisierung und Implementierung auf FPGA-Hardware",
          "Nahtlose Integration mit ONE AI für Cloud-to-Edge Workflows"
        ]
      },
      {
        title: "Optimization & Deployment",
        title_de: "Optimierung & Bereitstellung",
        points: [
          "FPGA AI Suite for pre-trained models",
          "Hardware-aware optimization for maximum performance and efficiency"
        ],
        points_de: [
          "FPGA AI Suite für vortrainierte Modelle",
          "Hardware-bewusste Optimierung für maximale Leistung und Effizienz"
        ]
      }
    ],
    sections: [
      {
        title: "Why ONE WARE?",
        title_de: "Warum ONE WARE?",
        content: "With the highly efficient AI models, created by ONE AI, high-performance AI deployment on FPGAs become possible. The AI models are always generated from scratch for each application and only learn the necessary information. This makes the AI models more efficient, faster and also more accurate.\n\nTogether with ONE WARE Studio you benefit from an end-to-end workflow from dataset to deployment. This includes automated labelling and export for any hardware.",
        content_de: "Mit den hocheffizienten KI-Modellen, die von ONE AI erstellt werden, wird leistungsstarke KI-Bereitstellung auf FPGAs möglich. Die KI-Modelle werden für jede Anwendung von Grund auf neu generiert und lernen nur die notwendigen Informationen. Das macht die KI-Modelle effizienter, schneller und auch genauer.\n\nZusammen mit ONE WARE Studio profitieren Sie von einem End-to-End-Workflow vom Datensatz bis zur Bereitstellung. Dies beinhaltet automatisiertes Labeling und Export für jede Hardware.",
        image: "/img/ai/Pre.png"
      },
      {
        title: "Practical Information",
        title_de: "Praktische Informationen",
        points: [
          "Requirements: Own laptop with Quartus Prime Pro 25.1.1 installed",
          "Audience: FPGA, software, and AI developers of all levels",
          "Fee: Free of charge"
        ],
        points_de: [
          "Voraussetzungen: Eigener Laptop mit installiertem Quartus Prime Pro 25.1.1",
          "Zielgruppe: FPGA-, Software- und KI-Entwickler aller Erfahrungsstufen",
          "Kosten: Kostenlos"
        ]
      }
    ],
    tables: [
      {
        title: "France",
        title_de: "Frankreich",
        buttonUrl: "https://forms.office.com/r/kDc99uBrzM",
        buttonLabel: "Register here",
        buttonLabel_de: "Hier registrieren",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "venue", header: "Venue", header_de: "Veranstaltungsort" }
        ],
        rows: [
          { date: "2025-11-06", city: "Lyon, France", venue: "Mercure Hotel at Villefontaine (38)" },
          { date: "2025-11-13", city: "Rennes, France", venue: "Arrow Office, Cesson-Sevigne (35)" },
          { date: "2025-11-19", city: "Paris, France", venue: "Arrow Office, Courbevoie (92)" }
        ]
      },
      {
        title: "Italy",
        title_de: "Italien",
        buttonUrl: "https://forms.office.com/pages/responsepage.aspx?id=NQzrC7uc60-Z5VieQVx5RANIh9iy37VAuT0ulq6AW4lUOVI2STlYWjlLMVVMV0cxMk4zWkU5TUw1RyQlQCNjPTEu&utm_source=linkedin_company&utm_medium=social&utm_campaign=arrow+social+post&route=shorturl",
        buttonLabel: "Register here",
        buttonLabel_de: "Hier registrieren",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "venue", header: "Venue", header_de: "Veranstaltungsort" }
        ],
        rows: [
          { date: "2025-10-23", city: "Florence, Italy", venue: "Arrow Office, Via Sandro Pertini 95, Sesto Fiorentino (FI)" },
          { date: "2025-11-13", city: "Bologna, Italy", venue: "Arrow Office, Via Marabini 3, 40013 Castel Maggiore (BO)" }
        ]
      },
      {
        title: "United Kingdom",
        title_de: "Vereinigtes Königreich",
        buttonUrl: "https://forms.office.com/Pages/ResponsePage.aspx?id=NQzrC7uc60-Z5VieQVx5RKOpGkQgmrRKhIwrW2H-yo9UQjlLTDQ2MDc2SDdYNjhYUkNMTjQzVkpYTS4u",
        buttonLabel: "Register here",
        buttonLabel_de: "Hier registrieren",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "venue", header: "Venue", header_de: "Veranstaltungsort" }
        ],
        rows: [
          { date: "2025-11-18", city: "Marlow, UK", venue: "Altera Marlow, Eclipse Parkway, Marlow, SL7 1YL" },
          { date: "2025-11-19", city: "Cambridge, UK", venue: "Airborne Assault Ltd, Duxford Airfield, Duxford CB22 4QR" }
        ]
      },
      {
        title: "Eastern Europe & Middle East",
        title_de: "Osteuropa & Naher Osten",
        buttonUrl: "https://forms.office.com/r/CbD01JB2KW",
        buttonLabel: "Register here",
        buttonLabel_de: "Hier registrieren",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "venue", header: "Venue", header_de: "Veranstaltungsort" }
        ],
        rows: [
          { date: "2025-10-21", city: "Prague, Czechia", venue: "Magenta Experience Center (Arkady Pankrac)" },
          { date: "2025-10-29", city: "Warsaw, Poland", venue: "Arrow Electronics Office (ul. Krakowiakow)" },
          { date: "2025-12-10", city: "Ankara, Turkey", venue: "Alegria Business Hotel" }
        ]
      },
      {
        title: "Spain",
        title_de: "Spanien",
        buttonUrl: "https://www.arrow.com/en/company/contact-arrow",
        buttonLabel: "Contact Arrow Electronics for registration details",
        buttonLabel_de: "Kontaktieren Sie Arrow Electronics für Registrierungsdetails",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "venue", header: "Venue", header_de: "Veranstaltungsort" }
        ],
        rows: [
          { date: "TBD", city: "Barcelona, Spain", venue: "Location TBD" }
        ]
      },
      {
        title: "South Africa",
        title_de: "Südafrika",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "venue", header: "Venue", header_de: "Veranstaltungsort" }
        ],
        rows: [
          { date: "2025-11-12", city: "Johannesburg, South Africa", venue: "Location TBD" }
        ]
      },
      {
        title: "DACH + Benelux",
        buttonUrl: "https://forms.office.com/pages/responsepage.aspx?id=NQzrC7uc60-Z5VieQVx5RPFotgxDwR5Hu9zeXz3eW5pUQjQxOVlRWlJYS05QMTNSNEJNTUk3QU9OMy4u&route=shorturl",
        buttonLabel: "Register here",
        buttonLabel_de: "Hier registrieren",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "venue", header: "Venue", header_de: "Veranstaltungsort" }
        ],
        rows: [
          { date: "2025-10-16", city: "Vienna, Austria", venue: "Wienerbergstraße 11, 1100 Wien" },
          { date: "2025-10-29", city: "Munich, Germany", venue: "Elsenheimer Strasse 1, 80687 München" },
          { date: "2025-10-30", city: "Nuremberg, Germany", venue: "Lina-Ammon-Strasse 30, 90471 Nürnberg" },
          { date: "2025-11-04", city: "Houten, Netherlands", venue: "Kromme Schaft 5, 3991 AR Houten" },
          { date: "2025-11-06", city: "Diegem, Belgium", venue: "Culliganlaan 1a, 1831 Diegem" },
          { date: "2025-11-11", city: "Braunschweig, Germany", venue: "Volkmaroder Str. 7, 38104 Braunschweig" },
          { date: "2025-11-12", city: "Zurich, Switzerland", venue: "Richtistrasse 11, 8304 Walliselen" },
          { date: "2025-11-13", city: "Dortmund, Germany", venue: "Hildebrandstrasse 11, 44319 Dortmund" },
          { date: "2025-11-25", city: "Stuttgart, Germany", venue: "Höpfigheimer Strasse 5, 74321 Bietigheim-Bissingen" },
          { date: "2025-11-27", city: "Frankfurt, Germany", venue: "Frankfurter Str. 211, 63263 Neu-Isenburg" },
          { date: "2025-12-02", city: "Freiburg, Germany", venue: "Am Gansacker 10, 79224 Freiburg" },
          { date: "2025-12-09", city: "Berlin, Germany", venue: "Eurostars Berlin, Friedrichstrasse 99, 10117 Berlin" },
          { date: "TBD", city: "Leipzig, Germany", venue: "Hauptstrasse 103, 4416 Leipzig" }
        ]
      },
      {
        title: "Nordic",
        title_de: "Nordeuropa",
        buttonUrl: "https://forms.office.com/r/veR7MBE4xC",
        buttonLabel: "Register here",
        buttonLabel_de: "Hier registrieren",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "venue", header: "Venue", header_de: "Veranstaltungsort" }
        ],
        rows: [
          { date: "2025-10-08", city: "Oslo, Norway", venue: "Arrow Office, Innspurten 1a" },
          { date: "2025-10-09", city: "Trondheim, Norway", venue: "Scandic Solsiden, Beddingen 1" },
          { date: "2025-10-14", city: "Tallinn, Estonia", venue: "Arrow Office, Sõpruse pst 145" },
          { date: "2025-10-21", city: "Kista, Sweden", venue: "Arrow Office, Kronborgsgränd 7" },
          { date: "2025-10-29", city: "Aarhus/Viby, Denmark", venue: "Arrow Office, Jens Juuls Vej 42" },
          { date: "2025-10-30", city: "Ballerup, Denmark", venue: "Arrow Office, Lautruphøj 2, 6" },
          { date: "2025-11-04", city: "Oulu, Finland", venue: "Technopolis Pikisaari, Elektroniikkatie 10" },
          { date: "2025-11-05", city: "Tampere, Finland", venue: "Technopolis Asemakeskus, Peltokatu 26" }
        ]
      },
      {
        title: "North America",
        title_de: "Nordamerika",
        buttonUrl: "https://forms.office.com/Pages/ResponsePage.aspx?id=NQzrC7uc60-Z5VieQVx5RBsfuMwg329Jl7xD0Mbi2fdUOUZTNFBBRlZHN09CSktOTDRXVDRBQ0xLTy4u",
        buttonLabel: "Register here",
        buttonLabel_de: "Hier registrieren",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "venue", header: "Venue", header_de: "Veranstaltungsort" }
        ],
        rows: [
          { date: "2025-09-30", city: "Portland, USA", venue: "Office Evolution, 9620 NE Tanasbourne St Suite 300, Hillsboro, OR" },
          { date: "2025-10-07", city: "Denver, USA", venue: "Arrow Office, 9151 E. Panorama Circle, Centennial, CO" },
          { date: "2025-10-08", city: "Minneapolis, USA", venue: "Arrow Office, 10900 Hampshire Ave. S, Suite 180, Bloomington, MN" },
          { date: "2025-10-15", city: "Atlanta/Raleigh, USA", venue: "Forum Assembly Room, 1125 Sanctuary Pkwy #120, Alpharetta, GA" },
          { date: "2025-10-16", city: "Orlando, USA", venue: "Trailblazer Meeting & Event Space, 3801 Avalon Park East Blvd, FL" },
          { date: "2025-10-21", city: "Dallas, USA", venue: "Hexa Co-Working, 2100 North Greenville Ave, Richardson, TX" },
          { date: "2025-10-22", city: "San Diego, USA", venue: "Venture X, 10089 Willow Creek Road, Suite 200, San Diego, CA" },
          { date: "2025-10-23", city: "Seattle, USA", venue: "Venture Mechanics Co, Airbus room, 14110 NE 21st St, Bellevue, WA" },
          { date: "2025-10-28", city: "Philadelphia, USA", venue: "Sentient Liquid Space, 1000 Northbrook Dr, Trevose, PA" },
          { date: "2025-10-29", city: "Baltimore, USA", venue: "Sheraton Rockville, 920 King Farm Blvd., Rockville, MD" },
          { date: "2025-10-30", city: "St. Louis/KC, USA", venue: "Remote / Virtual Only" },
          { date: "2025-11-04", city: "Montreal, Canada", venue: "Novatel Montreal Airport, 2599 Alfred Noble, QC" },
          { date: "2025-11-05", city: "San Jose, USA", venue: "Arrow Office, 181 Metro Drive, Suite 180, CA" },
          { date: "2025-11-06", city: "Chicago, USA", venue: "Arrow Office, 2001 Butterfield Dr., Suite 1800, Downers Grove, IL" },
          { date: "2025-11-11", city: "Rochester, USA", venue: "Spot Cowork, 600 Fishers Station Drive, Victor, NY" },
          { date: "2025-11-12", city: "Los Angeles, USA", venue: "Arrow Office, 21700 W Oxnard St, Suite 750, Woodland Hills, CA" },
          { date: "2025-11-13", city: "Toronto, Canada", venue: "Location TBD" },
          { date: "2025-11-18", city: "Calgary, Canada", venue: "Smart Executive Center, 1925-18th Ave. NE, Suite 115, AB" },
          { date: "2025-11-19", city: "Boston, USA", venue: "Office Evolution, 2 Burlington Woods Dr, Suite 100, Burlington, MA" },
          { date: "2025-11-20", city: "Phoenix, USA", venue: "Arrow Office, 1955 E. Sky Harbor Circle North, AZ" }
        ]
      },
      {
        title: "China (PRC)",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "speakers", header: "Speakers", header_de: "Referenten" }
        ],
        rows: [
          { date: "2025-10-14", city: "Beijing, China", speakers: "Fred Zhao/Aaron Liu" },
          { date: "2025-10-28", city: "Wuhan, China", speakers: "Zoe Zhang/Cherry Ma" },
          { date: "2025-11-05", city: "Shenzhen, China", speakers: "Hongxia Qiu/Cherry Ma" },
          { date: "2025-11-12", city: "Hangzhou, China", speakers: "Shirui Hou/David Xue" },
          { date: "2025-11-19", city: "Nanjing, China", speakers: "Harman Hu/David Xue" },
          { date: "2025-11-26", city: "Suzhou, China", speakers: "Leon Chen/David Xue" },
          { date: "2025-12-03", city: "Shanghai, China", speakers: "Leon Chen/David Xue" },
          { date: "2025-12-10", city: "Shenzhen, China", speakers: "Hongxia Qiu/Cherry Ma" },
          { date: "2025-12-16", city: "Chengdu, China", speakers: "Jason Wang/David Xue" },
          { date: "2025-12-23", city: "Beijing, China", speakers: "Fred Zhao/Aaron Liu" }
        ]
      },
      {
        title: "Taiwan",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "speakers", header: "Speakers", header_de: "Referenten" }
        ],
        rows: [
          { date: "2025-10-15", city: "Taipei, Taiwan", speakers: "Jay Wang" },
          { date: "2025-11-14", city: "HsinChu, Taiwan", speakers: "Aaron Hsu" },
          { date: "2025-12-11", city: "Taipei, Taiwan", speakers: "Jay Wang" }
        ]
      },
      {
        title: "Southeast Asia",
        title_de: "Südostasien",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "speakers", header: "Speakers", header_de: "Referenten" }
        ],
        rows: [
          { date: "2025-10-31", city: "Singapore", speakers: "Kevin Choo" },
          { date: "2025-11-14", city: "Malaysia", speakers: "Kevin Choo" },
          { date: "2025-11-21", city: "Hanoi, Vietnam", speakers: "Duc Long LE" }
        ]
      },
      {
        title: "India",
        title_de: "Indien",
        columns: [
          { key: "date", header: "Date", header_de: "Datum", format: "date" },
          { key: "city", header: "City / Country", header_de: "Stadt / Land" },
          { key: "speakers", header: "Speakers", header_de: "Referenten" }
        ],
        rows: [
          { date: "2025-10-16", city: "Hyderabad, India", speakers: "Mahesh/Chandra/Amol" },
          { date: "2025-10-29", city: "Bangalore, India", speakers: "Mahesh/Chandra/Amol" },
          { date: "2025-11-06", city: "Delhi, India", speakers: "Mahesh/Chandra/Mayank" },
          { date: "2025-11-27", city: "Pune, India", speakers: "Mahesh/Chandra/Mayank" },
          { date: "2025-12-02", city: "Chennai, India", speakers: "Mahesh/Chandra" }
        ]
      }
    ],
    requirements: "Own laptop with Quartus Prime Pro 25.1.1 installed",
    requirements_de: "Eigener Laptop mit installiertem Quartus Prime Pro 25.1.1",
    targetAudience: "FPGA, software, and AI developers of all levels",
    targetAudience_de: "FPGA-, Software- und KI-Entwickler aller Erfahrungsstufen"
  },
  {
    id: "quality-control-webinar",
    status: "past",
    title: "Build Your Own AI Quality Control in < 1 Day",
    title_de: "Bauen Sie Ihre eigene KI-Qualitätskontrolle in < 1 Tag",
    date: "2025-11-27",
    time: "10:00 AM CET",
    category: "AI",
    type: "webinar",
    image: "/img/ai/one_ai_plugin/seminars/webinar_banner_2025_11_27.jpg",
    shortDescription: "AI for quality control sounds far too complex? We'll show you how simple Vision AI can be today.",
    shortDescription_de: "KI für Qualitätskontrolle klingt zu komplex? Wir zeigen Ihnen, wie einfach Vision AI heute sein kann.",
    subtitle: "AI for quality control sounds far too complex? We'll show you how simple Vision AI can be today.",
    subtitle_de: "KI für Qualitätskontrolle klingt zu komplex? Wir zeigen Ihnen, wie einfach Vision AI heute sein kann.",
    description: "Join our free webinar and discover how to use ONE AI to build your own AI-based quality control system. From images to deployment in record time - without prior knowledge, without costly development, and most importantly, on your existing hardware or the hardware of your choice.\n\nSee live how a robust, production-ready AI model can be trained from a dataset containing only a few example images, including full hardware export.",
    description_de: "Nehmen Sie an unserem kostenlosen Webinar teil und entdecken Sie, wie Sie mit ONE AI Ihr eigenes KI-basiertes Qualitätskontrollsystem aufbauen können. Von Bildern zur Bereitstellung in Rekordzeit - ohne Vorkenntnisse, ohne teure Entwicklung und vor allem auf Ihrer vorhandenen Hardware oder der Hardware Ihrer Wahl.\n\nSehen Sie live, wie ein robustes, produktionsreifes KI-Modell aus einem Datensatz mit nur wenigen Beispielbildern trainiert werden kann, einschließlich vollständigem Hardware-Export.",
    location: "Online",
    language: "English",
    speakers: ["Christopher Kreis (AI Developer, ONE WARE)"],
    agenda: [
      {
        title: "Part 1: Learn how to use ONE AI to build your own Quality Control (~1 h)",
        title_de: "Teil 1: Lernen Sie, wie Sie mit ONE AI Ihre eigene Qualitätskontrolle aufbauen (~1 h)",
        points: [
          "What is ONE AI and how can it help me?",
          "How do I create a proper dataset?",
          "Learn tips and tricks to get the best AI model",
          "Demo project with a small dataset (~15 images)"
        ],
        points_de: [
          "Was ist ONE AI und wie kann es mir helfen?",
          "Wie erstelle ich einen geeigneten Datensatz?",
          "Lernen Sie Tipps und Tricks für das beste KI-Modell",
          "Demo-Projekt mit einem kleinen Datensatz (~15 Bilder)"
        ]
      },
      {
        title: "Part 2 (Optional): Try it out yourself (~1 h, open ended)",
        title_de: "Teil 2 (Optional): Probieren Sie es selbst aus (~1 h, offen)",
        points: [
          "Train your first AI model with ONE AI using a demo dataset",
          "Our team is here to help you with any questions or problems",
          "We will send you the finished project afterwards for comparison"
        ],
        points_de: [
          "Trainieren Sie Ihr erstes KI-Modell mit ONE AI anhand eines Demo-Datensatzes",
          "Unser Team hilft Ihnen bei Fragen oder Problemen",
          "Wir senden Ihnen das fertige Projekt zum Vergleich"
        ]
      }
    ],
    sections: [
      {
        title: "Webinar Materials",
        title_de: "Webinar-Materialien",
        resources: [
          {
            title: "Slides",
            title_de: "Präsentation",
            url: "https://onewarecom.sharepoint.com/:b:/s/Public/EQtF7jJ672RFrg6Qi_ScSR0B6WdoN9oK9fLrrsBU4XzbIA?e=8XhHtx",
            description: "Download the presentation slides",
            description_de: "Präsentationsfolien herunterladen"
          },
          {
            title: "Recording",
            title_de: "Aufzeichnung",
            url: "https://youtu.be/vN1ZBED_aDU",
            description: "Watch the webinar recording",
            description_de: "Webinar-Aufzeichnung ansehen"
          },
          {
            title: "Demo Project",
            title_de: "Demo-Projekt",
            url: "https://onewarecom.sharepoint.com/:u:/s/Public/EQ6W2633hmZIpnMsl2XWJ6MBf0u4vkZK5y3mYs_X95nMew?e=Hphzlo",
            description: "Download the demo project",
            description_de: "Demo-Projekt herunterladen"
          },
          {
            title: "Exercise Dataset",
            title_de: "Übungs-Datensatz",
            url: "https://onewarecom.sharepoint.com/:u:/s/Public/ERhkrvpPciZClajC88YMFEcBPUPiGSSBq7Ue-pPZwSoQVg?e=kx4QnO",
            description: "Download the exercise dataset",
            description_de: "Übungs-Datensatz herunterladen"
          },
          {
            title: "Exercise Solution",
            title_de: "Übungslösung",
            url: "https://onewarecom.sharepoint.com/:u:/s/Public/EeowgLjvRYhItegDoMoXZBUBsQosfYw4-uG2IXonqpvn6A?e=lgZW0Z",
            description: "Download the exercise solution",
            description_de: "Übungslösung herunterladen"
          }
        ]
      },
      {
        title: "Watch the Webinar",
        title_de: "Webinar ansehen",
        video: "https://www.youtube.com/watch?v=vN1ZBED_aDU"
      },
      {
        title: "What You Learned",
        title_de: "Was Sie gelernt haben",
        points: [
          "Understand what ONE AI is and how it can help you train a production-ready AI model in minutes",
          "Create a proper dataset for quality control applications",
          "Apply tips & tricks to get the best performing AI model",
          "Build a demo project with a small dataset (~15 images)"
        ],
        points_de: [
          "Verstehen Sie, was ONE AI ist und wie es Ihnen helfen kann, ein produktionsreifes KI-Modell in Minuten zu trainieren",
          "Erstellen Sie einen geeigneten Datensatz für Qualitätskontrollanwendungen",
          "Wenden Sie Tipps & Tricks an, um das beste KI-Modell zu erhalten",
          "Bauen Sie ein Demo-Projekt mit einem kleinen Datensatz (~15 Bilder)"
        ]
      },
      {
        title: "Who Should Register?",
        title_de: "Wer sollte sich registrieren?",
        content: "This webinar is perfect for you if you:",
        content_de: "Dieses Webinar ist perfekt für Sie, wenn Sie:",
        points: [
          "Want to kick off your first AI projects in your company",
          "Are looking for a very simple and super fast solution for AI quality inspection",
          "Want to try AI without depending on external service providers",
          "Want to upgrade your existing hardware with high-performance AI"
        ],
        points_de: [
          "Ihre ersten KI-Projekte in Ihrem Unternehmen starten möchten",
          "Eine sehr einfache und superschnelle Lösung für KI-Qualitätsprüfung suchen",
          "KI ausprobieren möchten, ohne von externen Dienstleistern abhängig zu sein",
          "Ihre vorhandene Hardware mit Hochleistungs-KI aufrüsten möchten"
        ]
      },
      {
        title: "Why ONE AI?",
        title_de: "Warum ONE AI?",
        content: "ONE AI makes AI development accessible to everyone - no deep learning expertise required. Already in production with leading manufacturing companies.\n\nQuestions? Contact us at info@one-ware.com",
        content_de: "ONE AI macht KI-Entwicklung für jeden zugänglich - keine Deep-Learning-Expertise erforderlich. Bereits im Einsatz bei führenden Fertigungsunternehmen.\n\nFragen? Kontaktieren Sie uns unter info@one-ware.com",
        points: [
          "Generate AI models in under 1 second - eliminating weeks of development time",
          "Deploy on any hardware - from microcontrollers to GPUs, FPGAs to NPUs",
          "Achieve better results than manually crafted solutions with higher accuracy and faster inference",
          "Build production-ready systems in record time with our pre-built UI for monitoring and remote control"
        ],
        points_de: [
          "Generieren Sie KI-Modelle in unter 1 Sekunde - eliminieren Sie Wochen an Entwicklungszeit",
          "Bereitstellung auf jeder Hardware - von Mikrocontrollern über GPUs bis zu FPGAs und NPUs",
          "Erzielen Sie bessere Ergebnisse als manuell erstellte Lösungen mit höherer Genauigkeit und schnellerer Inferenz",
          "Bauen Sie produktionsreife Systeme in Rekordzeit mit unserer vorgefertigten UI für Überwachung und Fernsteuerung"
        ]
      },
      {
        title: "Resources",
        title_de: "Ressourcen",
        resources: [
          {
            title: "Download ONE WARE Studio",
            title_de: "ONE WARE Studio herunterladen",
            url: "https://one-ware.com/studio",
            description: "Download our open source IDE with the ONE AI extension",
            description_de: "Laden Sie unsere Open-Source-IDE mit der ONE AI Erweiterung herunter"
          },
          {
            title: "ONE AI Tutorials",
            title_de: "ONE AI Tutorials",
            url: "https://one-ware.com/docs/one-ai/tutorials",
            description: "Explore our tutorials and see how easy it is to create your first AI project",
            description_de: "Erkunden Sie unsere Tutorials und sehen Sie, wie einfach es ist, Ihr erstes KI-Projekt zu erstellen"
          }
        ]
      }
    ],
    targetAudience: "Developers, decision-makers, and even end users or production operators without AI expertise",
    targetAudience_de: "Entwickler, Entscheidungsträger und auch Endbenutzer oder Produktionsmitarbeiter ohne KI-Expertise"
  },
  {
    id: "quality-control-workshop-2025-12",
    status: "upcoming",
    title: "Build Your Own AI Quality Control in < 1 Day",
    title_de: "Bauen Sie Ihre eigene KI-Qualitätskontrolle in < 1 Tag",
    date: "2025-12-18",
    time: "10:00 AM CET",
    category: "AI",
    type: "workshop",
    image: "/img/ai/one_ai_plugin/seminars/webinar_banner_2025_12_18.png",
    shortDescription: "AI for quality control sounds far too complex? We'll show you how simple Vision AI can be today.",
    shortDescription_de: "KI für Qualitätskontrolle klingt zu komplex? Wir zeigen Ihnen, wie einfach Vision AI heute sein kann.",
    subtitle: "AI for quality control sounds far too complex? We'll show you how simple Vision AI can be today.",
    subtitle_de: "KI für Qualitätskontrolle klingt zu komplex? Wir zeigen Ihnen, wie einfach Vision AI heute sein kann.",
    description: "You've seen how simple Vision AI can be. Now it's your turn to build your own AI Quality Control system. Live, hands-on and with real industry-relevant data.\n\nIn this highly interactive live session, you will dive directly into ONE AI and build your first working quality inspection model together with our team. Step by step. With datasets from multiple industrial domains and expert guidance on which settings, parameters and approaches make the most sense for your specific application.",
    description_de: "Sie haben gesehen, wie einfach Vision AI sein kann. Jetzt sind Sie dran, Ihr eigenes KI-Qualitätskontrollsystem zu bauen. Live, praxisnah und mit echten industrierelevanten Daten.\n\nIn dieser hochinteraktiven Live-Session tauchen Sie direkt in ONE AI ein und bauen gemeinsam mit unserem Team Ihr erstes funktionierendes Qualitätsinspektionsmodell. Schritt für Schritt. Mit Datensätzen aus verschiedenen Industriebereichen und Expertenberatung darüber, welche Einstellungen, Parameter und Ansätze für Ihre spezifische Anwendung am sinnvollsten sind.",
    location: "Online",
    language: "English",
    speakers: ["Christopher Kreis (AI Developer, ONE WARE)"],
    agenda: [
      {
        title: "Part 1: Quick Introduction (~15 min)",
        title_de: "Teil 1: Kurze Einführung (~15 min)",
        points: [
          "Short Overview of ONE AI",
          "Tips & Tricks for fast and robust AI development",
          "What makes a good dataset and how to prepare one"
        ],
        points_de: [
          "Kurze Übersicht über ONE AI",
          "Tipps & Tricks für schnelle und robuste KI-Entwicklung",
          "Was macht einen guten Datensatz aus und wie bereitet man ihn vor"
        ]
      },
      {
        title: "Part 2: Hands-On Session (~60 min)",
        title_de: "Teil 2: Praxis-Session (~60 min)",
        points: [
          "Live hands-on demo: build a complete QC inspection step by step",
          "Create and train your first AI model yourself during the session",
          "Ask questions at any time and get immediate support from our team",
          "Guide you through ONE AI so you can build an AI for the application of your choice"
        ],
        points_de: [
          "Live Hands-on Demo: Bauen Sie Schritt für Schritt eine komplette QC-Inspektion",
          "Erstellen und trainieren Sie Ihr erstes KI-Modell selbst während der Session",
          "Stellen Sie jederzeit Fragen und erhalten Sie sofortige Unterstützung von unserem Team",
          "Wir führen Sie durch ONE AI, damit Sie eine KI für die Anwendung Ihrer Wahl bauen können"
        ]
      }
    ],
    sections: [
      {
        title: "Who Should Register?",
        title_de: "Wer sollte sich registrieren?",
        content: "This workshop is perfect for you if you:",
        content_de: "Dieser Workshop ist perfekt für Sie, wenn Sie:",
        points: [
          "Want to kick off your first AI projects in your company",
          "Are looking for a very simple and super fast solution for AI quality inspection",
          "Want to try AI without depending on external service providers",
          "Want to upgrade your existing hardware with high-performance AI"
        ],
        points_de: [
          "Ihre ersten KI-Projekte in Ihrem Unternehmen starten möchten",
          "Eine sehr einfache und superschnelle Lösung für KI-Qualitätsprüfung suchen",
          "KI ausprobieren möchten, ohne von externen Dienstleistern abhängig zu sein",
          "Ihre vorhandene Hardware mit Hochleistungs-KI aufrüsten möchten"
        ]
      },
      {
        title: "Prepare for the Workshop",
        title_de: "Vorbereitung auf den Workshop",
        content: "Start for free today! Download our open source IDE ONE WARE Studio with the ONE AI extension to prepare your own Vision AI model before the workshop.",
        content_de: "Starten Sie noch heute kostenlos! Laden Sie unsere Open-Source-IDE ONE WARE Studio mit der ONE AI Erweiterung herunter, um Ihr eigenes Vision AI Modell vor dem Workshop vorzubereiten.",
        resources: [
          {
            title: "Download ONE WARE Studio",
            title_de: "ONE WARE Studio herunterladen",
            url: "https://one-ware.com/studio",
            description: "Download our open source IDE with the ONE AI extension",
            description_de: "Laden Sie unsere Open-Source-IDE mit der ONE AI Erweiterung herunter"
          },
          {
            title: "ONE AI Tutorials",
            title_de: "ONE AI Tutorials",
            url: "https://one-ware.com/docs/one-ai/tutorials",
            description: "Explore our tutorials and see how easy it is to create your first AI project",
            description_de: "Erkunden Sie unsere Tutorials und sehen Sie, wie einfach es ist, Ihr erstes KI-Projekt zu erstellen"
          }
        ]
      },
      {
        title: "Why ONE AI?",
        title_de: "Warum ONE AI?",
        content: "ONE AI makes AI development accessible to everyone - no deep learning expertise required. Already in production with leading manufacturing companies.\n\nQuestions? Contact us at info@one-ware.com",
        content_de: "ONE AI macht KI-Entwicklung für jeden zugänglich - keine Deep-Learning-Expertise erforderlich. Bereits im Einsatz bei führenden Fertigungsunternehmen.\n\nFragen? Kontaktieren Sie uns unter info@one-ware.com",
        points: [
          "Generate AI models in under 1 second - eliminating weeks of development time",
          "Deploy on any hardware - from microcontrollers to GPUs, FPGAs to NPUs",
          "Achieve better results than manually crafted solutions with higher accuracy and faster inference",
          "Build production-ready systems in record time with our pre-built UI for monitoring and remote control"
        ],
        points_de: [
          "Generieren Sie KI-Modelle in unter 1 Sekunde - eliminieren Sie Wochen an Entwicklungszeit",
          "Bereitstellung auf jeder Hardware - von Mikrocontrollern über GPUs bis zu FPGAs und NPUs",
          "Erzielen Sie bessere Ergebnisse als manuell erstellte Lösungen mit höherer Genauigkeit und schnellerer Inferenz",
          "Bauen Sie produktionsreife Systeme in Rekordzeit mit unserer vorgefertigten UI für Überwachung und Fernsteuerung"
        ]
      }
    ],
    targetAudience: "Developers, decision-makers, and even end users or production operators without AI expertise",
    targetAudience_de: "Entwickler, Entscheidungsträger und auch Endbenutzer oder Produktionsmitarbeiter ohne KI-Expertise",
    formFields: [
      {
        name: "experience",
        label: "Your experience with AI",
        label_de: "Ihre Erfahrung mit KI",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced"],
        options_de: ["Anfänger", "Fortgeschritten", "Experte"],
        required: true
      },
      {
        name: "interests",
        label: "Which topics interest you most?",
        label_de: "Welche Themen interessieren Sie am meisten?",
        type: "multiselect",
        options: ["Quality Control", "Object Detection", "Image Classification", "Hardware Deployment"],
        options_de: ["Qualitätskontrolle", "Objekterkennung", "Bildklassifizierung", "Hardware-Deployment"]
      },
      {
        name: "hasStudioInstalled",
        label: "I have already installed ONE WARE Studio",
        label_de: "Ich habe ONE WARE Studio bereits installiert",
        type: "boolean"
      }
    ]
  },
  {
    id: "quality-control-webinar-2026-01",
    status: "upcoming",
    title: "Build Your Own AI Quality Control in < 1 Day",
    title_de: "Bauen Sie Ihre eigene KI-Qualitätskontrolle in < 1 Tag",
    date: "2026-01-28",
    time: "10:00 AM CET",
    category: "AI",
    type: "webinar",
    image: "/img/ai/one_ai_plugin/seminars/webinar_banner_2026_01_28.png",
    shortDescription: "AI for quality control sounds far too complex? We'll show you how simple Vision AI can be today.",
    shortDescription_de: "KI für Qualitätskontrolle klingt zu komplex? Wir zeigen Ihnen, wie einfach Vision AI heute sein kann.",
    subtitle: "AI for quality control sounds far too complex? We'll show you how simple Vision AI can be today.",
    subtitle_de: "KI für Qualitätskontrolle klingt zu komplex? Wir zeigen Ihnen, wie einfach Vision AI heute sein kann.",
    description: "Join our free webinar and discover how to use ONE AI to build your own AI-based quality control system. From images to deployment in record time - without prior knowledge, without costly development, and most importantly, on your existing hardware or the hardware of your choice.\n\nSee live how a robust, production-ready AI model can be trained from a dataset containing only a few example images, including full hardware export.",
    description_de: "Nehmen Sie an unserem kostenlosen Webinar teil und entdecken Sie, wie Sie mit ONE AI Ihr eigenes KI-basiertes Qualitätskontrollsystem aufbauen können. Von Bildern zur Bereitstellung in Rekordzeit - ohne Vorkenntnisse, ohne teure Entwicklung und vor allem auf Ihrer vorhandenen Hardware oder der Hardware Ihrer Wahl.\n\nSehen Sie live, wie ein robustes, produktionsreifes KI-Modell aus einem Datensatz mit nur wenigen Beispielbildern trainiert werden kann, einschließlich vollständigem Hardware-Export.",
    location: "Online",
    language: "English",
    speakers: ["Christopher Kreis (AI Developer, ONE WARE)"],
    highlights: [
      "Understand what ONE AI is and how it can help you train a production-ready AI model in minutes",
      "Create a proper dataset for quality control applications",
      "Apply tips & tricks to get the best performing AI model",
      "Build a demo project with a small dataset (~15 images)"
    ],
    highlights_de: [
      "Verstehen Sie, was ONE AI ist und wie es Ihnen helfen kann, ein produktionsreifes KI-Modell in Minuten zu trainieren",
      "Erstellen Sie einen geeigneten Datensatz für Qualitätskontrollanwendungen",
      "Wenden Sie Tipps & Tricks an, um das beste KI-Modell zu erhalten",
      "Bauen Sie ein Demo-Projekt mit einem kleinen Datensatz (~15 Bilder)"
    ],
    agenda: [
      {
        title: "Part 1: Learn how to use ONE AI to build your own Quality Control (~1 h)",
        title_de: "Teil 1: Lernen Sie, wie Sie mit ONE AI Ihre eigene Qualitätskontrolle aufbauen (~1 h)",
        points: [
          "What is ONE AI and how can it help me?",
          "How do I create a proper dataset?",
          "Learn tips and tricks to get the best AI model",
          "Demo project with a small dataset (~15 images)"
        ],
        points_de: [
          "Was ist ONE AI und wie kann es mir helfen?",
          "Wie erstelle ich einen geeigneten Datensatz?",
          "Lernen Sie Tipps und Tricks für das beste KI-Modell",
          "Demo-Projekt mit einem kleinen Datensatz (~15 Bilder)"
        ]
      },
      {
        title: "Part 2 (Optional): Try it out yourself (~1 h, open ended)",
        title_de: "Teil 2 (Optional): Probieren Sie es selbst aus (~1 h, offen)",
        points: [
          "Train your first AI model with ONE AI using a demo dataset",
          "Our team is here to help you with any questions or problems",
          "We will send you the finished project afterwards for comparison"
        ],
        points_de: [
          "Trainieren Sie Ihr erstes KI-Modell mit ONE AI anhand eines Demo-Datensatzes",
          "Unser Team hilft Ihnen bei Fragen oder Problemen",
          "Wir senden Ihnen das fertige Projekt zum Vergleich"
        ]
      }
    ],
    sections: [
      {
        title: "Who Should Register?",
        title_de: "Wer sollte sich registrieren?",
        content: "This webinar is perfect for you if you:",
        content_de: "Dieses Webinar ist perfekt für Sie, wenn Sie:",
        points: [
          "Want to kick off your first AI projects in your company",
          "Are looking for a very simple and super fast solution for AI quality inspection",
          "Want to try AI without depending on external service providers",
          "Want to upgrade your existing hardware with high-performance AI"
        ],
        points_de: [
          "Ihre ersten KI-Projekte in Ihrem Unternehmen starten möchten",
          "Eine sehr einfache und superschnelle Lösung für KI-Qualitätsprüfung suchen",
          "KI ausprobieren möchten, ohne von externen Dienstleistern abhängig zu sein",
          "Ihre vorhandene Hardware mit Hochleistungs-KI aufrüsten möchten"
        ]
      },
      {
        title: "Prepare for the Webinar",
        title_de: "Vorbereitung auf das Webinar",
        content: "Start for free today! Download our open source IDE ONE WARE Studio with the ONE AI extension to prepare your own Vision AI model before the webinar.",
        content_de: "Starten Sie noch heute kostenlos! Laden Sie unsere Open-Source-IDE ONE WARE Studio mit der ONE AI Erweiterung herunter, um Ihr eigenes Vision AI Modell vor dem Webinar vorzubereiten.",
        resources: [
          {
            title: "Download ONE WARE Studio",
            title_de: "ONE WARE Studio herunterladen",
            url: "https://one-ware.com/studio",
            description: "Download our open source IDE with the ONE AI extension",
            description_de: "Laden Sie unsere Open-Source-IDE mit der ONE AI Erweiterung herunter"
          },
          {
            title: "ONE AI Tutorials",
            title_de: "ONE AI Tutorials",
            url: "https://one-ware.com/docs/one-ai/tutorials",
            description: "Explore our tutorials and see how easy it is to create your first AI project",
            description_de: "Erkunden Sie unsere Tutorials und sehen Sie, wie einfach es ist, Ihr erstes KI-Projekt zu erstellen"
          }
        ]
      },
      {
        title: "Why ONE AI?",
        title_de: "Warum ONE AI?",
        content: "ONE AI makes AI development accessible to everyone - no deep learning expertise required. Already in production with leading manufacturing companies.\n\nQuestions? Contact us at info@one-ware.com",
        content_de: "ONE AI macht KI-Entwicklung für jeden zugänglich - keine Deep-Learning-Expertise erforderlich. Bereits im Einsatz bei führenden Fertigungsunternehmen.\n\nFragen? Kontaktieren Sie uns unter info@one-ware.com",
        points: [
          "Generate AI models in under 1 second - eliminating weeks of development time",
          "Deploy on any hardware - from microcontrollers to GPUs, FPGAs to NPUs",
          "Achieve better results than manually crafted solutions with higher accuracy and faster inference",
          "Build production-ready systems in record time with our pre-built UI for monitoring and remote control"
        ],
        points_de: [
          "Generieren Sie KI-Modelle in unter 1 Sekunde - eliminieren Sie Wochen an Entwicklungszeit",
          "Bereitstellung auf jeder Hardware - von Mikrocontrollern über GPUs bis zu FPGAs und NPUs",
          "Erzielen Sie bessere Ergebnisse als manuell erstellte Lösungen mit höherer Genauigkeit und schnellerer Inferenz",
          "Bauen Sie produktionsreife Systeme in Rekordzeit mit unserer vorgefertigten UI für Überwachung und Fernsteuerung"
        ]
      }
    ],
    targetAudience: "Developers, decision-makers, and even end users or production operators without AI expertise",
    targetAudience_de: "Entwickler, Entscheidungsträger und auch Endbenutzer oder Produktionsmitarbeiter ohne KI-Expertise",
    formFields: [
      {
        name: "industry",
        label: "Your industry",
        label_de: "Ihre Branche",
        type: "select",
        options: ["Manufacturing", "Automotive", "Electronics", "Food & Beverage", "Other"],
        options_de: ["Fertigung", "Automobil", "Elektronik", "Lebensmittel", "Sonstiges"]
      },
      {
        name: "hardwareTargets",
        label: "Which hardware platforms are you interested in?",
        label_de: "Welche Hardware-Plattformen interessieren Sie?",
        type: "multiselect",
        options: ["FPGA", "GPU", "CPU", "NPU/TPU", "Microcontroller"]
      },
      {
        name: "attendPart2",
        label: "I plan to attend Part 2 (hands-on session)",
        label_de: "Ich plane, an Teil 2 (Praxis-Session) teilzunehmen",
        type: "boolean"
      }
    ]
  }
];

export const UPCOMING_EVENTS = EVENTS
  .filter(e => e.status === "upcoming")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const PAST_EVENTS = EVENTS
  .filter(e => e.status === "past")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const EVENTS_DATA = UPCOMING_EVENTS;
