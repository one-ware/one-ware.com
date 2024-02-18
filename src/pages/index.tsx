import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import 'aos/dist/aos.css'; // You can also use <link> for styles

import styles from "./index.module.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initWebsiteEffects from "../components/startEffects";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [init, setInit] = useState(false);
  const [enableFireworks, setEnableFireworks] = useState(true);

  let fireworkContainer: Container | undefined = undefined;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container | any) => {
  };

  const particlesLoadedStop = async (container?: Container | any) => {
    var c = container as Container;
    if (c != null) {
      c.stop();
      fireworkContainer = c;
    }
  };

  const activateFirework = () => {
    //fireworkContainer?.stop();
    //fireworkContainer?.start();
  };

  return (
    <header
      id="hero"
      className={`h-screen w-full ${styles.heroBackground}`}
    >
      <div className="particles absolute w-full h-full">
        {init && (
          <Particles
            id="stars"
            particlesLoaded={particlesLoaded}
            className="h-full w-full absolute"
            options={{
              fullScreen: {
                enable: false,
              },
              fpsLimit: 144,
                interactivity: {
                  events: {
                    onClick: {
                      enable: true,
                      mode: "push",
                    },
                    onHover: {
                      enable: true,
                      mode: "bubble",
                    },
                  },
                  modes: {
                    push: {
                      quantity: 4,
                    },
                    bubble: {
                      size: 6,
                      distance: 40,
                    },
                  },
                },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.1,
                  width: 1,
                },
                move: {
                  direction: "bottom",
                  enable: true,
                  outModes: {
                    default: "out",
                  },
                  size: true,
                  random: false,
                  speed: {
                    min: 0.2,
                    max: 0.4,
                  },
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                  },
                  value: 60,
                },
                opacity: {
                  value: 0.3,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 4 },
                },
              },
              detectRetina: true,
            }}
          />
        )}

        {init && (
          <Particles
            id="fireworks"
            particlesLoaded={particlesLoadedStop}
            className="h-full w-full absolute"
            options={{
              fullScreen: {
                enable: false,
              },
              detectRetina: true,
              fpsLimit: 144,
              emitters: {
                direction: "top",
                life: {
                  count: 10,
                  duration: 0.1,
                  delay: 0.3,
                },
                rate: {
                  delay: 0.1,
                  quantity: 1,
                },
                size: {
                  width: 100,
                  height: 0,
                },
                position: {
                  y: 100,
                  x: 50,
                },
              },
              particles: {
                number: {
                  value: 0,
                },
                destroy: {
                  mode: "split",
                  bounds: {
                    top: 10,
                  },
                  split: {
                    count: 1,
                    factor: { value: 3 / 3 },
                    rate: {
                      value: 50,
                    },
                    particles: {
                      color: {
                        value: [
                          "#5bc0eb",
                          "#fde74c",
                          "#9bc53d",
                          "#e55934",
                          "#fa7921",
                        ],
                      },
                      stroke: {
                        width: 0,
                      },
                      number: {
                        value: 0,
                      },
                      opacity: {
                        value: { min: 0.1, max: 1 },
                        animation: {
                          enable: true,
                          speed: 0.2,
                          sync: false,
                          startValue: "max",
                          destroy: "min",
                        },
                      },
                      shape: {
                        type: "circle",
                      },
                      size: {
                        value: { min: 2, max: 3 },
                      },
                      /*life: {
                            count: 1,
                            duration: {
                              value: {
                                min: 1,
                                max: 2
                              }
                            }
                          },*/
                      move: {
                        enable: true,
                        gravity: {
                          enable: false,
                        },
                        speed: { min: 5, max: 10 },
                        direction: "outside",
                        random: true,
                        outMode: "destroy",
                      },
                    },
                  },
                },
                life: {
                  count: 1,
                },
                shape: {
                  type: "line",
                  fill: true,
                },
                size: {
                  value: { min: 20, max: 50 },
                  animation: {
                    enable: true,
                    sync: true,
                    speed: 70,
                    startValue: "random",
                    destroy: "min",
                  },
                },
                stroke: {
                  color: {
                    value: "#ffffff",
                  },
                  width: 1,
                },
                rotate: {
                  path: true,
                },
                move: {
                  enable: true,
                  gravity: {
                    acceleration: 15,
                    enable: true,
                    inverse: true,
                    maxSpeed: 100,
                  },
                  speed: { min: 10, max: 20 },
                  outModes: {
                    default: "destroy",
                    top: "none",
                  },
                },
              },
            }}
          />
        )}
      </div>

      <div className="w-full absolute h-screen hidden">
        <div className="container mx-auto h-full">
          <div className={`absolute top-50 right-28 hidden md:block ${styles.drone}`}>
            <img
              src={"img/start/drone_transparent.png"}
              alt={""}
              width={220}
            />
          </div>

          <div className="absolute bottom-20 left-15 hidden md:block">
            <img
              src={"img/start/roboter_transparent.png"}
              alt={""}
              height={110}
            />
          </div>
        </div>
      </div>

      <div className="absolute flex flex-col items-center justify-center w-full h-full pointer-events-none">
        <div className="flex flex-col items-center justify-center w-full md:w-6/12 ">
          <img
            onClick={() => activateFirework()}
            className="drop-shadow-4xl"
            src="img/start/Logo_SVG-ONE-ware.svg"
            alt="OneWare Logo"
          />
          <span className="text-xl md:text-4xl drop-shadow-4xl text-gray-200">
            Empowering Industry 5.0
          </span>
        </div>
      </div>

      <div className={styles.startArrow} />
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  initWebsiteEffects();

  return (
    <Layout
      title="The Next Industrial Revolution"
      description="Empowering Industry 5.0"
    >
      <HomepageHeader />
      <main className="container overflow-x-hidden">
        <div className="my-20 flex flex-col justify-center align-middle" data-aos="fade-up">
          <h1 className="text-5xl text-center font-medium">Get ready for the next <span className="font-bold primary-text">Industrial Revolution</span></h1>
          <img src="/img/start/Overview.png" className="mx-auto mt-10" width={900}/>
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
