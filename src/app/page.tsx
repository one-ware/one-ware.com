"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { Montserrat } from "next/font/google";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { log } from "console";
import Navbar from "./navbar";
import Footer from "./footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [init, setInit] = useState(false);
  const [enableFireworks, setEnableFireworks] = useState(true);

  let fireworkContainer: Container | undefined = undefined;
  let skip = 0;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container | any) => {
    //console.log(container);
    var c = container as Container;
    if (c != null && skip >= 2) {
      c.stop();
      fireworkContainer = c;
    }
    skip++;
  };

  const activateFirework = () => {
    fireworkContainer?.stop();
    fireworkContainer?.start();
  };

  return (
    <div className={`${montserrat.className} flex flex-col`}>
      <div
        id="hero"
        className="h-screen w-full bg-gradient-to-b from-indigo-950 from-5%  to-emerald-900 to-95%"
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
                /*
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
                */
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
                    value: 90,
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
              particlesLoaded={particlesLoaded}
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
        <div className="absolute flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-full md:w-6/12 ">
            <img
              onClick={() => activateFirework()}
              className="drop-shadow-4xl"
              src="/Logo_SVG-ONE-ware.svg"
              alt="OneWare Logo"
            />
            <span className="text-xl md:text-4xl drop-shadow-4xl text-gray-200">
              Empowering Industry 5.0
            </span>
          </div>
        </div>

        <div className="w-full absolute h-screen">
        <div className="container mx-auto h-full">
          <div className="absolute top-40 right-28 drone hidden md:block">
            <Image
              src={"/drone_transparent.png"}
              alt={""}
              height={220}
              width={220}
            />
          </div>

          <div className="absolute bottom-20 left-25 hidden md:block">
            <Image
              src={"/roboter_transparent.png"}
              alt={""}
              height={320}
              width={320}
            />
          </div>
        </div>
        </div>

        <div className="startArrow" />
      </div>

      <header className="fixed w-full">
        <Navbar />
      </header>

      <main className="container mx-auto">
        <section className="flex p-10 gap-10 my-10 basis-0">
          <div>
            <Image
              src={"/Hardware_Connected.png"}
              alt={"IDE"}
              height={300}
              width={1200}
            />
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti dicta,
              aliquam sequi voluptate quas.
            </p>

            <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Read more
            </button>
          </div>
        </section>
        <section className="flex p-10 gap-10 my-10">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti dicta,
              aliquam sequi voluptate quas.
            </p>

            <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Read more
            </button>
          </div>
          <div>
            <Image
              src={"/Studio_Table.png"}
              alt={"IDE"}
              height={500}
              width={1200}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
