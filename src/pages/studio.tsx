import React, { useEffect, useRef, useState } from "react";
import styles from "./studio.module.css";
import "aos/dist/aos.css";
import classnames from "classnames";
import Slider from "react-slick";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";
import Translate, { translate } from "@docusaurus/Translate";

import { SiApple } from "react-icons/si";
import { FaWindows } from "react-icons/fa";
import { SiLinux } from "react-icons/si";
import { SiFlathub } from "react-icons/si";
import { SiSnapcraft } from "react-icons/si";

const sliders = [
  {
    title: (
      <Translate id="studio.slider.codeAssistant.title">Code Assistant</Translate>
    ),
    imageSrc: (
      <img
        alt="Code Assistant"
        src={require("@site/static/img/studio/slides2/completion.png").default}
      />
    ),
    description: (
      <>
        <Translate id="studio.slider.codeAssistant.description.1">
          First class support for
        </Translate>{" "}
        <span className="primary-text">C++</span>,{" "}
        <span className="primary-text">Python</span>,{" "}
        <span className="primary-text">VHDL</span>,{" "}
        <span className="primary-text">Verilog</span>{" "}
        <Translate id="studio.slider.codeAssistant.description.2">
          and more with lots of tools to help develop your designs as
          efficiently as possible.
        </Translate>
      </>
    ),
  },
  {
    title: (
      <Translate id="studio.slider.hardwareSupport.title">Hardware Support</Translate>
    ),
    imageSrc: (
      <img
        alt="Hardware"
        src={require("@site/static/img/studio/slides2/hardware.png").default}
      />
    ),
    description: (
      <>
        <Translate id="studio.slider.hardwareSupport.description.1">
          Conveniently setup and compile your designs from your hardware.
        </Translate>{" "}
        <span className="primary-text">
          <Translate id="studio.slider.hardwareSupport.description.2">
            Directly
          </Translate>
        </span>{" "}
        <Translate id="studio.slider.hardwareSupport.description.3">
          from the IDE, which a growing number of supported toolchains and
          boards.
        </Translate>
      </>
    ),
  },
  {
    title: <Translate id="studio.slider.simulation.title">Simulation</Translate>,
    imageSrc: (
      <img
        alt="Simulation"
        src={require("@site/static/img/studio/slides2/simulator.png").default}
      />
    ),
    description: (
      <>
        <Translate id="studio.slider.simulation.description.1">
          Simulate your designs inside the IDE, using the lightning fast
          Simulation Viewer and the most popular
        </Translate>{" "}
        <span className="primary-text">
          <Translate id="studio.slider.simulation.description.2">Simulation</Translate>
        </span>{" "}
        <Translate id="studio.slider.simulation.description.3"> tools.</Translate>
      </>
    ),
  },
  {
    title: <Translate id="studio.slider.extensibility.title">Extensibility</Translate>,
    imageSrc: (
      <img
        alt="Extensible"
        src={require("@site/static/img/studio/slides2/extensions.png").default}
      />
    ),
    description: (
      <>
        <Translate id="studio.slider.extensibility.description.1">
          Download and install
        </Translate>{" "}
        <span className="primary-text">
          <Translate id="studio.slider.extensibility.description.2">
            Extensions
          </Translate>
        </span>{" "}
        <Translate id="studio.slider.extensibility.description.3">
          to extend the functionality. Discover a growing selection of
        </Translate>{" "}
        <span className="primary-text">AI-Tools</span>,{" "}
        <span className="primary-text">
          <Translate id="studio.slider.extensibility.description.4">
            Hardware-Integrations
          </Translate>
        </span>
        ,{" "}
        <span className="primary-text">
          <Translate id="studio.slider.extensibility.description.5">
            Simulators and More
          </Translate>
        </span>
        .
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
              <h1 className="font-medium text-2xl md:text-4xl">
                <Translate id="studio.homepage.hero.title.1">The</Translate>{" "}
                <span className="primary-text font-bold">
                  <Translate id="studio.homepage.hero.title.2">
                    Next Generation IDE
                  </Translate>
                </span>{" "}
                <Translate id="studio.homepage.hero.title.3">
                  for Electronics Development
                </Translate>{" "}
                <span className="primary-text font-bold">
                  <Translate id="studio.homepage.hero.title.4">is here</Translate>
                </span>
                .
              </h1>

              <div className="flex-col md:space-x-5 mb-10">
                <Link
                  className="mt-5 button button--primary button--lg hidden md:inline-block text-sm md:text-lg"
                  href="/docs/studio/setup"
                >
                  Download
                </Link>

                <Link
                  className="mt-5 button button--primary button--outline button--lg"
                  href="/docs/studio/setup"
                >
                  <Translate id="studio.homepage.hero.getStarted">
                    Get Started
                  </Translate>
                </Link>
              </div>

              <p className="md:text-xl font-normal mt-10">
                (
                <Translate id="studio.homepage.hero.opensource.1">
                  Yes, it is
                </Translate>{" "}
                <a
                  href="https://github.com/one-ware"
                  target="_blank"
                  className="primary-text font-bold"
                >
                  <Translate id="studio.homepage.hero.opensource.2">
                    Open Source
                  </Translate>
                </a>
                !)
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
            <Translate id="studio.download.heading">Easy Setup!</Translate>
          </h1>

          <p className="text-xl my-8">
            <Translate id="studio.download.subheading.1">
              ONE WARE Studio is available for
            </Translate>
            <span className="primary-text">
              {" "}
              <Translate id="studio.download.subheading.2">
                all major operating systems
              </Translate>
            </span>
            ,{" "}
            <Translate id="studio.download.subheading.3">
              using all the
            </Translate>
            <span className="primary-text">
              {" "}
              <Translate id="studio.download.subheading.4">modern</Translate>
            </span>{" "}
            <Translate id="studio.download.subheading.5">
              installation methods.
            </Translate>
          </p>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <FaWindows size={50} />
              <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <Translate id="studio.download.windows.label">
                  Windows 10+
                </Translate>
              </h5>
              <a href="/docs/studio/setup?current-os=windows">
                <button className="mt-2 button button--primary">
                  <Translate id="studio.download.button">Download</Translate>
                </button>
              </a>
            </div>

            <div className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm">
              <SiApple size={50} />
              <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                MacOS 12.0
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
                <Translate id="download.linux.label">Other Linux</Translate>
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
      <h2 className="text-4xl md:text-5xl font-bold mb-10">
        <Translate id="studio.vendor.title">Use any Hardware!</Translate>
      </h2>

      <h5 className="text-2xl md:text-3xl font-normal">
        <Translate id="studio.vendor.subtitle.1">
          Our goal is to provide first level support for
        </Translate>{" "}
        <span className="primary-text">
          <Translate id="studio.vendor.subtitle.2">any hardware</Translate>
        </span>
        ,{" "}
        <Translate id="studio.vendor.subtitle.3">
          using our advanced extension system.
        </Translate>
      </h5>

      <img
        src={require("@site/static/img/studio/hardware.png").default}
        alt="Hardware"
      />
    </div>
  );
}

function Extension() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h1 className="text-4xl md:text-5xl font-bold">
        <span className="primary-text font-bold">
          <Translate id="studio.extension.title.1">Extensions</Translate>{" "}
        </span>
        <Translate id="studio.extension.title.2"> For All Your Needs!</Translate>
      </h1>

      <div className="row mt-20 items-center">
        <div className="col flex">
          <p
            className="text-2xl font-normal md:text-left p-0 m-0"
            data-aos="slide-right"
          >
            <Translate id="studio.extension.description.1">
              ONE WARE Studio extensions let you
            </Translate>{" "}
            <span className="primary-text">
              <Translate id="studio.extension.description.2">
                customize your experience
              </Translate>{" "}
            </span>
            <Translate id="studio.extension.description.3">
              to meet all your development needs. Add custom hardware as
            </Translate>{" "}
            <span className="primary-text">
              <Translate id="extension.description.4">digital twin</Translate>
            </span>
            , <Translate id="extension.description.5">make</Translate>{" "}
            <span className="primary-text">
              <Translate id="extension.description.6">AI</Translate>{" "}
            </span>
            <Translate id="studio.extension.description.7">
              integration easier or add support for your favorite
            </Translate>{" "}
            <span className="primary-text">
              {" "}
              <Translate id="studio.extension.description.8">
                simulation
              </Translate>{" "}
            </span>
            <Translate id="studio.extension.description.9"> tool.</Translate>
          </p>
        </div>

        <div className="col items-center">
          <img
            src={require("@site/static/img/start/Elec_Studio.png").default}
            data-aos="slide-left"
            alt="Hardware"
          />
        </div>
      </div>
    </div>
  );
}

export default function Studio() {
  const slickRef = useRef<Slider>(null);

  initWebsiteEffects();

  return (
    <Layout title="Studio" description="OneWare Studio">
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
          <div className="absolute fancybackground" />
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
