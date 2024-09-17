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
import { loadFull } from "tsparticles";

import { SiApple } from "react-icons/si";
import { SiWindows } from "react-icons/si";
import { SiLinux } from "react-icons/si";
import { SiFlathub } from "react-icons/si";
import { SiSnapcraft } from "react-icons/si";

import { HiOutlineCpuChip } from "react-icons/hi2";
import { BiMicrochip } from "react-icons/bi";

type FancyParticlesProps = {
  id: string;
  parallax: boolean;
};

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

const ai_sliders = [
  {
    title: "Universal Assistant",
    imageSrc: <img alt="Extensible" src="/img/studio/slides/ai.png" />,
    description: (
      <>
        ONE AI lets you build efficient AIs to process <span className="primary-text">Images, Audio and Sensor Data</span>.
        Our assistant has the know how of all current AI research and you just have to answer a few questions to create your own individual AI.
        Then <span className="primary-text">ONE WARE Studio</span> helps to integrate the AI in your product.
      </>
    ),
  },
  {
    title: "Quality Control",
    imageSrc: <img alt="Extensible" src="/img/ai/quality.png" />,
    description: (
      <>
        Create your custom quality control with our AI based <span className="primary-text">Image Processing</span> framework.
        ONE AI makes sure that you always use the newest scientific findings to get the <span className="primary-text">Most Accurate and Efficient AI</span>.
      </>
    ),
  },
  {
    title: "Predictive Maintenance",
    imageSrc: <img alt="Extensible" src="/img/ai/Predictive_Maintenance.png" />,
    description: (
      <>
        Fix problems before they occur. ONE AI takes sensor-data from your machine and can {" "}
        <span className="primary-text">predict defects</span> before they occur, so your production can run without interruption.
      </>
    ),
  },
  {
    title: "Robots and Drones",
    imageSrc: <img alt="Code Assistant" src="/img/ai/Titel.png" />,
    description: (
      <>
        Replace the last manual steps of your production with autonomous robots and
        drones. ONE AI lets your robot or drone <span className="primary-text">See, Hear and Think for Itself</span>.
      </>
    ),
  },

];

function HomepageHeader() {
  return (
    <header id="hero" className={`w-full ${styles.heroBackground} h-96`}>
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


              <p className="md:text-xl font-normal mt-10">
                (Yes, it is <a href="https://github.com/one-ware" target="_blank" className="primary-text font-bold">Open Source</a>!)
              </p>

            </div>
          </div>
        </div>
      </div>

      <div className={styles.startArrow} />
    </header>
  );
}

function DownloadSection() {
  return (
    <div className="py-24 md:py-40 overflow-x-hidden">
      <div className="text-center container m-auto flex space-x-5 justify-center">
        <div className="flex-col flex text-center">
          <h1 className="text-4xl md:text-5xl">Easy Setup!</h1>

          <p className="text-xl my-8">
            OneWare Studio is available for{" "}
            <span className="primary-text">all major operating systems</span>,
            using all the <span className="primary-text">modern</span>{" "}
            installation methods.
          </p>

          <div className="flex gap-5 flex-wrap">
            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
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

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
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

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <SiFlathub size={50} />
              <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Flathub
              </h5>
              <a
                href="https://flathub.org/apps/com.one_ware.OneWare"
                target="_blank"
              >
                <button className="mt-2 button button--primary">
                  Download
                </button>
              </a>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
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

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <SiLinux size={50} />
              <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Other Linux
              </h5>
              <a href="https://cdn.one-ware.com/onewarestudio/" target="_blank">
                <button className="mt-2 button button--primary">
                  Download
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VendorSection() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h2 className="text-4xl md:text-5xl font-bold mb-10">Use any Hardware!</h2>

      <h5 className="text-2xl md:text-3xl font-normal" data-aos="slide-up">
        Our goal is to provide first level support for{" "}
        <span className="primary-text">any hardware</span>, using our advanced
        extension system.
      </h5>

      <img src="/img/studio/hardware.png" data-aos="zoom-in" alt="Hardware" />
    </div>
  );
}

