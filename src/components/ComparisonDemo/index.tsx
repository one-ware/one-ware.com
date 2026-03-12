import React, { useEffect, useRef, useState, useCallback } from "react";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { FaTableTennis } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa6";
import { GiDeliveryDrone } from "react-icons/gi";
import type { IconType } from "react-icons";

interface Stat {
  value: string;
  label: string;
}

interface Example {
  id: string;
  label: string;
  icon: IconType;
  subtitle: string;
  oneAiVideo: string;
  competitorVideo: string;
  competitorName: string;
  oneAiStats: Stat[];
  competitorStats: Stat[];
  footnote: string;
}

const EXAMPLES: Example[] = [
  {
    id: "tennis",
    label: "Tennis",
    icon: FaTableTennis,
    subtitle: "Moving Objects · Small Objects · Big Image Size",
    oneAiVideo: "/img/demos/tennis_demo.webm",
    competitorVideo: "/img/demos/tennis_demo.webm",
    competitorName: "YOLO26n",
    oneAiStats: [
      { value: "456", label: "Detections" },
      { value: "24", label: "FPS*" },
      { value: "0.04 M", label: "Parameters" },
    ],
    competitorStats: [
      { value: "379", label: "Detections" },
      { value: "2", label: "FPS*" },
      { value: "2.4 M", label: "Parameters" },
    ],
    footnote: "*One Core of Intel Ultra 7 CPU",
  },
  {
    id: "chip",
    label: "Chip",
    icon: FaMicrochip,
    subtitle: "Defect Detection · High Precision · Small Details",
    oneAiVideo: "/img/demos/chip.webm",
    competitorVideo: "/img/demos/chip.webm",
    competitorName: "YOLOv8n",
    oneAiStats: [
      { value: "98.4", label: "F1 Score" },
      { value: "45", label: "FPS*" },
      { value: "0.02 M", label: "Parameters" },
    ],
    competitorStats: [
      { value: "91.2", label: "F1 Score" },
      { value: "12", label: "FPS*" },
      { value: "3.2 M", label: "Parameters" },
    ],
    footnote: "*One Core of Intel Ultra 7 CPU",
  },
  {
    id: "drone",
    label: "Drone",
    icon: GiDeliveryDrone,
    subtitle: "Aerial View · Object Tracking · Real-Time",
    oneAiVideo: "/img/demos/drone.webm",
    competitorVideo: "/img/demos/drone.webm",
    competitorName: "YOLOv8n",
    oneAiStats: [
      { value: "312", label: "Detections" },
      { value: "30", label: "FPS*" },
      { value: "0.03 M", label: "Parameters" },
    ],
    competitorStats: [
      { value: "245", label: "Detections" },
      { value: "8", label: "FPS*" },
      { value: "3.2 M", label: "Parameters" },
    ],
    footnote: "*One Core of Intel Ultra 7 CPU",
  },
];

type SlidePhase = "idle" | "ready" | "sliding";

