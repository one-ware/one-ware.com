import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { useEffect, useState, useRef, memo, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import "aos/dist/aos.css";
import Typewriter from "typewriter-effect";
import Translate, { translate } from "@docusaurus/Translate";

import styles from "./index.module.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";

function HomepageHeader() {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  return (
    <header id="hero" className={styles.heroBackground}>
      <div className={styles.heroBanner}>

        {/* Text in der Mitte */}
        <div className="m-auto inset-0 flex flex-col justify-center items-center text-center pointer-events-none min-h-[300px] md:h-[35vh] max-md:h-[40vh]">
          <div className="text-3xl md:text-4xl lg:text-4xl font-bold drop-shadow-4xl text-white mt-2 md:mt-2">
            <span>
              <Translate id="homepage.title.main">
                AI Tailored to Your Needs.
              </Translate>
              <br/>
              <Translate id="homepage.title.subtitle">
                Automatically Deployed on Any Hardware.
              </Translate>
            </span>
          </div>

          

          <div className="flex justify-center gap-4 mt-8 flex-row pointer-events-auto">
            <Link href="/one-ai#getStarted">
              <button className="button button button--primary button--outline button--lg">
                <Translate id="homepage.subtitle.ai.getstarted">
                  Get Started
                </Translate>
              </button>
            </Link>
            <Link href="/one-ai">
              <button className="button button button--primary button--lg">
                ONE AI
              </button>
            </Link>
          </div>

          <div className="text-xl md:text-xl drop-shadow-4xl text-gray-300 mt-6">
            <span className="block mb-2">
              <Translate id="homepage.subtitle.ai">
                Trusted By:
              </Translate>
              <div className="flex justify-center gap-4 mt-2 items-center px-4 py-2">
                <img
                  src={require("@site/static/img/Partner/hdo_w.png").default}
                  alt="HDO logo"
                  className="h-[1.5em] w-[3em] object-contain opacity-80"
                />
                <img
                  src={require("@site/static/img/Partner/cusp_w.png").default}
                  alt="Cusp Capital logo"
                  className="h-[1.5em] w-[3em] object-contain opacity-80"
                />
                <img
                  src={require("@site/static/img/Partner/altera_w.png").default}
                  alt="Altera logo"
                  className="h-[1.5em] w-[3em] object-contain opacity-80"
                />
              </div>
            </span>
          </div>
        </div>

        {/* Video unten am Header mit Padding */}
        <div className="bottom-0 left-0 right-0 max-md:pt-6 md:mt-8 md:mb-8 max-md:mt-2 max-md:mb-2 flex justify-center">
          <video
            src={require("@site/static/img/animation.mp4").default}
            autoPlay
            muted
            loop
            playsInline
            className="w-10/12 md:w-2/5 md:min-w-[700px] object-contain rounded-lg shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.2))'
            }}
          />
        </div>

        {/* Featured In section */}
        <div className="md:mt-4 mt-8">
          {/* White box with featured logos */}
          <div className="bg-white bg-opacity-20 py-4 rounded-lg">
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-200 mb-6">
            <Translate id="partners.title">
              Featured In:
            </Translate>
          </h3>

            <div className="flex justify-center items-center flex-wrap gap-4 md:gap-8">
              <a
                href="https://tech.eu/2025/06/18/one-ware-raises-eur25m-to-automate-ai-model-configuration-across-industries/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f1.png").default}
                  alt="Featured 1"
                  className="h-12 w-20 md:h-14 object-contain hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://www.starting-up.de/news/news-investments/one-ware-ki-start-up-aus-brakel-sichert-sich-25-mio-euro.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f6.png").default}
                  alt="Featured 6"
                  className="h-12 w-28 md:h-14 object-contain hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://www.elektronikpraxis.de/one-ai-automatisierte-ki-konfiguration-fuer-entwickler-a-09fee486cec031ed0a2edd5dbeeaed0a/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f4.png").default}
                  alt="Featured 4"
                  className="h-12 w-42 md:h-14 object-contain hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://www.handelsblatt.com/technik/ki/ki-start-ups-jenseits-des-hypes-one-ware-entwickelt-ki-fuer-jede-produktion-01/100149060.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f3.png").default}
                  alt="Featured 3"
                  className="h-12 w-64 md:h-14 object-contain hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://www.maschinenmarkt.vogel.de/one-ai-ki-extension-one-ware-maschinenbau-a-545f6e3fc5ac13f8fa3f55fa5998332f/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f5.png").default}
                  alt="Featured 5"
                  className="h-14 w-28 md:h-16 object-contain hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://it-production.com/industrie-4-0-i40/neuronales-netzwerk-in-unter-einer-sekunde/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f7.png").default}
                  alt="Featured 7"
                  className="h-12 w-32 md:h-14 object-contain hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://www.startbase.de/news/one-ware-sichert-sich-25-mio-euro/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f8.png").default}
                  alt="Featured 8"
                  className="h-12 w-28 md:h-14 object-contain hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Examples images moved below Featured In */}
        <div className="max-md:pt-6 md:mt-8 md:mb-8 max-md:mt-2 max-md:mb-2">
          <img
            src={require(`@site/static/img/examples_2${currentLocale === 'de' ? '' : '_en'}.webp`).default}
            alt="Examples"
            className="w-full object-contain block md:hidden"
          />
          <img
            src={require(`@site/static/img/examples${currentLocale === 'de' ? '' : '_en'}.webp`).default}
            alt="Examples Desktop"
            className="w-full object-contain hidden md:block"
          />
        </div>
      </div>
    </header>
  );
}

