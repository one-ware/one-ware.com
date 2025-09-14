import React, { useEffect, useRef, useState } from "react";
import styles from "./one-ai.module.css";
import "aos/dist/aos.css";
import classnames from "classnames";
import Slider from "react-slick";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import Translate, { translate } from "@docusaurus/Translate";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

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

function HomepageHeader() {
  return (
    <header id="hero" className={`w-full ${styles.heroBackground} h-96`}>
      <div className="absolute flex flex-col items-center justify-center w-full h-full">
        <div className="flex">
          <div className="flex-col max-w-5xl m-2 mt-10">
            <div className="text-center mt-10">
              <h1 className="font-bold text-3xl md:text-4xl mb-4">
                The Next Generation of AI Development 
              </h1>
              <h2 className=" text-xl md:text-2xl mb-7 font-normal">
                AI Models Invented in Seconds for Your Needs. 
                <br/>
                The All-in-ONE Solution, optimized for Edge AI, Vision AI and Embedded Intelligence. 
              </h2>

              <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-5 mb-10">
                <Link
                  className="button button--primary button--outline button--lg text-sm md:text-lg"
                  href="/one-ai"
                >
                  <Translate id="homepage.subtitle.ai.getstarted">Get Started</Translate>
                </Link>

                <Link
                  className="button button--primary button--lg text-sm md:text-lg"
                  href="https://cloud.one-ware.com/Account/Register"
                >
                  <Translate id="oneai.signup">Sign Up</Translate>
                </Link>


              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.startArrow} />
    </header>
  );
}

