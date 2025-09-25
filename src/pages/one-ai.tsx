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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import useBaseUrl from '@docusaurus/useBaseUrl';

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
      <div className="absolute flex flex-col items-center justify-center w-full h-full px-4">
        <div className="flex justify-center w-full">
          <div className="flex-col max-w-5xl mx-auto mt-10">
            <div className="text-center mt-10">
              <h1 className="font-bold text-3xl md:text-4xl mb-4">
                <Translate id="oneai.hero.nextgen.title.start">See the Power of </Translate>
                <span className="primary-text">
                  <Translate id="oneai.hero.nextgen.title.dataset">Your Dataset</Translate>
                </span>
                <Translate id="oneai.hero.nextgen.title.middle"> With the </Translate>
                <span className="primary-text">
                  <Translate id="oneai.hero.nextgen.title.ai">Right AI</Translate>
                </span>
              </h1>
              <h2 className=" text-xl md:text-2xl mb-7 font-normal">
                <Translate id="oneai.hero.nextgen.subtitle1">
                  AI Models Invented in Seconds for Your Needs by our AI.
                </Translate>
                <br/>
                <Translate id="oneai.hero.nextgen.subtitle2">
                  The All-in-ONE Solution, optimized for Edge AI, Vision AI and Embedded Intelligence.
                </Translate>
              </h2>

              <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-5 mb-10">
                <Link
                  className="button button--primary button--outline button--lg text-sm md:text-lg"
                  href="/one-ai#getStarted"
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
  // DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 1)
  // Der Ref für die Swiper-Instanz ist wieder da.
  const swiperRef = useRef<SwiperCore | null>(null);

  const scrollPrev = () => {
    swiperRef.current?.slidePrev();
  };

  const scrollNext = () => {
    swiperRef.current?.slideNext();
  };

  const useCases = [
    {
      title: "Prebuild UI",
      titleId: "oneai.usecase.ui.title",
      subtitle: "Integration on any system with operating system and graphical interface",
      subtitleId: "oneai.usecase.ui.subtitle",
      backgroundImage: "/img/ai/one_ai_plugin/use_cases/capture/preview.png",
      displayImage: "/img/ai/one_ai_plugin/use_cases/capture/integration.png",
      description: "Eliminate months of development time. Integrate AI with our pre-build UI that supports monitoring, remote control and continuous improvement. Already in production with leading production companies and ready for your quality control or automation task with:",
      descriptionId: "oneai.usecase.ui.description",
      metrics: [
        { value: "1-Click", label: "Deployment", labelId: "oneai.metric.deployment" },
        { value: "< 1 Day", label: "Development Time", labelId: "oneai.metric.devtime" },
      ],
      whitepaper: "/docs/one-ai/use-cases/camera-tool",
      linkText: "More Details",
      linkTextId: "oneai.usecase.link"
    },
    {
      title: "High Speed HDL",
      titleId: "oneai.usecase.hdl.title",
      subtitle: "ONE AI implements efficient AI on any FPGA with our open source AI to HDL libraries",
      subtitleId: "oneai.usecase.hdl.subtitle",
      backgroundImage: "/img/ai/one_ai_plugin/use_cases/chip/defect_1.png",
      displayImage: "/img/ai/one_ai_plugin/use_cases/chip/integration.png",
      description: "Next to the vendor tools for AI integration we offer a version for parallel AI integration on FPGAs that allows integration just like parallel image processing that doesn't need an additional processor and adds no overhead to the system. Together with our partner Altera we show how Altera's MAX® 10 with ONE AI and our HDL generator can now outperform Nvidia's Jetson Orin Nano with:",
      descriptionId: "oneai.usecase.hdl.description",
      metrics: [
        { value: "72×", label: "Faster Detection", labelId: "homepage.metric.latency" },
        { value: "24×", label: "Less Errors", labelId: "homepage.metric.errors" },
        { value: "20×", label: "Lower Power", labelId: "homepage.metric.power" },
        { value: "6×", label: "Lower Cost", labelId: "homepage.metric.cost" },
      ],
      whitepaper: "/docs/one-ai/use-cases/chip",
      linkText: "More Details",
      linkTextId: "oneai.usecase.link"
    },
    {
      title: "C++ Project or Executable",
      titleId: "oneai.usecase.cpp.title",
      subtitle: "Deploy AI with any CPU, TPU, GPU or MCU",
      subtitleId: "oneai.usecase.cpp.subtitle",
      backgroundImage: "/img/ai/one_ai_plugin/use_cases/pcb/pcb_1.png",
      displayImage: "/img/ai/one_ai_plugin/use_cases/pcb/integration.png",
      description: "ONE AI can create Tensorflow Lite based C++ projects or precompiled executables with API that run efficient with any kind of processor or AI accelerator. One example is a PCB quality control where the AI by ONE AI beat not only standard image processing and universal AI models by speed and accuracy, but also the AI model from the scientists with:",
      descriptionId: "oneai.usecase.cpp.description",
      metrics: [
        { value: "98.4", label: "F1 Score", labelId: "oneai.metric.f1score" },
        { value: "750 %", label: "Speed Increase", labelId: "oneai.metric.speed" },
      ],
      whitepaper: "/docs/one-ai/use-cases/pcb",
      linkText: "More Details",
      linkTextId: "oneai.usecase.link"
    }
  ];

  return (
    <div id="comparison" className="py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl md:text-4xl mb-12 font-bold px-4">
          <Translate id="oneai.comparison.title">
            Deployed with ONE Click
          </Translate>
        </h1>
      </div>

      <div className="relative">
        <Swiper
          // DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 2)
          // onSwiper-Callback, um den Ref zu setzen.
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          rewind={true}
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={1.2}
          spaceBetween={20}
          slidesPerGroup={1}
          watchSlidesProgress={true}
          initialSlide={1} // Start auf dem 2. Element (Index 1)
          // modules={[Navigation]}  // kannst du entfernen, da wir eigene Buttons haben
          breakpoints={{
            768:  { slidesPerView: 1.5,  spaceBetween: 40 },
            1280: { slidesPerView: 1.75, spaceBetween: 50 },
          }}
        >
          {useCases.map((useCase, idx) => (
            // DER ZWEITE WICHTIGE FIX BLEIBT:
            <SwiperSlide key={idx}>
              {({ isActive }) => (
                <div
                  className={`relative w-full rounded-2xl transition-all duration-500 ease-in-out transform ${isActive ? 'scale-100' : 'scale-90 opacity-60'}`}
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%), url(${useBaseUrl(useCase.backgroundImage)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* ... der innere Content der Slide bleibt unverändert ... */}
                   <div className="relative z-10 p-6 sm:p-8 lg:p-12 min-h-[550px] md:min-h-[500px] flex flex-col justify-between bg-gray-900/20 rounded-2xl backdrop-blur-sm border border-white/10">
                    
                    {/* Content Wrapper für Desktop Layout */}
                    <div className="flex flex-col lg:flex-row lg:gap-8 h-full">
                      
                      {/* Image Section - links auf Desktop */}
                      <div className="w-3/4 mx-auto lg:w-1/3 lg:mx-0 lg:flex-shrink-0 mb-4 lg:mb-0 hidden md:block">
                        <div 
                          className="w-full aspect-square lg:aspect-[6/7] rounded-lg bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${useBaseUrl(useCase.displayImage)})`,
                          }}
                        />
                      </div>

                      {/* Text & Content Section - rechts auf Desktop */}
                      <div className="text-left lg:flex-1 flex flex-col justify-between">
                        {/* Text oben */}
                        <div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold primary-text mb-2">
                            <Translate id={useCase.titleId}>
                              {useCase.title}
                            </Translate>
                          </h3>
                          <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium mb-4">
                            <Translate id={useCase.subtitleId}>
                              {useCase.subtitle}
                            </Translate>
                          </h4>
                          <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                            <Translate id={useCase.descriptionId}>
                              {useCase.description}
                            </Translate>
                          </p>
                        </div>

                        {/* Metrics & Button unten */}
                        <div className="flex flex-col gap-4">
                          {/* Metrics Grid - 2x2 auf Mobile, sonst in einer Reihe */}
                          <div className={`grid gap-2 w-full ${useCase.metrics.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2'}`}>
                            {useCase.metrics.map((metric, metricIdx) => (
                              <div key={metricIdx} className="p-3 bg-black/40 border border-white/10 rounded-lg text-center">
                                <h5 className="text-xl sm:text-2xl font-bold primary-text">
                                  {metric.value}
                                </h5>
                                <p className="text-sm sm:text-base text-gray-300">
                                  <Translate id={metric.labelId}>
                                    {metric.label}
                                  </Translate>
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Button darunter */}
                          <a
                            href={useCase.whitepaper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-[#00FFD1] text-black font-bold rounded-lg hover:bg-[#00e4ba] transition-all duration-300 transform hover:scale-105 text-sm lg:text-base w-full sm:w-auto justify-center shrink-0"
                          >
                            <Translate id={useCase.linkTextId}>
                              {useCase.linkText}
                            </Translate>
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 3) */}
        {/* Die onClick-Handler sind wieder auf den Buttons. */}
        <button
          onClick={scrollPrev}
          aria-label="Previous use case"
          className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md shadow-lg transition-transform hover:scale-105"
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-[#00FFD1]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={scrollNext}
          aria-label="Next use case"
          className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md shadow-lg transition-transform hover:scale-105"
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-[#00FFD1]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
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
              <a href="/docs/studio/setup" target="_blank" className="underline hover:no-underline">
                <Translate id="oneai.getstarted.step2.download">
                  Download
                </Translate>
              </a>{" "}
              <Translate id="oneai.getstarted.step2.text">
                ONE WARE Studio with the ONE AI Extension.
              </Translate>
            </div>
            <div className="mb-4">
              2.{" "}
              <a href="https://cloud.one-ware.com/Account/Register" target="_blank" className="underline hover:no-underline">
                <Translate id="oneai.getstarted.step1.signup">
                  Sign up
                </Translate>
              </a>
              <Translate id="oneai.getstarted.step1.text">
                , and verify your account.
              </Translate>
            </div>
            <div className="mb-4">
              <Translate id="oneai.getstarted.step3">
                3. Build your first AI models for free.
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

function InventionSection() {
  const inventions = [
    {
      title: "1. Automated Analysis",
      titleId: "oneai.invention.training.title", 
      image: "/img/ai/Input.webp",
      description: "ONE AI gets the best results if the dataset focusses on a specific task. First it analyzes the data, labels, hardware constraints, needed performance and application context. For example, it analyzes the object sizes in images.",
      descriptionId: "oneai.invention.training.description"
    },
    {
      title: "2. AI Feature Prediction",
      titleId: "oneai.invention.architecture.title",
      image: "/img/ai/Prediction.webp",
      description: "ONE AI then uses its knowledge about existing AI research and previously optimized AI models to predict the needed features for the AI model architecture. For example, bigger objects need larger receptive fields.",
      descriptionId: "oneai.invention.architecture.description"
    },
    {
      title: "3. Build & Train AI Model",
      titleId: "oneai.invention.generation.title",
      image: "/img/ai/Architecture.webp", 
      description: "ONE AI takes the predictions and then builds a custom neural network architecture that fits all predicted features. Then the AI is trained on the dataset and only learns the relevant information.",
      descriptionId: "oneai.invention.generation.description"
    },
    {
      title: "4. Deploy Anywhere",
      titleId: "oneai.invention.deployment.title",
      image: "/img/ai/Export.webp",
      description: "Finally the AI can be deployed across FPGAs, microcontrollers, GPUs, and CPUs without modification. ONE AI handles all the complexity of hardware optimization and implementation automatically.",
      descriptionId: "oneai.invention.deployment.description"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <Translate id="oneai.invention.section.title">
              Reinventing AI Development
            </Translate>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            <Translate id="oneai.invention.section.subtitle">
              Don't waste your custom dataset on a generic AI model. Our AI automatically designs models tailored to your data, outperforming foundation models and NAS in just 0.7 seconds.
            </Translate>
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {inventions.map((invention, index) => (
            <div key={index} className="bg-gray-800/50 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-white">
                <Translate id={invention.titleId}>
                  {invention.title}
                </Translate>
              </h3>
              
              {/* Image */}
              <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-gray-700/50 flex items-center justify-center">
                <img 
                  src={useBaseUrl(invention.image)}
                  alt=""
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00FFD1]/20 to-[#00FFD1]/5">
                        <div class="text-4xl text-[#00FFD1] opacity-50">🚀</div>
                      </div>
                    `;
                  }}
                />
              </div>
              
              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                <Translate id={invention.descriptionId}>
                  {invention.description}
                </Translate>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
        <InventionSection />


        <div className="text-center mt-12 md:pb-2 pb-12 container overflow-x-hidden bottomsplit">
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
                initialSlide={1} // Start auf dem 2. Element (Index 1)
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

        
          <ComparisonSection />

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
