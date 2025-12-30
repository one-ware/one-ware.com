import React, { useState, useEffect, useRef } from "react";
import Link from "@docusaurus/Link";

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
  isActive,
  onMouseEnter,
  onMouseLeave,
}: VideoShowcaseCardProps) {
  const [leftCount, setLeftCount] = useState(metrics.left.value);
  const [rightCount, setRightCount] = useState(metrics.right.value);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
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
    const video = videoRef.current;
    if (video) {
      if (isActive) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Ignore AbortError which happens when pause() is called while playing
            // or when the element is removed from the document
            if (error.name === "AbortError" || error.message?.includes("removed from the document")) {
              return;
            }
            console.error("Video playback failed:", error);
          });
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }

    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [isActive]);

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
    Efficient: "text-green-400",
    Balanced: "text-yellow-400",
    Advanced: "text-red-400",
    Any: "text-blue-400",
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
            background: "rgba(20, 20, 20, 0.85)",
            border: isActive ? "1px solid rgba(0, 255, 209, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 0,
            boxShadow: isActive ? "0 8px 32px rgba(0, 255, 209, 0.15)" : "none",
            transform: isActive ? "scale(1.02)" : "scale(1)",
            opacity: isActive ? 1 : 0.6,
          }}
        >
          <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: "16 / 9" }}>
            {videoSrc && (
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover absolute inset-0"
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
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${videoSrc && isActive ? 'opacity-0' : 'opacity-100'}`}
                style={{ zIndex: videoSrc && isActive ? 0 : 10 }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20" />
          </div>

          <div className="p-3 sm:p-4 flex-grow flex flex-col" style={{ background: "rgba(20, 20, 20, 0.4)" }}>
            <h3
              className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 transition-colors duration-300"
              style={{ color: isActive ? "#00FFD1" : "rgba(255, 255, 255, 0.9)" }}
            >
              {title}
            </h3>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 flex-grow">
              <div
                className="p-1.5 sm:p-2 text-center transition-all duration-300 flex flex-col justify-center h-full"
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div
                  className="text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap"
                  style={{ color: "#00FFD1" }}
                >
                  {leftCount === metrics.left.value && metrics.left.prefix}{leftCount}{metrics.left.unit}
                </div>
                <div className="text-[0.6rem] sm:text-xs leading-tight mt-1" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  {metrics.left.label}
                </div>
              </div>

              <div
                className="p-1.5 sm:p-2 text-center transition-all duration-300 flex flex-col justify-center h-full"
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className={`text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap ${complexityColor[metrics.center.value]}`}>
                  {metrics.center.value}
                </div>
                <div className="text-[0.6rem] sm:text-xs leading-tight mt-1" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  {metrics.center.label}
                </div>
              </div>

              <div
                className="p-1.5 sm:p-2 text-center transition-all duration-300 flex flex-col justify-center h-full"
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div
                  className="text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap"
                  style={{ color: "#00FFD1" }}
                >
                  {rightCount === metrics.right.value && metrics.right.prefix}{rightCount}{metrics.right.unit}
                </div>
                <div className="text-[0.6rem] sm:text-xs leading-tight mt-1" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
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
