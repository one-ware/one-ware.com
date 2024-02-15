import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./plc-one.module.css";
import Link from "@docusaurus/Link";
import initWebsiteEffects from "../components/startEffects";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import ContactUs from "../components/ContactUs";

export default function PLC(): JSX.Element {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  initWebsiteEffects();

  return (
    <Layout title="PLC ONE" description="Empowering Industry 5.0">
      <header>
        <div className="flex">
          <div
            className={`flex flex-col justify-center align-middle items-center mx-auto h-screen w-screen ${styles.heroBackground}`}
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
              )}
            </div>
            <div className="absolute flex flex-col xl:flex-row w-full container gap-10 md:gap-0">
              <div className="xl:w-1/2 w-full flex flex-col justify-center gap-5 md:gap-10 mt-10">
                <img
                  src={"/img/plc/Logo_SVG-ONE2-plc.svg"}
                  alt="PLC Logo"
                  className={`drop-shadow-4xl`}
                  width={360}
                />
                <span className="text-xl md:text-4xl drop-shadow-4xl text-gray-200">
                  Get Ready for a{" "}
                  <span className="font-bold primary-text">New Chapter</span> in
                  Industrial Automation
                </span>

                <div>
                  <Link
                    className="button button--primary button--lg hidden sm:inline"
                    to={"/docs/plc-one/overview"}
                  >
                    Overview
                  </Link>
                </div>
              </div>

              <div>
                <img
                  src={"/img/plc/Hero.png"}
                  alt="PLC Logo"
                  className={`drop-shadow-4xl ${styles.heroImage}`}
                  width={1000}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-0 overflow-hidden md:my-10 mb-20">
        <div className="grid md:grid-cols-2 my-3 container">
          <div className="p-5" data-aos="fade-right">
            <img src="/img/plc/Schrank.png" />
          </div>

          <div
            className="md:p-5 flex-col flex gap-10 justify-center relative"
            data-aos="fade-left"
          >
            <h3 className="text-4xl primary-text mb-0">Industry 5.0 ready</h3>
            <span className="text-3xl">
              PLC ONE is the first{" "}
              <span className="font-bold primary-text">Industry 5.0</span> ready
              industrial controller that can adapt to the needs of the{" "}
              <span className="font-bold primary-text">future</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 my-3 container mt-10 md:mt-3">
          <div className="p-5 md:order-1" data-aos="fade-right">
            <img src="/img/plc/Roboter.png" />
          </div>

          <div
            className="md:p-5 flex-col flex gap-5 justify-center relative"
            data-aos="fade-left"
          >
            <h3 className="text-4xl primary-text mb-0">
              AI-Powered Industrial Controller
            </h3>
            <div className="text-xl md:text-2xl mt-6">
              Empower your robotics with a single, AI-integrated controller that
              orchestrates a multitude of actuators and sensors. Our technology
              enables automation of tasks traditionally performed by humans,
              with AI object recognition running on the same controller that
              directs motors, allowing for swift and precise responses.{" "}
              <a href="/contact" className="primary-text font-bold">
                Connect with us
              </a>{" "}
              to elevate your robotic systems to new levels of efficiency.
            </div>
          </div>
        </div>

        <div className="container m-auto text-white mb-24">
          <div className="text-center max-w-4xl m-auto mt-24">
            <h2 className="text-4xl font-bold mt-10">
              AI-Powered Industrial Controller
            </h2>
            <img
              src={"/img/plc/Drohne.png"}
              className="mt-10"
              alt="Compare"
              data-aos="zoom-in"
            />
            <div className="text-xl md:text-2xl mt-6" data-aos="slide-up">
              Elevate your <span className="font-bold primary-text">drone</span>{" "}
              capabilities with our unified controller managing both motors and
              cameras.{" "}
              <span className="font-bold primary-text">
                AI object recognition
              </span>{" "}
              assists in navigation, combining the functions of processors,
              graphics cards, and drone controls into one lightweight,{" "}
              <span className="font-bold primary-text">energy-efficient</span>{" "}
              unit. Discover how our innovative approach can enhance your
              drone's performance and efficiency.
            </div>
          </div>

          <div className="text-center max-w-4xl m-auto mt-24">
            <h2 className="text-4xl font-bold mt-10">
              One Simple Solution for the Tasks of the Future
            </h2>
            <img
              data-aos="zoom-in"
              src={"/img/plc/Steuerung.png"}
              className="mt-10"
              alt="Compare"
            />
            <div className="text-xl md:text-2xl mt-6" data-aos="slide-up">
              Discover the{" "}
              <span className="font-bold primary-text">next generation</span> of
              industrial automation: our controller features a new processor
              architecture for markedly
              <span className="font-bold primary-text"> faster</span> response
              times than conventional PLCs. It centralizes processing to enhance
              energy efficiency, minimize weight, and reduce costs. With its
              capacity for unlimited expansion, it’s built to accommodate extra
              computing power and components as needed.{" "}
              <span className="font-bold primary-text">
                Upgrade and future-proof
              </span>{" "}
              your electronics with our next-level control technology.
            </div>
          </div>

          <div className="text-center max-w-4xl m-auto mt-24">
            <h2 className="text-4xl font-bold mt-10">
              All you need for <span className="primary-text">ONE</span> modular system
            </h2>
            <img
              data-aos="zoom-in"
              src={"/img/plc/components.png"}
              className="mt-10"
              alt="Compare"
            />
            <div className="mt-10">
              <Link
                className="button button--primary button--outline button--lg hidden sm:inline"
                to={"/docs/plc-one/overview"}
              >
                Discover our Components
              </Link>
            </div>
          </div>
        </div>

        <ContactUs/>
        
      </main>
    </Layout>
  );
}
