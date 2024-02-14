import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "One Ware",
  tagline: "Empowering Industry 5.0",
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
    "https://fonts.googleapis.com/css?family=Montserrat"
  ],

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

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/one-ware/one-ware.com/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/one-ware/one-ware.com/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
    },
    // Replace with your project's social card
    image: "/img/docusaurus-social-card.jpg",
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
          label: "PLC-ONE",
          to: "/plc-one",
          items: [
            {
              to: "/plc-one",
              label: "Features",
            },
            {
              type: "doc",
              docId: "plc-one/getstarted",
              label: "Get Started",
            },
          ],
        },
        {
          type: "dropdown",
          position: "left",
          label: "Studio",
          to: "/studio",
          items: [
            {
              to: "/studio",
              label: "Features",
            },
            {
              type: "doc",
              docId: "oneware-studio/setup",
              label: "Setup",
            },
          ],
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
              label: "PLC-ONE Get Started",
              to: "/docs/plc-one/getstarted",
            },
            {
              label: "Studio Setup",
              to: "/docs/oneware-studio/setup",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/oneware",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/oneware",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/oneware",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/one-ware/",
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
              label: "About us",
              to: "about-us",
            },
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/one-ware",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Beier & Wiegand Industrial Gbr`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
