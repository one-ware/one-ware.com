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

    ['@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/one-ai/getting-started',
            to: '/docs/one-ai/getting-started',
          },
          {
            from: '/one-ai/choosing-parameters',
            to: '/docs/one-ai/help/choosing-parameters-guide',
          },
        ],
      }],
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
          label: "Products",
          to: "/one-ai",
          activeBaseRegex: "(^.*/one-ai$)|(^.*/docs/one-ai/.*$)",
          className: "navbar__dropdown--wide",
          items: [
            {
              type: "html",
              value: '<a href="/one-ai" style="font-weight: bold; color: #00FFD1; text-decoration: none; display: block; padding: 8px 12px;">ONE AI</a>',
            },
            {
              to: "/docs/one-ai/getting-started",
              label: "Get Started",
            },
            {
              to: "/docs/one-ai/tutorials",
              label: "Demo Projects",
            },
            {
              to: "/docs/one-ai/partners",
              label: "Supported Hardware",
            },
            {
              type: "html",
              value: '<div style="padding-top: 8px; padding-left: 7px; color: #00caa5ff; font-size: 0.8rem; font-weight: 700;">Features</div>',
            },
            {
              type: "html",
              value: '<a href="/docs/one-ai/getting-started/camera-tool" style="display: block; padding: 4px 12px 4px 24px; font-size: 0.875rem; text-decoration: none; color: var(--ifm-menu-color);">Capture Tool</a>',
            },
            {
              type: "html",
              value: '<a href="/docs/one-ai/getting-started/filters-and-augmentations" style="display: block; padding: 4px 12px 4px 24px; font-size: 0.875rem; text-decoration: none; color: var(--ifm-menu-color);">Filters & Augmentation</a>',
            },
            {
              type: "html",
              value: '<a href="/docs/one-ai/getting-started/training-and-export" style="display: block; padding: 4px 12px 4px 24px; font-size: 0.875rem; text-decoration: none; color: var(--ifm-menu-color);">Export</a>',
            },
            {
              type: "html",
              value: '<hr style="margin: 0.5rem 0; border: none; border-top: 1px solid var(--ifm-color-primary);">',
            },
            {
              type: "html",
              value: '<a href="/studio" style="font-weight: bold; color: #00FFD1; text-decoration: none; display: block; padding: 8px 12px;">ONE WARE Studio</a>',
            },
            {
              to: "/docs/studio/setup",
              label: "Get Started",
            },
            {
              to: "/docs/studio/plugins/overview/",
              label: "Contribute",
            }
          ],
        },
        {
          type: "dropdown",
          position: "left",
          label: "Solutions",
          items: [
            {
              to: "/docs/one-ai/use-cases/",
              label: "Applications",
            },
            {
              type: "html",
              value: '<a href="/docs/one-ai/use-cases/camera-tool" style="display: block; padding: 4px 12px 4px 24px; font-size: 0.875rem; text-decoration: none; color: var(--ifm-menu-color);">Quality Control</a>',
            },
            {
              type: "html",
              value: '<a href="/docs/one-ai/use-cases/chip" style="display: block; padding: 4px 12px 4px 24px; font-size: 0.875rem; text-decoration: none; color: var(--ifm-menu-color);">Edge AI</a>',
            },
            {
              type: "html",
              value: '<a href="/docs/one-ai/use-cases/pcb" style="display: block; padding: 4px 12px 4px 24px; font-size: 0.875rem; text-decoration: none; color: var(--ifm-menu-color);">Vision AI</a>',
            },
          ],
        },
        {
          type: "dropdown",
          position: "left",
          label: "Developers",
          items: [
            {
              to: "/docs/one-ai/getting-started",
              label: "Documentation",
            },
            {
              to: "/docs/one-ai/tutorials",
              label: "Example Projects",
            },
            {
              to: "/docs/one-ai/partners",
              label: "Supported Hardware",
            },
            {
              to: "/docs/one-ai/open-source-program",
              label: "Open Source Program",
            },
            {
              href: "https://discord.com/invite/NCN9VAh",
              label: "Forum (Discord)",
            },
            {
              href: "https://github.com/one-ware",
              label: "GitHub",
            },
          ],
        },
        {
          type: "dropdown",
          position: "left",
          label: "Pricing",
          items: [
            {
              to: "docs/one-ai/pricing",
              label: "Pricing",
            },
            {
              to: "docs/one-ai/services",
              label: "Services",
            },
            {
              to: "docs/one-ai/open-source-program",
              label: "Open Source Program",
            },
          ],
        },
        {
          to: "/blog",
          label: "Blog",
          position: "right",
        },
        {
          type: "dropdown",
          position: "right",
          label: "Company",
          items: [
            {
              to: "/docs/one-ai/partners",
              label: "Partners",
            },
            {
              to: "/about-us",
              label: "About Us",
            },
            {
              to: "/careers",
              label: "Careers",
            },
            {
              type: "doc",
              docId: "contact/contact",
              label: "Contact",
            },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: "https://cloud.one-ware.com/Account/Login",
          position: "right",
          label: "Login",
          className: "button button--primary button--outline button--md font-bold navbarbutton",
          style: { "margin-left": "2px", "margin-right": "2px" }
        },
        {
          to: "/one-ai#getStarted",
          label: "Get Started",
          position: "right",
          className: "button button--primary button--md text-gray-900 font-bold navbarbutton",
          style: { "margin-left": "2px" }
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