function ComparisonSection() {
  // DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 1)
  // Der Ref für die Swiper-Instanz ist wieder da.
  const swiperRef = useRef<SwiperCore | null>(null);

  const scrollPrev = () => {
    swiperRef.current?.slidePrev();
  };

  const scrollNext = () => {
    swiperRef.current?.slideNext();
  };

  const useCases = [
    {
      title: "All-in-ONE AI Deployment",
      subtitle: "From idea to realization in one click with one software",
      image: "/img/ai/one_ai_plugin/use_cases/capture/preview.png",
      description: "Eliminate months of development time. Integrate AI with our pre-build UI that supports monitoring, remote control and continuous improvement. Already in production with leading production companies and ready for your quality control or automation task.",
      metrics: [
        { value: "1-Click", label: "Deployment" },
        { value: "< 1 Day", label: "Development Time" },
      ],
      whitepaper: "/docs/one-ai/use-cases/camera-tool",
      linkText: "More Details"
    },
    {
      title: "High Speed and Efficient Quality Control",
      subtitle: "ONE AI makes decade-old chips outperform todays leading edge AI hardware",
      image: "/img/ai/one_ai_plugin/use_cases/chip/defect_1.png",
      description: "You don't need to upgrade your hardware. Just upgrade your AI. Together with our partner Altera we show how Altera's MAX® 10 with ONE AI and our HDL generator can now outperform Nvidia's Jetson Orin Nano with:",
      metrics: [
        { value: "488×", label: "Lower Latency" },
        { value: "24×", label: "Reduced Errors" },
        { value: "20×", label: "Lower Power" },
        { value: "6×", label: "Lower Cost" },
      ],
      whitepaper: "/docs/one-ai/use-cases/chip",
      linkText: "More Details"
    },
    {
      title: "High Precision Quality Control",
      subtitle: "ONE AI outperforms scientists in under one second",
      image: "/img/ai/one_ai_plugin/use_cases/pcb/pcb_1.png",
      description: "Researchers created a custom AI model for a PCB quality control. ONE AI beat not only standard image processing and universal AI models by speed and accuracy, but also the AI model from the scientists. For predicting the right AI model architecture, ONE AI needed 0.7 seconds.",
      metrics: [
        { value: "98.4", label: "F1 Score" },
        { value: "750 %", label: "Speed Increase" },
      ],
      whitepaper: "/docs/one-ai/use-cases/pcb",
      linkText: "More Details"
    }
  ];

  return (
    <div id="comparison" className="py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 font-bold px-4">
          Leading AI Innovation for a Smarter World
        </p>
      </div>

      <div className="relative">
        <Swiper
          // DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 2)
          // onSwiper-Callback, um den Ref zu setzen.
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          rewind={true}
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={1.2}
          spaceBetween={20}
          slidesPerGroup={1}
          watchSlidesProgress={true}
          // modules={[Navigation]}  // kannst du entfernen, da wir eigene Buttons haben
          breakpoints={{
            768:  { slidesPerView: 1.5,  spaceBetween: 40 },
            1280: { slidesPerView: 1.75, spaceBetween: 50 },
          }}
        >
          {useCases.map((useCase, idx) => (
            // DER ZWEITE WICHTIGE FIX BLEIBT:
            <SwiperSlide key={idx}>
              {({ isActive }) => (
                <div
                  className={`relative w-full rounded-2xl transition-all duration-500 ease-in-out transform ${isActive ? 'scale-100' : 'scale-90 opacity-60'}`}
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%), url(${useCase.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* ... der innere Content der Slide bleibt unverändert ... */}
                   <div className="relative z-10 p-6 sm:p-8 lg:p-12 min-h-[550px] md:min-h-[500px] flex flex-col justify-between bg-gray-900/20 rounded-2xl backdrop-blur-sm border border-white/10">
                    
                    {/* Content Wrapper für Desktop Layout */}
                    <div className="flex flex-col lg:flex-row lg:gap-8 h-full">
                      
                      {/* Text Section - links auf Desktop */}
                      <div className="text-left lg:flex-1 lg:max-w-[60%]">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold primary-text mb-2">
                          {useCase.title}
                        </h3>
                        <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium mb-4">
                          {useCase.subtitle}
                        </h4>
                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                          {useCase.description}
                        </p>
                      </div>

                      {/* Metrics & Button Section - rechts auf Desktop */}
                      <div className="lg:flex-shrink-0 lg:w-[40%] flex flex-col justify-end">
                        {/* Bottom Section (Metrics & Button) */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between gap-6">
                          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto lg:w-full">
                            {useCase.metrics.map((metric, metricIdx) => (
                              <div key={metricIdx} className="p-3 bg-black/40 border border-white/10 rounded-lg text-center">
                                <h5 className="text-xl sm:text-2xl font-bold primary-text">
                                  {metric.value}
                                </h5>
                                <p className="text-sm sm:text-base text-gray-300">
                                  {metric.label}
                                </p>
                              </div>
                            ))}
                          </div>
                          <a
                            href={useCase.whitepaper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-[#00FFD1] text-black font-bold rounded-lg hover:bg-[#00e4ba] transition-all duration-300 transform hover:scale-105 text-sm lg:text-base w-full sm:w-auto lg:w-full justify-center shrink-0"
                          >
                            {useCase.linkText}
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 3) */}
        {/* Die onClick-Handler sind wieder auf den Buttons. */}
        <button
          onClick={scrollPrev}
          aria-label="Previous use case"
          className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md shadow-lg transition-transform hover:scale-105"
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-[#00FFD1]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={scrollNext}
          aria-label="Next use case"
          className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md shadow-lg transition-transform hover:scale-105"
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-[#00FFD1]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// --- New Section: Adaptive Architecture (place anywhere above ComparisonSection) ---
function AdaptiveArchitectureSection() {
  const [speed, setSpeed] = useState(50);       // 0..100
  const [ram, setRam] = useState(50);           // 0..100
  const [complexity, setComplexity] = useState(50); // 0..100

  // Derived values (0..1)
  const c = complexity / 100; // sets MAX
  const r = ram / 100;
  const s = speed / 100;

  // max scale by complexity only
  const maxScale = c;

  // actual = RAM + Speed + Complexity (normalized as mean), capped by max
  const actualScale = Math.min(maxScale, (r + s + c) / 3);
  return (
    <section
      id="adaptive-architecture"
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-black via-gray-900/70 to-black"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl md:text-4xl font-bold">
            No-Code AI with Custom-Grade Precision
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mt-4">
            Build production AI without writing code—enjoy the precision and tailoring of custom AI
            development <span className="font-semibold">without the development time</span>. You’re
            <span className="font-semibold"> not limited to preset models</span>: ONE&nbsp;AI designs an
            architecture that matches your data, your hardware and your performance targets.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Live architecture preview */}
          <div className="relative rounded-2xl border border-white/10 bg-black/80 overflow-hidden">
            <ArchitecturePreview maxScale={maxScale} actualScale={actualScale} />
          </div>

          {/* Controls + bullets */}
          <div className="rounded-2xl p-6 sm:p-8 bg-white/5 border border-white/10">
            <div className="space-y-6">
              <FeatureBullet
                title="Always the best model"
                text="The architecture adapts to your constraints—speed, memory and application complexity—so you always get the best possible AI for your task."
              />
              <FeatureBullet
                title="No code, no templates"
                text="Not bound to fixed model families. ONE AI synthesizes a fit-for-purpose network instead of forcing your use case into a generic backbone."
              />

              {/* Sliders */}
              <div className="mt-4 space-y-5">
                <Knob
                  label="Speed"
                  hint="Throughput / latency target"
                  value={speed}
                  onChange={setSpeed}
                  left="Power-save"
                  right="High-FPS"
                />
                <Knob
                  label="Memory (RAM)"
                  hint="Available runtime memory"
                  value={ram}
                  onChange={setRam}
                  left="Tiny"
                  right="Plenty"
                />
                <Knob
                  label="Application Complexity"
                  hint="Task difficulty & variability"
                  value={complexity}
                  onChange={setComplexity}
                  left="Simple"
                  right="Challenging"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Small helper subcomponents
function FeatureBullet({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-5 w-5 shrink-0 rounded-full bg-[#00FFD1]"></span>
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-gray-300 text-sm">{text}</p>
      </div>
    </div>
  );
}

function Knob({
  label, hint, value, onChange, left, right,
}: {
  label: string; hint?: string; value: number; onChange: (v: number) => void; left?: string; right?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-gray-300">{label}</p>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#00FFD1]"
        aria-label={label}
      />
      <div className="flex text-xs text-gray-400 justify-between">
        <span>{left}</span>
        <span className="text-white font-semibold">{value}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

function WhitepaperStat({ value, label, href }: { value: string; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block text-center rounded-lg border border-white/10 bg-black/40 p-3 hover:bg-black/60 transition"
    >
      <div className="text-xl font-bold text-[#00FFD1]">{value}</div>
      <div className="text-xs text-gray-300">{label}</div>
    </a>
  );
}

// ---- Drop-in replacement for ArchitecturePreview (more random/organic) ----
function ArchitecturePreview({
  maxScale,       // 0..1  (from complexity)
  actualScale,    // 0..1  (<= maxScale)
}: {
  maxScale: number;
  actualScale: number;
}) {
  const width = 760;
  const height = 420;
  const pad = 24;

  // global ranges
  const MIN_NODES = 6;
  const NODE_RANGE = 160; // how big "max" can get
  const K_BASE = 2, K_RANGE = 6; // neighbors per node

  // compute node caps from max, then actual within that cap
  const nodesMax = MIN_NODES + Math.round(maxScale * NODE_RANGE);
  const nodesActualRaw = MIN_NODES + Math.round(actualScale * NODE_RANGE);
  const nodeCount = Math.max(MIN_NODES, Math.min(nodesActualRaw, nodesMax));

  // density / connectivity grows with actual
  const k = clamp(Math.round(K_BASE + actualScale * K_RANGE), 2, 8);
  const maxDist = clamp(100 + 160 * maxScale, 80, 280); // avoid very long edges

  // deterministic PRNG so sliders -> stable jitter
  const seed = (Math.round(maxScale * 997) << 16) ^ Math.round(actualScale * 65535);
  const rand = mulberry32(seed || 1);

  // Poisson-ish sampling (keine Haufenbildung)
  const minDist = clamp(26 - Math.log(Math.max(8, nodeCount)) * 5, 10, 26);
  const nodes: { x: number; y: number; id: number }[] = [];
  let guard = 0;
  while (nodes.length < nodeCount && guard < nodeCount * 350) {
    guard++;
    const x = pad + rand() * (width - pad * 2);
    const y = pad + rand() * (height - pad * 2);
    let ok = true;
    for (let i = 0; i < nodes.length; i++) {
      const dx = nodes[i].x - x, dy = nodes[i].y - y;
      const d = Math.hypot(dx, dy);
      if (d < minDist + rand() * 6) { ok = false; break; }
    }
    if (ok) nodes.push({ x, y, id: nodes.length });
  }

  // k-nearest neighbors unter Distanzschwelle
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const edgeSet = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const nearest = nodes
      .map((m, j) => ({ j, d2: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((v) => v.j !== i)
      .sort((a, b) => a.d2 - b.d2);

    let added = 0;
    for (let t = 0; t < nearest.length && added < k; t++) {
      const j = nearest[t].j;
      const d = Math.sqrt(nearest[t].d2);
      if (d < maxDist) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push({ x1: n.x, y1: n.y, x2: nodes[j].x, y2: nodes[j].y });
          added++;
        }
      }
    }
  }

  const NODE_R = 8;
  const EDGE_W = 6;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="block w-full h-[420px]">
      <defs>
        <linearGradient id="aaBg" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#000" />
          <stop offset="100%" stopColor="#0a0f12" />
        </linearGradient>
        <filter id="aaGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#00FFD1" floodOpacity="0.28" />
        </filter>
      </defs>

      <rect x="0" y="0" width={width} height={height} fill="url(#aaBg)" />

      {/* edges */}
      <g stroke="#ffffff" strokeWidth={EDGE_W} strokeLinecap="round" strokeLinejoin="round" opacity="0.98">
        {edges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
        ))}
      </g>

      {/* nodes */}
      <g filter="url(#aaGlow)">
        {nodes.map((p) => (
          <circle key={p.id} cx={p.x} cy={p.y} r={NODE_R} fill="#00FFD1" />
        ))}
      </g>

      {/* tiny legend */}
      <g>
        <rect x={12} y={12} width={215} height={48} rx={10} fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.12)"/>
        <text x={24} y={34} fill="#e5e7eb" fontSize="12">Max (by Complexity): {nodesMax}</text>
        <text x={24} y={52} fill="#ffffff" fontSize="12">Actual (RAM+Speed+Complexity): {nodeCount}</text>
      </g>
    </svg>
  );
}

// helpers
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function clamp(v: number, mn: number, mx: number) {
  return Math.max(mn, Math.min(mx, v));
}


function GetStarted() {
  return (
    <div className="mb-20 overflow-x-hidden">
      <div className="text-center container m-auto flex space-x-5 justify-center">
        <div className="flex-col flex text-center">
          <h1 className="text-2xl md:text-4xl">
            <Translate id="oneai.getstarted.heading">
              Get Started in 3 Simple Steps:
            </Translate>
          </h1>

          <p className="text-xl md:text-2xl font-bold mt-8">
            <div className="mb-4">
              1.{" "}
              <a href="https://cloud.one-ware.com/Account/Register" target="_blank" className="underline hover:no-underline">
                <Translate id="oneai.getstarted.step1.signup">
                  Sign up
                </Translate>
              </a>
              <Translate id="oneai.getstarted.step1.text">
                , verify your account, and receive 500 € in credits
              </Translate>
            </div>
            <div className="mb-4">
              2.{" "}
              <a href="/docs/studio/setup" target="_blank" className="underline hover:no-underline">
                <Translate id="oneai.getstarted.step2.download">
                  Download
                </Translate>
              </a>{" "}
              <Translate id="oneai.getstarted.step2.text">
                ONE WARE Studio
              </Translate>
            </div>
            <div className="mb-4">
              <Translate id="oneai.getstarted.step3">
                3. Add the ONE AI Extension
              </Translate>
            </div>
          </p>

          <div className="flex justify-center gap-4 mt-2 flex-col md:flex-row">
            <a href="/docs/one-ai/get-started" target="_blank">
              <button className="button button--primary text-xl">
                <Translate id="oneai.getstarted.cta.tutorial">Complete Tutorial</Translate>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcaseSection() {
  return (
    <div className="text-center container m-auto max-w-6xl overflow-x-hidden">
      <h2 className="text-2xl md:text-4xl font-bold mb-10">
        <Translate id="oneai.showcase.title.1">Foundation Models</Translate>{" "}
        <span className="primary-text">
          <Translate id="oneai.showcase.title.2">Weren't Built for You.</Translate>
        </span>
        <br />
        <span className="primary-text">ONE AI</span>{" "}
        <Translate id="oneai.showcase.title.3">Creates Models That Are.</Translate>
      </h2>

      <h5 className="text-xl mb-16 md:text-2xl font-normal">
        <Translate id="oneai.showcase.desc.1">With ONE AI you always get a</Translate>{" "}
        <span className="primary-text">
          <Translate id="oneai.showcase.desc.2">custom neural network in seconds</Translate>
        </span>{" "}
        <Translate id="oneai.showcase.desc.3">
          that fits your exact Hardware, performance and use case requirements.
        </Translate>
      </h5>
    </div>
  );
}

export default function OneAi() {
  const slickRef = useRef<Slider>(null);

  initWebsiteEffects();

  return (
    <Layout title="ONE AI" description="ONE AI for Any Hardware and Any Application">
      <div className={`absolute w-full -z-10 ${styles.particleBackground}`}>
        <div className="h-96 absolute w-full"></div>
      </div>

      <HomepageHeader />

      <main>
        <AdaptiveArchitectureSection />

        <div className="bottomsplit">
          <ComparisonSection />
        </div>

        <div className="text-center mt-16 md:pb-2 pb-16 container overflow-x-hidden">
          <h1 className="text-2xl md:text-4xl">
            <Translate id="oneai.compare.heading">
              The Entire AI Development Process Automated in One Tool
            </Translate>
          </h1>

          {sliders && sliders.length && (
            <div className=" pt-5">
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
                      "block padding-vert--lg p-2 overflow-x-hidden",
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

        <div className="dropshadowbottom">
          <div id="getStarted" className="dropshadowtop-inset pt-20 pb-5" style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,1.0) 100%), url('${require('@site/static/img/background.webp').default}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <GetStarted />
          </div>
        </div>


        <div className="container pb-20 mt-20">
          <div id="contact" className="mb-10">
            <ContactUs />
          </div>
        </div>
      </main>
    </Layout>
  );
}