function Extension() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h1 className="text-4xl md:text-5xl font-bold"><span className="primary-text font-bold"> Extensions</span> Are All You Need!</h1>

      <div className="row my-20">
        <div className="col">
          <p className="text-2xl font-normal md:text-left p-0" data-aos="slide-right">
            ONE WARE Studio extensions let you <span className="primary-text">customize your experience</span> to meet all your development needs.
            Add custom hardware as <span className="primary-text">digital twin</span>, make <span className="primary-text">AI</span> integration easier or add support for your favorite <span className="primary-text">simulation</span> tool.
          </p>
        </div>

        <div className="col">
          <img src="/img/start/Elec_Studio.png" data-aos="slide-left" alt="Hardware" />
        </div>

      </div>



    </div>
  );
}

function AI() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden" data-aos="slide-up">
      <h2 className="text-4xl md:text-5xl font-bold" >Develop and Integrate AI <span className="primary-text font-bold"> Without Experts</span></h2>

      <h5 className="text-2xl font-normal my-10">
        The ONE WARE Studio Extension ONE AI creates <span className="primary-text">industry leading</span> neural networks tailored to your needs.
      </h5>

    </div>
  );
}

function FancyParticles(props: FancyParticlesProps) {
  return (
    <Particles
      className="w-full h-full hidden md:block"
      id={props.id}
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
                enable: props.parallax,
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
            distance: 550,
            enable: false,
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
              min: 0.1,
              max: 0.3,
            },
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.2,
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
  );
}

export default function Studio(): JSX.Element {
  const slickRef = useRef<Slider>(null);

  const slickRef2 = useRef<Slider>(null);

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
    <Layout title="Studio" description="OneWare Studio">
      <div className={`absolute w-full -z-10 ${styles.particleBackground}`}>
        <div className="h-96 absolute w-full">{init && <FancyParticles parallax={true} id="topParticles" />}</div>
      </div>

      <HomepageHeader />

      <main className="pb-32">
        <div className="dropshadowbottom">
          <div className="default-background diagclipbottom pt-16">
            <div className="container overflow-x-hidden">
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
                          if (i == n)
                            slide.classList.add(styles.activeslide ?? "");
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
                          "block padding-vert--lg p-2 overflow-x-hidden",
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
          </div>
        </div>

        <div className="relative">
          <div className="absolute w-full -z-10" style={{ top: -50, height: "50rem" }}>
            {init && <FancyParticles parallax={true} id="downloadParticles" />}
          </div>
          <DownloadSection />
        </div>

        <div className="dropshadowtop">
          <div className="default-background diagcliptop pt-32 md:pt-48">
            <Extension />

            <AI />

            <div className="container" style={{ overflowX: "hidden" }}>
              {ai_sliders && ai_sliders.length && (
                <div className="pb-20">
                  <Slider
                    ref={slickRef2}
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
                      var slideCount = ai_sliders.length;
                      for (var i = 0; i < slideCount; i++) {
                        var slide = document.getElementById("slide" + i);
                        if (slide) {
                          if (i == n) slide.classList.add(styles.activeslide ?? "");
                          else slide.classList.remove(styles.activeslide ?? "");
                        }
                      }
                    }}
                  >
                    {ai_sliders.map(({ imageSrc, title, description }, idx2) => (
                      <div key={idx2}>
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
                    {ai_sliders.map(({ title, description }, idx2) => (
                      <div
                        key={idx2}
                        onClick={() => slickRef2.current?.slickGoTo(idx2)}
                        className={classnames(
                          "block padding-vert--lg p-2 overflow-hidden",
                          styles.slidebutton
                        )}
                        id={"slide" + idx2}
                      >
                        <h3>{title}</h3>
                        <span>{description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <VendorSection />

            <ContactUs />
          </div>
        </div>
      </main>
    </Layout>
  );
}
