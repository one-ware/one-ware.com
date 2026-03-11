import React, { useState, useEffect, useRef, useCallback } from "react";
import Translate from "@docusaurus/Translate";

const steps = [
  {
    title: <Translate id="oneai.slider.capture">Capture and Label</Translate>,
    src: require("@site/static/img/ai/Capture.png").default,
    alt: "Capture",
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
    src: require("@site/static/img/ai/Pre.png").default,
    alt: "Hardware",
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
    src: require("@site/static/img/ai/Train.png").default,
    alt: "Simulation",
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
    src: require("@site/static/img/ai/Export.png").default,
    alt: "Extensible",
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

export default function AiProcessSlider() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const pendingRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const transitionTo = useCallback((idx: number) => {
    if (idx === active && pendingRef.current === null) return;
    setVisible(false);
    pendingRef.current = idx;
  }, [active]);

  useEffect(() => {
    if (!visible && pendingRef.current !== null) {
      const timeout = setTimeout(() => {
        setActive(pendingRef.current!);
        pendingRef.current = null;
        setVisible(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisible(false);
      pendingRef.current = null;
      setTimeout(() => {
        setActive((a) => {
          const next = (a + 1) % steps.length;
          return next;
        });
        setVisible(true);
      }, 300);
    }, 20000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const step = steps[active];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-gray-600 dark:text-gray-300 text-3xl md:text-4xl font-normal text-left mb-12">
            <Translate id="oneai.compare.heading">
              The Entire AI Development Process Automated in One Tool
            </Translate>
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div
              className="lg:w-[60%] flex-shrink-0 bg-white dark:bg-[#2a2a2a] rounded-lg overflow-hidden flex items-center justify-center p-4 sm:p-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <img
                src={step.src}
                alt={step.alt}
                className="w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="lg:w-[40%] flex flex-col">
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="flex justify-center lg:justify-start gap-2 mt-6">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => transitionTo(idx)}
                    className={`w-3 h-3 rounded-full border-0 p-0 cursor-pointer transition-all duration-300 ${
                      idx === active
                        ? "bg-[var(--ifm-color-primary)] scale-110"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
