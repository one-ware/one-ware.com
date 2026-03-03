import React, { useEffect, useRef } from "react";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function ComparisonDemo() {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef1.current?.play().catch(() => {});
    videoRef2.current?.play().catch(() => {});
  }, []);

  return (
    <section
      className="flex items-center bg-white dark:bg-[#1e1e1e]"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-full max-w-6xl mx-auto px-6 py-12">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-left mb-2">
          <Translate id="oneai.comparison.demo.title">
            Real-World Performance
          </Translate>
        </p>
        <p className="text-sm sm:text-base lg:text-lg font-normal text-gray-500 dark:text-gray-400 mb-10">
          Moving Objects · Small Objects · Big Image Size
        </p>

        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-center">
            <div className="aspect-video overflow-hidden rounded-lg bg-black max-w-lg">
              <video
                ref={videoRef1}
                src={useBaseUrl("/img/demos/tennis_demo.webm")}
                loop muted playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-[var(--ifm-color-primary)] m-0 mb-1">ONE AI</p>
              <p className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 m-0 mb-6">Optimized CNN Architecture</p>
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[var(--ifm-color-primary)] text-sm sm:text-base lg:text-lg font-bold block">456</span>
                  <span className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 block">Detections</span>
                </div>
                <div>
                  <span className="text-[var(--ifm-color-primary)] text-sm sm:text-base lg:text-lg font-bold block">24</span>
                  <span className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 block">FPS*</span>
                </div>
                <div>
                  <span className="text-[var(--ifm-color-primary)] text-sm sm:text-base lg:text-lg font-bold block">0.04 M</span>
                  <span className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 block">Parameters</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-center">
            <div className="aspect-video overflow-hidden rounded-lg bg-black max-w-lg">
              <video
                ref={videoRef2}
                src={useBaseUrl("/img/demos/tennis_demo.webm")}
                loop muted playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 m-0 mb-6">YOLO26n</p>
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-lg font-bold block">379</span>
                  <span className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 block">Detections</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-lg font-bold block">2</span>
                  <span className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 block">FPS*</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-lg font-bold block">2.4 M</span>
                  <span className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 block">Parameters</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
          *One Core of Intel Ultra 7 CPU
        </p>
      </div>
    </section>
  );
}
