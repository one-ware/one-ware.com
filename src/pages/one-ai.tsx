import React, { useEffect, useRef, useState } from "react";
import styles from "./one-ai.module.css";
import "aos/dist/aos.css";
import classnames from "classnames";
import Slider from "react-slick";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";
import Translate, { translate } from "@docusaurus/Translate";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

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
                <Translate id="oneai.hero.main.title">
                  Let ONE AI Finish Your Vision and Edge AI Projects
                </Translate>
              </h1>
              <h2 className=" text-xl md:text-2xl mb-7 font-normal">
                <Translate id="oneai.hero.main.subtitle">
                  See the Power of your dataset with the Right AI.
                </Translate>
                <br />
                <Translate id="oneai.hero.main.subtitle2">
                  Automatically tailored to your needs and exported for any hardware.
                </Translate>
              </h2>

              <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-5 mb-10">
                <Link
                  className="button button--primary button--outline button--lg text-sm md:text-lg"
                  href="/docs/one-ai/tutorials"
                >
                  <Translate id="oneai.hero.examples">Example Projects</Translate>
                </Link>

                <Link
                  className="button button--primary button--lg text-sm md:text-lg"
                  href="/docs/one-ai/getting-started"
                >
                  <Translate id="homepage.subtitle.ai.getstarted">Start Now for Free</Translate>
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
      whitepaper: "/docs/one-ai/getting-started/export/FPGA/",
      linkText: "More Details",
      linkTextId: "oneai.usecase.link"
    },
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
      whitepaper: "/docs/one-ai/getting-started/dataset/camera-tool",
      linkText: "More Details",
      linkTextId: "oneai.usecase.link"
    },
    {
      title: "Direct Integration with SDK",
      titleId: "oneai.usecase.sdk.title",
      subtitle: "Deploy AI in Any Application",
      subtitleId: "oneai.usecase.sdk.subtitle",
      backgroundImage: "/img/ai/one_ai_plugin/demos/overlap-difference/image_000118_test.png",
      displayImage: "/img/ai/one_ai_plugin/use_cases/pcb/integration.png",
      description: "ONE AI can create generic ONNX or Tensorflow Lite models that can be integrated directly with your application using our SDK. One example AI model,that you can integrate, detects small objects on complex backgrounds and outperformes YOLOv8 with:",
      descriptionId: "oneai.usecase.sdk.description",
      metricsLayout: 3,
      metrics: [
        { value: "95.7", label: "F1 Score", labelId: "homepage.metric.f1score" },
        { value: "8×", label: "Smaller Model", labelId: "homepage.metric.modelsize" },
        { value: "10×", label: "Fewer Errors", labelId: "homepage.metric.fewererrors" },
      ],
      whitepaper: "/docs/one-ai/getting-started/export/onnx",
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
      whitepaper: "/docs/one-ai/getting-started/export",
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
                          {/* Metrics Grid - 2x2 auf Mobile, bei 3 oder 4 Metrics in einer Reihe */}
                          <div className={`grid gap-2 w-full ${useCase.metrics.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : useCase.metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
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
              <a href="/docs/one-ai/getting-started#installation" target="_blank" className="underline hover:no-underline">
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
            <a href="/docs/one-ai/getting-started" target="_blank">
              <button className="button button--primary text-xl">
                <Translate id="oneai.getstarted.cta.tutorial">Quick Start Guide</Translate>
              </button>
            </a>
          </div>

          <div className="pt-4 text-center">
            <hr className="border-gray-600 max-w-md mx-auto" />
            <p className="text-xl md:text-2xl font-bold text-gray-300">
              Or <a href="mailto:sales@one-ware.com?subject=Docker Container Request for Local AI Training" className="text-[#00FFD1] hover:text-[#00e4ba] underline transition-colors">Contact sales</a> to request a docker container for local AI training
            </p>
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

function BenefitsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const benefits = [
    {
      title: "Use Smaller Datasets",
      titleId: "oneai.benefits.smaller.title",
      description: "With ONE AI, you are rewarded for having a smaller dataset. This results in a leaner and faster AI model. Smaller datasets prevent memorization and help the AI focus on the actual application. Even with as few as 20 images, ONE AI can often create highly effective models and significantly reduce development time.",
      descriptionId: "oneai.benefits.smaller.description"
    },
    {
      title: "Do Less Manual Labeling",
      titleId: "oneai.benefits.labeling.title", 
      description: "Because ONE AI achieves great results with smaller datasets, expanding your dataset becomes much faster. The first model can automatically label new data, while ONE AI adapts the model to the growing dataset. This saves a lot of manual work.",
      descriptionId: "oneai.benefits.labeling.description"
    },
    {
      title: "No Model Selection or Parameter Tuning",
      titleId: "oneai.benefits.tuning.title",
      description: "ONE AI automatically builds the best possible model for your specific use case. You do not need to search for the right foundation model, test endless parameters, or manually fine-tune your AI. ONE AI takes care of everything.",
      descriptionId: "oneai.benefits.tuning.description"
    },
    {
      title: "Create AI with Multiple Input Images",
      titleId: "oneai.benefits.multiple.title",
      description: "Many applications benefit from comparing multiple images or using reference images to improve accuracy. With ONE AI, you can easily provide multiple input images, and the system automatically adjusts the AI architecture to make use of this context.",
      descriptionId: "oneai.benefits.multiple.description"
    },
    {
      title: "Deploy AI on Any Hardware or Platform",
      titleId: "oneai.benefits.export.title",
      description: "The ONE AI Capture Tool can be used directly as a ready-to-use interface on any operating system. You can also export your AI as a platform-independent model, C++ project, executable, or HDL code for FPGAs. This saves a lot of integration time.",
      descriptionId: "oneai.benefits.export.description"
    },
    {
      title: "Get AI for Your Performance Needs",
      titleId: "oneai.benefits.performance.title",
      description: "ONE AI automatically considers your target hardware when creating models. It ensures that your desired frame rate and resource usage are always met. You do not need to waste time on trial and error since ONE AI optimizes performance for you.",
      descriptionId: "oneai.benefits.performance.description"
    },
    {
      title: "No Coding Required",
      titleId: "oneai.benefits.coding.title", 
      description: "All AI creation features are fully integrated into ONE AI, so no programming is required. You simply provide your application knowledge, and ONE AI handles the complex parts. In the end, you get fully working software and AI models ready to use or integrate.",
      descriptionId: "oneai.benefits.coding.description"
    },
    {
      title: "Get Better Results in Less Time",
      titleId: "oneai.benefits.results.title",
      description: "In most cases, AI models predicted by ONE AI in just 0.7 seconds are more reliable and accurate than manually developed ones. Traditional AI development rarely makes sense anymore, especially since ONE AI can handle very specific requirements that used to require manual engineering.",
      descriptionId: "oneai.benefits.results.description"
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(index);
  };

  // Hotspot positions for each benefit image (x, y in percentages)
  const hotspots = [
    // Image 1 - Smaller Datasets Needed
    [
      { x: 35, y: 30, targetIndex: 1 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 90, y: 8, targetIndex: 3 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
    ],
    // Image 2 - Less Manual Labeling
    [
      { x: 64, y: 27, targetIndex: 1 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
      { x: 87, y: 19, targetIndex: 0 },
      { x: 90, y: 8, targetIndex: 3 },
    ],
    // Image 3 - No Model Tuning Needed
    [
      { x: 6, y: 8, targetIndex: 0 },
      { x: 70, y: 50, targetIndex: 2 },
      { x: 55, y: 21, targetIndex: 7 },
      { x: 11, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
    ],
    // Image 4 - Supports Multiple Input Images
    [
      { x: 90, y: 8, targetIndex: 0 },
      { x: 35, y: 30, targetIndex: 1 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
    ],
    // Image 5 - Automatic Export for Any Hardware
    [
      { x: 6, y: 8, targetIndex: 0 },
      { x: 4, y: 33, targetIndex: 2 },
      { x: 84, y: 16, targetIndex: 4 },
      { x: 8, y: 28, targetIndex: 5 },
      { x: 4, y: 23, targetIndex: 6 },
    ],
    // Image 6 - Always Keeps FPS and Performance
    [
      { x: 6, y: 8, targetIndex: 0 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 25, y: 55, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
    ],
    // Image 7 - No Coding Required
    [
      { x: 6, y: 8, targetIndex: 0 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 30, y: 25, targetIndex: 6 },
    ],
    // Image 8 - Better Results Than Manual Development
    [
      { x: 49, y: 21, targetIndex: 2 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
    ]
  ];

  return (
    <section className="pt-8 md:pt-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className=" mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            <Translate id="oneai.benefits.section.title">
              Your Benefits as Developer:
            </Translate>
          </h2>
        </div>

        {/* Benefits Grid - Desktop: Side by side, Mobile: Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 items-start">
          {/* Benefits Accordion - Takes 1 column on desktop */}
          <div className="space-y-1.5">
            {benefits.map((benefit, index) => (
              <div key={index} className="rounded border transition-all duration-300">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between px-2.5 pt-1 text-left focus:outline-none group 
                  bg-gray-700 text-white border border-gray-700
                  hover:bg-teal-900 hover:border-teal-900"
                >
                  <h3 className="text-lg md:text-lg font-medium text-white pr-2 mb-1 group-hover:text-[#00FFD1] transition-colors">
                    <Translate id={benefit.titleId}>
                      {benefit.title}
                    </Translate>
                  </h3>
                  <div className={`transform transition-all duration-200 ${activeIndex === index ? 'rotate-90 scale-110' : 'group-hover:scale-105'}`}>
                    <svg className="w-4 h-4 text-[#00FFD1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
                
                {/* Accordion Content */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-2.5 border-t border-gray-700">
                    <p className="text-gray-300 leading-tight text-md pt-1.5">
                      <Translate id={benefit.descriptionId}>
                        {benefit.description}
                      </Translate>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* IDE Image - Takes 2 columns on desktop */}
          <div className="lg:col-span-2 flex items-start justify-center lg:sticky lg:top-20">
            <div className="w-full max-w-md lg:max-w-full">
              <div className="relative group">
                <img 
                  src={useBaseUrl(`/img/ai/one_ai_plugin/benefits/${activeIndex !== null ? activeIndex + 1 : 1}.webp`)}
                  alt="ONE AI Benefit Illustration"
                  className="w-full h-auto rounded-lg shadow-xl border border-gray-700 group-hover:border-[#00FFD1]/50 transition-all duration-300"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.src = '/img/ai/Capture.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
                
                {/* Interactive Hotspots */}
                {hotspots[activeIndex !== null ? activeIndex : 0]?.map((hotspot, idx) => (
                  <div
                    key={idx}
                    className="absolute group/hotspot cursor-pointer"
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => toggleAccordion(hotspot.targetIndex)}
                  >
                    {/* Hotspot Dot */}
                    <div className="w-4 h-4 bg-[#00FFD1] rounded-full border-2 border-white shadow-lg animate-pulse hover:scale-125 transition-all duration-300">
                      <div className="w-full h-full bg-[#00FFD1] rounded-full animate-ping opacity-75"></div>
                    </div>
                    
                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl border border-gray-700 opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                      <Translate id={benefits[hotspot.targetIndex].titleId}>
                        {benefits[hotspot.targetIndex].title}
                      </Translate>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <section className="py-8 md:py-12 to-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <Translate id="oneai.invention.section.title">
              How It Works:
            </Translate>
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {inventions.map((invention, index) => (
            <div key={index} className="bg-black bg-opacity-50 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-white">
                <Translate id={invention.titleId}>
                  {invention.title}
                </Translate>
              </h3>
              
              {/* Image */}
              <div className="w-full h-64 mb-6 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src={useBaseUrl(invention.image)}
                  alt=""
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center">
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

        {/* Call to Action for Example Projects */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 text-center">
              {/* Title */}
              <div className="flex items-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white pt-3">
                  <Translate id="oneai.examples.cta.title">
                    Ready to Start Now?
                  </Translate>
                </h3>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center flex-shrink-0">
                <Link
                  to="/docs/one-ai/tutorials"
                  className="inline-flex items-center px-6 py-3 bg-[#00FFD1] text-black font-bold rounded-xl hover:bg-[#00e4ba] transition-all duration-300 transform hover:scale-105 text-base"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <Translate id="oneai.examples.cta.button.main">
                    View Examples
                  </Translate>
                </Link>
                
                <Link
                  to="/docs/one-ai/getting-started"
                  className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#00FFD1] text-[#00FFD1] font-bold rounded-xl hover:bg-[#00FFD1] hover:text-black transition-all duration-300 text-base"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <Translate id="oneai.examples.cta.button.secondary">
                    Get Started
                  </Translate>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OneAi() {
  const slickRef = useRef<Slider>(null);

  initWebsiteEffects();

  return (
    <Layout title={translate({id: 'oneai.seo.title', message: 'ONE AI | Let ONE AI Finish Your Computer Vision or Edge AI Project'})}
      description={translate({id: 'oneai.seo.description', message: 'Get better results in less time with ONE AI. The first software that automatically generates tailored AI models for your needs. Optimized and exported for PCs, microcontrollers, FPGAs, GPUs, NPUs and more.'})}>
      <Head>
        {/* Open Graph für Social Media */}
        <meta property="og:title" content={translate({id: 'oneai.seo.og.title', message: 'Let ONE AI Finish Your Computer Vision or Edge AI Project'})} />
        <meta property="og:description" content={translate({id: 'oneai.seo.og.description', message: 'Get better results in less time with ONE AI. AI models, automatically tailored for your needs.'})} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://one-ware.com/one-ai" />
        <meta property="og:image" content="https://one-ware.com/img/social-card.jpg" />
        
        {/* International SEO */}
        <link rel="alternate" hrefLang="en" href="https://one-ware.com/one-ai" />
        <link rel="alternate" hrefLang="de" href="https://one-ware.com/de/one-ai" />
        <link rel="alternate" hrefLang="x-default" href="https://one-ware.com/one-ai" />
      </Head>
        
      <div className={`absolute w-full -z-10 ${styles.particleBackground}`}>
        <div className="h-96 absolute w-full"></div>
      </div>

      <HomepageHeader />

      <main>
        <BenefitsSection />
        <div className="bottomsplit">
            <InventionSection />
        </div>


        <div className="text-center pt-12 md:pb-2 pb-12 container overflow-x-hidden bottomsplit">
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

        <div className="alternative-background">
          <SupportSection />
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

function SupportSection() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-6">
              <Translate id="oneai.support.title">
                Need Help Getting Started?
              </Translate>
            </h2>
            <p className="text-xl text-gray-300">
              <Translate id="oneai.support.subtitle">
                Our development expert is here to help you succeed.
              </Translate>
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-10 md:p-16 border border-gray-700">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
              <div className="flex-shrink-0">
                <img 
                  src={require("@site/static/img/support_christopher.webp").default}
                  alt="Christopher Kreis"
                  className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover border-4 border-[#00FFD1]/20"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Christopher
                </h3>
                <p className="text-[#00FFD1] font-semibold mb-6 text-lg">
                  <Translate id="oneai.support.role">
                    Your Development Support
                  </Translate>
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  <Translate id="oneai.support.description">
                    Whether you have questions about proper usage, encounter problems, or aren't achieving the results you expected - Christopher is here to help. Get personalized assistance with your ONE AI development journey.
                  </Translate>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                  <a 
                    href="mailto:support@one-ware.com?subject=ONE AI Support Request"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#00FFD1] text-black font-semibold rounded-xl hover:bg-[#00FFD1]/90 transition-colors duration-300 text-lg"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <Translate id="oneai.support.cta">
                      Get Support Now
                    </Translate>
                  </a>
                  
                  <div className="text-center md:text-left">
                    <p className="text-base text-gray-400 mb-2">
                      <Translate id="oneai.support.email.label">
                        Email us directly:
                      </Translate>
                    </p>
                    <a 
                      href="mailto:support@one-ware.com"
                      className="text-[#00FFD1] hover:text-[#00FFD1]/80 font-mono text-base"
                    >
                      support@one-ware.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