function ExampleSelector({
  activeIndex,
  onSelect,
  horizontal = false,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  horizontal?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const btn = buttonRefs.current[activeIndex];
    const container = containerRef.current;
    if (btn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({
        top: btnRect.top - containerRect.top,
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
        height: btnRect.height,
      });
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative flex ${horizontal ? "flex-row" : "flex-col"} p-1.5 rounded-2xl bg-gray-50/80 dark:bg-white/[0.03] border backdrop-blur-sm self-center`}
      style={{ borderColor: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }}
    >
      <div
        className="absolute rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          top: indicator.top,
          left: indicator.left,
          width: indicator.width,
          height: indicator.height,
          opacity: indicator.height > 0 ? 1 : 0,
          backgroundColor: "color-mix(in srgb, var(--ifm-color-primary) 12%, transparent)",
          borderColor: "color-mix(in srgb, var(--ifm-color-primary) 35%, transparent)",
        }}
      />

      {EXAMPLES.map((ex, index) => {
        const isActive = index === activeIndex;
        const Icon = ex.icon;
        return (
          <button
            key={ex.id}
            ref={(el) => { buttonRefs.current[index] = el; }}
            onClick={() => onSelect(index)}
            className={`relative z-10 flex flex-col items-center justify-center gap-1 ${horizontal ? "px-4 py-2" : "px-3 py-3 md:px-4 md:py-4"} rounded-xl transition-all duration-300 border-0 bg-transparent cursor-pointer flex-1 ${
              isActive
                ? "text-[var(--ifm-color-primary)]"
                : "text-gray-400 dark:text-gray-500 hover:text-[var(--ifm-color-primary)]"
            }`}
          >
            <Icon className={`${horizontal ? "w-4 h-4" : "w-5 h-5 md:w-6 md:h-6"} shrink-0`} />
            <span className={`${horizontal ? "text-[8px]" : "text-[9px] md:text-[10px]"} font-semibold uppercase tracking-wider leading-tight text-center`}>
              {ex.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const SLIDE_DURATION = 800;
const SLIDE_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

function ExampleContent({ example, compact = false }: { example: Example; compact?: boolean }) {
  const oneAiVideoUrl = useBaseUrl(example.oneAiVideo);
  const competitorVideoUrl = useBaseUrl(example.competitorVideo);

  if (compact) {
    return (
      <div className="flex flex-col gap-6">
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400 m-0">
          {example.subtitle}
        </p>

        <div>
          <p className="text-sm font-semibold text-[var(--ifm-color-primary)] m-0 mb-2">ONE AI</p>
          <div className="aspect-video overflow-hidden rounded-lg bg-black">
            <video src={oneAiVideoUrl} loop muted playsInline autoPlay className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4 mt-3">
            {example.oneAiStats.map((stat) => (
              <div key={stat.label} className="flex-1">
                <span className="text-[var(--ifm-color-primary)] text-sm font-bold block">{stat.value}</span>
                <span className="text-[0.6rem] text-gray-500 dark:text-gray-400 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 m-0 mb-2">{example.competitorName}</p>
          <div className="aspect-video overflow-hidden rounded-lg bg-black">
            <video src={competitorVideoUrl} loop muted playsInline autoPlay className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4 mt-3">
            {example.competitorStats.map((stat) => (
              <div key={stat.label} className="flex-1">
                <span className="text-gray-500 dark:text-gray-400 text-sm font-bold block">{stat.value}</span>
                <span className="text-[0.6rem] text-gray-500 dark:text-gray-400 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-gray-600 dark:text-gray-400 m-0">{example.footnote}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <p className="text-sm sm:text-base lg:text-lg font-normal text-gray-500 dark:text-gray-400 m-0">
        {example.subtitle}
      </p>

      <div className="grid grid-cols-[1fr_1fr] gap-6 items-center">
        <div className="aspect-video overflow-hidden rounded-lg bg-black max-w-lg">
          <video src={oneAiVideoUrl} loop muted playsInline autoPlay className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-base sm:text-lg font-semibold text-[var(--ifm-color-primary)] m-0 mb-1">ONE AI</p>
          <p className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 m-0 mb-6">Optimized CNN Architecture</p>
          <div className="flex flex-col gap-4">
            {example.oneAiStats.map((stat) => (
              <div key={stat.label}>
                <span className="text-[var(--ifm-color-primary)] text-sm sm:text-base lg:text-lg font-bold block">{stat.value}</span>
                <span className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-6 items-center">
        <div className="aspect-video overflow-hidden rounded-lg bg-black max-w-lg">
          <video src={competitorVideoUrl} loop muted playsInline autoPlay className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 m-0 mb-6">{example.competitorName}</p>
          <div className="flex flex-col gap-4">
            {example.competitorStats.map((stat) => (
              <div key={stat.label}>
                <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-lg font-bold block">{stat.value}</span>
                <span className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 m-0">{example.footnote}</p>
    </div>
  );
}

function MobileComparisonDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const example = EXAMPLES[activeIndex];

  return (
    <section className="py-12 bg-white dark:bg-[#1e1e1e]">
      <div className="w-full max-w-lg mx-auto px-4">
        <p className="text-lg font-bold text-left mb-4">
          <Translate id="oneai.comparison.demo.title">
            Real-World Performance
          </Translate>
        </p>

        <div className="mb-6">
          <ExampleSelector activeIndex={activeIndex} onSelect={setActiveIndex} horizontal />
        </div>

        <div key={activeIndex} style={{ animation: "cdFadeIn 0.3s ease-out" }}>
          <ExampleContent example={example} compact />
        </div>
      </div>

      <style>{`
        @keyframes cdFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function DesktopComparisonDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [slidePhase, setSlidePhase] = useState<SlidePhase>("idle");
  const [direction, setDirection] = useState<1 | -1>(1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;
  const slidingRef = useRef(false);

  const switchTo = useCallback((next: number) => {
    if (next === activeRef.current || slidingRef.current) return;
    slidingRef.current = true;

    const dir: 1 | -1 = next > activeRef.current ? 1 : -1;
    setDirection(dir);
    setPrevIndex(activeRef.current);
    setActiveIndex(next);
    setSlidePhase("ready");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSlidePhase("sliding");
      });
    });

    setTimeout(() => {
      setSlidePhase("idle");
      setPrevIndex(null);
      slidingRef.current = false;
    }, SLIDE_DURATION + 100);
  }, []);

  const handleSelect = useCallback((next: number) => {
    switchTo(next);
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;
    const targetProgress = (next + 0.5) / EXAMPLES.length;
    const targetScrollY = wrapper.offsetTop + targetProgress * scrollableHeight;
    window.scrollTo({ top: targetScrollY, behavior: "instant" });
  }, [switchTo]);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      const idx = Math.min(
        EXAMPLES.length - 1,
        Math.floor(progress * EXAMPLES.length)
      );

      if (idx !== activeRef.current) {
        switchTo(idx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [switchTo]);

  const prevExample = prevIndex !== null ? EXAMPLES[prevIndex] : null;
  const activeExample = EXAMPLES[activeIndex];

  const slideTransition = `transform ${SLIDE_DURATION}ms ${SLIDE_EASING}`;
  const isDown = direction === 1;

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${EXAMPLES.length * 150}vh` }}
    >
      <section
        className="flex items-center bg-white dark:bg-[#1e1e1e] sticky top-0"
        style={{ height: "100vh" }}
      >
        <div className="w-full max-w-6xl mx-auto px-6 py-12">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-left mb-2">
            <Translate id="oneai.comparison.demo.title">
              Real-World Performance
            </Translate>
          </p>

          <div className="grid grid-cols-[1fr_auto] gap-3 md:gap-5">
            <div className="relative overflow-hidden">
              <div style={{ visibility: prevExample ? "hidden" : "visible" }}>
                <ExampleContent example={activeExample} />
              </div>

              {prevExample && (
                <div
                  className="absolute inset-x-0 top-0"
                  style={{
                    transform: slidePhase === "sliding"
                      ? `translateY(${isDown ? "-50" : "0"}%)`
                      : `translateY(${isDown ? "0" : "-50"}%)`,
                    transition: slidePhase === "sliding" ? slideTransition : "none",
                  }}
                >
                  {isDown ? (
                    <>
                      <ExampleContent example={prevExample} />
                      <ExampleContent example={activeExample} />
                    </>
                  ) : (
                    <>
                      <ExampleContent example={activeExample} />
                      <ExampleContent example={prevExample} />
                    </>
                  )}
                </div>
              )}
            </div>

            <ExampleSelector
              activeIndex={activeIndex}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ComparisonDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileComparisonDemo /> : <DesktopComparisonDemo />;
}
