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
import Translate, { translate } from "@docusaurus/Translate";

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
    title: <Translate id="slider.capture.title">Capture and Label</Translate>,
    imageSrc: (
      <img alt="Capture" src={require('@site/static/img/ai/Capture.png').default} />
    ),
    description: <Translate id="slider.capture.description">Capture just a few images, label them - ONE AI takes care of the rest. ONE AI requires only a small dataset to deliver a fully functional AI model. Its adaptive architecture automatically scales with your data.</Translate>
  },
  {
    title: <Translate id="slider.guide.title">Guide and Select</Translate>,
    imageSrc: <img alt="Hardware" src={require('@site/static/img/ai/Pre.png').default} />,
    description: <Translate id="slider.guide.description">Use our intuitive and visual process to teach the AI what is important, where to generalize and what to predict. You can specify your exact hardware and performance requirements and then let ONE AI create the perfect model for your needs.</Translate>
  },
  {
    title: <Translate id="slider.predict.title">Predict and Train</Translate>,
    imageSrc: <img alt="Simulation" src={require('@site/static/img/ai/Train.png').default} />,
    description: <Translate id="slider.predict.description">After you start training, ONE AI will automatically generate a custom neural network for your hardware and application. The AI then trains on your data, but only learns what is important. This ensures highest performance and accuracy.</Translate>
  },
  {
    title: <Translate id="slider.test.title">Test and Deploy</Translate>,
    imageSrc: <img alt="Extensible" src={require('@site/static/img/ai/Export.png').default} />,
    description: <Translate id="slider.test.description">While training and testing, the AI already behaves like on your target hardware. No matter if you are using an FPGA, Microcontroller, GPU, CPU or TPU. If you are satisfied with the results, you can export the AI as cross-platform executable, universal HDL code, C++ project or ONNX/TF/TF-Lite Model.</Translate>
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
                <Translate id="homepage.hero.start" description="First part of the hero title">
                  The
                </Translate>{" "}
                <span className="primary-text font-bold">
                  <Translate id="homepage.hero.highlight1" description="Highlighted phrase in hero title">
                    Next Generation
                  </Translate>
                </span>{" "}
                <Translate id="homepage.hero.middle" description="Middle part of the hero title">
                  of AI Development:
                </Translate>
                <br />
                <Translate id="homepage.hero.subtext" description="Subheading of hero title">
                  Any Hardware. Any Application.
                </Translate>{" "}
                <span className="primary-text font-bold">
                  <Translate id="homepage.hero.highlight2" description="ONE AI text">
                    ONE AI
                  </Translate>
                </span>.
              </h1>

              <div className="flex-col md:space-x-5 mb-10">
                <Link
                  className="mt-5 button button--primary button--lg hidden md:inline-block"
                  href="https://forms.office.com/e/J3HDid9fzw"
                >
                  <Translate id="homepage.hero.join" description="Join waitlist button">
                    Join Waitlist
                  </Translate>
                </Link>

                <Link
                  className="mt-5 button button--primary button--outline button--lg"
                  href="#contact"
                >
                  <Translate id="homepage.hero.contact" description="Contact us button">
                    Contact Us
                  </Translate>
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

function DownloadSection() {
  return (
    <div className="py-24 md:py-40 overflow-x-hidden">
      <div className="text-center container m-auto flex space-x-5 justify-center">
        <div className="flex-col flex text-center">
          <h1 className="text-4xl md:text-5xl">
            <Translate id="download.heading" description="Main heading in download section">
              Don't Upgrade Your Hardware — Upgrade Your AI!
            </Translate>
          </h1>

          <p className="text-3xl my-8 font-bold primary-text">
            <Translate id="download.subheading" description="Subheading about ONE AI's hardware performance">
              ONE AI makes decade-old chips outperform todays leading edge AI hardware!
            </Translate>
          </p>

          <p className="text-2xl font-normal">
            <Translate id="download.description1" description="Intro to whitepaper">
              Read the Whitepaper from our Partner Altera
            </Translate>
            <br />
            <Translate id="download.description2" description="Comparison line to Jetson Orin">
              and see how Altera's MAX® 10 can now outperform Nvidia's Jetson Orin Nano with:
            </Translate>
          </p>

          <div className="flex my-8 gap-5 flex-wrap justify-center">
            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <h5 className="mb-2 mt-2 text-5xl tracking-tight primary-text font-bold">
                488x
              </h5>
              <p className="mb-3 text-xl font-normal text-gray-900 dark:text-white">
                <Translate id="download.metric1" description="Lower latency metric">
                  Lower Latency
                </Translate>
              </p>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <h5 className="mb-2 mt-2 text-5xl tracking-tight primary-text font-bold">
                24x
              </h5>
              <p className="mb-3 text-xl font-normal text-gray-900 dark:text-white">
                <Translate id="download.metric2" description="Higher accuracy metric">
                  Higher Accuracy
                </Translate>
              </p>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <h5 className="mb-2 mt-2 text-5xl tracking-tight primary-text font-bold">
                20x
              </h5>
              <p className="mb-3 text-xl font-normal text-gray-900 dark:text-white">
                <Translate id="download.metric3" description="Lower power metric">
                  Lower Power
                </Translate>
              </p>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <h5 className="mb-2 mt-2 text-5xl tracking-tight primary-text font-bold">
                6x
              </h5>
              <p className="mb-3 text-xl font-normal text-gray-900 dark:text-white">
                <Translate id="download.metric4" description="Lower cost metric">
                  Lower Cost
                </Translate>
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8 flex-col md:flex-row">
            <a href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn" target="_blank">
              <button className="button button--primary text-xl">
                <Translate id="download.cta.whitepaper" description="Button text to read the whitepaper">
                  Read the Whitepaper
                </Translate>
              </button>
            </a>

            <a href="https://forms.office.com/e/J3HDid9fzw" target="_blank">
              <button className="button button--secondary text-xl">
                <Translate id="download.cta.waitlist" description="Button text to join waitlist">
                  Join ONE AI Waitlist
                </Translate>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function VendorSection() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h2 className="text-4xl md:text-5xl font-bold mb-10">
        <Translate id="hero.title">The Next Generation of AI Development: Any Hardware. Any Application. ONE AI.</Translate>
      </h2>
      <h5 className="text-2xl mb-16 md:text-3xl font-normal">
        <Translate id="hero.title">The Next Generation of AI Development: Any Hardware. Any Application. ONE AI.</Translate>
      </h5>
    </div>
  );
}

function Extension() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h1 className="text-4xl md:text-5xl font-bold">
        <Translate id="hero.title">The Next Generation of AI Development: Any Hardware. Any Application. ONE AI.</Translate>
      </h1>
      <div className="row mt-20 items-center">
        <div className="col flex">
          <p
            className="text-2xl font-normal md:text-left p-0 m-0"
            data-aos="slide-right"
          >
            <Translate id="hero.title">The Next Generation of AI Development: Any Hardware. Any Application. ONE AI.</Translate>
          </p>
        </div>
        <div className="col items-center">
          <img
            src={require('@site/static/img/start/Elec_Studio.png').default}
            data-aos="slide-left"
            alt="Hardware"
          />
        </div>
      </div>
    </div>
  );
}

