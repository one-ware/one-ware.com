import React, { useRef } from "react";
import styles from "./studio.module.css";
import "aos/dist/aos.css";
import classnames from "classnames";
import Slider from "react-slick";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";

const sliders = [
  {
    title: "AI Generator",
    imageSrc: <img alt="Extensible" src="/img/studio/slides/ai.png" />,
    description: (
      <>
        Use our AI Generator to easily develop and integrate{" "}
        <span className="primary-text">AI Tasks</span> into your designs.
      </>
    ),
  },
  {
    title: "Code Assistant",
    imageSrc: <img alt="Code Assistant" src="/img/studio/slides/vhdl.png" />,
    description: (
      <>
        First class support for <span className="primary-text">VHDL</span>,{" "}
        <span className="primary-text">Verilog</span> and{" "}
        <span className="primary-text">C++</span> with lots of tools to help
        develop your designs as efficiently as possible.
      </>
    ),
  },
  {
    title: "Simulation",
    imageSrc: <img alt="Simulation" src="/img/studio/slides/vcd.png" />,
    description: (
      <>
        Simulate your designs inside the IDE, using the lightning fast,
        multi-threaded VCD Viewer and the most popular{" "}
        <span className="primary-text">Simulation</span> tools.
      </>
    ),
  },
  {
    title: "Extensibility",
    imageSrc: <img alt="Extensible" src="/img/studio/slides/extensions.png" />,
    description: (
      <>
        Download and Install <span className="primary-text">Extensions</span>{" "}
        from inside the IDE to extend its features. Discover a growing selection
        of features, simulators, toolchains and development boards
      </>
    ),
  },
];

export default function Studio(): JSX.Element {
  const slickRef = useRef<Slider>(null);

  initWebsiteEffects();

  return (
    <Layout title="Studio" description="OneWare Studio IDE">
      <main className="container mb-20">
        <div className="text-center mt-10">
          <h1 className="font-medium">
            Try the{" "}
            <span className="primary-text font-bold">Next Generation IDE</span>{" "}
            for Electronics Development{" "}
            <span className="primary-text font-bold">now!</span>
          </h1>

          <div className="flex-col space-x-5 mb-10">
          <Link
              className="mt-5 button button--primary button--lg hidden md:inline-block"
              href="/docs/studio/setup"
            >
              Download
            </Link>

            <Link
              className="mt-5 button button--primary button--outline button--lg"
              href="/docs/studio/setup"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div style={{ overflowX: "hidden" }}>
          {sliders && sliders.length && (
            <div className="pb-20">
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
                      if (i == n) slide.classList.add(styles.activeslide ?? "");
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
                      "block padding-vert--lg p-2 overflow-hidden",
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

        <div className="text-center max-w-4xl m-auto">
          <h2 className="text-4xl font-bold">
            The perfect companion for PLC ONE
          </h2>
          <img
            data-aos="zoom-in"
            src={"/img/studio/PLC_Studio.png"}
            alt="Compare"
          />
          <div className="text-xl md:text-2xl mt-6" data-aos="slide-up">
            Program the <span className="primary-text">PLC ONE</span> with{" "}
            <span className="primary-text">ONE WARE Studio</span> and profit
            from the automatic project configuration and easy device integration
            through comprehensive libraries. It smartly allocates computing
            power for peak efficiency and additionally, our AI generator feature
            allows for seamless AI integration. With support for programming in
            Block Diagram, Structured Text, Python, VHDL, VHDP or Verilog, it
            doesn't matter if you have experience in software, FPGA or SPS
            development.
          </div>
        </div>

        <div className="text-center max-w-4xl m-auto mt-16">
          <h2 className="text-4xl font-bold">
             Integrate AI faster and without experts
          </h2>
          <img
            data-aos="zoom-in"
            src={"/img/studio/Studio_AI.png"}
            alt="Compare"
          />
          <div className="text-xl md:text-2xl mt-6" data-aos="slide-up">
            Our software is the first solution that moves away from universal
            yet inefficient neural networks and time consuming tailored AI
            solutions that depend on AI experts. ONE WARE Studio streamlines AI
            integration by guiding users without prior expertise through the
            customization of neural networks. It automatically crafts efficient
            and adaptable neural networks, which can then be effortlessly
            deployed across a variety of hardware, from FPGAs to
            microcontrollers, and processors equipped with TPUs or GPUs. Empower
            your operations with AI that is both sophisticated and accessible.
          </div>
        </div>

        <ContactUs />
      </main>
    </Layout>
  );
}
