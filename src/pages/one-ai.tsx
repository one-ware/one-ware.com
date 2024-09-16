import Layout from "@theme/Layout";
import styles from "./one-ai.module.css";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";
import Slider from "react-slick";
import React, { useRef, useState, useEffect } from "react";
import "aos/dist/aos.css";
import classnames from "classnames";
import Link from "@docusaurus/Link";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesComponent = React.memo(() => (
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
            quantity: 4,
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
          value: 50,
        },
        opacity: {
          value: 0.2,
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
));

function HomepageHeader({ counter }) {
  return (
    <header>
      <div className="flex">
        <div
          className={`flex flex-col justify-center align-middle items-center mx-auto h-screen w-screen ${styles.heroBackground}`}
        >
          <div className="particles absolute w-full h-full">
            <ParticlesComponent />
          </div>
          <div className="text-center mt-10">
            <h1 className="font-medium mb-10 text-6xl" style={{ lineHeight: "1.3" }}>
              On a <span className="font-bold">Mission</span> to{" "}
              <span className="primary-text font-bold text-7xl">Save Trillions</span> Lost to <br />
              <span className="font-bold">Quality Issues</span> and{" "}
              <span className="font-bold">Machine Failures</span>
            </h1>

            <h2 className="font-light mb-10 text-5xl" style={{ lineHeight: "1.5" }}>
              Money Lost Since Opening the Page: <br />
              <span className="font-bold text-6xl md:text-6xl">
                ${counter.toLocaleString()}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function PLC(): JSX.Element {
  const slickRef = useRef<Slider>(null);
  const [counter, setCounter] = useState(0); // Initialize counter state
  const [particlesInitialized, setParticlesInitialized] = useState(false);

  initWebsiteEffects();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 2306); // Increment counter by 560,000
    }, 50);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  useEffect(() => {
    if (!particlesInitialized) {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
      }).then(() => {
        setParticlesInitialized(true);
      });
    }
  }, [particlesInitialized]);

  return (
    <Layout title="ONE AI" description="Empowering Industry 5.0">

      <HomepageHeader counter={counter} />

      
      <main className="container mb-20">   
        <div className="text-center mt-20" data-aos="slide-up"> 
        <h2 className="text-5xl font-bold">
          Your Partner For:
          </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4" >
          <div className="text-center" data-aos="slide-up">
            <img src="/img/ai/quality_small.png" alt="Image 1" className="w-96" />
            <p className="mt-4 font-bold text-3xl">Quality Control</p>
          </div>
          <div className="text-center" data-aos="slide-up">
            <img src="/img/ai/root.png" alt="Image 2" className="w-96" />
            <p className="mt-4 font-bold text-3xl">Root Cause Analysis</p>
          </div>
          <div className="text-center" data-aos="slide-up">
            <img src="/img/ai/predict_small.png"  alt="Image 3" className="w-96" />
            <p className="mt-4 font-bold text-3xl">Predictive Maintenance</p>
          </div> 
        </div>
        </div>

        <div className="text-center max-w-5xl m-auto mt-20">
          <h2 className="text-5xl font-bold">
          The Easiest Way to Save Millions per Year
          </h2>
          <img
            src={"/img/start/saved.png"}
            alt="Compare"
          />
          <div className="text-xl md:text-2xl mt-6">
          ONE AI, our automated AI developer, can save you millions of dollars annually by <span className="primary-text">detecting quality issues</span>, {" "}
          <span className="primary-text">identifying root causes</span>, and <span className="primary-text">predicting machine failures</span> before they happen. 
          The cost of implementing ONE AI is only a <span className="primary-text">small fraction</span> of the potential savings.
          </div>
        </div>

        <div className="text-center max-w-5xl m-auto mt-16">
          <h2 className="text-5xl font-bold">
          Lowest Risk, Highest Profit
          </h2>

          <div className="text-2xl md:text-3xl mt-6">
          At ONE WARE, you only <span className="primary-text">pay when you're satisfied</span> with the results, not just to see them.
          </div>

        </div>

        <div className="text-center max-w-5xl m-auto mt-16">

          <h2 className="text-4xl font-bold">
          Upfront Cost Comparison
          </h2>

          <img
            src={"/img/start/cost.png"}
            alt="Compare"
          />

          <div className="text-xl md:text-2xl mt-6">
          Get in touch with our experts today so we can <span className="primary-text">identify optimization points</span> in your company at no cost, 
          create impactful <span className="primary-text">return on investment analyses</span> with ONE AI and minimal upfront expenses, and then implement the <span className="primary-text">final system</span>.
          </div>

        </div>

        <div className="text-center max-w-5xl m-auto mt-16">

          <h2 className="text-4xl font-bold">
          Accuracy and Speed Comparison for PCB Quality Control
          </h2>

          <img
            src={"/img/start/compare.png"}
            alt="Compare"
          />

          <div className="text-xl md:text-2xl mt-6">
          With ONE AI, you get <span className="primary-text">tailored AI solutions</span> that are not only cheaper. 
          In our tests, like for industrial PCB defect detection, the AI created by {" "}
          ONE AI is <span className="primary-text">more accurate</span> and even {" "}
          <span className="primary-text">multiple times faster</span> than the results of human experts.
          So you can save money and run your production as fast as possible.
          </div>
          
        </div>

        <ContactUs />
        
      </main>
    </Layout>
  );
}
