import React, { useState } from "react";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function BenefitsSection() {
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

  const hotspots = [
    [
      { x: 35, y: 30, targetIndex: 1 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 90, y: 8, targetIndex: 3 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
    ],
    [
      { x: 64, y: 27, targetIndex: 1 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
      { x: 87, y: 19, targetIndex: 0 },
      { x: 90, y: 8, targetIndex: 3 },
    ],
    [
      { x: 6, y: 8, targetIndex: 0 },
      { x: 70, y: 50, targetIndex: 2 },
      { x: 55, y: 21, targetIndex: 7 },
      { x: 11, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
    ],
    [
      { x: 90, y: 8, targetIndex: 0 },
      { x: 35, y: 30, targetIndex: 1 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
    ],
    [
      { x: 6, y: 8, targetIndex: 0 },
      { x: 4, y: 33, targetIndex: 2 },
      { x: 84, y: 16, targetIndex: 4 },
      { x: 8, y: 28, targetIndex: 5 },
      { x: 4, y: 23, targetIndex: 6 },
    ],
    [
      { x: 6, y: 8, targetIndex: 0 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 25, y: 55, targetIndex: 5 },
      { x: 6, y: 23, targetIndex: 6 },
    ],
    [
      { x: 6, y: 8, targetIndex: 0 },
      { x: 6, y: 33, targetIndex: 2 },
      { x: 9, y: 13, targetIndex: 4 },
      { x: 11, y: 28, targetIndex: 5 },
      { x: 30, y: 25, targetIndex: 6 },
    ],
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
                        isOpen ? 'text-white dark:text-gray-800' : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        <Translate id={benefit.titleId}>
                          {benefit.title}
                        </Translate>
                      </span>
                      <svg
                        className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ease-in-out ${
                          isOpen ? 'rotate-90 text-white dark:text-gray-800' : 'text-[var(--ifm-color-primary)]'
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
                      <p className="text-white dark:text-gray-800 text-xs leading-relaxed">
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
