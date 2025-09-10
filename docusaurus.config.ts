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
        alt: "ONE WARE",
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
              docId: "one-ai/get-started",
              label: "Getting Started",
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
          to: "/docs/one-ai/partners",
          label: "Partners",
          position: "right",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "right",
        },
        {
          to: "/docs/one-ai/get-started",
          label: "Tutorials",
          position: "right",
        },
        {
          href: "https://cloud.one-ware.com/Account/Login",
          position: "right",
          label: "Login/Register",
        },
        {
          type: 'localeDropdown',
          position: 'right',
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
          title: "Legal",
          items: [
            {
              type: "doc",
              label: "Contact",
              to: "/docs/contact",
            },
            {
              type: "doc",
              label: "Privacy Policy",
              to: "/docs/contact/privacy",
            },
            {
              type: "doc",
              label: "Terms of Service",
              to: "/docs/contact/terms",
            }
            ,
            {
              type: "doc",
              label: "Refund Policy",
              to: "/docs/contact/refund",
            }
          ],
        },
        {
          title: "More",
          items: [
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
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ONE WARE GmbH`,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ["json", "csharp"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
