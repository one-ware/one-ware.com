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
import { FaWindows } from "react-icons/fa";
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
    title: <Translate id="slider.codeAssistant.title"> "Code Assistant"</Translate>,
    imageSrc: (
      <img alt="Code Assistant" src={require('@site/static/img/studio/slides2/completion.png').default} />
    ),
    description: (
      <>
        <Translate id="slider.codeAssistant.description.1">First class support for</Translate>{" "}<span className="primary-text">C++</span>,{" "}
        <span className="primary-text">Python</span>,{" "}
        <span className="primary-text">VHDL</span>,{" "}
        <span className="primary-text">Verilog</span> <Translate id="slider.codeAssistant.description.2">and more with lots of
        tools to help develop your designs as efficiently as possible.</Translate>
      </>
    ),
  },
  {
    title: (
      <Translate id="slider.hardwareSupport.title">Hardware Support</Translate>
    ),
    imageSrc: (
      <img
        alt="Hardware"
        src={require('@site/static/img/studio/slides2/hardware.png').default}
      />
    ),
     description: (
      <>
        <Translate id="slider.hardwareSupport.description.1">Conveniently setup and compile your designs from your hardware.</Translate>{" "}
        <span className="primary-text"><Translate id="slider.hardwareSupport.description.2">Directy</Translate></span>{" "}<Translate id="slider.hardwareSupport.description.3"> from the IDE, which a
        growing number of supported toolchains and boards.</Translate>
      </>
    ),
  },
  {
    title: (
      <Translate id="slider.simulation.title">Simulation</Translate>
    ),
    imageSrc: (
      <img
        alt="Simulation"
        src={require('@site/static/img/studio/slides2/simulator.png').default}
      />
    ),
    description: (
      <>
      <Translate id="slider.simulation.description.1">
        Simulate your designs inside the IDE, using the lightning fast
        Simulation Viewer and the most popular</Translate>{" "}
        <span className="primary-text"><Translate id="slider.simulation.description.2">Simulation</Translate></span><Translate id="slider.simulation.description.3"> tools.</Translate>    
      </>
    ),
  },
  {
    title: (
      <Translate id="slider.extensibility.title">Extensibility</Translate>
    ),
    imageSrc: (
      <img
        alt="Extensible"
        src={require('@site/static/img/studio/slides2/extensions.png').default}
      />
    ),
    description: (
      <>
      <Translate id="slider.extensibility.description.1">
        Download and install</Translate>{" "}<span className="primary-text"><Translate id="slider.extensibility.description.2">Extensions</Translate></span>{" "}<Translate id="slider.extensibility.description.3">to
        extend the functionality. Discover a growing selection of</Translate>{" "}
        <span className="primary-text">AI-Tools</span>,{" "}
        <span className="primary-text"><Translate id="slider.extensibility.description.4">Hardware-Integrations</Translate></span>,{" "}
        <span className="primary-text"><Translate id="slider.extensibility.description.5">Simulators and More</Translate></span>.
      
      </>
    ),
  },
];

