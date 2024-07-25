import React, { useEffect, useRef, useState } from "react";
import styles from "./studio.module.css";
import "aos/dist/aos.css";
import classnames from "classnames";
import Slider from "react-slick";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { loadFull } from "tsparticles";

import { SiApple } from "react-icons/si";
import { SiMacos } from "react-icons/si";
import { SiWindows } from "react-icons/si";
import { SiLinux } from "react-icons/si";
import { SiFlathub } from "react-icons/si";
import { SiSnapcraft } from "react-icons/si";

const sliders = [
  {
    title: "Code Assistant",
    imageSrc: (
      <img alt="Code Assistant" src="/img/studio/slides2/completion.png" />
    ),
    description: (
      <>
        First class support for <span className="primary-text">C++</span>,{" "}
        <span className="primary-text">Python</span>,{" "}
        <span className="primary-text">VHDL</span>,{" "}
        <span className="primary-text">Verilog</span> and more with lots of
        tools to help develop your designs as efficiently as possible.
      </>
    ),
  },
  {
    title: "Hardware Support",
    imageSrc: <img alt="Hardware" src="/img/studio/slides2/hardware.png" />,
    description: (
      <>
        Conveniently setup and compile your designs from your hardware.{" "}
        <span className="primary-text">Directy</span> from the IDE, which a
        growing number of supported toolchains and boards.
      </>
    ),
  },
  {
    title: "Simulation",
    imageSrc: <img alt="Simulation" src="/img/studio/slides2/simulator.png" />,
    description: (
      <>
        Simulate your designs inside the IDE, using the lightning fast
        Simulation Viewer and the most popular{" "}
        <span className="primary-text">Simulation</span> tools.
      </>
    ),
  },
  {
    title: "Extensibility",
    imageSrc: <img alt="Extensible" src="/img/studio/slides2/extensions.png" />,
    description: (
      <>
        Download and Install <span className="primary-text">Extensions</span>{" "}
        from to extend the functionality. Discover a growing selection of{" "}
        <span className="primary-text">AI-Tools</span>,{" "}
        <span className="primary-text">Hardware-Integrations</span>,{" "}
        <span className="primary-text">Simulators and More</span>
      </>
    ),
  },
];

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
    <header id="hero" className={`w-full ${styles.heroBackground} h-96`}>
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
                    enable: false,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "none",
                    parallax: {
                      enable: true,
                      force: 60,
                      smooth: 10,
                    },
                  },
                },
                modes: {
                  push: {
                    quantity: 1,
                  },
                  bubble: {
                    size: 6,
                    distance: 10,
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
                  opacity: 0,
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
                  value: 0.4,
                },
                shape: {
                  type: "polygon",
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

      <div className="absolute flex flex-col items-center justify-center w-full h-full">
        <div className="flex">
          <div className="flex-col max-w-3xl m-5 mt-10">
            <div className="text-center mt-10">
              <h1 className="font-medium md:text-4xl">
                The{" "}
                <span className="primary-text font-bold">
                  Next Generation IDE
                </span>{" "}
                for Electronics Development{" "}
                <span className="primary-text font-bold">is here</span>.
              </h1>

              <div className="flex-col md:space-x-5 mb-10">
                <Link
                  className="mt-5 button button--primary button--lg hidden md:inline-block"
                  href="/docs/studio/setup"
                >
                  Download
                </Link>

                <Link
                  className="mt-5 button button--primary button--outline button--lg"
                  href="/docs/studio/setup"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.startArrow} />
    </header>
  );
}

