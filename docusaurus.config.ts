import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "ONE WARE",
  tagline: "One Software, Infinite Solutions: From Development to Custom AI",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://one-ware.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "one-ware", // Usually your GitHub org/user name.
  projectName: "one-ware.com", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  stylesheets: [
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
    "https://fonts.googleapis.com/css?family=Montserrat",
  ],

  //headTags: [
  //  {
  //    tagName: "script",
  //    attributes: {
  //      id: "oneai-snippet",
  //      src: "https://oneai.com/~widget?id=one-ware-ai",
  //    }
  //  }
  //],

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
  },

  presets: [
    [
      "classic",
      {
        sitemap: {
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/one-ware/one-ware.com/edit/main/",
        },
        blog: {
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 1
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      appId: "GVARI8M72O",
      apiKey: "7d1be6ae06ba5fb5e97018bc2daab94a",
      indexName: "one-ware",
      searchPagePath: "search",
      contextualSearch: false,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
    },    // Replace with your project's social card
    // For meta tags, we still use the path without require
    image: "/img/social-card.jpg",
    navbar: {
      logo: {
        alt: "One Ware Logo",
        src: "img/start/Logo_SVG-ONE-ware.svg",
      },
      hideOnScroll: false,
      items: [
        {
          type: "dropdown",
          position: "left",
          label: "ONE AI",
          to: "/one-ai",
          activeBaseRegex: "(^.*/one-ai$)|(^.*/docs/one-ai/.*$)",
          items: [
            {
              to: "/one-ai",
              label: "Overview",
            },
            {
              type: "doc",
              docId: "one-ai/services/index",
              label: "Services",
            },
          ],
        },
        {
          type: "dropdown",
          position: "left",
          label: "ONE WARE Studio",
          to: "/studio",
          activeBaseRegex: "(^.*/studio$)|(^.*/docs/studio/.*$)",
          items: [
            {
              to: "/studio",
              label: "Studio",
            },
            {
              type: "doc",
              docId: "studio/setup",
              label: "Setup",
            },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          to: "/blog",
          label: "Blog",
          position: "right",
        },
        {
          to: "/about-us",
          label: "About Us",
          position: "right",
        },
        {
          to: "/careers",
          label: "Careers",
          position: "right",
        },
        {
          type: "doc",
          docId: "contact/contact",
          label: "Contact",
          position: "right",
        },
        {
          href: "https://github.com/one-ware",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "ONE WARE Studio Setup",
              to: "/docs/studio/setup",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.com/invite/NCN9VAh",
            },
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/oneware",
            },
            //{
            //  label: "Twitter",
            //  href: "https://twitter.com/oneware",
            //},
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/one-ware/",
            },
            {
              label: "GitHub",
              href: "https://github.com/one-ware",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              type: "doc",
              label: "Contact",
              to: "/docs/contact",
            },
            {
              to: "/careers",
              label: "Careers",

            },
            {
              label: "About us",
              to: "about-us",
            },
            {
              label: "Blog",
              to: "blog",
            },
            {
              type: "doc",
              label: "Privacy Policy",
              to: "/docs/contact/privacy",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ONE WARE GmbH`,
    },
    announcementBar: {
      id: "closed_beta_one_ai", // Eine eindeutige ID
      content:
        '🚀 <strong>Be one of the first to test ONE AI!</strong> Automatically generate tailored AI models with ONE AI. <strong><a href="https://forms.office.com/e/J3HDid9fzw" target="_blank">Sign up for the waitlist here to get free access!</a></strong>',
      backgroundColor: "#f4f4f4", // Hintergrundfarbe des Banners
      textColor: "#333333", // Textfarbe des Banners
      isCloseable: true, // Ermöglicht das Schließen des Banners
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ["json", "csharp"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
