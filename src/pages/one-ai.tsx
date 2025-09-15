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
      title: "Prebuild UI",
      subtitle: "Integration on any system with operating system and graphical interface",
      backgroundImage: "/img/ai/one_ai_plugin/use_cases/capture/preview.png",
      displayImage: "/img/ai/one_ai_plugin/use_cases/capture/integration.png",
      description: "Eliminate months of development time. Integrate AI with our pre-build UI that supports monitoring, remote control and continuous improvement. Already in production with leading production companies and ready for your quality control or automation task with:",
      metrics: [
        { value: "1-Click", label: "Deployment" },
        { value: "< 1 Day", label: "Development Time" },
      ],
      whitepaper: "/docs/one-ai/use-cases/camera-tool",
      linkText: "More Details"
    },
    {
      title: "High Speed HDL",
      subtitle: "ONE AI implements efficient AI on any FPGA with our open source AI to HDL libraries",
      backgroundImage: "/img/ai/one_ai_plugin/use_cases/chip/defect_1.png",
      displayImage: "/img/ai/one_ai_plugin/use_cases/chip/integration.png",
      description: "Next to the vendor tools for AI integration we offer a version for parallel AI integration on FPGAs that allows integration just like parallel image processing that doesn't need an additional processor and adds no overhead to the system. Together with our partner Altera we show how Altera's MAX® 10 with ONE AI and our HDL generator can now outperform Nvidia's Jetson Orin Nano with:",
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
      title: "C++ Project or Executable",
      subtitle: "Deploy AI with any CPU, TPU, GPU or MCU",
      backgroundImage: "/img/ai/one_ai_plugin/use_cases/pcb/pcb_1.png",
      displayImage: "/img/ai/one_ai_plugin/use_cases/pcb/integration.png",
      description: "ONE AI can create Tensorflow Lite based C++ projects or precompiled executables with API that run efficient with any kind of processor or AI accelerator. One example is a PCB quality control where the AI by ONE AI beat not only standard image processing and universal AI models by speed and accuracy, but also the AI model from the scientists with:",
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
          Deploy AI in ONE Click, with ONE WARE.
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
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%), url(${useCase.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* ... der innere Content der Slide bleibt unverändert ... */}
                   <div className="relative z-10 p-6 sm:p-8 lg:p-12 min-h-[550px] md:min-h-[500px] flex flex-col justify-between bg-gray-900/20 rounded-2xl backdrop-blur-sm border border-white/10">
                    
                    {/* Content Wrapper für Desktop Layout */}
                    <div className="flex flex-col lg:flex-row lg:gap-8 h-full">
                      
                      {/* Image Section - links auf Desktop */}
                      <div className="w-3/4 mx-auto lg:w-1/3 lg:mx-0 lg:flex-shrink-0 mb-4 lg:mb-0">
                        <div 
                          className="w-full aspect-square lg:aspect-[6/7] rounded-lg bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${useCase.displayImage})`,
                          }}
                        />
                      </div>

                      {/* Text & Content Section - rechts auf Desktop */}
                      <div className="text-left lg:flex-1 flex flex-col justify-between">
                        {/* Text oben */}
                        <div>
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

                        {/* Metrics & Button unten */}
                        <div className="flex flex-col gap-4">
                          {/* Metrics Grid - bei 4 Metrics in einer Reihe, sonst 2x2 */}
                          <div className={`grid gap-2 w-full ${useCase.metrics.length === 4 ? 'grid-cols-4' : 'grid-cols-2'}`}>
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
                          
                          {/* Button darunter */}
                          <a
                            href={useCase.whitepaper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-[#00FFD1] text-black font-bold rounded-lg hover:bg-[#00e4ba] transition-all duration-300 transform hover:scale-105 text-sm lg:text-base w-full sm:w-auto justify-center shrink-0"
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

// ===================== Adaptive Architecture (Text left, models right) =====================
function AdaptiveArchitectureSection() {
  // 0-7 steps with 8 levels
  const [ram, setRam] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>(3);
  const [speed, setSpeed] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>(3);
  const [complexity, setComplexity] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>(0);
  const [regenerationKey, setRegenerationKey] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const sum = ram + speed; // 0..14
  const spec = getArchSpec(sum, complexity, regenerationKey * 1000 + sum + complexity);

  // Enhanced seed with regeneration key for more dramatic changes
  const seed = (sum + 1) * 137 + complexity * 29 + ram * 43 + speed * 67 + regenerationKey * 1000;

  // Trigger regeneration when sliders change
  useEffect(() => {
    setRegenerationKey(prev => prev + 1);
  }, [ram, speed, complexity]);

  return (
    <section
      id="adaptive-architecture"
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT: Text */}
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Leading AI Innovation for a Smarter World
            </h2>

            <p className="text-lg md:text-xl font-bold text-gray-300 mb-4">
              ONE AI Invents AI Models just for your specific Application and Hardware Requirements
            </p>

            <p className="text-lg text-gray-300 mb-6">
              With our patend pending approach of Neural Architecture Prediction, ONE AI automatically invents a custom neural network architecture that is perfectly suited for your application and hardware. Everything without the need for foundation models and fine-tuning. The whole architecture is created from zero in under one second.

            </p>

            {/* Mobile toggle button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden flex items-center justify-between w-full p-3 mb-4 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
            >
              <span className="font-medium">Key Features</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Bullet points - always visible on desktop, collapsible on mobile */}
            <ul className={`space-y-2 text-gray-300 list-disc list-inside transition-all duration-300 lg:block ${isExpanded ? 'block' : 'hidden'}`}>
              <li><span className="font-semibold">Leading AI Innovation.</span> Neural Architecture Prediction designs a custom network for your application and device, that ensures best accuracy and performance.</li>
              <li><span className="font-semibold">Turning Ideas into AI Solutions.</span> Data → model → export & UI in one tool. One-click deployment.</li>
              <li><span className="font-semibold">No expertise required.</span> No model or parameter selection. No hardware tuning.</li>
              <li><span className="font-semibold">The Smartest Way for AI Deployment.</span> With pay-by-success, minimal upfront costs and the fastest development cycles.</li>
            </ul>
          </div>


          {/* RIGHT: three small random models + sliders underneath */}
          <div>
            <div className="rounded-2xl border border-white/10 bg-black/70 p-4">
              <OrganicMiniModel spec={spec} seed={seed} height={280} />
            </div>

            {/* Sliders (8-stufig) */}
            <div className="mt-5 flex flex-col gap-5">
              <StepSlider
                label="Speed"
                value={speed}
                onChange={setSpeed}
                leftLabel="High Perfromance"
                rightLabel="High Precision"
              />
              <StepSlider
                label="RAM"
                value={ram}
                onChange={setRam}
                leftLabel="Small Embedded Device"
                rightLabel="Full PC"
              />
              <StepSlider
                label="Complexity"
                value={complexity}
                onChange={setComplexity}
                leftLabel="Small Automation"
                rightLabel="Complex Analysis"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8-level segmented control ---------- */
function StepSlider({
  label,
  value,
  onChange,
  leftLabel,
  rightLabel,
}: {
  label: string;
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  onChange: (v: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) => void;
  leftLabel: string;
  rightLabel: string;
}) {
  const id = `slider-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="w-full">
      <div className="mb-2 text-sm text-gray-300">{label}</div>

      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
        <input
          id={id}
          type="range"
          min={0}
          max={7}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7)}
          className="w-full accent-[#00FFD1] cursor-pointer"
          aria-label={label}
        />

        {/* Beschriftung unten: links/rechts */}
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span className="text-left">{leftLabel}</span>
          <span className="text-right">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
}


/* ---------- Spec mapping (sum=RAM+Speed, c=complexity) ---------- */
type ArchSpec = { input: number; hidden: number[]; output: number };
function getArchSpec(sum: number, c: number, seed: number = 1): ArchSpec {
  // Create seeded random function for consistent but varied results
  const rand = mulberry32(seed);
  
  // Input/Output: maximum 6 neurons, moderate scaling
  const baseInput = Math.max(2, Math.min(6, 2 + Math.floor(c * 0.4))); // Max 6 inputs
  const baseOutput = Math.max(2, Math.min(6, 2 + Math.floor(c * 0.5))); // Max 6 outputs
  
  // Hidden layers - resources (speed+RAM) heavily influence size
  const hidden: number[] = [];
  
  // Resources constraint: low speed/RAM should limit layers even with high complexity
  const resourceConstraint = sum / 14; // 0 to 1 ratio
  const complexityFactor = c / 7; // 0 to 1 ratio
  
  // Layer count influenced more by resources than complexity
  const maxLayers = Math.min(3, Math.max(1, Math.floor(resourceConstraint * 2 + complexityFactor * 1)));
  
  for (let layer = 0; layer < maxLayers; layer++) {
    // Base size heavily influenced by available resources
    let baseSize = 2 + Math.floor(resourceConstraint * 4); // 2-6 based on resources
    
    // Complexity adds neurons only if resources allow
    let complexityBonus = 0;
    if (resourceConstraint > 0.3) { // Only add complexity if resources are decent
      complexityBonus = Math.floor(complexityFactor * resourceConstraint * 2);
    }
    
    let layerSize = baseSize + complexityBonus + Math.floor(rand() * 2);
    
    // Reduced variation between layers
    if (layer > 0) {
      const prevSize = hidden[layer - 1];
      // Smaller variation
      const variation = Math.floor(rand() * 4) - 2; // -2 to +1
      layerSize = Math.max(2, Math.min(layerSize + variation, prevSize + 2));
    }
    
    hidden.push(Math.max(2, Math.min(8, layerSize))); // Cap at 8 neurons per layer
  }
  
  return {
    input: baseInput,
    hidden: hidden,
    output: baseOutput
  };
}

/* ---------- One mini random graph (organic, *not* grid-layered) ---------- */
/* ---------- One mini random graph (organic, connected; always with hidden) ---------- */
function OrganicMiniModel({
  spec,
  seed,
  width = 520,
  height = 160,
}: {
  spec: ArchSpec;
  seed: number;
  width?: number;
  height?: number;
}) {
  const padX = 18, padY = 12;
  const rand = mulberry32(seed || 1);

  type Node = { x: number; y: number; id: string; kind: "in" | "hid" | "out" };
  const nodes: Node[] = [];
  const inIdx: number[] = [], outIdx: number[] = [], hidIdx: number[] = [];

  const push = (n: Node) => {
    nodes.push(n);
    return nodes.length - 1;
  };

  // --- Inputs (links) ---
  for (let i = 0; i < spec.input; i++) {
    const idx = push({
      id: `in-${i}`,
      kind: "in",
      x: padX + rand() * 18,
      y:
        padY +
        ((i + 0.5) * (height - padY * 2)) / Math.max(1, spec.input) +
        (rand() - 0.5) * 10,
    });
    inIdx.push(idx);
  }

  // --- Outputs (rechts) ---
  for (let i = 0; i < spec.output; i++) {
    const idx = push({
      id: `out-${i}`,
      kind: "out",
      x: width - padX - rand() * 18,
      y:
        padY +
        ((i + 0.5) * (height - padY * 2)) / Math.max(1, spec.output) +
        (rand() - 0.5) * 10,
    });
    outIdx.push(idx);
  }

  // --- Hidden (mittig, organisch gestreut) ---
  // Summe aus Tabelle; wenn keine Hidden vorgegeben -> schlankes Gerüst als Visualisierung
  const declaredHidden = (spec.hidden ?? []).reduce((a, b) => a + b, 0);
  const hiddenTarget = Math.max(
    3,
    declaredHidden || Math.round((spec.input + spec.output) * 0.6)
  );

  const minDist = clamp(22 - Math.log(hiddenTarget + 1) * 4, 10, 22);
  let guard = 0;
  while (hidIdx.length < hiddenTarget && guard < hiddenTarget * 300) {
    guard++;
    const x = padX + 60 + rand() * (width - (padX + 60) * 2);
    const y = padY + rand() * (height - padY * 2);
    let ok = true;
    for (const id of hidIdx) {
      const p = nodes[id];
      if (Math.hypot(p.x - x, p.y - y) < minDist + rand() * 6) {
        ok = false;
        break;
      }
    }
    if (ok) hidIdx.push(push({ id: `h-${hidIdx.length}`, kind: "hid", x, y }));
  }

  // --- Kanten: dicht & organisch ---
  const edges: Array<[number, number]> = [];
  const deg = new Array(nodes.length).fill(0);
  const set = new Set<string>();
  const addEdge = (a: number, b: number) => {
    if (a === b) return;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (set.has(key)) return;
    set.add(key);
    edges.push([a, b]);
    deg[a]++; deg[b]++;
  };
  const dist = (i: number, j: number) =>
    Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);

  const connectK = (fromIdx: number[], toIdx: number[], k: number, maxD: number) => {
    if (!fromIdx.length || !toIdx.length) return;
    for (const i of fromIdx) {
      const arr = toIdx
        .map((j) => ({ j, d: dist(i, j) }))
        .filter((o) => o.d > 1 && o.d < maxD)
        .sort((a, b) => a.d - b.d)
        .slice(0, Math.min(k, toIdx.length));
      for (const o of arr) addEdge(i, o.j);
    }
  };

  // Tunable Nachbarschaften
  // nachher (leichter/sparscher):
  const kIn  = clamp(Math.round(hidIdx.length / 4) + 1, 1, Math.min(4, hidIdx.length));
  const kHH  = clamp(Math.round(Math.log2(hidIdx.length + 3)), 1, Math.min(4, Math.max(1, hidIdx.length - 1)));
  const kOut = clamp(Math.round(hidIdx.length / 5) + 1, 1, Math.min(4, outIdx.length));
  const kIO  = clamp(Math.round(outIdx.length / 5) + 1, 1, 2);

  // Reichweiten (kürzer -> weniger lange Kreuzer)
  connectK(inIdx,  hidIdx, kIn,  width * 0.65);
  connectK(hidIdx, hidIdx, kHH,  width * 0.45);
  connectK(hidIdx, outIdx, kOut, width * 0.75);
  connectK(inIdx.slice(0, Math.ceil(inIdx.length * 0.6)), outIdx, kIO, width * 0.5);

  // --- Jede Node hat mind. 1 Kante ---
  for (let i = 0; i < nodes.length; i++) {
    if (deg[i] === 0) {
      const pref =
        nodes[i].kind === "hid"
          ? [...inIdx, ...outIdx]
          : hidIdx.length
          ? hidIdx
          : nodes[i].kind === "in"
          ? outIdx
          : inIdx;
      const near = pref
        .filter((j) => j !== i)
        .map((j) => ({ j, d: dist(i, j) }))
        .sort((a, b) => a.d - b.d)[0];
      if (near) addEdge(i, near.j);
    }
  }

  // --- Graph-Zusammenhang sicherstellen (Union-Find + kürzeste Brücken) ---
  class DSU {
    p: number[]; r: number[];
    constructor(n: number) { this.p = Array.from({ length: n }, (_, i) => i); this.r = Array(n).fill(0); }
    find(a: number): number { return this.p[a] === a ? a : (this.p[a] = this.find(this.p[a])); }
    union(a: number, b: number) {
      a = this.find(a); b = this.find(b);
      if (a === b) return false;
      if (this.r[a] < this.r[b]) [a, b] = [b, a];
      this.p[b] = a; if (this.r[a] === this.r[b]) this.r[a]++;
      return true;
    }
  }
  const dsu = new DSU(nodes.length);
  for (const [a, b] of edges) dsu.union(a, b);

  const comps = () => {
    const s = new Map<number, number[]>();
    nodes.forEach((_, i) => {
      const f = dsu.find(i);
      if (!s.has(f)) s.set(f, []);
      s.get(f)!.push(i);
    });
    return Array.from(s.values());
  };

  let groups = comps();
  while (groups.length > 1) {
    let bestA = -1, bestB = -1, bestD = Infinity;
    for (let g = 0; g < groups.length; g++) {
      for (let h = g + 1; h < groups.length; h++) {
        for (const a of groups[g]) {
          for (const b of groups[h]) {
            // kleine Penalty für gleiche "Art", damit eher über Hidden/quer verbunden wird
            const penalty = nodes[a].kind === nodes[b].kind ? 1.08 : 1.0;
            const d = dist(a, b) * penalty;
            if (d < bestD) { bestD = d; bestA = a; bestB = b; }
          }
        }
      }
    }
    if (bestA >= 0) {
      addEdge(bestA, bestB);
      dsu.union(bestA, bestB);
      groups = comps();
    } else break;
  }

  const NODE_R = 12;
  const EDGE_W = 4; // vorher 5.5

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="block w-full"
      style={{ height: `${height}px` }} // ⬅️ macht die Box sichtbar höher
    >
      <defs>
        <linearGradient id={`bg-${seed}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#000" />
          <stop offset="100%" stopColor="#0a0f12" />
        </linearGradient>
      </defs>

      {/* edges */}
      <g stroke="#ffffff" strokeWidth={EDGE_W} strokeLinecap="round" strokeLinejoin="round" opacity="0.92">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>

      {/* nodes */}
      <g>
        {nodes.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r={NODE_R} fill={n.kind === "hid" ? "#ffffff" : "#00FFD1"} />
        ))}
      </g>
    </svg>
  );
}


/* ---------- small helpers ---------- */
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
