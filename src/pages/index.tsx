import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import AnimatedHeadline from "@site/src/components/AnimatedHeadline";
import { ImageScroller } from "@site/src/components/ImageScroller";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import 'aos/dist/aos.css'; // You can also use <link> for styles

import styles from "./index.module.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initWebsiteEffects from "../components/startEffects";
import './i18n';
import { useTranslation } from 'react-i18next';
import $ from "jquery";



function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [init, setInit] = useState(false);
  const { t, i18n } = useTranslation();
  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];
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

      <div className="absolute flex flex-col items-center justify-center w-full h-full pointer-events-none">
        <div className="flex flex-col items-center justify-center w-full md:w-8/12 xl:w-6/12">
          <img
            className="drop-shadow-4xl"
            src="img/start/Logo_SVG-ONE-ware.svg"
            alt="OneWare Logo"
          />
          <span className="text-xl md:text-4xl drop-shadow-4xl text-gray-200">
            {t('heropage.catchphrase1')}
            </span>
            <br />
            <span className="text-4xl md:text-6xl font-bold text-gray-200">
            {t('heropage.catchphrase2')}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-8/12 xl:w-6/12">
          <span className= "text-center cd-headline push">
            <span>{t('heropage.catchphrase3')}</span>    
            <br />
            <AnimatedHeadline words={[t('heropage.catchphraseAnimaion1'),
                                      t('heropage.catchphraseAnimaion2'),
                                      t('heropage.catchphraseAnimaion3'),
                                      t('heropage.catchphraseAnimaion4'),
                                      t('heropage.catchphraseAnimaion5')]} effect='letters'/>
          </span>
        </div>
      </div>
      <ImageScroller images={images} speed={30} />
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