function Beta() {
  return (
    <div className="text-center max-w-6xl m-auto mt-8 mb-16">
      <h2 className="text-4xl font-bold">
        <Translate id="hero.title">The Next Generation of AI Development: Any Hardware. Any Application. ONE AI.</Translate>
      </h2>
      <div className="text-xl md:text-2xl mt-6">
        <Translate id="hero.title">The Next Generation of AI Development: Any Hardware. Any Application. ONE AI.</Translate>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://forms.office.com/e/ptgVNPN9AL" target="_blank">
            <button className="button button--secondary text-xl">
              <Translate id="hero.title">The Next Generation of AI Development: Any Hardware. Any Application. ONE AI.</Translate>
            </button>
          </a>
          <a href="https://forms.office.com/e/J3HDid9fzw" target="_blank">
            <button className="button button--primary text-xl">
              <Translate id="hero.title">The Next Generation of AI Development: Any Hardware. Any Application. ONE AI.</Translate>
            </button>
          </a>
        </div>
      </div>
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
    <Layout title="ONE AI" description="ONE AI for Any Hardware and Any Application">
      <div className={`absolute w-full -z-10 ${styles.particleBackground}`}>
        <div className="h-96 absolute w-full">
          {init && <FancyParticles parallax={true} id="topParticles" />}
        </div>
      </div>

      <HomepageHeader />

      <main>
        <div className="dropshadowbottom">
          <div className="default-background diagclipbottom pt-16">
              <VendorSection />

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
          <div
            className="absolute w-full -z-10"
            style={{ top: -50, height: "50rem" }}
          >
            {init && <FancyParticles parallax={true} id="downloadParticles" />}
          </div>
          <DownloadSection />
        </div>

        <div className="dropshadowtop">
          <div className="default-background diagcliptop pt-6">
          <div className="container pb-20 mt-20">
                <div id="contact" className="mb-10">
                  <ContactUs />
                </div>
              </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
