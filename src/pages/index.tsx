import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { useEffect, useState, useRef, memo, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';
import Translate, { translate } from '@docusaurus/Translate';

import styles from "./index.module.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initWebsiteEffects from "../components/startEffects";

function HomepageHeader() {
  return (
    <header id="hero" className={styles.heroBackground}>
      <div className="absolute flex flex-col items-center justify-center w-full h-full pointer-events-none">
        <div className="flex flex-col items-center justify-center w-full md:w-8/12 xl:w-8/12">
          <div className="text-center">
            <div className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-4xl text-gray-200 whitespace-nowrap inlinetypewriter">
              {translate({ id: 'homepage.every', message: 'Every ' })}
              <span className="primary-text">
                <Typewriter
                  options={{
                    strings: [
                      translate({ id: 'typewriter.task', message: 'Task.' }),
                      translate({ id: 'typewriter.hardware', message: 'Hardware.' }),
                      translate({ id: 'typewriter.industry', message: 'Industry.' }),
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </div>
            
            <div className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-4xl text-gray-200 mt-2 md:mt-2">
              {translate({ id: 'homepage.software', message: 'ONE Software. ONE AI.' })}
            </div>
          </div>

          <span className="text-md md:text-3xl font-bold drop-shadow-4xl text-gray-300 mt-6 text-center">
            <Translate id="homepage.subtitle">Meet the World's First</Translate>{" "}
            <span className="primary-text">
              <Translate id="homepage.subtitle.ai">AI-Powered AI Developer</Translate>
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}

function HeaderSection() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h2 className="text-4xl md:text-5xl font-bold mt-10">
        Download <span className="primary-text">ONE WARE Studio</span>
        <span className="text-2xl md:text-3xl font-bold mt-3 block text-gray-300">
          And Use <span className="primary-text">ONE AI</span> to Deploy Your First <span className="primary-text">Fully Custom AI</span>!
        </span>
      </h2>

      <img src={require('@site/static/img/ai/Laptop.png').default} alt="Hardware" />

      <h5 className="text-xl md:text-2xl font-normal text-gray-300">
        ONE WARE Studio together with ONE AI makes <span className="primary-text">every developer</span> an AI expert. 
        You only need to know your application and <span className="primary-text">in seconds</span> ONE AI invents completely 
        new AI models for your use case. AI Models that only learn what is important
        for <span className="primary-text">your application</span> and <span className="primary-text">ready to deploy</span> with ONE WARE Studio.
      </h5>

      <div className="flex justify-center gap-4 mt-8 flex-col md:flex-row">
        <a href="docs/studio/setup">
          <button className="button button--primary text-xl">
            Download ONE WARE Studio
          </button>
          
        </a>

        <a href="https://forms.office.com/e/J3HDid9fzw" target="_blank">
          <button className="button button--secondary text-xl">
            Join ONE AI Waitlist
          </button>
        </a>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto mb-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-200 mb-12">
        <Translate id="testimonials.title">What Others Say About Us</Translate>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a 
          href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block no-underline"
        >
          <p className="text-gray-800 italic mb-6 font-bold text-lg">
            <Translate id="testimonials.1.text">
              "Working with ONE WARE demonstrates the incredible potential that emerges when intelligent AI development meets highly efficient FPGA technology. ONE WARE takes our MAX® 10 platform to a new level – delivering solutions that not only push technological boundaries, together we're building solutions that are far more precise, more efficient and drive meaningful change in industrial practice. This partnership represents a new generation of industrial AI: scalable, resource-efficient, and universally applicable."
            </Translate>
          </p>
          <div className="mb-20">
            <p className="text-gray-900 text-2xl font-bold">Mark Moran</p>
            <p className="text-gray-700 font-bold text-l">
              <Translate id="testimonials.1.authorTitle">
                Director of Boards, Development Kits, and Partners at Altera
              </Translate>
            </p>
          </div>
          <div className="absolute right-6 bottom-6">
            <img src="/img/Partner/altera.png" alt="Altera logo" className="h-16 w-48 object-contain" />
          </div>
          </a>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a 
          href="https://hdo-gmbh.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block no-underline"
        >
          <p className="text-gray-800 italic mb-6 font-bold text-lg">
            <Translate id="testimonials.2.text">
              "From day one, working with ONE WARE was pragmatic and focused. Using AI-powered image processing, we established a robust defect detection system on high-gloss surfaces in just a few weeks – a milestone that traditional metrology would have taken up to 18 months to reach. We're enthusiastic about ONE WARE's solution. Its potential in AI is impressive and a true lever for strengthening our competitiveness."
            </Translate>
          </p>
          <div className="mb-20">
            <p className="text-gray-900 text-2xl font-bold">Christian Leon</p>
            <p className="text-gray-700 font-bold text-l">
              <Translate id="testimonials.2.authorTitle">
                COO & Managing Director at HDO
              </Translate>
            </p>
          </div>
          <div className="absolute right-6 bottom-6">
            <img src="/img/Partner/hdo.png" alt="HDO logo" className="h-16 w-48 object-contain" />
          </div>
          </a>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a 
          href="https://www.cuspcapital.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block no-underline"
        >
          <p className="text-gray-800 italic mb-6 font-bold text-lg">
            <Translate id="testimonials.3.text">
              "Through our European Digital Infrastructure investment thesis, we seek out entrepreneurs building the foundations of future global digital systems. ONE WARE is such a company. With its mission to make advanced technologies more accessible and universally applicable, the team around Leon, Leo, Hendrik, and Ali is fundamentally changing the way AI and electronics development is approached across industries."
            </Translate>
          </p>
          <div className="mb-20">
            <p className="text-gray-900 text-2xl font-bold">Jan Sessenhausen</p>
            <p className="text-gray-700 font-bold text-l">
              <Translate id="testimonials.3.authorTitle">
                Investor & General Partner at Cusp Capital
              </Translate>
            </p>
          </div>
          <div className="absolute right-6 bottom-6">
            <img src="/img/Partner/cusp.png" alt="Cusp Capital logo" className="h-16 w-48 object-contain" />
          </div>
          </a>
        </div>
        
      </div>
      
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  if (ExecutionEnvironment.canUseDOM) {
    initWebsiteEffects();
  }

  return (
    <Layout
      title="ONE WARE"
      description={translate({
        id: 'homepage.meta.description',
        message: 'Every Task. Every Hardware. Every Industry. ONE Software.'
      })}
    >
      <HomepageHeader />
      <main className="container overflow-x-hidden">
        <HeaderSection />
        <HomepageFeatures />
        <TestimonialsSection />
      </main>
    </Layout>
  );
}
