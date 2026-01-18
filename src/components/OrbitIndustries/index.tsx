import React, { useState, useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import NeuralNetworkSimple from "../NeuralNetworkSimple";
import Translate from "@docusaurus/Translate";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

interface IndustryItem {
  id: string;
  labelId: string;
  label: string;
  icon: React.ReactNode;
  descriptionId: string;
  description: string;
  angle: number;
}

const industries: IndustryItem[] = [
  {
    id: "anyHardware",
    labelId: "orbitindustries.anyHardware.label",
    label: "Any Hardware",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
    descriptionId: "orbitindustries.anyHardware.description",
    description: "AI for any hardware, no matter how few resources. From microcontrollers to FPGAs - ONE AI optimizes for your exact constraints.",
    angle: 315,
  },
  {
    id: "anyRequirements",
    labelId: "orbitindustries.anyRequirements.label",
    label: "Any Requirements",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    descriptionId: "orbitindustries.anyRequirements.description",
    description: "AI no matter how fast it needs to be. Built for the most demanding real-time applications with guaranteed performance.",
    angle: 45,
  },
  {
    id: "anyApplication",
    labelId: "orbitindustries.anyApplication.label",
    label: "Any Application",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    descriptionId: "orbitindustries.anyApplication.description",
    description: "No matter how complex the application or how unusual the data - ONE AI creates custom neural networks tailored to your specific use case.",
    angle: 225,
  },
  {
    id: "resultsInMinutes",
    labelId: "orbitindustries.resultsInMinutes.label",
    label: "Results In Minutes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    descriptionId: "orbitindustries.resultsInMinutes.description",
    description: "Can be operated by any developer. Get production-ready AI models in minutes, not months - no ML expertise required.",
    angle: 135,
  },
];

const DESKTOP_PAIRS = [
  [0, 3],
  [1, 2],
];

const MOBILE_PAIRS = [
  [0, 3],
  [1, 2],
];

const AUTO_ROTATE_INTERVAL = 5000;

const CONFIG = {
  orbitRadii: [140, 160, 180],
  iconRadius: 160,
  iconSize: 70,
  cardWidth: 240,
  cardOffset: 40,
  neuralNetworkSize: 220,
  centerX: 250,
  centerY: 250,
  viewBox: 500,
};

function calculatePositions(angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const iconX = CONFIG.centerX + CONFIG.iconRadius * cos;
  const iconY = CONFIG.centerY + CONFIG.iconRadius * sin;

  const isTopRight = angle === 45;
  const isBottomRight = angle === 135;
  const isBottomLeft = angle === 225;
  const isTopLeft = angle === 315;
  const isRightSide = isTopRight || isBottomRight;
  const isTopSide = isTopRight || isTopLeft;

  let lineStartX: number, lineStartY: number, lineEndX: number, lineEndY: number;
  let cardX: number, cardY: number;

  if (isRightSide) {
    lineStartX = iconX + CONFIG.iconSize / 2 + 2;
    lineStartY = iconY;
    lineEndX = iconX + CONFIG.iconSize / 2 + CONFIG.cardOffset;
    lineEndY = iconY;
    cardX = iconX + CONFIG.iconSize / 2 + CONFIG.cardOffset + CONFIG.cardWidth / 2;
    cardY = iconY;
  } else {
    lineStartX = iconX - CONFIG.iconSize / 2 - 2;
    lineStartY = iconY;
    lineEndX = iconX - CONFIG.iconSize / 2 - CONFIG.cardOffset;
    lineEndY = iconY;
    cardX = iconX - CONFIG.iconSize / 2 - CONFIG.cardOffset - CONFIG.cardWidth / 2;
    cardY = iconY;
  }

  return { iconX, iconY, cardX, cardY, lineStartX, lineStartY, lineEndX, lineEndY, isTopSide, isRightSide };
}

const MOBILE_BREAKPOINT = 900;

export default function OrbitIndustries() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [activePair, setActivePair] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pairs = isMobile ? MOBILE_PAIRS : DESKTOP_PAIRS;

  useEffect(() => {
    if (!isMobile) return;

    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setActivePair((prev) => (prev + 1) % pairs.length);
    }, AUTO_ROTATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, pairs.length, isMobile]);

  const handleIconHover = (index: number) => {
    if (isMobile) {
      const pairIndex = pairs.findIndex((pair) => pair.includes(index));
      if (pairIndex !== -1) {
        setActivePair(pairIndex);
        setIsPaused(true);
      }
    } else {
      setHoveredIndex(index);
    }
  };

  const handleIconLeave = () => {
    if (!isMobile) {
      setHoveredIndex(null);
    }
  };

  const handleContainerMouseLeave = () => {
    setIsPaused(false);
  };

  const currentPair = pairs[activePair];

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            <Translate id="orbitindustries.title">Explore Our Benefits</Translate>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            <Translate id="orbitindustries.subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Translate>
          </p>
        </div>

        <div
          className="flex flex-col items-center"
          ref={containerRef}
          onMouseLeave={handleContainerMouseLeave}
        >
          {isMobile && (
            <div className="w-full max-w-sm mb-6">
              <div
                className="p-4"
                style={{
                  background: isDarkMode
                    ? "rgba(30, 30, 30, 0.98)"
                    : "rgba(255, 255, 255, 0.98)",
                  border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                  boxShadow: isDarkMode
                    ? "0 20px 40px rgba(0, 0, 0, 0.5)"
                    : "0 20px 40px rgba(0, 0, 0, 0.12)",
                  borderRadius: 12,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      background: "var(--ifm-color-primary)",
                      color: "#000",
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ width: 18, height: 18 }}>
                      {industries[currentPair[0]].icon}
                    </div>
                  </div>
                  <span
                    className="font-semibold"
                    style={{ color: isDarkMode ? "#fff" : "#000", fontSize: "16px" }}
                  >
                    <Translate id={industries[currentPair[0]].labelId}>{industries[currentPair[0]].label}</Translate>
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isDarkMode ? "#999" : "#666" }}
                >
                  <Translate id={industries[currentPair[0]].descriptionId}>{industries[currentPair[0]].description}</Translate>
                </p>
              </div>
            </div>
          )}

          <div className="relative w-full max-w-[420px] sm:max-w-[500px] mx-auto">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full z-0"
              style={{
                width: `${(CONFIG.neuralNetworkSize / CONFIG.viewBox) * 100}%`,
                height: `${(CONFIG.neuralNetworkSize / CONFIG.viewBox) * 100}%`,
                background: isDarkMode ? "#2a2a2a" : "#e0e0e0",
              }}
            >
              <div className="w-[90%] h-[90%]">
                <NeuralNetworkSimple
                  width="100%"
                  height="100%"
                  autoRotate={true}
                  rotationSpeed={0.06}
                />
              </div>
            </div>

            <svg
              viewBox={`0 0 ${CONFIG.viewBox} ${CONFIG.viewBox}`}
              className="overflow-visible w-full h-auto relative z-10"
            >
              {CONFIG.orbitRadii.map((radius, index) => (
                <circle
                  key={index}
                  cx={CONFIG.centerX}
                  cy={CONFIG.centerY}
                  r={radius}
                  fill="none"
                  stroke={isDarkMode ? "#3a3a3a" : "#c5c5c5"}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              ))}

              {industries.map((industry, index) => {
                const positions = calculatePositions(industry.angle);
                const { iconX, iconY, lineStartX, lineStartY, lineEndX, lineEndY } = positions;
                const isActive = isMobile
                  ? currentPair.includes(index)
                  : hoveredIndex === index;

                return (
                  <g key={industry.id}>
                    {!isMobile && (
                      <line
                        x1={lineStartX}
                        y1={lineStartY}
                        x2={lineEndX}
                        y2={lineEndY}
                        stroke="var(--ifm-color-primary)"
                        strokeWidth={isActive ? 2.5 : 1.5}
                        style={{
                          opacity: isActive ? 1 : (hoveredIndex !== null ? 0.15 : 0.3),
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    <g
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => handleIconHover(index)}
                      onMouseLeave={handleIconLeave}
                      onClick={() => handleIconHover(index)}
                    >
                      <circle
                        cx={iconX}
                        cy={iconY}
                        r={CONFIG.iconSize / 2}
                        fill={isActive ? "var(--ifm-color-primary)" : isDarkMode ? "#2a2a2a" : "#e0e0e0"}
                        stroke={isActive ? "var(--ifm-color-primary)" : "transparent"}
                        strokeWidth={isActive ? 3 : 0}
                        style={{
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          filter: isActive
                            ? isDarkMode
                              ? "drop-shadow(0 0 30px rgba(0, 255, 209, 0.6)) drop-shadow(0 15px 35px rgba(0, 255, 209, 0.4))"
                              : "drop-shadow(0 0 30px rgba(0, 168, 138, 0.5)) drop-shadow(0 15px 35px rgba(0, 168, 138, 0.3))"
                            : hoveredIndex !== null
                              ? isDarkMode
                                ? "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))"
                                : "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08))"
                              : isDarkMode
                                ? "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))"
                                : "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
                          transform: isActive ? "scale(1.05)" : "scale(1)",
                          transformOrigin: `${iconX}px ${iconY}px`,
                          opacity: isActive ? 1 : (hoveredIndex !== null ? 0.5 : 1),
                        }}
                      />
                      <foreignObject
                        x={iconX - CONFIG.iconSize / 2}
                        y={iconY - CONFIG.iconSize / 2}
                        width={CONFIG.iconSize}
                        height={CONFIG.iconSize}
                        style={{ pointerEvents: "none" }}
                      >
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: CONFIG.iconSize,
                            height: CONFIG.iconSize,
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              color: isActive ? "#000" : isDarkMode ? "#555" : "#666",
                              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              opacity: isActive ? 1 : (hoveredIndex !== null ? 0.4 : 1),
                            }}
                          >
                            {industry.icon}
                          </div>
                        </div>
                      </foreignObject>
                    </g>
                  </g>
                );
              })}

              {!isMobile && industries.map((industry, index) => {
                const positions = calculatePositions(industry.angle);
                const { cardX, cardY, isTopSide } = positions;
                const isActive = hoveredIndex === index;
                const cardHeight = 130;

                let finalX = cardX - CONFIG.cardWidth / 2;
                let finalY = isTopSide ? cardY - cardHeight + 20 : cardY - 20;

                return (
                  <foreignObject
                    key={`card-${industry.id}`}
                    x={finalX}
                    y={finalY}
                    width={CONFIG.cardWidth}
                    height={cardHeight}
                    style={{
                      overflow: "visible",
                      pointerEvents: "auto",
                      opacity: isActive ? 1 : (hoveredIndex !== null ? 0.35 : 0.7),
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div>
                      <div
                        className="p-4"
                        style={{
                          background: isDarkMode
                            ? "rgba(30, 30, 30, 0.98)"
                            : "rgba(255, 255, 255, 0.98)",
                          border: isActive
                            ? `1px solid ${isDarkMode ? "rgba(0, 255, 209, 0.3)" : "rgba(0, 168, 138, 0.3)"}`
                            : `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                          boxShadow: isActive
                            ? isDarkMode
                              ? "0 25px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 255, 209, 0.15)"
                              : "0 25px 50px rgba(0, 0, 0, 0.18), 0 0 40px rgba(0, 168, 138, 0.1)"
                            : isDarkMode
                              ? "0 15px 30px rgba(0, 0, 0, 0.4)"
                              : "0 15px 30px rgba(0, 0, 0, 0.08)",
                          borderRadius: 12,
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="flex items-center justify-center shrink-0"
                            style={{
                              width: 36,
                              height: 36,
                              background: "var(--ifm-color-primary)",
                              color: "#000",
                              borderRadius: 8,
                              boxShadow: isActive
                                ? isDarkMode
                                  ? "0 0 20px rgba(0, 255, 209, 0.4)"
                                  : "0 0 20px rgba(0, 168, 138, 0.3)"
                                : "none",
                              transition: "box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                          >
                            <div style={{ width: 18, height: 18 }}>
                              {industry.icon}
                            </div>
                          </div>
                          <span
                            className="font-semibold"
                            style={{ color: isDarkMode ? "#fff" : "#000", fontSize: "16px" }}
                          >
                            <Translate id={industry.labelId}>{industry.label}</Translate>
                          </span>
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: isDarkMode ? "#999" : "#666" }}
                        >
                          <Translate id={industry.descriptionId}>{industry.description}</Translate>
                        </p>
                      </div>
                    </div>
                  </foreignObject>
                );
              })}
            </svg>
          </div>

          {isMobile && (
            <div className="w-full max-w-sm mt-6">
              <div
                className="p-4"
                style={{
                  background: isDarkMode
                    ? "rgba(30, 30, 30, 0.98)"
                    : "rgba(255, 255, 255, 0.98)",
                  border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                  boxShadow: isDarkMode
                    ? "0 20px 40px rgba(0, 0, 0, 0.5)"
                    : "0 20px 40px rgba(0, 0, 0, 0.12)",
                  borderRadius: 12,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      background: "var(--ifm-color-primary)",
                      color: "#000",
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ width: 18, height: 18 }}>
                      {industries[currentPair[1]].icon}
                    </div>
                  </div>
                  <span
                    className="font-semibold"
                    style={{ color: isDarkMode ? "#fff" : "#000", fontSize: "16px" }}
                  >
                    <Translate id={industries[currentPair[1]].labelId}>{industries[currentPair[1]].label}</Translate>
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isDarkMode ? "#999" : "#666" }}
                >
                  <Translate id={industries[currentPair[1]].descriptionId}>{industries[currentPair[1]].description}</Translate>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