export default function Studio(): JSX.Element {
  const slickRef = useRef<Slider>(null);

  initWebsiteEffects();

  return (
    <Layout title="Studio" description="OneWare Studio IDE">
      <HomepageHeader />
      <main className="my-20">
        <div className="container" style={{ overflowX: "hidden" }}>
          {sliders && sliders.length && (
            <div className="pb-20">
              <Slider
                ref={slickRef}
                dots={true}
                arrows={false}
                autoplaySpeed={20000}
                infinite={true}
                autoplay={true}
                className={styles.slickSlider}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                beforeChange={(_c, n) => {
                  var slideCount = sliders.length;
                  for (var i = 0; i < slideCount; i++) {
                    var slide = document.getElementById("slide" + i);
                    if (slide) {
                      if (i == n) slide.classList.add(styles.activeslide ?? "");
                      else slide.classList.remove(styles.activeslide ?? "");
                    }
                  }
                }}
              >
                {sliders.map(({ imageSrc, title, description }, idx) => (
                  <div key={idx}>
                    {imageSrc}
                    <div
                      className={classnames(
                        "md:hidden mt-5",
                        styles.slidecaption
                      )}
                    >
                      <h3>{title}</h3>
                      {description}
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="columns-4 my-10 hidden md:block">
                {sliders.map(({ title, description }, idx) => (
                  <div
                    key={idx}
                    onClick={() => slickRef.current?.slickGoTo(idx)}
                    className={classnames(
                      "block padding-vert--lg p-2 overflow-hidden",
                      styles.slidebutton
                    )}
                    id={"slide" + idx}
                  >
                    <h3>{title}</h3>
                    <span>{description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="diagclipcontainer">

          <div style={{ background: "rgb(8, 47, 65)" }} className="bg-red-50 diagclip py-32">
            <div
              className="text-center container m-auto flex space-x-5 justify-center"
              data-aos="slide-up"
            >
              <div className="flex-col flex text-center">
                <h1 className="text-5xl">Easy Setup!</h1>

                <p className="text-xl my-8">
                  OneWare Studio is available for all major operating systems, using
                  the most modern installation methods.
                </p>

                <div className="flex gap-5 flex-wrap">
                  <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 backdrop-blur">
                    <SiWindows size={50} />
                    <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Windows 10+
                    </h5>
                    <a href="/docs/studio/setup?current-os=windows">
                      <button className="mt-2 button button--primary">
                        Download
                      </button>
                    </a>
                  </div>

                  <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 backdrop-blur">
                    <SiApple size={50} />
                    <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      MacOS 12.0+
                    </h5>
                    <a href="/docs/studio/setup?current-os=macos">
                      <button className="mt-2 button button--primary">
                        Download
                      </button>
                    </a>
                  </div>

                  <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 backdrop-blur">
                    <SiFlathub size={50} />
                    <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Flathub
                    </h5>
                    <a href="https://flathub.org/apps/com.one_ware.OneWare" target="_blank">
                      <button className="mt-2 button button--primary">
                        Download
                      </button>
                    </a>
                  </div>

                  <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 backdrop-blur">
                    <SiSnapcraft size={50} />
                    <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Snapstore
                    </h5>
                    <a href="https://snapcraft.io/oneware" target="_blank">
                      <button className="mt-2 button button--primary">
                        Download
                      </button>
                    </a>
                  </div>

                  <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 backdrop-blur">
                    <SiLinux size={50} />
                    <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Other Linux
                    </h5>
                    <a href="/docs/studio/setup?current-os=linux">
                      <button className="mt-2 button button--primary">
                        Download
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center max-w-4xl m-auto mt-32">
          <h2 className="text-4xl font-bold">
            Speedup your Electronics Development with Digital Twins
          </h2>
          <img
            data-aos="zoom-in"
            src={"/img/studio/Elec_Studio.png"}
            alt="Compare"
          />
          <div className="text-xl md:text-2xl mt-6" data-aos="slide-up">
            The ONE WARE Studio{" "}
            <span className="primary-text">Code Extension</span> transforms
            electronics development, integrating custom electronics with FPGAs
            and microcontrollers as digital twins directly within our IDE. Focus
            on firmware innovation with our seamless{" "}
            <span className="primary-text">Hardware-Firmware Interface</span>,
            streamline <span className="primary-text">Documentation</span>, and
            ease access to past work for future advancements. Tailor the IDE
            with specific software packages, optimizing your development process
            and perfectly matching your project requirements.
          </div>
        </div>

        <div className="text-center max-w-4xl m-auto mt-32">
          <h2 className="text-4xl font-bold">
            Integrate AI Faster and Without Experts
          </h2>
          <img
            data-aos="zoom-in"
            src={"/img/studio/Studio_AI.png"}
            alt="Compare"
          />
          <div className="text-xl md:text-2xl mt-6" data-aos="slide-up">
            The ONE WARE Studio{" "}
            <span className="primary-text">AI Extension</span> is the first
            solution that moves away from universal yet inefficient neural
            networks and time consuming tailored AI solutions that depend on AI
            experts. ONE WARE Studio streamlines AI integration by{" "}
            <span className="primary-text">Guiding Users</span> without prior
            expertise through the customization of neural networks. It
            automatically crafts{" "}
            <span className="primary-text">
              Efficient and Adaptable Neural Networks
            </span>
            , which can then be effortlessly deployed across a variety of
            hardware, from FPGAs to microcontrollers, and processors equipped
            with TPUs or GPUs. Empower your operations with AI that is both
            sophisticated and accessible.
          </div>
        </div>

        <ContactUs />
      </main>
    </Layout>
  );
}
