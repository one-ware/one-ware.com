import React, { useState, useEffect, useRef } from "react";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";

export interface MetricData {
  value: number;
  unit: string;
  label: string;
  startValue?: number;
  prefix?: string;
}

export interface Metrics {
  left: MetricData;
  center: {
    value: "Efficient" | "Balanced" | "Advanced" | "Any";
    label: string;
  };
  right: MetricData;
}

interface VideoShowcaseCardProps {
  video?: string;
  image?: string;
  title: string;
  metrics: Metrics;
  link: string;
  architecture?: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function VideoShowcaseCard({
  video,
  image,
  title,
  metrics,
  link,
  architecture,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: VideoShowcaseCardProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [leftCount, setLeftCount] = useState(metrics.left.value);
  const [rightCount, setRightCount] = useState(metrics.right.value);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevActiveRef = useRef(false);
  const hasLoadedVideo = useRef(false);

  useEffect(() => {
    if (video && isActive && !hasLoadedVideo.current) {
      hasLoadedVideo.current = true;
      setVideoSrc(video);
    }
  }, [video, isActive]);

  useEffect(() => {
    if (!videoSrc) {
      setVideoReady(false);
    }
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && videoReady) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name === "AbortError" || error.message?.includes("removed from the document")) {
            return;
          }
        });
      }
    } else if (!isActive) {
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [isActive, videoReady]);

  useEffect(() => {
    if (isActive && !prevActiveRef.current) {
      const leftStart = metrics.left.startValue ?? 0;
      const rightStart = metrics.right.startValue ?? 0;
      
      setLeftCount(leftStart);
      setRightCount(rightStart);

      const duration = 800;
      const steps = 25;
      let currentStep = 0;

      if (animationRef.current) {
        clearInterval(animationRef.current);
      }

      animationRef.current = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        // Calculate current value based on start and end values
        const leftDiff = metrics.left.value - leftStart;
        const rightDiff = metrics.right.value - rightStart;
        
        setLeftCount(Math.floor(leftStart + (leftDiff * progress)));
        setRightCount(Math.floor(rightStart + (rightDiff * progress)));

        if (currentStep >= steps) {
          setLeftCount(metrics.left.value);
          setRightCount(metrics.right.value);
          if (animationRef.current) clearInterval(animationRef.current);
        }
      }, duration / steps);
    }

    if (!isActive) {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      setLeftCount(metrics.left.value);
      setRightCount(metrics.right.value);
    }

    prevActiveRef.current = isActive;

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [isActive, metrics.left.value, metrics.right.value, metrics.left.startValue, metrics.right.startValue]);

  const complexityColor = {
    Efficient: isDarkMode ? "text-green-400" : "text-green-600",
    Balanced: isDarkMode ? "text-yellow-400" : "text-yellow-600",
    Advanced: isDarkMode ? "text-red-400" : "text-red-600",
    Any: isDarkMode ? "text-blue-400" : "text-blue-600",
  };

  return (
    <div
      className="group h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        to={link}
        className="block no-underline hover:no-underline h-full"
      >
        <div
          className="relative overflow-hidden transition-all duration-500 h-full flex flex-col"
          style={{
            background: isDarkMode ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.95)",
            border: isActive
              ? (isDarkMode ? "1px solid rgba(0, 255, 209, 0.5)" : "1px solid rgba(0, 168, 138, 0.5)")
              : (isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)"),
            borderRadius: 14,
            boxShadow: isActive
              ? (isDarkMode ? "0 8px 32px rgba(0, 255, 209, 0.15)" : "0 8px 32px rgba(0, 168, 138, 0.15)")
              : "none",
            transform: isActive ? "scale(1.02)" : "scale(1)",
            opacity: isActive ? 1 : 0.6,
          }}
        >
          <div className="relative overflow-hidden flex-shrink-0" style={{ borderRadius: "14px 14px 0 0", aspectRatio: "16 / 9" }}>
            {videoSrc && (
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover absolute inset-0"
                onCanPlay={() => setVideoReady(true)}
                onError={() => {
                  setVideoReady(false);
                  setVideoSrc(null);
                  hasLoadedVideo.current = false;
                }}
              >
                <source src={videoSrc} type="video/webm" />
              </video>
            )}
            {image && (
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${videoReady && isActive ? 'opacity-0' : 'opacity-100'}`}
                style={{ zIndex: videoReady && isActive ? 0 : 10 }}
              />
            )}
            
            {architecture && (
              <div
                className="absolute inset-0 overflow-hidden z-30 pointer-events-none"
                style={{
                  opacity: !isActive ? 1 : 0,
                  transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Backdrop Blur Gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 45%)",
                    WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 45%)",
                  }}
                />
                
                {/* Architecture Image on the Left */}
                <div className="absolute inset-y-0 left-0 w-1/3 p-2 flex items-center justify-center">
                  <img
                    src={architecture}
                    alt="Architecture"
                    className="w-full h-full object-contain drop-shadow-xl"
                    style={{
                      filter: isDarkMode ? "brightness(1.2)" : "none",
                      maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                      WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                </div>
              </div>
            )}

            <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-black/70" : "from-black/50"} via-transparent to-transparent z-20`} />
          </div>

          <div className="p-3 sm:p-4 flex-grow flex flex-col" style={{ background: isDarkMode ? "rgba(20, 20, 20, 0.4)" : "rgba(245, 245, 245, 0.6)" }}>
            <h3
              className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 transition-colors duration-300"
              style={{ color: isActive ? (isDarkMode ? "#00FFD1" : "#00a88a") : (isDarkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)") }}
            >
              {title}
            </h3>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 flex-grow">
              <div
                className="p-1.5 sm:p-2 text-center transition-all duration-300 flex flex-col justify-center h-full"
                style={{
                  background: isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.05)",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap"
                  style={{ color: isDarkMode ? "#00FFD1" : "#00a88a" }}
                >
                  {leftCount === metrics.left.value && metrics.left.prefix}{leftCount}{metrics.left.unit}
                </div>
                <div className="text-[0.6rem] sm:text-xs leading-tight mt-1" style={{ color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)" }}>
                  {metrics.left.label}
                </div>
              </div>

              <div
                className="p-1.5 sm:p-2 text-center transition-all duration-300 flex flex-col justify-center h-full"
                style={{
                  background: isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.05)",
                  borderRadius: "8px",
                }}
              >
                <div className={`text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap ${complexityColor[metrics.center.value]}`}>
                  {metrics.center.value}
                </div>
                <div className="text-[0.6rem] sm:text-xs leading-tight mt-1" style={{ color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)" }}>
                  {metrics.center.label}
                </div>
              </div>

              <div
                className="p-1.5 sm:p-2 text-center transition-all duration-300 flex flex-col justify-center h-full"
                style={{
                  background: isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.05)",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap"
                  style={{ color: isDarkMode ? "#00FFD1" : "#00a88a" }}
                >
                  {rightCount === metrics.right.value && metrics.right.prefix}{rightCount}{metrics.right.unit}
                </div>
                <div className="text-[0.6rem] sm:text-xs leading-tight mt-1" style={{ color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)" }}>
                  {metrics.right.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
