import React, { useState, useEffect, useRef, memo } from "react";
import RobotHeadGraphic from "../components/RobotHeadGraphic";
import { useDelayedUnmount } from '../hooks/useDelayedUnmount';

function useZoomScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const zoomLevel = Math.round(window.devicePixelRatio * 100);

      if (zoomLevel > 120) {
        setScale(100 / zoomLevel);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener('resize', updateScale);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      if (visualViewport) {
        visualViewport.removeEventListener('resize', updateScale);
      }
    };
  }, []);

  return scale;
}

interface TrainingProgressOverlayProps {
  isActive: boolean;
  isRebuilding: boolean;
  isResetting?: boolean;
  isRebuildingBase?: boolean;
  isPurpleFlow?: boolean;
  onComplete?: () => void;
  duration?: number;
}

export default memo(function TrainingProgressOverlay({
  isActive,
  isRebuilding,
  isResetting = false,
  isRebuildingBase = false,
  isPurpleFlow = false,
  onComplete,
  duration = 4500,
}: TrainingProgressOverlayProps) {
  const zoomScale = useZoomScale();
  const [progress, setProgress] = useState(0);
  const [hideUI, setHideUI] = useState(false);
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(duration);
  const onCompleteRef = useRef(onComplete);
  const hasStartedRef = useRef(false);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (isActive && !hasStartedRef.current) {
      durationRef.current = duration;
    }
  }, [isActive, duration]);

  const getProgressText = (p: number) => {
    if (isResetting) {
      return "RESETTING AI MODEL...";
    }
    if (isPurpleFlow) {
      if (p < 15) return "Analyzing Data";
      if (p < 35) return "Resetting AI";
      if (p < 62) return "Building Custom AI Architecture";
      return "Training AI Model";
    }
    if (p < 20) return "Analyzing Data";
    if (p < 50) return "Building Custom AI Architecture";
    return "Training AI Model";
  };

  useEffect(() => {
    if (isActive) {
      if (!hasStartedRef.current) {
        setProgress(0);
        setHideUI(false);
        startTimeRef.current = Date.now();
        hasStartedRef.current = true;
      }

      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const p = Math.min(elapsed / durationRef.current, 1);
        const newProgress = Math.round(p * 100);
        if (newProgress !== lastProgressRef.current) {
          lastProgressRef.current = newProgress;
          setProgress(newProgress);
        }

        if (p < 1) {
          requestRef.current = requestAnimationFrame(animate);
        } else {
          if (onCompleteRef.current) onCompleteRef.current();
          setTimeout(() => {
            setHideUI(true);
          }, 100);
        }
      };

      requestRef.current = requestAnimationFrame(animate);
    } else {
      hasStartedRef.current = false;
      lastProgressRef.current = 0;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      setTimeout(() => {
        setProgress(0);
        setHideUI(false);
      }, 500);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive]);

  const shouldRender = useDelayedUnmount(isActive && !hideUI, 500);

  if (!shouldRender) return null;

  const robotSize = `calc(clamp(48px, 12vw, 128px) * ${zoomScale})`;
  const fontSize = `calc(clamp(7px, 1.8vw, 14px) * ${zoomScale})`;

  return (
    <div
      className={`absolute transition-opacity duration-500 ${
        isActive && !hideUI ? "opacity-100" : "opacity-0"
      } flex items-center`}
      style={{
        pointerEvents: "none",
        zIndex: 20,
        bottom: "clamp(4px, 1vh, 8px)",
        left: "clamp(8px, 2vw, 32px)",
        right: "clamp(8px, 2vw, 32px)",
        gap: `calc(clamp(8px, 2vw, 24px) * ${zoomScale})`,
      }}
    >
      <div
        className="relative flex-shrink-0"
        style={{
          width: robotSize,
          height: robotSize,
        }}
      >
        <RobotHeadGraphic isActive={isActive} showGears={progress < 40} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-end mb-1 sm:mb-2 text-[var(--ifm-color-primary)] tracking-wider">
          <span
            className="uppercase font-bold drop-shadow-[0_0_5px_rgba(0,255,209,0.5)] tracking-[0.1em] sm:tracking-[0.2em] truncate"
            style={{ fontSize }}
          >
            {getProgressText(progress)}
          </span>
          <span
            className="font-bold flex-shrink-0 ml-2"
            style={{ fontSize }}
          >
            {progress}%
          </span>
        </div>
        <div
          className="w-full bg-white/10 rounded-full overflow-hidden"
          style={{ height: `calc(clamp(2px, 0.4vh, 6px) * ${zoomScale})` }}
        >
          <div
            className="h-full bg-[var(--ifm-color-primary)] shadow-[0_0_15px_var(--ifm-color-primary)]"
            style={{
              width: `${progress}%`,
              transition: "width 80ms linear"
            }}
          />
        </div>
      </div>
    </div>
  );
});
