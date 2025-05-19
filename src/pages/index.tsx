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

// Define HomepageHeader at the top level
function HomepageHeader() {
  const [displayText, setDisplayText] = useState("");

  return (
    <header id="hero" className={styles.heroBackground}>
      <div className="particles absolute w-full h-full">

      </div>

      <div className="absolute flex flex-col items-center justify-center w-full h-full pointer-events-none">
        <div className="flex flex-col items-center justify-center w-full md:w-8/12 xl:w-8/12">
          <span className="text-md md:text-2xl font-bold drop-shadow-4xl text-gray-300 mb-12 text-center">
            <Translate>There Is No AI That Can </Translate><span className="primary-text">Automate Everything</span>{" "}-{" "}
            <span className="inline xl:block">But <span className="primary-text">ONE AI</span> will Build The AI Models That Can!</span>
          </span>
          <span className="text-3xl text-center md:text-5xl lg:text-6xl font-bold drop-shadow-4xl text-gray-200 whitespace-nowrap inlinetypewriter">
            {
              translate({
                id: 'homepage.every',
                message: 'Every ',
              })
            }
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
            <span className="block xl:inline">
              ONE Software.
            </span>
          </span>

        </div>
      </div>
    </header>
  );
}

// Default export function (unchanged)
export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  if (ExecutionEnvironment.canUseDOM) {
    initWebsiteEffects();
  }

  return (
    <Layout
      title="ONE WARE"
      description="Every Task. Every Hardware. Every Industry. ONE Software."
    >
      <HomepageHeader />
      <main className="container overflow-x-hidden">
        <HomepageFeatures />
      </main>
    </Layout>
  );
}