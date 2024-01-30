"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { Montserrat } from "next/font/google";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [init, setInit] = useState(false);
  const [enableFireworks, setEnableFireworks] = useState(true);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFireworksPreset(engine);
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container: any) => {
    console.log(container);
  };

  return (
    <>
      <div className="flex flex-col">
        <div id="hero" className="h-screen w-screen bg-gradient-to-r from-indigo-950 from-10% via-sky-950 via-30% to-emerald-950 to-80%">
          <div className="particles absolute">
            {init && (
              <Particles
                id="stars"
                particlesLoaded={particlesLoaded}
                className="h-screen w-screen absolute"
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
              />)}

            {init && enableFireworks && (
              <Particles
                id="fireworks"
                particlesLoaded={particlesLoaded}
                className="h-screen w-screen absolute"    
                options={{
                  fullScreen:{
                    enable: false
                  },
                  detectRetina: true,
                  fpsLimit: 144,
                  emitters: {
                    direction: "top",
                    life: {
                      count: 10,
                      duration: 0.1,
                      delay: 0.3
                    },
                    rate: {
                      delay: 0.2,
                      quantity: 1
                    },
                    size: {
                      width: 100,
                      height: 0
                    },
                    position: {
                      y: 100,
                      x: 50
                    }
                  },
                  particles: {
                    number: {
                      value: 0
                    },
                    destroy: {
                      mode: "split",
                      bounds: {
                        top: 10
                      },
                      split: {
                        count: 1,
                        factor: { value: 3 / 3 },
                        rate: {
                          value: 50
                        },
                        particles: {
                          color: {
                            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
                          },
                          stroke: {
                            width: 0
                          },
                          number: {
                            value: 0
                          },
                          opacity: {
                            value: { min: 0.1, max: 1 },
                            animation: {
                              enable: true,
                              speed: 0.2,
                              sync: false,
                              startValue: "max",
                              destroy: "min"
                            }
                          },
                          shape: {
                            type: "circle"
                          },
                          size: {
                            value: { min: 2, max: 3 }
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
                              enable: false
                            },
                            speed: { min: 5, max: 10 },
                            direction: "outside",
                            random: true,
                            outMode: "destroy"
                          }
                        }
                      }
                    },
                    life: {
                      count: 1
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
                        destroy: "min"
                      }
                    },
                    stroke: {
                      color: {
                        value: "#ffffff"
                      },
                      width: 1
                    },
                    rotate: {
                      path: true
                    },
                    move: {
                      enable: true,
                      gravity: {
                        acceleration: 15,
                        enable: true,
                        inverse: true,
                        maxSpeed: 100
                      },
                      speed: { min: 10, max: 20 },
                      outModes: {
                        default: "destroy",
                        top: "none"
                      },
                    }
                  }
                }}
              />
            )}
          </div>
          <div className="absolute flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center w-full md:w-6/12 ">
              <img
                className="drop-shadow-4xl"
                src="/Logo_SVG-ONE-ware.svg"
                alt="OneWare Logo"
              />
              <span
                className={`${montserrat.className} text-xl md:text-4xl drop-shadow-4xl text-gray-200`}
              >
                Empowering Industry 5.0
              </span>
            </div>
          </div>

          <div className="startArrow" />
        </div>

        <main></main>
      </div>
    </>
  );
}
