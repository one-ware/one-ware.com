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
    title: "Capture and Label",
    imageSrc: (
      <img alt="Capture" src="/img/ai/Capture.png" />
    ),
    description: (
      <>
        Capture just a few images, label them - ONE AI takes care of the rest.
        ONE AI requires only a <span className="primary-text">small dataset</span>{" "}to deliver a <span className="primary-text">fully functional AI model</span>.
        Its adaptive architecture automatically scales with your data.
      </>
    ),
  },
  {
    title: "Guide and Select",
    imageSrc: <img alt="Hardware" src="/img/ai/Pre.png" />,
    description: (
      <>
        Use our <span className="primary-text">intuitive and visual process</span>{" "}to teach the AI what is important, where to generalize and what to predict.
You can specify your <span className="primary-text">exact hardware and performance requirements</span>{" "}and then let ONE AI create the perfect model for your needs.
      </>
    ),
  },
  {
    title: "Predict and Train",
    imageSrc: <img alt="Simulation" src="/img/ai/Train.png" />,
    description: (
      <>
        After you start training, ONE AI will automatically generate a <span className="primary-text">custom neural network</span>{" "}for your <span className="primary-text">hardware and application</span>.  
The AI then trains on your data, but only learns <span className="primary-text">what is important</span>. This ensures <span className="primary-text">highest performance and accuracy</span>.
      </>
    ),
  },
  {
    title: "Test and Deploy",
    imageSrc: <img alt="Extensible" src="/img/ai/Export.png" />,
    description: (
      <>
        While training and testing, the AI already behaves like on your target hardware. No matter if you are using an <span className="primary-text">FPGA</span>, <span className="primary-text">Microcontroller</span>, <span className="primary-text">GPU</span>, <span className="primary-text">CPU</span>{" "}or <span className="primary-text">TPU</span>.
        If you are sattisfied with the results, you can export the AI as cross-platform <span className="primary-text">executable</span>, universal <span className="primary-text">HDL</span>{" "}code, <span className="primary-text">C++</span>{" "}project or <span className="primary-text">ONNX/TF/TF-Lite Model</span>.
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
                  Next Generation
                </span>{" "}
                of AI Development:<br />
                Any Hardware. Any Application. <span className="primary-text font-bold">ONE AI</span>.
              </h1>

              <div className="flex-col md:space-x-5 mb-10">
                <Link
                  className="mt-5 button button--primary button--lg hidden md:inline-block"
                  href="https://forms.office.com/e/J3HDid9fzw"
                >
                  Join Waitlist
                </Link>

                <Link
                  className="mt-5 button button--primary button--outline button--lg"
                  href="#contact"
                >
                  Contact Us
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
          <h1 className="text-4xl md:text-5xl">Don't Upgrade Your Hardware — Upgrade Your AI!</h1>

          <p className="text-3xl my-8 font-bold primary-text">
            ONE AI makes decade-old chips outperform todays leading edge AI hardware! 
          </p>
          <p className="text-2xl  font-normal">
            Read the Whitepaper from out Partner Altera<br/>and see how Altera's MAX® 10 can now outperform Nvidia's Jetson Orin Nano with:
          </p>

          <div className="flex my-8 gap-5 flex-wrap justify-center">
            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <h5 className="mb-2 mt-2 text-5xl tracking-tight primary-text font-bold">
                488x
              </h5>
              <p className="mb-3 text-xl font-normal text-gray-900 dark:text-white">
                Lower Latency
              </p>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <h5 className="mb-2 mt-2 text-5xl tracking-tight primary-text font-bold">
                24x
              </h5>
              <p className="mb-3 text-xl font-normal text-gray-900 dark:text-white">
                Higher Accuracy
              </p>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <h5 className="mb-2 mt-2 text-5xl tracking-tight primary-text font-bold">
                20x
              </h5>
              <p className="mb-3 text-xl font-normal text-gray-900 dark:text-white">
                Lower Power
              </p>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <h5 className="mb-2 mt-2 text-5xl tracking-tight primary-text font-bold">
                6x
              </h5>
              <p className="mb-3 text-xl font-normal text-gray-900 dark:text-white">
                Lower Cost
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8 flex-col md:flex-row">
            <a href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn" target="_blank">
              <button className="button button--primary text-xl">
                Read the Whitepaper
              </button>
              
            </a>

            <a href="https://forms.office.com/e/J3HDid9fzw" target="_blank">
              <button className="button button--secondary text-xl">
                Join ONE AI Waitlist
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
        Foundation Models <span className="primary-text">Weren't Built for You</span>.<br/>
        <span className="primary-text">ONE AI</span> Creates Models That Are.
      </h2>

      <h5 className="text-2xl mb-16 md:text-3xl font-normal">
        With ONE AI you always get a <span className="primary-text">custom neural network in seconds</span> that fits your exact Hardware, performance and use case requirements.
      </h5>
    </div>
  );
}

function Extension() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h1 className="text-4xl md:text-5xl font-bold">
        <span className="primary-text font-bold"> Extensions</span> For All Your
        Needs!
      </h1>

      <div className="row mt-20 items-center">
        <div className="col flex ">
          <p
            className="text-2xl font-normal md:text-left p-0 m-0"
            data-aos="slide-right"
          >
            ONE WARE Studio extensions let you{" "}
            <span className="primary-text">customize your experience</span> to
            meet all your development needs. Add custom hardware as{" "}
            <span className="primary-text">digital twin</span>, make{" "}
            <span className="primary-text">AI</span> integration easier or add
            support for your favorite{" "}
            <span className="primary-text">simulation</span> tool.
          </p>
        </div>

        <div className="col items-center">
          <img
            src="/img/start/Elec_Studio.png"
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
      <h2 className="text-4xl font-bold">Be the first to test ONE AI! 🚀</h2>
      <div className="text-xl md:text-2xl mt-6">
        <strong>You Want to Build Custom AI Models?</strong> Experience the
        future of AI! Automatically generate tailored AI models with ONE AI.
        Sign up for the waitlist to get free exclusive access to the closed
        beta. <br />
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://forms.office.com/e/ptgVNPN9AL" target="_blank">
            <button className="button button--secondary text-xl">
              ONE AI Webinar
            </button>
          </a>
          <a href="https://forms.office.com/e/J3HDid9fzw" target="_blank">
            <button className="button button--primary text-xl">
              ONE AI Waitlist
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
