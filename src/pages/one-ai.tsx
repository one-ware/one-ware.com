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

const sliders = [
  {
    title: <Translate id="oneai.slider.capture">Capture and Label</Translate>,
    imageSrc: (
      <img
        alt="Capture"
        src={require("@site/static/img/ai/Capture.png").default}
      />
    ),
    description: (
      <Translate id="oneai.slider.capture.description">
        Capture just a few images, label them - ONE AI takes care of the rest.
        ONE AI requires only a small dataset to deliver a fully functional AI
        model. Its adaptive architecture automatically scales with your data.
      </Translate>
    ),
  },
  {
    title: <Translate id="oneai.slider.guide">Guide and Select</Translate>,
    imageSrc: (
      <img
        alt="Hardware"
        src={require("@site/static/img/ai/Pre.png").default}
      />
    ),
    description: (
      <Translate id="oneai.slider.guide.description">
        Use our intuitive and visual process to teach the AI what is important,
        where to generalize and what to predict. You can specify your exact
        hardware and performance requirements and then let ONE AI create the
        perfect model for your needs.
      </Translate>
    ),
  },
  {
    title: <Translate id="oneai.slider.train">Predict and Train</Translate>,
    imageSrc: (
      <img
        alt="Simulation"
        src={require("@site/static/img/ai/Train.png").default}
      />
    ),
    description: (
      <Translate id="oneai.slider.train.description">
        After you start training, ONE AI will automatically generate a custom
        neural network for your hardware and application. The AI then trains on
        your data, but only learns what is important. This ensures highest
        performance and accuracy.
      </Translate>
    ),
  },
  {
    title: <Translate id="oneai.slider.deploy">Test and Deploy</Translate>,
    imageSrc: (
      <img
        alt="Extensible"
        src={require("@site/static/img/ai/Export.png").default}
      />
    ),
    description: (
      <Translate id="oneai.slider.deploy.description">
        While training and testing, the AI already behaves like on your target
        hardware. No matter if you are using an FPGA, Microcontroller, GPU, CPU
        or TPU. If you are satisfied with the results, you can export the AI as
        cross-platform executable, universal HDL code, C++ project or
        ONNX/TF/TF-Lite Model.
      </Translate>
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
                <Translate id="oneai.hero.start">The</Translate>{" "}
                <span className="primary-text font-bold">
                  <Translate id="oneai.hero.highlight1">Next Generation</Translate>
                </span>{" "}
                <Translate id="oneai.hero.middle">of AI Development:</Translate>
                <br />
                <Translate id="oneai.hero.subtext">Any Hardware. Any Application.</Translate>{" "}
                <span className="primary-text font-bold">
                  <Translate id="oneai.hero.name">ONE AI</Translate>
                </span>
                .
              </h1>

              <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-5 mb-10">
                <Link
                  className="button button--primary button--lg text-sm md:text-lg"
                  href="https://forms.office.com/e/J3HDid9fzw"
                >
                  <Translate id="oneai.hero.cta.join">Join Waitlist</Translate>
                </Link>
                  
                <Link
                  className="button button--primary button--outline button--lg text-sm md:text-lg"
                  href="#contact"
                >
                  <Translate id="oneai.hero.cta.contact">Contact Us</Translate>
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

function ComparisonSection() {
  return (
    <div className="py-24 md:py-40 overflow-x-hidden">
      <div className="text-center container m-auto flex space-x-5 justify-center">
        <div className="flex-col flex text-center">
          <h1 className="text-2xl md:text-4xl">
            <Translate id="oneai.compare.heading">
              Don't Upgrade Your Hardware — Upgrade Your AI!
            </Translate>
          </h1>

          <p className="text-xl md:text-2xl my-8 font-bold primary-text">
            <Translate id="oneai.compare.subheading">
              ONE AI makes decade-old chips outperform todays leading edge AI hardware!
            </Translate>
          </p>

          <p className="text-md md:text-xl font-normal">
            <Translate id="oneai.compare.whitepaper">
              Read the Whitepaper from our Partner Altera
            </Translate>
            <br />
            <Translate id="oneai.compare.benchmark">
              and see how Altera's MAX® 10 can now outperform Nvidia's Jetson Orin Nano with:
            </Translate>
          </p>

          <div className="flex my-8 gap-5 flex-wrap justify-center">
            {[
              { id: "latency", value: "488x", label: "Lower Latency" },
              { id: "accuracy", value: "24x", label: "Higher Accuracy" },
              { id: "power", value: "20x", label: "Lower Power" },
              { id: "cost", value: "6x", label: "Lower Cost" },
            ].map(({ id, value, label }) => (
              <div
                key={id}
                className="flex-col w-full md:w-48 p-6 border rounded-lg shadow opacity-90 text-center bg-black bg-opacity-50 md:backdrop-blur-sm"
              >
                <h5 className="mb-2 mt-2 text-5xl tracking-tight primary-text font-bold">
                  {value}
                </h5>
                <p className="mb-3 text-xl font-normal text-gray-900 dark:text-white">
                  <Translate id={`oneai.compare.metric.${id}`}>{label}</Translate>
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8 flex-col md:flex-row">
            <a href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn" target="_blank">
              <button className="button button--primary text-xl">
                <Translate id="oneai.compare.cta.whitepaper">Read the Whitepaper</Translate>
              </button>
            </a>

            <a href="https://forms.office.com/e/J3HDid9fzw" target="_blank">
              <button className="button button--secondary text-xl">
                <Translate id="oneai.compare.cta.waitlist">Join ONE AI Waitlist</Translate>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcaseSection() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h2 className="text-2xl md:text-4xl font-bold mb-10">
        <Translate id="oneai.showcase.title.1">Foundation Models</Translate>{" "}
        <span className="primary-text">
          <Translate id="oneai.showcase.title.2">Weren't Built for You.</Translate>
        </span>
        <br />
        <span className="primary-text">ONE AI</span>{" "}
        <Translate id="oneai.showcase.title.3">Creates Models That Are.</Translate>
      </h2>

      <h5 className="text-xl mb-16 md:text-2xl font-normal">
        <Translate id="oneai.showcase.desc.1">With ONE AI you always get a</Translate>{" "}
        <span className="primary-text">
          <Translate id="oneai.showcase.desc.2">custom neural network in seconds</Translate>
        </span>{" "}
        <Translate id="oneai.showcase.desc.3">
          that fits your exact Hardware, performance and use case requirements.
        </Translate>
      </h5>
    </div>
  );
}

export default function OneAi() {
  const slickRef = useRef<Slider>(null);

  initWebsiteEffects();

  return (
    <Layout title="ONE AI" description="ONE AI for Any Hardware and Any Application">
      <div className={`absolute w-full -z-10 ${styles.particleBackground}`}>
        <div className="h-96 absolute w-full"></div>
      </div>

      <HomepageHeader />

      <main>
        <div className="dropshadowbottom">
          <div className="default-background diagclipbottom pt-16">
            <ShowcaseSection />

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
          <ComparisonSection />
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
