import React, { useRef, useState } from "react";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";

export default function ComparisonSection() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [activeUseCase, setActiveUseCase] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const useCases = [
    {
      title: "High Speed HDL",
      titleId: "oneai.usecase.hdl.title",
      subtitle: "ONE AI implements efficient AI on any FPGA with our open source AI to HDL libraries",
      subtitleId: "oneai.usecase.hdl.subtitle",
      backgroundImage: "/img/ai/one_ai_plugin/use_cases/chip/defect_1.png",
      displayImage: isDarkMode ? "/img/ai/one_ai_plugin/use_cases/chip/integration.svg" : "/img/ai/one_ai_plugin/use_cases/chip/integration-light.svg",
      description: "Next to the vendor tools for AI integration we offer a version for parallel AI integration on FPGAs that allows integration just like parallel image processing that doesn't need an additional processor and adds no overhead to the system. Together with our partner Altera we show how Altera's MAX® 10 with ONE AI and our HDL generator can now outperform Nvidia's Jetson Orin Nano with:",
      descriptionId: "oneai.usecase.hdl.description",
      metrics: [
        { value: "72×", label: "Faster Detection", labelId: "homepage.metric.latency" },
        { value: "24×", label: "Less Errors", labelId: "homepage.metric.errors" },
        { value: "20×", label: "Lower Power", labelId: "homepage.metric.power" },
        { value: "6×", label: "Lower Cost", labelId: "homepage.metric.cost" },
      ],
      whitepaper: "/docs/one-ai/documentation/integration/fpga-deployment",
      linkText: "More Details",
      linkTextId: "oneai.usecase.link"
    },
    {
      title: "Prebuild UI",
      titleId: "oneai.usecase.ui.title",
      subtitle: "Integration on any system with operating system and graphical interface",
      subtitleId: "oneai.usecase.ui.subtitle",
      backgroundImage: "/img/ai/one_ai_plugin/use_cases/capture/preview.png",
      displayImage: isDarkMode ? "/img/ai/one_ai_plugin/use_cases/capture/integration.svg" : "/img/ai/one_ai_plugin/use_cases/capture/integration-light.svg",
      description: "Eliminate months of development time. Integrate AI with our pre-build UI that supports monitoring, remote control and continuous improvement. Already in production with leading production companies and ready for your quality control or automation task with:",
      descriptionId: "oneai.usecase.ui.description",
      metrics: [
        { value: "1-Click", label: "Deployment", labelId: "oneai.metric.deployment" },
        { value: "< 1 Day", label: "Development Time", labelId: "oneai.metric.devtime" },
      ],
      whitepaper: "/docs/one-ai/documentation/camera-tool",
      linkText: "More Details",
      linkTextId: "oneai.usecase.link"
    },
    {
      title: "Direct Integration with SDK",
      titleId: "oneai.usecase.sdk.title",
      subtitle: "Deploy AI in Any Application",
      subtitleId: "oneai.usecase.sdk.subtitle",
      backgroundImage: "/img/ai/one_ai_plugin/demos/overlap-difference/image_000118_test.png",
      displayImage: isDarkMode ? "/img/ai/one_ai_plugin/use_cases/pcb/integration.svg" : "/img/ai/one_ai_plugin/use_cases/pcb/integration-light.svg",
      description: "ONE AI can create generic ONNX or Tensorflow Lite models that can be integrated directly with your application using our SDK. One example AI model,that you can integrate, detects small objects on complex backgrounds and outperformes YOLOv8 with:",
      descriptionId: "oneai.usecase.sdk.description",
      metrics: [
        { value: "95.7", label: "F1 Score", labelId: "homepage.metric.f1score" },
        { value: "8×", label: "Smaller Model", labelId: "homepage.metric.modelsize" },
        { value: "10×", label: "Fewer Errors", labelId: "homepage.metric.fewererrors" },
      ],
      whitepaper: "/docs/one-ai/documentation/integration/deployment-overview",
      linkText: "More Details",
      linkTextId: "oneai.usecase.link"
    },
    {
      title: "C++ Project or Executable",
      titleId: "oneai.usecase.cpp.title",
      subtitle: "Deploy AI with any CPU, TPU, GPU or MCU",
      subtitleId: "oneai.usecase.cpp.subtitle",
      backgroundImage: "/img/ai/one_ai_plugin/use_cases/pcb/pcb_1.png",
      displayImage: isDarkMode ? "/img/ai/one_ai_plugin/use_cases/pcb/integration.svg" : "/img/ai/one_ai_plugin/use_cases/pcb/integration-light.svg",
      description: "ONE AI can create Tensorflow Lite based C++ projects or precompiled executables with API that run efficient with any kind of processor or AI accelerator. One example is a PCB quality control where the AI by ONE AI beat not only standard image processing and universal AI models by speed and accuracy, but also the AI model from the scientists with:",
      descriptionId: "oneai.usecase.cpp.description",
      metrics: [
        { value: "98.4", label: "F1 Score", labelId: "oneai.metric.f1score" },
        { value: "750 %", label: "Speed Increase", labelId: "oneai.metric.speed" },
      ],
      whitepaper: "/docs/one-ai/documentation/export",
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
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

          <div
            className="p-6 sm:p-8 md:p-12 overflow-hidden bg-gray-100 dark:bg-[#161616]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
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
                <h3 className="text-gray-800 dark:text-white text-xl md:text-2xl font-medium mb-2">
                  <Translate id={currentUseCase.titleId}>
                    {currentUseCase.title}
                  </Translate>
                </h3>
                <h4 className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-4">
                  <Translate id={currentUseCase.subtitleId}>
                    {currentUseCase.subtitle}
                  </Translate>
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6">
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
                      <span className="text-gray-600 dark:text-gray-400 text-xs uppercase mt-1 block">
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
                    className="inline-block bg-[var(--ifm-color-primary)] text-black px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[var(--ifm-color-primary)] hover:text-black no-underline hover:no-underline"
                    style={{ borderRadius: 6 }}
                  >
                    <Translate id={currentUseCase.linkTextId}>
                      {currentUseCase.linkText}
                    </Translate>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-8 mt-8 pt-6 border-t border-gray-300 dark:border-white/20">
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
                      index === activeUseCase ? "bg-[var(--ifm-color-primary)]" : "bg-gray-400 dark:bg-white/40 hover:bg-gray-500 dark:hover:bg-white/60"
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