const ai_sliders = [
  {
    title: (
      <Translate id="aiSlider.universalAssistant.title">
        Universal Assistant
      </Translate>
    ),
    imageSrc: (
      <img
        alt="Extensible"
        src={require('@site/static/img/studio/slides/ai.png').default}
      />
    ),
    description: (
      <>
      <Translate id="aiSlider.universalAssistant.description.1">
        ONE AI lets you build efficient AIs to process</Translate>{" "}
        <span className="primary-text"><Translate id="aiSlider.universalAssistant.description.2">Images, Audio and Sensor Data</Translate></span>.<Translate id="aiSlider.universalAssistant.description.3">Our
        assistant has the know-how of all current AI research and you just have
        to answer a few questions to create your own individual AI. Then</Translate>{" "}
        <span className="primary-text">ONE WARE Studio</span><Translate id="aiSlider.universalAssistant.description.4"> helps to integrate
        the AI in your product.</Translate>     
      </>
    ),
  },
  {
    title: (
      <Translate id="aiSlider.qualityControl.title">
        Quality Control
      </Translate>
    ),
    imageSrc: (
      <img
        alt="Extensible"
        src={require('@site/static/img/ai/quality.png').default}
      />
    ),
    description: (
      <>
      <Translate id="aiSlider.qualityControl.description.1">
        Create your custom quality control with our AI based</Translate>{" "}
        <span className="primary-text"><Translate id="aiSlider.qualityControl.description.2">Image Processing</Translate></span> framework. ONE AI
        <Translate id="aiSlider.qualityControl.description.3">makes sure that you always use the newest scientific findings to get the</Translate>{" "}
        <span className="primary-text"><Translate id="aiSlider.qualityControl.description.4">Most Accurate and Efficient AI</Translate></span>.
      </>
    ),
  },
  {
    title: (
      <Translate id="aiSlider.predictiveMaintenance.title">
        Predictive Maintenance
      </Translate>
    ),
    imageSrc: (
      <img
        alt="Extensible"
        src={require('@site/static/img/ai/Predictive_Maintenance.png').default}
      />
    ),
    description: (
      <>
      <Translate id="aiSlider.predictiveMaintenance.description.1">
        Fix problems before they occur. ONE AI takes sensor-data from your
        machine and can </Translate><span className="primary-text"><Translate id="aiSlider.predictiveMaintenance.description.2">predict defects </Translate></span>{" "}
        <Translate id="aiSlider.predictiveMaintenance.description.3">before they occur, so your production can run without interruption.</Translate>    
      </>
    ),
  },
  {
    title: (
      <Translate id="aiSlider.robotsAndDrones.title">
        Robots and Drones
      </Translate>
    ),
    imageSrc: (
      <img
        alt="Code Assistant"
        src={require('@site/static/img/ai/Titel.png').default}
      />
    ),
    description: (
      <>
      <Translate id="aiSlider.robotsAndDrones.description.1">
        Replace the last manual steps of your production with autonomous robots
        and drones. ONE AI lets your robot or drone</Translate>{" "}
        <span className="primary-text"><Translate id="aiSlider.robotsAndDrones.description.2">See, Hear and Think for Itself</Translate></span>.
      
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
                <Translate id="homepage.hero.title.1">
                  The</Translate> <span className="primary-text font-bold"><Translate id="homepage.hero.title.2">Next Generation IDE</Translate></span>{" "}<Translate id="homepage.hero.title.3"> for Electronics Development </Translate>{" "}<span className="primary-text font-bold"><Translate id="homepage.hero.title.4">is here</Translate></span>.
             
              </h1>

              <div className="flex-col md:space-x-5 mb-10">
                <Link
                  className="mt-5 button button--primary button--lg hidden md:inline-block"
                  href="/docs/studio/setup"
                >
                  <Translate id="homepage.hero.download">Download</Translate>
                </Link>

                <Link
                  className="mt-5 button button--primary button--outline button--lg"
                  href="/docs/studio/setup"
                >
                  <Translate id="homepage.hero.getStarted">Get Started</Translate>
                </Link>
              </div>

              <p className="md:text-xl font-normal mt-10">
                
                  (<Translate id="homepage.hero.opensource.1">Yes, it is</Translate> <a href="https://github.com/one-ware" target="_blank" className="primary-text font-bold"><Translate id="homepage.hero.opensource.2">Open Source</Translate></a>!)
                
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
          <h1 className="text-4xl md:text-5xl">
            <Translate id="download.heading">Easy Setup!</Translate>
          </h1>

          <p className="text-xl my-8">
            <Translate id="download.subheading.1">
              ONE WARE Studio is available for </Translate>
              <span className="primary-text">{" "}<Translate id="download.subheading.2">all major operating systems</Translate></span>,{" "}
              <Translate id="download.subheading.3">using all the </Translate><span className="primary-text">{" "}<Translate id="download.subheading.4">modern</Translate></span>{" "}
              <Translate id="download.subheading.5">installation methods.</Translate>
           
          </p>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <FaWindows size={50} />
              <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <Translate id="download.windows.label">Windows 10+</Translate>
              </h5>
              <a href="/docs/studio/setup?current-os=windows">
                <button className="mt-2 button button--primary">
                  <Translate id="download.button">Download</Translate>
                </button>
              </a>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <SiApple size={50} />
              <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <Translate id="download.macos.label">MacOS 12.0+</Translate>
              </h5>
              <a href="/docs/studio/setup?current-os=macos">
                <button className="mt-2 button button--primary">
                  <Translate id="download.button">Download</Translate>
                </button>
              </a>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <SiFlathub size={50} />
              <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <Translate id="download.flathub.label">Flathub</Translate>
              </h5>
              <a href="https://flathub.org/apps/com.one_ware.OneWare" target="_blank">
                <button className="mt-2 button button--primary">
                  <Translate id="download.button">Download</Translate>
                </button>
              </a>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <SiSnapcraft size={50} />
              <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <Translate id="download.snapstore.label">Snapstore</Translate>
              </h5>
              <a href="https://snapcraft.io/oneware" target="_blank">
                <button className="mt-2 button button--primary">
                  <Translate id="download.button">Download</Translate>
                </button>
              </a>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <SiLinux size={50} />
              <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <Translate id="download.linux.label">Other Linux</Translate>
              </h5>
              <a href="https://cdn.one-ware.com/onewarestudio/" target="_blank">
                <button className="mt-2 button button--primary">
                  <Translate id="download.button">Download</Translate>
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
      <h2 className="text-4xl md:text-5xl font-bold mb-10">
        <Translate id="vendor.title">Use any Hardware!</Translate>
      </h2>

      <h5 className="text-2xl md:text-3xl font-normal">
        <Translate id="vendor.subtitle.1">
          Our goal is to provide first level support for</Translate>{" "}
          <span className="primary-text"><Translate id="vendor.subtitle.2">any hardware</Translate></span>, <Translate id="vendor.subtitle.3">using our advanced
          extension system.</Translate>
        
      </h5>

      <img
        src={require('@site/static/img/studio/hardware.png').default}
        alt="Hardware"
      />
    </div>
  );
}

function Extension() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h1 className="text-4xl md:text-5xl font-bold">     
          <span className="primary-text font-bold"><Translate id="extension.title.1">Extensions</Translate>{" "}</span><Translate id="extension.title.2"> For All Your Needs!</Translate>      
      </h1>

      <div className="row mt-20 items-center">
        <div className="col flex">
          <p
            className="text-2xl font-normal md:text-left p-0 m-0"
            data-aos="slide-right"
          >
            <Translate id="extension.description.1">
              ONE WARE Studio extensions let you </Translate>{" "}
              <span className="primary-text"><Translate id="extension.description.2">customize your experience</Translate>{" "}</span><Translate id="extension.description.3"> to
              meet all your development needs. Add custom hardware as</Translate>{" "}
              <span className="primary-text"><Translate id="extension.description.4">digital twin</Translate></span>, <Translate id="extension.description.5">make</Translate>{" "}
              <span className="primary-text"><Translate id="extension.description.6">AI</Translate>{" "}</span><Translate id="extension.description.7"> integration easier or add
              support for your favorite</Translate>{" "}
              <span className="primary-text"> <Translate id="extension.description.8">simulation</Translate>{" "}</span><Translate id="extension.description.9"> tool.</Translate>
            
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
        <Translate id="beta.title">Be one of the first to test ONE AI! 🚀</Translate>
      </h2>
      <div className="text-xl md:text-2xl mt-6">
        
          <strong><Translate id="beta.description.1">You Want to Build Custom AI Models? </Translate></strong><Translate id="beta.description.2"> Experience the
          future of AI! Automatically generate tailored AI models with ONE AI.
          Sign up for the waitlist to get free exclusive access to the closed
          beta.</Translate>
       
        <br />
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://forms.office.com/e/ptgVNPN9AL" target="_blank">
            <button className="button button--secondary text-xl">
              <Translate id="beta.webinar">ONE AI Webinar</Translate>
            </button>
          </a>
          <a href="https://forms.office.com/e/J3HDid9fzw" target="_blank">
            <button className="button button--primary text-xl">
              <Translate id="beta.waitlist">ONE AI Waitlist</Translate>
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

export default function Studio() {
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
        <div className="h-96 absolute w-full">
          {init && <FancyParticles parallax={true} id="topParticles" />}
        </div>
      </div>

      <HomepageHeader />

      <main>
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
          <div
            className="absolute w-full -z-10"
            style={{ top: -50, height: "50rem" }}
          >
            {init && <FancyParticles parallax={true} id="downloadParticles" />}
          </div>
          <DownloadSection />
        </div>

        <div className="dropshadowtop">
          <div className="default-background diagcliptop pt-32 md:pt-48">
            <div className="bottomsplit pb-24 mb-24 container">
              <Extension />
            </div>

        

            <VendorSection />
          </div>
        </div>

        <div className="default-background mt-20">
          <div className="dropshadowtop">
            <div className="alternative-background diagcliptop pt-6">
              <div className="container pb-20 mt-20">
                <div className="mb-10">
                  <ContactUs />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
