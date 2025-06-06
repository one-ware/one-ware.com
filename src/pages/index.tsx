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

function HomepageHeader() {
  return (
    <header id="hero" className={styles.heroBackground}>
      <div className={styles.heroBanner}>
        
        <div className="text-center pointer-events-none">
          <div className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-4xl text-gray-200 whitespace-nowrap inlinetypewriter">
            {translate({ id: "homepage.every", message: "Every " })}
            <span className="primary-text">
              <Typewriter
                options={{
                  strings: [
                    translate({ id: "typewriter.task", message: "Task." }),
                    translate({
                      id: "typewriter.hardware",
                      message: "Hardware.",
                    }),
                    translate({
                      id: "typewriter.industry",
                      message: "Industry.",
                    }),
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </div>

          <div className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-4xl text-gray-200 mt-2 md:mt-2">
            <span>ONE Software.</span>{" "}
            <span>ONE AI.</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-2xl md:text-3xl font-bold drop-shadow-4xl text-gray-300 mt-6 text-center pointer-events-none">
          <span className="block mb-2">
            <Translate id="homepage.subtitle">The Only AI Platform to Outperform Experts in Seconds —</Translate>
          </span>
          <span className="primary-text block">
            <Translate id="homepage.subtitle.ai">
              Enabling Anyone to Build Tailored AI
            </Translate>
          </span>
        </div>
        <div className="flex justify-center gap-4 mt-8 flex-col md:flex-row">
          <a href="one-ai">
            <button className="button button button--primary button--outline button--lg">
              <Translate id="homepage.subtitle.ai.buttonGenerate">
                Generate Your Custom AI
              </Translate>
            </button>
          </a>
        </div>

        <div className="my-4 flex justify-center grow items-center overflow-hidden">
          <img
            src={require("@site/static/img/ai/Laptop.png").default}
            alt="Laptop"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </header>
  );
}

function PreviewSection() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <div className="mt-16">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-200 mb-8">
          <Translate id="partners.title">
            Trusted by Industry Leaders and Experts
          </Translate>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Partner 1 - Altera */}
          <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl flex items-center justify-center transition-colors duration-300 h-28">
            <a
              href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn"
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline hover:no-underline"
            >
              <img
                src={require("@site/static/img/Partner/altera.png").default}
                alt="Altera logo"
                className="h-16 object-contain"
              />
            </a>
          </div>

          {/* Partner 2 - HDO */}
          <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl flex items-center justify-center transition-colors duration-300 h-28">
            <a
              href="https://hdo-gmbh.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline hover:no-underline"
            >
              <img
                src={require("@site/static/img/Partner/hdo.png").default}
                alt="HDO logo"
                className="h-16 object-contain"
              />
            </a>
          </div>

          {/* Partner 3 - Cusp Capital */}
          <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl flex items-center justify-center transition-colors duration-300 h-28">
            <a
              href="https://www.cuspcapital.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline hover:no-underline"
            >
              <img
                src={require("@site/static/img/Partner/cusp.png").default}
                alt="Cusp Capital logo"
                className="h-16 object-contain"
              />
            </a>
          </div>
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
        <div className="dropshadowbottom">
          <div className="diagclipbottom default-background pb-24">
            <PreviewSection />
          </div>
        </div>{" "}
        <div className="">
          <HomepageFeatures />
        </div>
        <div className="dropshadowtop">
          <div className="default-background diagcliptop pt-20 pb-20">
            <TestimonialsSection />
          </div>
        </div>
      </main>
    </Layout>
  );
}
