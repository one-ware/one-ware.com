import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
const path = require("path");
const fs = require("fs-extra");

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

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
      onBrokenMarkdownImages: "throw"
    }
  },

  stylesheets: [
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
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
    async function preserveTimeStamps(context, options) {
      return {
        name: "preserve-static-timestamps",
        async postBuild({ siteDir, outDir }) {
          const staticDir = path.join(siteDir, "static");
          const destDir = outDir;

          await fs.copy(staticDir, destDir, {
            overwrite: true,
            preserveTimestamps: true,   // ⭐ THIS IS THE MAGIC SETTING
          });
        },
      };
    },

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
            to: '/docs/one-ai/getting-started/help/choosing-parameters-guide',
          },
          {
            from: '/webinar-2025-11-27',
            to: '/docs/one-ai/Webinars/webinar-2025-11-27',
          },
          {
            from: '/webinar-2025-12-18',
            to: '/docs/one-ai/Webinars/webinar-2025-12-18',
          },
          {
            from: '/webinar-2026-01-28',
            to: '/docs/one-ai/Webinars/webinar-2026-01-28',
          }
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
        gtag: {
          trackingID: 'G-SFBR329NP4',
          anonymizeIP: true,
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
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },    // Replace with your project's social card
    // For meta tags, we still use the path without require
    image: "/img/social-card.jpg",
    navbar: {
      logo: {
        alt: "ONE WARE",
        src: "img/start/Logo_SVG-ONE-ware-dark.svg",
        srcDark: "img/start/Logo_SVG-ONE-ware.svg",
      },
      hideOnScroll: false,
      items: [
        {
          type: "dropdown",
          position: "left",
          label: "Products",
          to: "/one-ai",
          activeBaseRegex: "(^.*/one-ai$)|(^.*/docs/one-ai/.*$)",
          className: "navbar__dropdown--products",
          items: [
            {
              to: "/one-ai",
              label: "ONE AI",
              className: "dropdown__link--highlight",
            },
            {
              to: "/docs/one-ai/getting-started",
              label: "Get Started",
            },
            {
              to: "/docs/one-ai/tutorials/overview",
              label: "Demo Projects",
            },
            {
              to: "/docs/one-ai/supported-vendors",
              label: "Supported Hardware",
            },
            {
              to: "/studio",
              label: "ONE WARE Studio",
              className: "dropdown__link--highlight",
            }
          ],
        },
        {
          type: "dropdown",
          position: "left",
          label: "Solutions",
          className: "navbar__dropdown--solutions",
          items: [
            {
              to: "/docs/one-ai/use-cases/",
              label: "Showcase",
              className: "dropdown__link--highlight",
            },
            {
              to: "/docs/one-ai/industries/manufacturing",
              label: "Manufacturing",
            },
            {
              to: "/docs/one-ai/industries/healthcare",
              label: "Healthcare",
            },
            {
              to: "/docs/one-ai/industries/food-beverage",
              label: "Food & Beverage",
            },
            {
              to: "/docs/one-ai/industries/agriculture",
              label: "Agriculture",
            },
          ],
        },
        {
          type: "dropdown",
          position: "left",
          label: "Resources",
          className: "navbar__dropdown--developers",
          items: [
            {
              to: "/docs/one-ai/documentation/overview",
              label: "Documentation",
            },
            {
              to: "/docs/one-ai/tutorials/overview",
              label: "Example Projects",
            },
            // {
            //   to: "/docs/one-ai/getting-started/help/questions-and-answers",
            //   label: "Questions & Answers",
            // },
            {
              to: "/docs/one-ai/supported-vendors",
              label: "Supported Hardware",
            },
            {
              to: "/seminars",
              label: "Events",
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
              to: "/about-us",
              label: "About",
            },
            {
              to: "/careers",
              label: "Careers",
            },
            {
              to: "/seminars",
              label: "Events",
            },
            {
              to: "/docs/one-ai/partners",
              label: "Partners",
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
          type: "html",
          position: "right",
          value: `<a href="https://cloud.one-ware.com/Account/Login" class="button button--primary button--outline button--md font-bold navbarbutton loginbutton" style="display: inline-flex; align-items: center; gap: 6px;"><span class="login-button-text">Login</span><svg class="login-button-icon" style="display: none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg></a>`,
        },
        {
          type: "html",
          position: "right",
          value: `<a href="https://cloud.one-ware.com/Account/Register" class="button button--primary button--md text-gray-900 font-bold navbarbutton getstartedbutton" style="display: inline-flex; align-items: center; gap: 6px;"><span class="download-button-text">Get Started</span><svg class="download-button-icon" style="display: none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></a>`,
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
    announcementConfigs: {
      arrowWorkshop: {
        announcementId: 'arrow_webinar_2025',
        translateId: 'arrow',
        title: 'FREE Worldwide Workshop on ONE AI for Altera FPGAs',
        subtitle: 'Learn FPGA development • Build ultra-efficient AI • Win a development board',
        link: '/docs/one-ai/seminars/arrow-agilex3',
        cta: 'Register Now',
      },
      qualityControlWorkshop: {
        announcementId: 'workshop_2025_12_18',
        translateId: 'workshop_2025_12_18',
        title: 'FREE Online Workshop: Build Your Own AI Quality Control',
        subtitle: 'December 18, 2025 at 10 AM (CET) • Applying Vision AI from Dataset to Deployment',
        link: 'https://short.one-ware.com/webinar/',
        cta: 'Register Now',
      },
      qualityControlWebinar: {
        announcementId: 'webinar_2026_01_28',
        translateId: 'webinar_2026_01_28',
        title: 'FREE Online Webinar: Build Your Own AI Quality Control',
        subtitle: 'January 28, 2026 at 10 AM (CET) • Learn Vision AI from Dataset to Deployment',
        link: 'https://short.one-ware.com/webinar/',
        cta: 'Register Now',
      },
    },
    // activeAnnouncement: 'qualityControlWebinar',
  } satisfies Preset.ThemeConfig,
};

export default config;
