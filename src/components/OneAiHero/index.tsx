import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import Translate from "@docusaurus/Translate";
import HeroBackground from "@site/src/components/HeroBackground";
import SectorSelector from "./SectorSelector";
import { useSectorStateMachine, SECTORS } from "./useSectorStateMachine";
import type { PerformanceTier } from "@site/src/components/HomeHero";

const Neural3DCanvas = lazy(
  () => import("@site/src/components/HomeHero/SoftwareWindow/Neural3DCanvas")
);

function detectTier(): PerformanceTier {
  if (typeof window === "undefined") return "high";
  const isMobile =
    window.innerWidth < 1024 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return isMobile ? "low" : "high";
}

function MountSignal({ onMount }: { onMount: () => void }) {
  const called = useRef(false);
  useEffect(() => {
    if (!called.current) {
      called.current = true;
      onMount();
    }
  }, [onMount]);
  return null;
}

const STATIC_BUILD_DURATION = 700;
const STATIC_ANIM_DURATION = 700;

type StaticPhase = "build" | "orange" | "purple" | "red" | "done";

export default function OneAiHero() {
  const [tier] = useState<PerformanceTier>(detectTier);
  const [isVisible, setIsVisible] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleCanvasReady = useCallback(() => setCanvasReady(true), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        setIsVisible(nowVisible);
        if (!nowVisible) {
          setCanvasReady(false);
          setStaticPhase("build");
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const {
    state,
    selectSector,
    onCollapseComplete,
    onRebuildComplete,
    onTrainingComplete,
  } = useSectorStateMachine(canvasReady);

  const [staticPhase, setStaticPhase] = useState<StaticPhase>("build");

  useEffect(() => {
    if (!canvasReady) return;
    if (staticPhase !== "build") return;
    const timer = setTimeout(() => {
      setStaticPhase("orange");
    }, STATIC_BUILD_DURATION);
    return () => clearTimeout(timer);
  }, [canvasReady, staticPhase]);

  const handleStaticTrainingComplete = useCallback(() => {
    setStaticPhase((prev) => {
      if (prev === "orange") return "purple";
      if (prev === "purple") return "red";
      if (prev === "red") return "done";
      return prev;
    });
  }, []);

  const staticBuildingBase = staticPhase === "build";
  const staticTraining = staticPhase === "orange" || staticPhase === "purple" || staticPhase === "red";
  const staticTrainingColor: "orange" | "purple" | "red" =
    staticPhase === "purple" ? "purple" : staticPhase === "red" ? "red" : "orange";

  const AUTO_INTERVAL = 6000;
  const pausedRef = useRef(false);
  const activeSectorRef = useRef(state.activeSectorIndex);
  activeSectorRef.current = state.activeSectorIndex;
  const phaseRef = useRef(state.phase);
  phaseRef.current = state.phase;

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      if (phaseRef.current !== "idle") return;
      const next = (activeSectorRef.current + 1) % SECTORS.length;
      selectSector(next);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [selectSector]);

  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoRotation = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  }, []);

  const resumeAutoRotation = useCallback(() => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, 4000);
  }, []);

  const handleSectorClick = useCallback(
    (index: number) => {
      pauseAutoRotation();
      selectSector(index);
      resumeAutoRotation();
    },
    [selectSector, pauseAutoRotation, resumeAutoRotation]
  );

  const canvasStyle: React.CSSProperties = { width: "100%", height: "100%" };

  return (
    <HeroBackground
      className="w-full flex items-center justify-center"
      style={{
        marginTop: "calc(var(--ifm-navbar-height) * -1)",
        paddingTop: "var(--ifm-navbar-height)",
        minHeight: "100vh",
      }}
    >
      <div
        ref={sectionRef}
        className="w-full h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-center"
        onMouseEnter={pauseAutoRotation}
        onMouseLeave={resumeAutoRotation}
      >
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            <Translate id="oneai.hero.compare.title">
              One Architecture per Application
            </Translate>
          </h1>
          <p className="text-base sm:text-lg md:text-xl dark:text-gray-300 text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            <Translate id="oneai.hero.compare.subtitle">
              Other solutions apply the same static model to every problem. ONE AI builds a custom neural network architecture tailored to your specific application.
            </Translate>
          </p>
        </div>

        <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_1fr] gap-3 md:gap-5">
          <div className="row-span-2 lg:row-span-1">
            <SectorSelector
              activeSectorIndex={state.activeSectorIndex}
              onSelect={handleSectorClick}
            />
          </div>

          <div
            className="relative flex flex-col items-center rounded-2xl p-4 md:p-6 bg-gradient-to-b from-gray-50/80 to-white/40 dark:from-white/[0.03] dark:to-transparent backdrop-blur-sm"
            style={{ border: "1px solid var(--ifm-color-primary)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
                <Translate id="oneai.hero.compare.other">
                  Other AI Solutions
                </Translate>
              </span>
            </div>

            <div className="w-full aspect-square max-w-[240px] sm:max-w-[280px] md:max-w-[300px]">
              {isVisible && (
                <Suspense fallback={<CanvasPlaceholder />}>
                  <Neural3DCanvas
                    style={canvasStyle}
                    isTraining={staticTraining}
                    isBuildingBase={staticBuildingBase}
                    isRebuilding={false}
                    isResetting={false}
                    onTrainingComplete={handleStaticTrainingComplete}
                    isCollapsingToCore={false}
                    isRebuildingBase={false}
                    trainingColor={staticTrainingColor}
                    onCollapseComplete={() => {}}
                    onRebuildComplete={() => {}}
                    currentFps={60}
                    isSmallScreen={tier === "low"}
                    performanceTier={tier}
                    maxNodes={10}
                    maxTrainingNodes={2}
                    skipTrainingCleanup={true}
                    enableRotation={true}
                    animationDuration={STATIC_ANIM_DURATION}
                  />
                </Suspense>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 text-center mt-3 font-medium">
              <Translate id="oneai.hero.compare.other.desc">
                Same model for all sectors. No adaptation.
              </Translate>
            </p>
          </div>

          <div
            className="relative flex flex-col items-center rounded-2xl p-4 md:p-6 bg-gradient-to-b from-gray-50/80 to-white/40 dark:from-white/[0.03] dark:to-transparent backdrop-blur-sm"
            style={{ border: "1px solid var(--ifm-color-primary)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ifm-color-primary)]">
                ONE AI
              </span>
            </div>

            <div className="w-full aspect-square max-w-[240px] sm:max-w-[280px] md:max-w-[300px]">
              {isVisible && (
                <Suspense fallback={<CanvasPlaceholder />}>
                  <MountSignal onMount={handleCanvasReady} />
                  <Neural3DCanvas
                    style={canvasStyle}
                    isTraining={state.isTraining}
                    isBuildingBase={state.isBuildingBase}
                    isRebuilding={false}
                    isResetting={false}
                    onTrainingComplete={onTrainingComplete}
                    isCollapsingToCore={state.isCollapsingToCore}
                    isRebuildingBase={state.isRebuildingBase}
                    trainingColor={state.trainingColor}
                    onCollapseComplete={onCollapseComplete}
                    onRebuildComplete={onRebuildComplete}
                    currentFps={60}
                    isSmallScreen={tier === "low"}
                    performanceTier={tier}
                    maxNodes={10}
                    enableRotation={true}
                    animationDuration={1200}
                  />
                </Suspense>
              )}
            </div>

            <PhaseLabel phase={state.phase} sectorName={SECTORS[state.activeSectorIndex].label} trainingColor={state.trainingColor} />
          </div>
        </div>
      </div>
    </HeroBackground>
  );
}

function CanvasPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-8 h-8 border-2 rounded-full animate-spin"
        style={{
          borderColor: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)",
          borderTopColor: "var(--ifm-color-primary)",
        }}
      />
    </div>
  );
}

function PhaseLabel({ phase, sectorName, trainingColor }: { phase: string; sectorName: string; trainingColor: string }) {
  const isActive = phase !== "idle" && phase !== "building";
  const colorMap: Record<string, string> = {
    orange: "#FF9500",
    purple: "#A020F0",
    red: "#FF4444",
  };
  const dotColor = colorMap[trainingColor] || "var(--ifm-color-primary)";

  let text = "";
  if (phase === "building") text = "Building base network...";
  else if (phase === "training" || phase === "retraining") text = `Training for ${sectorName}...`;
  else if (phase === "collapsing") text = "Collapsing network...";
  else if (phase === "rebuilding") text = `Rebuilding for ${sectorName}...`;
  else text = `Optimized for ${sectorName}`;

  return (
    <p
      className={`text-xs sm:text-sm text-center mt-4 font-medium transition-colors duration-500 ${
        phase === "idle"
          ? "text-[var(--ifm-color-primary)]"
          : "text-gray-500 dark:text-gray-400"
      }`}
    >
      {text}
    </p>
  );
}
