import React, { useRef } from "react";
import clsx from "clsx";
import Slider from "react-slick";
import Translate from "@docusaurus/Translate";
import styles from "./AiProcessSlider.module.css";

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

export default function AiProcessSlider() {
  const slickRef = useRef<Slider>(null);

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-[#161616]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gray-600 dark:text-gray-300 text-3xl md:text-4xl font-normal text-left mb-12">
            <Translate id="oneai.compare.heading">
              The Entire AI Development Process Automated in One Tool
            </Translate>
          </h2>

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
                  <div className="md:hidden mt-5">
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
                  className={clsx(
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
        </div>
      </div>
    </section>
  );
}
