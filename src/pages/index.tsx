import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import "aos/dist/aos.css";
import Typewriter from "typewriter-effect";
import Translate, { translate } from "@docusaurus/Translate";
import Marquee from "react-fast-marquee";
import { useColorMode } from "@docusaurus/theme-common";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Head from "@docusaurus/Head";
import HomeHero from "@site/src/components/HomeHero";
import VideoShowcase from "@site/src/components/VideoShowcase";
import OrbitIndustries from "@site/src/components/OrbitIndustries";

function IndustryExamplesSection() {
  const items = [
    {
      key: "aerospace",
      src: require("@site/static/img/industries/Aerospace.webp").default,
      label: "Aerospace",
      labelId: "homepage.industry.aerospace",
      href: "/docs/one-ai/use-cases/chip",
    },
    {
      key: "agriculture",
      src: require("@site/static/img/industries/Agriculture.webp").default,
      label: "Agriculture",
      labelId: "homepage.industry.agriculture",
      href: "/docs/one-ai/industries/agriculture",
    },
    {
      key: "automotive",
      src: require("@site/static/img/industries/Automotive.webp").default,
      label: "Automotive",
      labelId: "homepage.industry.automotive",
      href: "/docs/one-ai/use-cases/pcb",
    },
    {
      key: "consumer",
      src: require("@site/static/img/industries/Consumer.webp").default,
      label: "Consumer Electronics",
      labelId: "homepage.industry.consumer",
      href: "/docs/one-ai/use-cases/pcb",
    },
    {
      key: "drones",
      src: require("@site/static/img/industries/Drones.webp").default,
      label: "Drones",
      labelId: "homepage.industry.drones",
      href: "/docs/one-ai/use-cases/chip",
    },
    {
      key: "energy",
      src: require("@site/static/img/industries/Energy.webp").default,
      label: "Energy",
      labelId: "homepage.industry.energy",
      href: "/docs/one-ai/use-cases/chip",
    },
    {
      key: "foodbeverage",
      src: require("@site/static/img/industries/Food_and_Beverage.webp").default,
      label: "Food & Beverage",
      labelId: "homepage.industry.foodbeverage",
      href: "/docs/one-ai/industries/food-beverage",
    },
    {
      key: "healthcare",
      src: require("@site/static/img/industries/Healthcare.webp").default,
      label: "Healthcare",
      labelId: "homepage.industry.healthcare",
      href: "/docs/one-ai/industries/healthcare",
    },
    {
      key: "industry",
      src: require("@site/static/img/industries/Industrie.webp").default,
      label: "Industrial Manufacturing",
      labelId: "homepage.industry.industry",
      href: "/docs/one-ai/industries/manufacturing",
    },
    {
      key: "retail",
      src: require("@site/static/img/industries/Retail.webp").default,
      label: "Retail",
      labelId: "homepage.industry.retail",
      href: "/docs/one-ai/use-cases/pcb",
    },
    {
      key: "security",
      src: require("@site/static/img/industries/Security.webp").default,
      label: "Security",
      labelId: "homepage.industry.security",
      href: "/docs/one-ai/use-cases/pcb",
    },
    {
      key: "transport",
      src: require("@site/static/img/industries/Transport.webp").default,
      label: "Transport & Logistics",
      labelId: "homepage.industry.transport",
      href: "/docs/one-ai/use-cases/pcb",
    },
  ];

  // immer 2 Bilder pro „Spalte“
  const columns: (typeof items)[] = [];
  for (let i = 0; i < items.length; i += 2) {
    columns.push(items.slice(i, i + 2));
  }

  return (
    <div id="industries" className="pb-12 md:pb-16 pt-4 md:pt-6">
      {/* Überschrift mit normalem Container-Padding */}
      <div className="container mx-auto px-4 mb-8">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-left font-bold">
          <Translate id="homepage.industries.title">
            For Every Industry:
          </Translate>
        </p>
      </div>

      {/* Grid über volle Breite ohne Container-Padding */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0">
        {items.map((item) => (
          <a
            key={item.key}
            href={item.href}
            className="relative group aspect-video overflow-hidden bg-gray-900 hover:bg-gray-800 transition-all duration-300"
          >
            <img
              src={item.src}
              alt={item.label}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-sm md:text-base font-semibold text-center">
                <Translate id={item.labelId}>{item.label}</Translate>
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto">
      <h2 className={`text-2xl md:text-3xl font-bold text-center mb-12 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
        <Translate id="testimonials.title">What Others Say About Us</Translate>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a
            href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline hover:no-underline"
          >
            <p className="text-gray-800 italic mb-6 font-bold text-lg">
              <Translate id="testimonials.1.text">
                “Working with ONE WARE demonstrates the incredible potential
                that emerges when intelligent AI development meets highly
                efficient FPGA technology. ONE WARE takes our MAX® 10 platform
                to a new level – delivering solutions that not only push
                technological boundaries, together we're building solutions that
                are far more precise, more efficient and drive meaningful change
                in industrial practice. This partnership represents a new
                generation of industrial AI: scalable, resource-efficient, and
                universally applicable.“
              </Translate>
            </p>
            <div className="mb-24">
              <p className="text-gray-900 text-2xl font-bold mb-2">
                Mark Moran
              </p>
              <p className="text-gray-700 font-bold text-l">
                <Translate id="testimonials.1.authorTitle">
                  Director of Boards, Development Kits, and Partners at Altera
                </Translate>
              </p>
            </div>
            <div className="absolute right-6 bottom-6">
              <img
                src={require("@site/static/img/Partner/altera.png").default}
                alt="Altera logo"
                loading="lazy"
                decoding="async"
                className="h-16 w-48 object-contain"
              />
            </div>
          </a>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a
            href="https://hdo-gmbh.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline hover:no-underline"
          >
            <p className="text-gray-800 italic mb-6 font-bold text-lg">
              <Translate id="testimonials.2.text">
                “From day one, working with ONE WARE was pragmatic and focused.
                Using AI-powered image processing, we established a robust
                defect detection system on high-gloss surfaces in just a few
                weeks – a milestone that traditional metrology would have taken
                up to 18 months to reach. We're enthusiastic about ONE WARE's
                solution. Its potential in AI is impressive and a true lever for
                strengthening our competitiveness.“
              </Translate>
            </p>
            <div className="mb-24">
              <p className="text-gray-900 text-2xl font-bold mb-2">
                Christian Leon
              </p>
              <p className="text-gray-700 font-bold text-l">
                <Translate id="testimonials.2.authorTitle">
                  COO & Managing Director at HDO
                </Translate>
              </p>
            </div>
            <div className="absolute right-6 bottom-6">
              <img
                src={require("@site/static/img/Partner/hdo.png").default}
                alt="HDO logo"
                loading="lazy"
                decoding="async"
                className="h-16 w-48 object-contain"
              />
            </div>
          </a>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a
            href="https://www.cuspcapital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline hover:no-underline"
          >
            <p className="text-gray-800 italic mb-6 font-bold text-lg">
              <Translate id="testimonials.3.text">
                “Through our European Digital Infrastructure investment thesis,
                we seek out entrepreneurs building the foundations of future
                global digital systems. ONE WARE is such a company. With its
                mission to make advanced technologies more accessible and
                universally applicable, the team around Leon, Leo, Hendrik, and
                Ali is fundamentally changing the way AI and electronics
                development is approached across industries.“
              </Translate>
            </p>
            <div className="mb-24">
              <p className="text-gray-900 text-2xl font-bold mb-2">
                Jan Sessenhausen
              </p>
              <p className="text-gray-700 font-bold text-l">
                <Translate id="testimonials.3.authorTitle">
                  Investor & General Partner at Cusp Capital
                </Translate>
              </p>
            </div>
            <div className="absolute right-6 bottom-6">
              <img
                src={require("@site/static/img/Partner/cusp.png").default}
                alt="Cusp Capital logo"
                loading="lazy"
                decoding="async"
                className="h-16 w-48 object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  if (ExecutionEnvironment.canUseDOM) {
    initWebsiteEffects();
  }

  return (
    <Layout
      title={translate({
        id: "homepage.seo.title",
        message: "The Next Generation Vision and Edge AI Software",
      })}
      description={translate({
        id: "homepage.seo.description",
        message:
          "Get better results in less time. AI automatically tailored for your needs. Optimized and exported for PCs, microcontrollers, FPGAs, GPUs, NPUs and more.",
      })}
    >
      <Head>
        {/* Open Graph für Social Media */}
        <meta
          property="og:title"
          content={translate({
            id: "homepage.seo.og.title",
            message: "The Next Generation Vision and Edge AI Software",
          })}
        />
        <meta
          property="og:description"
          content={translate({
            id: "homepage.seo.og.description",
            message:
              "Get better results in less time with ONE AI. AI models, automatically tailored for your needs.",
          })}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://one-ware.com/" />
        <meta
          property="og:image"
          content="https://one-ware.com/img/social-card.jpg"
        />

        {/* International SEO */}
        <link rel="alternate" hrefLang="en" href="https://one-ware.com/" />
        <link rel="alternate" hrefLang="de" href="https://one-ware.com/de/" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://one-ware.com/"
        />
      </Head>

      <HomeHero />
      <main className="overflow-x-hidden alternative-background ">
        <div className="default-background pb-12">
          <div id="video">
            <VideoShowcase />
          </div>
          <IndustryExamplesSection />
          <OrbitIndustries />
        </div>

        <div className="">
          <HomepageFeatures />
        </div>

        <div className="default-background pt-20 pb-32">
          <TestimonialsSection />
        </div>

        <div className="pt-20 pb-20 ">
          <ContactUs />
        </div>
      </main>
    </Layout>
  );
}
