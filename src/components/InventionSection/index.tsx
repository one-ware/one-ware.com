import React from "react";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";

export default function InventionSection() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const inventions = [
    {
      title: "Automated Analysis",
      titleId: "oneai.invention.training.title",
      image: isDarkMode ? "/img/ai/Input.svg" : "/img/ai/Input-light.svg",
      description: "ONE AI gets the best results if the dataset focusses on a specific task. First it analyzes the data, labels, hardware constraints, needed performance and application context. For example, it analyzes the object sizes in images.",
      descriptionId: "oneai.invention.training.description"
    },
    {
      title: "AI Feature Prediction",
      titleId: "oneai.invention.architecture.title",
      image: isDarkMode ? "/img/ai/Prediction.svg" : "/img/ai/Prediction-light.svg",
      description: "ONE AI then uses its knowledge about existing AI research and previously optimized AI models to predict the needed features for the AI model architecture. For example, bigger objects need larger receptive fields.",
      descriptionId: "oneai.invention.architecture.description"
    },
    {
      title: "Build & Train AI Model",
      titleId: "oneai.invention.generation.title",
      image: isDarkMode ? "/img/ai/Architecture.svg" : "/img/ai/Architecture-light.svg",
      description: "ONE AI takes the predictions and then builds a custom neural network architecture that fits all predicted features. Then the AI is trained on the dataset and only learns the relevant information.",
      descriptionId: "oneai.invention.generation.description"
    },
    {
      title: "Deploy Anywhere",
      titleId: "oneai.invention.deployment.title",
      image: isDarkMode ? "/img/ai/Export.svg" : "/img/ai/Export-light.svg",
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
              <div key={index} className="p-6 transition-all duration-300 hover:shadow-lg bg-gray-100 dark:bg-[#161616]">
                <span className="text-[var(--ifm-color-primary)] text-xs font-medium uppercase tracking-wider">
                  Step {index + 1}
                </span>
                <h3 className="text-gray-800 dark:text-white text-lg font-medium mt-2 mb-4">
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

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  <Translate id={invention.descriptionId}>
                    {invention.description}
                  </Translate>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16">
          <div className="bg-[#00FFD1] p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <h3 className="text-gray-800 text-2xl md:text-3xl font-medium">
                <Translate id="oneai.examples.cta.title">
                  Ready to Start Now?
                </Translate>
              </h3>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/docs/one-ai/demos/overview"
                  className="inline-block bg-black text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors text-center no-underline hover:no-underline"
                  style={{ borderRadius: 6 }}
                >
                  <Translate id="oneai.examples.cta.button.main">
                    View Examples
                  </Translate>
                </Link>

                <Link
                  to="/docs/one-ai/getting-started/quick-start-guide"
                  className="inline-block bg-transparent border-2 border-black text-black px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-colors text-center no-underline hover:no-underline"
                  style={{ borderRadius: 6 }}
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
