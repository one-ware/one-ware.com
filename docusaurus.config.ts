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
        sitemap: {
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/one-ware/one-ware.com/edit/main/",
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      appId: 'GVARI8M72O',
      apiKey: '7d1be6ae06ba5fb5e97018bc2daab94a',
      indexName: 'one-ware',
      searchPagePath: 'search',
      contextualSearch: false,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
    },
    // Replace with your project's social card
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
          activeBaseRegex: '(^.*/one-ai$)|(^.*/docs/one-ai/.*$)',
          items: [
            {
              to: "/one-ai",
              label: "Features",
            },
            {
              type: "doc",
              docId: "one-ai/services/index",
              label: "Services",
            }
          ],
        },
        {
          type: "dropdown",
          position: "left",
          label: "Studio",
          to: "/studio",
          activeBaseRegex: '(^.*/studio$)|(^.*/docs/studio/.*$)',
          items: [
            {
              to: "/studio",
              label: "Features",
            },
            {
              type: "doc",
              docId: "studio/setup",
              label: "Setup",
            }
          ],
        },
        // {
        //   type: "dropdown",
        //   position: "left",
        //   label: "PLC-ONE",
        //   to: "/plc-one",
        //   activeBaseRegex: '(^.*/plc-one$)|(^.*/docs/plc-one/.*$)',
        //   items: [
        //     {
        //       to: "/plc-one",
        //       label: "Features",
        //     },
        //     {
        //       type: "doc",
        //       docId: "plc-one/overview",
        //       label: "Overview",
        //     },
        //   ],
        // },
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
              label: "OneWare Studio Setup",
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
      copyright: `Copyright © ${new Date().getFullYear()} Beier, Durmaz, Mennen & Wiegand Gbr`,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
