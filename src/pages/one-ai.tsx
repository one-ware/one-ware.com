import React, { useRef } from "react";
import styles from "./one-ai.module.css";
import "aos/dist/aos.css";
import classnames from "classnames";
import Slider from "react-slick";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import Translate from "@docusaurus/Translate";
import Head from '@docusaurus/Head';
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";
import OneAiHero from "../components/OneAiHero";
import GetStarted from "../components/GetStarted";
import ComparisonDemo from "../components/ComparisonDemo";
import ArchitectureSection from "../components/ArchitectureSection";
import BenefitsSection from "../components/BenefitsSection";
import InventionSection from "../components/InventionSection";
import ComparisonSection from "../components/ComparisonSection";

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

      <OneAiHero />

      <main>
        <ComparisonDemo />
        <ArchitectureSection />
        <BenefitsSection />
        <InventionSection />


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
