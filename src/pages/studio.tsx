import React, { useRef } from "react";
import styles from "./studio.module.css";
import "aos/dist/aos.css";
import classnames from "classnames";
import Slider from "react-slick";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import initWebsiteEffects from "../components/startEffects";

const sliders = [
  {
    title: "Code Assistant",
    imageSrc: <img alt="Code Assistant" src="/img/studio/slides/vhdl.png" />,
    description: (
      <>
        OneWare Studio makes writing code as easy as possible. Multiple Features
        like code suggestions, autocorrection and error listing work together to
        help you program your Hardware in the most efficient way.
      </>
    ),
  },
  {
    title: "Simulation",
    imageSrc: <img alt="Simulation" src="/img/studio/slides/vcd.png" />,
    description: (
      <>
        For many tasks in hardware development it is very useful to simulate
        your program. OneWare Studio offers excellent simulation integration,
        including a lightning fast, multi-threaded VCD Viewer and the most
        popular Simulation tools.
      </>
    ),
  },
  {
    title: "Extensibility",
    imageSrc: <img alt="Extensible" src="/img/studio/slides/extensions.png" />,
    description: (
      <>
        OneWare Studio is fully extensible, allowing to install custom
        languages, Hardware Support, new Toolchains or Simulators with one
        click. This makes our tool a very lightweight software that can be
        easily customized for your needs.
      </>
    ),
  },
];

export default function Studio(): JSX.Element {
  const slickRef = useRef<Slider>(null);

  initWebsiteEffects();
  
  return (
    <Layout title="Studio" description="OneWare Studio IDE">
      <main className="container">
        <div className="text-center mt-10">
          <h1 className="font-medium">
            Try the{" "}
            <span className="primary-text font-bold">Next Generation IDE</span>{" "}
            for Hardware Development{" "}
            <span className="primary-text font-bold">now!</span>
          </h1>

          <div className="flex-col space-x-5">
          <Link className="mt-5 button button--primary button--lg" href="/docs/oneware-studio/setup">
            Download
          </Link>

          <Link className="mt-5 button button--primary button--outline button--lg" href="/docs/oneware-studio/setup">
            Get Started
          </Link>
          </div>
        </div>
        <div style={{ overflowX: "hidden" }}>
          {sliders && sliders.length && (
            <div className="margin-vert--lg">
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
              <div className="columns-3 margin-vert--xl hidden md:block">
                {sliders.map(({ title, description }, idx) => (
                  <div
                    key={idx}
                    onClick={() => slickRef.current?.slickGoTo(idx)}
                    className={classnames(
                      "padding-vert--lg p-2",
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
      </main>
    </Layout>
  );
}
