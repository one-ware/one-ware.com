import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import 'aos/dist/aos.css'; // You can also use <link> for styles

import styles from "./index.module.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initWebsiteEffects from "../components/startEffects";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <header
      id="hero"
      className={`h-screen w-full ${styles.heroBackground}`}
    >
      <div className="particles absolute w-full h-full">
        {init && (
          <Particles
            id="stars"
            className="h-full w-full absolute"
            options={{
              fullScreen: {
                enable: false,
              },
              fpsLimit: 144,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "bubble",
                  },
                },
                modes: {
                  push: {
                    quantity: 1,
                  },
                  bubble: {
                    size: 6,
                    distance: 40,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.1,
                  width: 1,
                },
                move: {
                  direction: "bottom",
                  enable: true,
                  outModes: {
                    default: "out",
                  },
                  size: true,
                  random: false,
                  speed: {
                    min: 0.2,
                    max: 0.4,
                  },
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                  },
                  value: 60,
                },
                opacity: {
                  value: 0.3,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 4 },
                },
              },
              detectRetina: true,
            }}
          />
        )}
      </div>

      <div className="absolute flex items-center justify-center w-full h-full pointer-events-none px-4">
        <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-10/12 xl:w-8/12 space-y-4 md:space-y-0 md:space-x-16">

          {/* Logo Section */}
          <div className="w-24 md:w-36 xl:w-64">
            <img
              src="/img/com.one_ware.OneWare.svg"  // Replace with your actual logo path
              alt="Logo"
              className="w-full h-auto"
            />
          </div>

          {/* Text Section */}
          <div className="text-center md:text-left w-full md:w-7/12">
            <span className="text-2xl md:text-5xl xl:text-6xl drop-shadow-4xl text-gray-200 font-bold leading-snug">
              The <span className="primary-text">fastest</span> way to turn your ideas into high-performance AI for any Hardware
            </span>
          </div>



        </div>
      </div>


      <div className={styles.startArrow} />
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  initWebsiteEffects();

  return (
    <Layout
      title="The Next Industrial Revolution"
      description="Empowering Industry 5.0"
    >
      <HomepageHeader />
      <main className="container overflow-x-hidden">
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
