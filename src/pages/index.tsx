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

import styles from "./index.module.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initWebsiteEffects from "../components/startEffects";

// Define HomepageHeader at the top level
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Task", "Hardware", "Industry"];
  
  // Typewriter effect (unchanged)
  useEffect(() => {
    let timeoutId;
    const typewriterEffect = () => {
      const currentWord = words[wordIndex];
      
      // Typing
      if (!isDeleting) {
        setDisplayText(prev => {
          if (prev.length < currentWord.length) {
            return currentWord.substring(0, prev.length + 1);
          } else {
            // Word is complete - wait then start deleting
            timeoutId = setTimeout(() => setIsDeleting(true), 1500);
            return prev;
          }
        });
      } 
      // Deleting
      else {
        setDisplayText(prev => {
          if (prev.length > 0) {
            return prev.substring(0, prev.length - 1);
          } else {
            // Word is deleted - move to next word
            setIsDeleting(false);
            setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            return "";
          }
        });
      }
    };

    // Adjust typing speed based on action
    const typingInterval = setInterval(
      typewriterEffect, 
      isDeleting ? 100 : 150
    );
    
    return () => {
      clearInterval(typingInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isDeleting, wordIndex, words]);

  return (
    <header id="hero" className={`h-[50vh] w-full ${styles.heroBackground}`}>
      <div className="particles absolute w-full h-full">

      </div>

      <div className="absolute flex flex-col items-center justify-center w-full h-full pointer-events-none">
        <div className="flex flex-col items-center justify-center w-full md:w-8/12 xl:w-8/12">
          <span className="text-lg md:text-2xl font-bold drop-shadow-4xl text-gray-300 mb-4 text-center">
            There Is No AI That Can <span className="primary-text">Automate Everything</span> -<br/>
            But <span className="primary-text">ONE AI</span> Will Build The AI Models That Can!
          </span>
          <span className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-4xl text-gray-200 whitespace-nowrap">
            Every <span className={styles.animatedWord}>{displayText}</span><span className={styles.cursor}>|</span>. ONE Software.
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