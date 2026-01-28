import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import HeroBackground from "@site/src/components/HeroBackground";
import { FolderWithApple, DragPreview } from "./FolderWithApple";
import SoftwareWindow from "./SoftwareWindow";
import GhostDragAnimation from "./GhostDragAnimation";
import "./glass-design.css";

export type PerformanceTier = 'high' | 'low';

export interface PerformanceSettings {
  tier: PerformanceTier;
  updateInterval: number;
  maxApples: number;
  appleDetailLevel: 'full' | 'simple';
  enableShadows: boolean;
  enableGlow: boolean;
  nodeCount: number;
  trainingNodeCount: number;
  physicsUpdateInterval: number;
}

const PERFORMANCE_CONFIGS: Record<PerformanceTier, PerformanceSettings> = {
  high: {
    tier: 'high',
    updateInterval: 1,
    maxApples: 10,
    appleDetailLevel: 'full',
    enableShadows: true,
    enableGlow: false,
    nodeCount: 20,
    trainingNodeCount: 20,
    physicsUpdateInterval: 1,
  },
  low: {
    tier: 'low',
    updateInterval: 3,
    maxApples: 4,
    appleDetailLevel: 'simple',
    enableShadows: false,
    enableGlow: false,
    nodeCount: 10,
    trainingNodeCount: 10,
    physicsUpdateInterval: 3,
  },
};

interface PerformanceContextValue {
  settings: PerformanceSettings;
  fps: number;
  tier: PerformanceTier;
}

const PerformanceContext = createContext<PerformanceContextValue>({
  settings: PERFORMANCE_CONFIGS.high,
  fps: 60,
  tier: 'high',
});

export const usePerformance = () => useContext(PerformanceContext);

function detectInitialTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'high';

  const isMobileOrTablet = window.innerWidth < 1024 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return isMobileOrTablet ? 'low' : 'high';
}

function useAdaptivePerformance() {
  const [currentTier] = useState<PerformanceTier>(detectInitialTier);

  return {
    tier: currentTier,
    fps: 60,
    settings: PERFORMANCE_CONFIGS[currentTier],
  };
}

interface HomeHeroProps {
  mode?: 'demo' | 'chat';
}

