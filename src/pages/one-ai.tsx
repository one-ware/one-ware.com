import React, { useEffect, useRef, useState } from "react";
import styles from "./one-ai.module.css";
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
          <div className="flex-col max-w-5xl m-2 mt-10">
            <div className="text-center mt-10">
              <h1 className="font-bold text-3xl md:text-4xl mb-4">
                The Next Generation of AI Development 
              </h1>
              <h2 className=" text-xl md:text-2xl mb-7 font-normal">
                AI Models Invented in Seconds for Your Needs. 
                <br/>
                The All-in-ONE Solution, optimized for Edge AI, Vision AI and Embedded Intelligence. 
              </h2>

              <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-5 mb-10">
                <Link
                  className="button button--primary button--outline button--lg text-sm md:text-lg"
                  href="/one-ai"
                >
                  <Translate id="homepage.subtitle.ai.getstarted">Get Started</Translate>
                </Link>

                <Link
                  className="button button--primary button--lg text-sm md:text-lg"
                  href="https://cloud.one-ware.com/Account/Register"
                >
                  <Translate id="oneai.signup">Sign Up</Translate>
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
  const [currentUseCase, setCurrentUseCase] = useState(0);
  const comparisonSlickRef = useRef<Slider>(null);
  
  const useCases = [
    {
      title: "High Speed and Efficient Quality Control",
      subtitle: "ONE AI makes decade-old chips outperform todays leading edge AI hardware",
      image: "/img/ai/one_ai_plugin/use_cases/chip/defect_1.png",
      description: "You don't need to upgrade your hardware. Just upgrade your AI. Together with our partner Altera we show how Altera's MAX® 10 with ONE AI and our HDL generator can now outperform Nvidia's Jetson Orin Nano with:",
      metrics: [
        { value: "488×", label: "Lower Latency" },
        { value: "24×", label: "Reduced Errors" },
        { value: "20×", label: "Lower Power" },
        { value: "6×", label: "Lower Cost" },
      ],
      whitepaper: "/docs/one-ai/use-cases/chip",
      linkText: "More Details"
    },
    {
      title: "High Precision Quality Control",
      subtitle: "ONE AI outperforms scientists in under one second",
      image: "/img/ai/one_ai_plugin/use_cases/pcb/pcb_1.png",
      description: "Researchers created a custom AI model for a PCB quality control. ONE AI beat not only standard image processing and universal AI models by speed and accuracy, but also the AI model from the scientists. For predicting the right AI model architecture, ONE AI needed 0.7 seconds.",
      metrics: [
        { value: "98.4", label: "F1 Score" },
        { value: "750 %", label: "Speed Increase" },
      ],
      whitepaper: "/docs/one-ai/use-cases/pcb",
      linkText: "More Details"
    },
    {
      title: "All-in-ONE AI Deployment",
      subtitle: "From Concept to Live System in One Click",
      image: "/img/ai/one_ai_plugin/use_cases/capture/full.png",
      description: "Eliminate months of development time. Integrate AI with our pre-build UI that supports monitoring, remote control and continuous improvement. Ready for your quality control or automation task.",
      metrics: [
        { value: "1-Click", label: "Deployment" },
        { value: "< 1 Day", label: "Development Time" },
      ],
      whitepaper: "/docs/one-ai/use-cases/camera-tool",
      linkText: "More Details"
    }
  ];

  const nextUseCase = () => {
    comparisonSlickRef.current?.slickNext();
  };

  const prevUseCase = () => {
    comparisonSlickRef.current?.slickPrev();
  };

  return (
    <div id="comparison" className="py-12 md:pt-15 overflow-x-hidden">
      <div className="text-center container m-auto px-4">
        <div className="flex-col flex text-center">

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl my-8 font-bold px-4">
            Leading AI Innovation for a Smarter World
          </p>

          {/* Slider with Navigation */}
          <div className="relative max-w-6xl mx-auto">
            {/* Left Arrow - Now visible on mobile too */}
            <button 
              onClick={prevUseCase}
              className="absolute -left-4 sm:-left-6 lg:-left-12 top-1/2 transform -translate-y-1/2 z-20 p-2 lg:p-3 bg-black/40 hover:bg-black/60 rounded-lg hover:scale-110 transition-all duration-300 shadow-lg"
              aria-label="Previous use case"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#00FFD1] hover:text-[#00e4ba] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow - Now visible on mobile too */}
            <button 
              onClick={nextUseCase}
              className="absolute -right-4 sm:-right-6 lg:-right-12 top-1/2 transform -translate-y-1/2 z-20 p-2 lg:p-3 bg-black/40 hover:bg-black/60 rounded-lg hover:scale-110 transition-all duration-300 shadow-lg"
              aria-label="Next use case"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#00FFD1] hover:text-[#00e4ba] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider Content */}
            <div className="px-4 sm:px-6 lg:px-8">
              <Slider
                ref={comparisonSlickRef}
                dots={true}
                arrows={false}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                swipe={true}
                touchMove={true}
                className={styles.slickSlider}
                beforeChange={(_c, n) => {
                  setCurrentUseCase(n);
                }}
              >
                {useCases.map((useCase, idx) => (
                  <div key={idx}>
                    {/* Graue Box um den Content */}
                    <div className="p-4 sm:p-6 lg:p-8 bg-gray-800/30 border border-gray-600/50 rounded-xl backdrop-blur-sm">
                      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12">
                        {/* Image + Button Section - Left */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start">
                          <img 
                            src={useCase.image} 
                            alt={useCase.title}
                            className="max-h-48 lg:max-h-80 w-auto object-contain rounded-xl shadow-2xl mb-4 lg:mb-6"
                          />
                          
                          {/* Button unter dem Bild */}
                          <div className="w-full flex justify-center lg:justify-start">
                            <a 
                              href={useCase.whitepaper} 
                              target="_blank" 
                              className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-[#00FFD1] text-black font-bold rounded-lg hover:bg-[#00e4ba] transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
                            >
                              {useCase.linkText}
                              <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        </div>
                        
                        {/* Content + Metrics Section - Right */}
                        <div className="w-full lg:w-2/3 text-center lg:text-left">
                          {/* Title & Subtitle */}
                          <div className="mb-4 lg:mb-6">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold primary-text mb-2 lg:mb-3">
                              {useCase.title}
                            </h3>
                            <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 font-medium mb-3 lg:mb-4">
                              {useCase.subtitle}
                            </h4>
                          </div>
                          
                          {/* Description */}
                          <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-normal mb-4 lg:mb-6 text-gray-200 leading-relaxed hyphens-auto break-words">
                            {useCase.description}
                          </p>

                          {/* Metrics Grid */}
                          <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-sm mx-auto lg:max-w-none lg:mx-0">
                            {useCase.metrics.map((metric, metricIdx) => (
                              <div
                                key={metricIdx}
                                className="p-1.5 sm:p-2 lg:p-3 border rounded-lg bg-black bg-opacity-40 backdrop-blur-sm border-gray-600 text-center"
                              >
                                <h5 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold primary-text mb-0.5 lg:mb-1">
                                  {metric.value}
                                </h5>
                                <p className="text-xs lg:text-sm text-gray-300">
                                  {metric.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function GetStarted() {
  return (
    <div className="mb-20 overflow-x-hidden">
      <div className="text-center container m-auto flex space-x-5 justify-center">
        <div className="flex-col flex text-center">
          <h1 className="text-2xl md:text-4xl">
            <Translate id="oneai.getstarted.heading">
              Get Started in 3 Simple Steps:
            </Translate>
          </h1>

          <p className="text-xl md:text-2xl font-bold mt-8">
            <div className="mb-4">
              1.{" "}
              <a href="https://cloud.one-ware.com/Account/Register" target="_blank" className="underline hover:no-underline">
                <Translate id="oneai.getstarted.step1.signup">
                  Sign up
                </Translate>
              </a>
              <Translate id="oneai.getstarted.step1.text">
                , verify your account, and receive 500 € in credits
              </Translate>
            </div>
            <div className="mb-4">
              2.{" "}
              <a href="/docs/studio/setup" target="_blank" className="underline hover:no-underline">
                <Translate id="oneai.getstarted.step2.download">
                  Download
                </Translate>
              </a>{" "}
              <Translate id="oneai.getstarted.step2.text">
                ONE WARE Studio
              </Translate>
            </div>
            <div className="mb-4">
              <Translate id="oneai.getstarted.step3">
                3. Add the ONE AI Extension
              </Translate>
            </div>
          </p>

          <div className="flex justify-center gap-4 mt-2 flex-col md:flex-row">
            <a href="/docs/one-ai/get-started" target="_blank">
              <button className="button button--primary text-xl">
                <Translate id="oneai.getstarted.cta.tutorial">Complete Tutorial</Translate>
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
        <div className="bottomsplit">
          <ComparisonSection />
        </div>

        <div className="text-center mt-16 md:pb-2 pb-16 container overflow-x-hidden">
          <h1 className="text-2xl md:text-4xl">
            <Translate id="oneai.compare.heading">
              The Entire AI Development Process Automated in One Tool
            </Translate>
          </h1>

          {sliders && sliders.length && (
            <div className=" pt-5">
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

        <div className="dropshadowbottom">
          <div id="getStarted" className="dropshadowtop-inset pt-20 pb-5" style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,1.0) 100%), url('${require('@site/static/img/background.webp').default}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <GetStarted />
          </div>
        </div>


        <div className="container pb-20 mt-20">
          <div id="contact" className="mb-10">
            <ContactUs />
          </div>
        </div>
      </main>
    </Layout>
  );
}
