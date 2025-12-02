import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "@docusaurus/Link";
import BackgroundGridSimple from "./BackgroundGridSimple";
import { FolderWithApple, DragPreview } from "./FolderWithApple";
import SoftwareWindow from "./SoftwareWindow";
import GhostDragAnimation from "./GhostDragAnimation";
import "./glass-design.css";

export default function HomeHero() {
  const [isDragging, setIsDragging] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const dragPosRef = useRef({ x: 0, y: 0 });

  const sourceFolderRef = useRef<HTMLDivElement>(null);
  const [targetPanelRef, setTargetPanelRef] = useState<HTMLElement | null>(
    null
  );
  const [showGhost, setShowGhost] = useState(false);
  const [isGhostHovering, setIsGhostHovering] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGhost(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
        setDragPos({ x: clientX, y: clientY });
        dragPosRef.current = { x: clientX, y: clientY };
      }
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    if (isDragging) {
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
      window.addEventListener("touchmove", handleDragMove, { passive: false });
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
    <section
      className="relative overflow-hidden min-h-screen 2xl:h-[calc(100vh+var(--ifm-navbar-height))]"
      style={{
        marginTop: "calc(var(--ifm-navbar-height) * -1)",
        background: "#050505",
      }}
    >
      <BackgroundGridSimple />

      {isDragging && <DragPreview x={dragPos.x} y={dragPos.y} />}

      <GhostDragAnimation
        sourceRef={sourceFolderRef}
        targetRef={targetPanelRef}
        show={!hasDropped && !isDragging && showGhost}
        onHoverChange={setIsGhostHovering}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16"
        style={{ paddingTop: "var(--ifm-navbar-height)", height: "100%" }}
      >
        <div className="w-full max-w-[98%] sm:max-w-[95%] flex flex-col gap-4 sm:gap-6 2xl:gap-8 min-h-[calc(100vh-var(--ifm-navbar-height))] 2xl:h-[80vh] 2xl:min-h-0">
          <div className="flex flex-col 2xl:flex-row items-center gap-4 sm:gap-6 2xl:gap-12 flex-1">
            <div className="w-full 2xl:w-[40%] flex flex-col justify-center space-y-4 sm:space-y-6 2xl:space-y-8 text-center 2xl:text-left py-4 2xl:py-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-8xl font-bold leading-tight sm:leading-relaxed">
                <span
                  className="text-[var(--ifm-color-primary)] block"
                  style={{
                    animation: "fadeInUp 0.8s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  Create your
                </span>
                <span
                  className="text-[var(--ifm-color-primary)] block"
                  style={{
                    animation: "fadeInUp 0.8s ease-out forwards",
                    animationDelay: "0.1s",
                    opacity: 0,
                  }}
                >
                  Custom AI
                </span>
              </h1>
              <p
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-normal"
                style={{
                  lineHeight: "1.6",
                  animation: "fadeInUp 0.8s ease-out forwards",
                  animationDelay: "0.2s",
                  opacity: 0,
                }}
              >
                Vision and Edge AI Development,
                <br />
                Fully Automated in One Software
              </p>
            </div>

            <div className="relative flex items-center 2xl:items-end justify-center 2xl:justify-end w-full 2xl:w-[60%] h-auto 2xl:h-full select-none flex-1 2xl:flex-initial">
              <div className="absolute 2xl:relative z-30 2xl:z-auto bottom-4 sm:bottom-6 2xl:bottom-auto left-4 sm:left-8 2xl:left-auto 2xl:mr-8 sm:2xl:mr-16">
                <FolderWithApple
                  style={{
                    animation: "fadeInUp 0.8s ease-out forwards",
                    animationDelay: "0.3s",
                    opacity: 0,
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
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 2xl:gap-16 pt-12 pb-12 sm:py-6 2xl:py-8">
            <Link
              href="/one-ai#getStarted"
              style={{
                animation: "fadeInUp 0.8s ease-out forwards",
                animationDelay: "0.5s",
                opacity: 0,
              }}
            >
              <button className="button button--primary button--outline button--md sm:button--lg w-full sm:w-auto">
                Start Now for Free
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
              <button className="button button--primary button--md sm:button--lg w-full sm:w-auto">
                Discover ONE AI
              </button>
            </Link>
          </div>
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
      `}</style>
    </section>
  );
}