function OneAISection() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <div className="mt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-200 mb-8">
          ONE AI
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Discover our powerful AI solutions tailored to your specific needs.
        </p>
        <div className="flex justify-center">
          <Link href="/one-ai">
            <button className="button button--primary button--lg">
              Learn More About ONE AI
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-200 mb-12">
        <Translate id="testimonials.title">What Others Say About Us</Translate>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a
            href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline hover:no-underline"
          >
            <p className="text-gray-800 italic mb-6 font-bold text-lg">
              <Translate id="testimonials.1.text">
                “Working with ONE WARE demonstrates the incredible potential that emerges when intelligent AI development meets highly efficient FPGA technology. ONE WARE takes our MAX® 10 platform to a new level – delivering solutions that not only push technological boundaries, together we're building solutions that are far more precise, more efficient and drive meaningful change in industrial practice. This partnership represents a new generation of industrial AI: scalable, resource-efficient, and universally applicable.“
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
                className="h-16 w-48 object-contain"
              />
            </div>
          </a>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a
            href="https://hdo-gmbh.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline hover:no-underline"
          >
            <p className="text-gray-800 italic mb-6 font-bold text-lg">
              <Translate id="testimonials.2.text">
                “From day one, working with ONE WARE was pragmatic and focused. Using AI-powered image processing, we established a robust defect detection system on high-gloss surfaces in just a few weeks – a milestone that traditional metrology would have taken up to 18 months to reach. We're enthusiastic about ONE WARE's solution. Its potential in AI is impressive and a true lever for strengthening our competitiveness.“
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
                className="h-16 w-48 object-contain"
              />
            </div>
          </a>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a
            href="https://www.cuspcapital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline hover:no-underline"
          >
            <p className="text-gray-800 italic mb-6 font-bold text-lg">
              <Translate id="testimonials.3.text">
                “Through our European Digital Infrastructure investment thesis, we seek out entrepreneurs building the foundations of future global digital systems. ONE WARE is such a company. With its mission to make advanced technologies more accessible and universally applicable, the team around Leon, Leo, Hendrik, and Ali is fundamentally changing the way AI and electronics development is approached across industries.“
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
      description={translate({
        id: "homepage.meta.description",
        message: "Every Task. Every Hardware. Every Industry. ONE Software.",
      })}
    >
      <HomepageHeader />
      <main className="overflow-x-hidden alternative-background ">
        <div className="">
          <HomepageFeatures />
        </div>
        <div className="dropshadowbottom">
          <div className="dropshadowtop diagclipbottom">
            <div className="default-background diagcliptop pt-20 pb-32">
              <TestimonialsSection />
            </div>
          </div>
        </div>

        <div className="pt-20 pb-20 ">
          <ContactUs />
        </div>
      </main>
    </Layout>
  );
}
