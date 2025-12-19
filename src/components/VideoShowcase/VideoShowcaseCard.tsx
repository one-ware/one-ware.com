import React, { useState, useEffect, useRef } from "react";

interface Metrics {
  accuracy: number;
  complexity: "Low" | "Medium" | "High";
  speedVsYolo: string;
}

interface VideoShowcaseCardProps {
  video: string;
  title: string;
  metrics: Metrics;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function VideoShowcaseCard({
  video,
  title,
  metrics,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: VideoShowcaseCardProps) {
  const [accuracyCount, setAccuracyCount] = useState(0);
  const [speedCount, setSpeedCount] = useState(0);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevActiveRef = useRef(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && !prevActiveRef.current) {
      setAccuracyCount(0);
      setSpeedCount(0);

      const duration = 800;
      const steps = 25;
      let currentStep = 0;

      if (animationRef.current) {
        clearInterval(animationRef.current);
      }

      animationRef.current = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setAccuracyCount(Math.floor(metrics.accuracy * progress));
        const speedNum = parseInt(metrics.speedVsYolo.replace("x", ""));
        setSpeedCount(Math.floor(speedNum * progress));

        if (currentStep >= steps) {
          setAccuracyCount(metrics.accuracy);
          setSpeedCount(parseInt(metrics.speedVsYolo.replace("x", "")));
          if (animationRef.current) clearInterval(animationRef.current);
        }
      }, duration / steps);
    }

    if (!isActive) {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      setAccuracyCount(0);
      setSpeedCount(0);
    }

    prevActiveRef.current = isActive;

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [isActive, metrics.accuracy, metrics.speedVsYolo]);

  const complexityColor = {
    Low: "text-green-400",
    Medium: "text-yellow-400",
    High: "text-red-400",
  };

  return (
    <div
      className="group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="relative overflow-hidden transition-all duration-500"
        style={{
          background: "rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          border: isActive ? "1px solid rgba(0, 255, 209, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "14px",
          boxShadow: isActive ? "0 8px 32px rgba(0, 255, 209, 0.15)" : "none",
          transform: isActive ? "scale(1.02)" : "scale(1)",
          opacity: isActive ? 1 : 0.6,
        }}
      >
        <div className="relative overflow-hidden" style={{ borderRadius: "14px 14px 0 0", aspectRatio: "16 / 9" }}>
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="p-3 sm:p-4" style={{ background: "rgba(20, 20, 20, 0.4)" }}>
          <h3
            className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 transition-colors duration-300"
            style={{ color: isActive ? "#00FFD1" : "rgba(255, 255, 255, 0.9)" }}
          >
            {title}
          </h3>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <div
              className="p-1.5 sm:p-2 text-center transition-all duration-300"
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
              }}
            >
              <div
                className="text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap"
                style={{ color: "#00FFD1" }}
              >
                {accuracyCount}%
              </div>
              <div className="text-[0.6rem] sm:text-xs whitespace-nowrap" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Accuracy
              </div>
            </div>

            <div
              className="p-1.5 sm:p-2 text-center transition-all duration-300"
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
              }}
            >
              <div className={`text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap ${complexityColor[metrics.complexity]}`}>
                {metrics.complexity}
              </div>
              <div className="text-[0.6rem] sm:text-xs whitespace-nowrap" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Complexity
              </div>
            </div>

            <div
              className="p-1.5 sm:p-2 text-center transition-all duration-300"
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
              }}
            >
              <div
                className="text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap"
                style={{ color: "#00FFD1" }}
              >
                {speedCount}x
              </div>
              <div className="text-[0.6rem] sm:text-xs whitespace-nowrap" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                vs YOLO
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