export default function HomeHero({ mode = 'demo' }: HomeHeroProps) {
  const performanceValue = useAdaptivePerformance();

  const [isDragging, setIsDragging] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const dragPosRef = useRef({ x: 0, y: 0 });
  const dragRafRef = useRef<number | null>(null);
  const pendingDragPos = useRef<{ x: number, y: number } | null>(null);

  const sourceFolderRef = useRef<HTMLDivElement>(null);
  const [targetPanelRef, setTargetPanelRef] = useState<HTMLElement | null>(
    null
  );
  const [showGhost, setShowGhost] = useState(false);
  const [isGhostHovering, setIsGhostHovering] = useState(false);
  const [chatCompleted, setChatCompleted] = useState(false);

  const handleChatComplete = useCallback(() => {
    setChatCompleted(true);
    setShowGhost(false);
  }, []);

  const isChatMode = mode === 'chat' && !chatCompleted;

  useEffect(() => {
    if (isChatMode) {
      setShowGhost(false);
      return;
    }
    const timer = setTimeout(() => {
      setShowGhost(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isChatMode]);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragPos({ x: e.clientX, y: e.clientY });
    dragPosRef.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const folder = sourceFolderRef.current;
    if (!folder) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDragging(true);
      setDragPos({ x: touch.clientX, y: touch.clientY });
      dragPosRef.current = { x: touch.clientX, y: touch.clientY };
    };

    folder.addEventListener("touchstart", handleTouchStart, { passive: false });
    return () => {
      folder.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
        const clientY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
        dragPosRef.current = { x: clientX, y: clientY };

        pendingDragPos.current = { x: clientX, y: clientY };
        if (!dragRafRef.current) {
          dragRafRef.current = requestAnimationFrame(() => {
            if (pendingDragPos.current) {
              setDragPos(pendingDragPos.current);
              pendingDragPos.current = null;
            }
            dragRafRef.current = null;
          });
        }
      }
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      if (dragRafRef.current) {
        cancelAnimationFrame(dragRafRef.current);
        dragRafRef.current = null;
      }
      if (targetPanelRef) {
        const rect = targetPanelRef.getBoundingClientRect();
        const { x, y } = dragPosRef.current;
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          setHasDropped(true);
        }
      }
      setIsDragging(false);
    }
  }, [isDragging, targetPanelRef]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove, { passive: true });
      window.addEventListener("touchend", handleDragEnd);
    } else {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const handleDropSuccess = () => {
    setHasDropped(true);
    setIsDragging(false);
  };

  return (
    <PerformanceContext.Provider value={performanceValue}>
    <HeroBackground
      className="min-h-screen"
    >

      {isDragging && !isChatMode && <DragPreview x={dragPos.x} y={dragPos.y} />}

      <GhostDragAnimation
        sourceRef={sourceFolderRef}
        targetRef={targetPanelRef}
        show={!isChatMode && !hasDropped && !isDragging && showGhost}
        onHoverChange={setIsGhostHovering}
      />

      <div
        className="relative z-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 min-h-screen"
      >
        <div className="w-full max-w-[98%] sm:max-w-[95%] flex flex-col gap-10 sm:gap-12 2xl:gap-14">
            <div className="flex flex-col 2xl:flex-row items-center gap-2 sm:gap-4 2xl:gap-12">
            <div className="w-full 2xl:w-[40%] flex flex-col justify-center space-y-4 sm:space-y-6 2xl:space-y-8 text-center 2xl:text-left py-2 sm:py-4 2xl:py-0">
              {isChatMode ? (
                <div
                  className="flex flex-col gap-8 2xl:gap-10 pt-8 md:pt-12 2xl:pt-0"
                  style={{
                    animation: "fadeInUp 0.8s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold m-0 leading-tight">
                    <span className="dark:text-white text-gray-800">
                      <Translate id="homehero.chat.lefttitle">How It Works</Translate>
                    </span>
                  </h1>

                  <div className="flex flex-col gap-4 2xl:gap-5">
                    <div
                      className="flex items-center gap-4"
                      style={{
                        animation: "fadeInUp 0.5s ease-out forwards",
                        animationDelay: "0.1s",
                        opacity: 0,
                      }}
                    >
                      <span className="text-[var(--ifm-color-primary)] font-bold text-xl md:text-2xl w-6">1</span>
                      <span className="dark:text-white text-gray-900 font-medium text-base md:text-lg">
                        <Translate id="homehero.chat.step1.title">Configure Your Project</Translate>
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-4"
                      style={{
                        animation: "fadeInUp 0.5s ease-out forwards",
                        animationDelay: "0.2s",
                        opacity: 0,
                      }}
                    >
                      <span className="text-[var(--ifm-color-primary)] font-bold text-xl md:text-2xl w-6">2</span>
                      <span className="dark:text-white text-gray-900 font-medium text-base md:text-lg">
                        <Translate id="homehero.chat.step2.title">Train Your Model</Translate>
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-4"
                      style={{
                        animation: "fadeInUp 0.5s ease-out forwards",
                        animationDelay: "0.3s",
                        opacity: 0,
                      }}
                    >
                      <span className="text-[var(--ifm-color-primary)] font-bold text-xl md:text-2xl w-6">3</span>
                      <span className="dark:text-white text-gray-900 font-medium text-base md:text-lg">
                        <Translate id="homehero.chat.step3.title">Deploy & Integrate</Translate>
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-4 mt-2"
                      style={{
                        animation: "fadeInUp 0.5s ease-out forwards",
                        animationDelay: "0.4s",
                        opacity: 0,
                      }}
                    >
                      <svg
                        className="w-6 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--ifm-color-primary)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <span className="text-[var(--ifm-color-primary)] font-semibold text-base md:text-lg">
                        <Translate id="homehero.chat.result">Your AI is ready</Translate>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                    <span
                      className="dark:text-white text-gray-800 block"
                      style={{
                        animation: "fadeInUp 0.8s ease-out forwards",
                        opacity: 0,
                      }}
                    >
                      <Translate id="homehero.title1">How We Automate</Translate>
                    </span>
                    <span
                      className="text-[var(--ifm-color-primary)] block"
                      style={{
                        animation: "fadeInUp 0.8s ease-out forwards",
                        animationDelay: "0.1s",
                        opacity: 0,
                      }}
                    >
                      <Translate id="homehero.title2">AI Development</Translate>
                    </span>
                  </h1>
                  <div
                    className="flex flex-col sm:flex-row items-center justify-center 2xl:justify-start gap-4 sm:gap-6"
                    style={{
                      animation: "fadeInUp 0.8s ease-out forwards",
                      animationDelay: "0.2s",
                      opacity: 0,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 text-[var(--ifm-color-primary)]" style={{ animation: "pulseScale 2s ease-in-out infinite" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <span className="dark:text-white text-gray-800 text-sm font-medium">
                        <Translate id="homehero.benefit.application">Any Application</Translate>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 text-[var(--ifm-color-primary)]" style={{ animation: "shrinkPulse 2s ease-in-out infinite" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <rect x="9" y="9" width="6" height="6" />
                          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                        </svg>
                      </div>
                      <span className="dark:text-white text-gray-800 text-sm font-medium">
                        <Translate id="homehero.benefit.hardware">Any Hardware</Translate>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 text-[var(--ifm-color-primary)]" style={{ animation: "flashGlow 1.5s ease-in-out infinite" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                      </div>
                      <span className="dark:text-white text-gray-800 text-sm font-medium">
                        <Translate id="homehero.benefit.requirements">Any Requirements</Translate>
                      </span>
                    </div>
                  </div>

                  <div className="hidden 2xl:flex flex-row items-center justify-center 2xl:justify-start gap-4 mt-8 w-full">
                    <Link
                      href="/docs/one-ai/getting-started"
                      style={{
                        animation: "fadeInUp 0.8s ease-out forwards",
                        animationDelay: "0.5s",
                        opacity: 0,
                      }}
                    >
                      <button className="button button--primary button--lg">
                        <Translate id="homehero.button.download">Free Download</Translate>
                      </button>
                    </Link>
                    <Link
                      href="/one-ai"
                      style={{
                        animation: "fadeInUp 0.8s ease-out forwards",
                        animationDelay: "0.6s",
                        opacity: 0,
                      }}
                    >
                      <button className="button button--primary button--outline button--lg">
                        <Translate id="homehero.button.learnmore">Learn More</Translate>
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="relative flex items-center 2xl:items-end justify-center 2xl:justify-end w-full 2xl:w-[60%] h-auto select-none flex-1 2xl:flex-initial">
              <div
                className="absolute 2xl:relative z-20 2xl:z-auto bottom-12 sm:bottom-10 2xl:bottom-auto left-4 sm:left-8 2xl:left-auto 2xl:mr-8 sm:2xl:mr-16"
                style={{
                  opacity: isChatMode ? 0 : 1,
                  pointerEvents: isChatMode ? "none" : "auto",
                  transition: "opacity 0.3s ease",
                }}
              >
                <FolderWithApple
                  style={{
                    animation: isChatMode ? "none" : "fadeInUp 0.8s ease-out forwards",
                    animationDelay: "0.3s",
                    opacity: isChatMode ? 0 : undefined,
                  }}
                  isDragging={isDragging}
                  hasDropped={hasDropped}
                  onMouseDown={handleDragStart}
                  setSourceRef={(el) => {
                    sourceFolderRef.current = el;
                  }}
                />
              </div>

              <SoftwareWindow
                style={{
                  animation:
                    "fadeInScale 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
                  animationDelay: "0.4s",
                  opacity: 0,
                }}
                isDragging={isDragging}
                isGhostHovering={isGhostHovering}
                onDropTrainingData={handleDropSuccess}
                hasTrainingData={hasDropped}
                setTrainingPanelRef={setTargetPanelRef}
                mode={mode}
                onChatComplete={handleChatComplete}
              />
            </div>
          </div>

            {!isChatMode && (
              <div className="flex 2xl:hidden flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 2xl:gap-16 w-full mb-16 2xl:mb-0">
                <Link
                  href="/docs/one-ai/getting-started"
                  style={{
                    animation: "fadeInUp 0.8s ease-out forwards",
                    animationDelay: "0.5s",
                    opacity: 0,
                  }}
                >
                  <button className="button button--primary button--outline button--lg w-full sm:w-auto">
                    <Translate id="homehero.button.download">Free Download</Translate>
                  </button>
                </Link>
                <Link
                  href="/one-ai"
                  style={{
                    animation: "fadeInUp 0.8s ease-out forwards",
                    animationDelay: "0.6s",
                    opacity: 0,
                  }}
                >
                  <button className="button button--primary button--lg w-full sm:w-auto">
                    <Translate id="homehero.button.learnmore">Learn More</Translate>
                  </button>
                </Link>
              </div>
            )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulseScale {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }
        }
        @keyframes shrinkPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.75);
          }
        }
        @keyframes flashGlow {
          0%, 100% {
            opacity: 0.7;
            filter: drop-shadow(0 0 0px var(--ifm-color-primary));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 6px var(--ifm-color-primary));
          }
        }
      `}</style>
    </HeroBackground>
    </PerformanceContext.Provider>
  );
}
