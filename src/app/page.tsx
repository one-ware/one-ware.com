"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { Container } from "@tsparticles/engine";

export default function Home() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container: any) => {
    console.log(container);
  };

  return (
    <div className="flex flex-col">
      <div id="hero" className="h-screen w-screen">
        <div className="particles absolute">
          {init && (
            <Particles
              id="tsparticles"
              particlesLoaded={particlesLoaded}
              className="h-screen w-screen bg-gradient-to-r from-indigo-900 from-10% via-sky-900 via-30% to-emerald-900 to-90%"
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
                    value: 120,
                  },
                  opacity: {
                    value: 0.5,
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    value: { min: 1, max: 5 },
                  },
                },
                detectRetina: true,
              }}
            />
          )}
        </div>
        <div className="absolute flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-6/12 drop-shadow-2xl">
            <img
              src="/Logo_SVG-ONE-ware.svg"
              alt="OneWare Logo"
              className="drop-shadow"
            />
            <span className="text-4xl">Empowering Industrie 5.0</span>
          </div>
        </div>

        <div className="startArrow"/>
      </div>

      <main>
          
      </main>
    </div>
  );
}
