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
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import HeroBackground from "../components/HeroBackground";
import HomeHero from "../components/HomeHero";

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
    <HeroBackground
      className="w-full min-h-[400px] flex items-center justify-center"
      style={{
        marginTop: "calc(var(--ifm-navbar-height) * -1)",
        paddingTop: "var(--ifm-navbar-height)",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full px-4">
        <div className="flex justify-center w-full">
          <div className="flex-col max-w-5xl mx-auto mt-10">
            <div className="text-center mt-10">
              <h1 className="font-bold text-3xl md:text-4xl mb-4 dark:text-white text-gray-900">
                <Translate id="oneai.hero.main.title">
                  Let ONE AI Finish Your Vision and Edge AI Projects
                </Translate>
              </h1>
              <h2 className="text-xl md:text-2xl mb-7 font-normal dark:text-white text-gray-800">
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
    </HeroBackground>
  );
}

function ComparisonSection() {
  const [activeUseCase, setActiveUseCase] = useState(0);

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

  const currentUseCase = useCases[activeUseCase];

  const handlePrev = () => {
    setActiveUseCase(activeUseCase - 1 < 0 ? useCases.length - 1 : activeUseCase - 1);
  };

  const handleNext = () => {
    setActiveUseCase(activeUseCase + 1 >= useCases.length ? 0 : activeUseCase + 1);
  };

  return (
    <section id="comparison" className="py-16 md:py-24 bg-white dark:bg-[#1e1e1e]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gray-600 dark:text-gray-300 text-3xl md:text-4xl font-normal text-left mb-12">
            <Translate id="oneai.comparison.title">
              Deployed with ONE Click
            </Translate>
          </h2>

          <div className="p-6 sm:p-8 md:p-12 overflow-hidden" style={{ backgroundColor: '#161616' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12">
              <div className="order-first lg:order-none">
                <div
                  className="w-full aspect-square max-w-sm mx-auto lg:max-w-none bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${useBaseUrl(currentUseCase.displayImage)})`,
                  }}
                />
              </div>

              <div className="flex flex-col justify-center text-center lg:text-left">
                <h3 className="text-white text-xl md:text-2xl font-medium mb-2">
                  <Translate id={currentUseCase.titleId}>
                    {currentUseCase.title}
                  </Translate>
                </h3>
                <h4 className="text-gray-300 text-base md:text-lg mb-4">
                  <Translate id={currentUseCase.subtitleId}>
                    {currentUseCase.subtitle}
                  </Translate>
                </h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                  <Translate id={currentUseCase.descriptionId}>
                    {currentUseCase.description}
                  </Translate>
                </p>

                <div className="flex flex-row flex-wrap gap-4 sm:gap-8 justify-center lg:justify-start mb-6">
                  {currentUseCase.metrics.map((metric, metricIdx) => (
                    <div key={metricIdx} className="text-center lg:text-left">
                      <span className="text-[var(--ifm-color-primary)] text-2xl md:text-3xl font-light block">
                        {metric.value}
                      </span>
                      <span className="text-gray-400 text-xs uppercase mt-1 block">
                        <Translate id={metric.labelId}>
                          {metric.label}
                        </Translate>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center lg:justify-start">
                  <a
                    href={currentUseCase.whitepaper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[var(--ifm-color-primary)] text-black px-6 py-3 text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
                    style={{ borderRadius: 0 }}
                  >
                    <Translate id={currentUseCase.linkTextId}>
                      {currentUseCase.linkText}
                    </Translate>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-8 mt-8 pt-6 border-t border-white/20">
              <svg
                onClick={handlePrev}
                className="w-5 h-5 cursor-pointer text-[var(--ifm-color-primary)] hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div className="flex gap-3">
                {useCases.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveUseCase(index)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                      index === activeUseCase ? "bg-[var(--ifm-color-primary)]" : "bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
              <svg
                onClick={handleNext}
                className="w-5 h-5 cursor-pointer text-[var(--ifm-color-primary)] hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




function GetStarted() {
  return (
    <HeroBackground className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="dark:text-white text-gray-900 text-2xl md:text-4xl font-normal mb-8">
            <Translate id="oneai.getstarted.heading">
              Get Started in 3 Simple Steps:
            </Translate>
          </h2>

          <div className="space-y-4 dark:text-gray-300 text-gray-700 text-lg md:text-xl mb-8">
            <div>
              <span className="font-medium">1.</span>{" "}
              <a href="/docs/one-ai/getting-started#installation" target="_blank" className="underline hover:no-underline primary-text">
                <Translate id="oneai.getstarted.step2.download">
                  Download
                </Translate>
              </a>{" "}
              <Translate id="oneai.getstarted.step2.text">
                ONE WARE Studio with the ONE AI Extension.
              </Translate>
            </div>
            <div>
              <span className="font-medium">2.</span>{" "}
              <a href="https://cloud.one-ware.com/Account/Register" target="_blank" className="underline hover:no-underline primary-text">
                <Translate id="oneai.getstarted.step1.signup">
                  Sign up
                </Translate>
              </a>
              <Translate id="oneai.getstarted.step1.text">
                , and verify your account.
              </Translate>
            </div>
            <div>
              <span className="font-medium">3.</span>{" "}
              <Translate id="oneai.getstarted.step3">
                Build your first AI models for free.
              </Translate>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link
              to="/docs/one-ai/getting-started"
              className="button button--primary button--lg"
            >
              <Translate id="oneai.getstarted.cta.tutorial">Quick Start Guide</Translate>
            </Link>
          </div>

          <div className="border-t dark:border-gray-700 border-gray-300 pt-6 mt-6">
            <p className="dark:text-gray-400 text-gray-600 text-base md:text-lg">
              <Translate id="oneai.getstarted.contact.or">Or</Translate>{" "}
              <a href="mailto:sales@one-ware.com?subject=Docker Container Request for Local AI Training" className="primary-text underline hover:no-underline font-medium">
                <Translate id="oneai.getstarted.contact.sales">Contact sales</Translate>
              </a>{" "}
              <Translate id="oneai.getstarted.contact.text">to request a docker container for local AI training</Translate>
            </p>
          </div>
        </div>
      </div>
    </HeroBackground>
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
    setActiveIndex(activeIndex === index ? null : index);
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
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-[#161616]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gray-600 dark:text-gray-300 text-3xl md:text-4xl font-normal text-left mb-12">
            <Translate id="oneai.benefits.section.title">
              Your Benefits as Developer:
            </Translate>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
            <div className="space-y-1">
              {benefits.map((benefit, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => toggleAccordion(index)}
                    className={`px-3 cursor-pointer transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'bg-[var(--ifm-color-primary)]'
                        : 'bg-white/50 hover:bg-white dark:bg-[#2a2a2a] dark:hover:bg-[#333]'
                    }`}
                  >
                    <div
                      className="flex items-center justify-between w-full transition-all duration-300 ease-in-out"
                      style={{
                        minHeight: isOpen ? '24px' : '40px',
                        paddingTop: isOpen ? '8px' : '0px',
                        paddingBottom: isOpen ? '0px' : '0px'
                      }}
                    >
                      <span className={`text-sm font-medium transition-colors duration-300 m-0 p-0 leading-none ${
                        isOpen ? 'text-gray-800' : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        <Translate id={benefit.titleId}>
                          {benefit.title}
                        </Translate>
                      </span>
                      <svg
                        className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ease-in-out ${
                          isOpen ? 'rotate-90 text-gray-800' : 'text-[var(--ifm-color-primary)]'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isOpen ? '200px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        marginTop: isOpen ? '8px' : '0px',
                        marginBottom: isOpen ? '8px' : '0px'
                      }}
                    >
                      <p className="text-gray-800 text-xs leading-relaxed">
                        <Translate id={benefit.descriptionId}>
                          {benefit.description}
                        </Translate>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="bg-white dark:bg-[#2a2a2a] p-4 relative">
                <img
                  src={useBaseUrl(`/img/ai/one_ai_plugin/benefits/${activeIndex !== null ? activeIndex + 1 : 1}.webp`)}
                  alt="ONE AI Benefit Illustration"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = '/img/ai/Capture.png';
                  }}
                />

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
                    <div className="w-4 h-4 bg-[var(--ifm-color-primary)] rounded-full border-2 border-white shadow-lg animate-pulse hover:scale-125 transition-all duration-300">
                      <div className="w-full h-full bg-[var(--ifm-color-primary)] rounded-full animate-ping opacity-75"></div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 shadow-lg opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                      <Translate id={benefits[hotspot.targetIndex].titleId}>
                        {benefits[hotspot.targetIndex].title}
                      </Translate>
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
      title: "Automated Analysis",
      titleId: "oneai.invention.training.title",
      image: "/img/ai/Input.webp",
      description: "ONE AI gets the best results if the dataset focusses on a specific task. First it analyzes the data, labels, hardware constraints, needed performance and application context. For example, it analyzes the object sizes in images.",
      descriptionId: "oneai.invention.training.description"
    },
    {
      title: "AI Feature Prediction",
      titleId: "oneai.invention.architecture.title",
      image: "/img/ai/Prediction.webp",
      description: "ONE AI then uses its knowledge about existing AI research and previously optimized AI models to predict the needed features for the AI model architecture. For example, bigger objects need larger receptive fields.",
      descriptionId: "oneai.invention.architecture.description"
    },
    {
      title: "Build & Train AI Model",
      titleId: "oneai.invention.generation.title",
      image: "/img/ai/Architecture.webp",
      description: "ONE AI takes the predictions and then builds a custom neural network architecture that fits all predicted features. Then the AI is trained on the dataset and only learns the relevant information.",
      descriptionId: "oneai.invention.generation.description"
    },
    {
      title: "Deploy Anywhere",
      titleId: "oneai.invention.deployment.title",
      image: "/img/ai/Export.webp",
      description: "Finally the AI can be deployed across FPGAs, microcontrollers, GPUs, and CPUs without modification. ONE AI handles all the complexity of hardware optimization and implementation automatically.",
      descriptionId: "oneai.invention.deployment.description"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#1e1e1e]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gray-600 dark:text-gray-300 text-3xl md:text-4xl font-normal text-left mb-12">
            <Translate id="oneai.invention.section.title">
              How It Works:
            </Translate>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {inventions.map((invention, index) => (
              <div key={index} className="p-6 transition-all duration-300 hover:shadow-lg" style={{ background: '#161616' }}>
                <span className="text-[var(--ifm-color-primary)] text-xs font-medium uppercase tracking-wider">
                  Step {index + 1}
                </span>
                <h3 className="text-white text-lg font-medium mt-2 mb-4">
                  <Translate id={invention.titleId}>
                    {invention.title}
                  </Translate>
                </h3>

                <div className="w-full h-48 mb-4 overflow-hidden flex items-center justify-center">
                  <img
                    src={useBaseUrl(invention.image)}
                    alt=""
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <div class="text-4xl text-[var(--ifm-color-primary)] opacity-50">🚀</div>
                        </div>
                      `;
                    }}
                  />
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  <Translate id={invention.descriptionId}>
                    {invention.description}
                  </Translate>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16">
          <div className="bg-[var(--ifm-color-primary)] p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <h3 className="text-gray-800 text-2xl md:text-3xl font-medium">
                <Translate id="oneai.examples.cta.title">
                  Ready to Start Now?
                </Translate>
              </h3>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/docs/one-ai/tutorials"
                  className="inline-block bg-black text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors text-center"
                  style={{ borderRadius: 0 }}
                >
                  <Translate id="oneai.examples.cta.button.main">
                    View Examples
                  </Translate>
                </Link>

                <Link
                  to="/docs/one-ai/getting-started"
                  className="inline-block bg-transparent border-2 border-black text-black px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-colors text-center"
                  style={{ borderRadius: 0 }}
                >
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

      <HomepageHeader />

      <main>
        <BenefitsSection />
        <InventionSection />

        <div
          style={{
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'var(--ifm-toc-border-color)',
          }}
        >
          <HomeHero />
        </div>

        <section className="py-16 md:py-24 bg-gray-100 dark:bg-[#161616]">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-gray-600 dark:text-gray-300 text-3xl md:text-4xl font-normal text-left mb-12">
                <Translate id="oneai.compare.heading">
                  The Entire AI Development Process Automated in One Tool
                </Translate>
              </h2>

              {sliders && sliders.length && (
                <div className="bg-white dark:bg-[#2a2a2a] p-6 sm:p-8 md:p-12">
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
                    initialSlide={1}
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
                          <h3 className="text-gray-700 dark:text-gray-200 font-medium">{title}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                  <div className="grid grid-cols-4 gap-4 mt-10 hidden md:grid">
                    {sliders.map(({ title, description }, idx) => (
                      <div
                        key={idx}
                        onClick={() => slickRef.current?.slickGoTo(idx)}
                        className={classnames(
                          "p-4 cursor-pointer transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333] border-t-2 border-transparent",
                          styles.slidebutton
                        )}
                        id={"slide" + idx}
                      >
                        <h3 className="text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">{title}</h3>
                        <span className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        
          <ComparisonSection />

        <GetStarted />

        <div className="pt-20 pb-20">
          <ContactUs subtitle={<Translate id="oneai.support.subtitle">Our experts are here to help you succeed.</Translate>} />
        </div>
      </main>
    </Layout>
  );
}

