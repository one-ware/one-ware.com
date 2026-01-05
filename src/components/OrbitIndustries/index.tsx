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
    id: "benefit1",
    labelId: "orbitindustries.benefit1.label",
    label: "Lorem Title",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    descriptionId: "orbitindustries.benefit1.description",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    angle: 0,
  },
  {
    id: "benefit2",
    labelId: "orbitindustries.benefit2.label",
    label: "Lorem Title",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17h14v-5H5v5z" />
        <path d="M2 9h20l-2-4H4L2 9z" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    descriptionId: "orbitindustries.benefit2.description",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    angle: 72,
  },
  {
    id: "benefit3",
    labelId: "orbitindustries.benefit3.label",
    label: "Lorem Title",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    descriptionId: "orbitindustries.benefit3.description",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    angle: 144,
  },
  {
    id: "benefit4",
    labelId: "orbitindustries.benefit4.label",
    label: "Lorem Title",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    descriptionId: "orbitindustries.benefit4.description",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    angle: 216,
  },
  {
    id: "benefit5",
    labelId: "orbitindustries.benefit5.label",
    label: "Lorem Title",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M12 20v-8" />
        <path d="M12 12c-3.5 0-6-2.5-6-6 3.5 0 6 2.5 6 6z" />
        <path d="M12 12c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6z" />
      </svg>
    ),
    descriptionId: "orbitindustries.benefit5.description",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    angle: 288,
  },
];

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

  const lineStartX = iconX + CONFIG.iconSize / 2 + 2;
  const lineStartY = iconY;
  const lineEndX = iconX + CONFIG.iconSize / 2 + CONFIG.cardOffset;
  const lineEndY = iconY;

  const cardX = iconX + CONFIG.iconSize / 2 + CONFIG.cardOffset + CONFIG.cardWidth / 2;
  const cardY = iconY;

  return { iconX, iconY, cardX, cardY, lineStartX, lineStartY, lineEndX, lineEndY };
}

const MOBILE_BREAKPOINT = 900;

export default function OrbitIndustries() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [displayedIndustry, setDisplayedIndustry] = useState<IndustryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleIconClick = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const selectedIndustry = industries.find((i) => i.id === selectedId);

  useEffect(() => {
    if (selectedIndustry) {
      setDisplayedIndustry(selectedIndustry);
    }
  }, [selectedIndustry]);

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

        <div className="flex flex-col items-center" ref={containerRef}>
          {isMobile && (
            <div
              className="w-full max-w-sm overflow-hidden"
              style={{
                maxHeight: selectedIndustry ? 300 : 0,
                marginBottom: selectedIndustry ? 24 : 0,
                opacity: selectedIndustry ? 1 : 0,
                transform: selectedIndustry ? "translateY(0)" : "translateY(-20px)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
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
                }}
              >
                {displayedIndustry && (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: 36,
                          height: 36,
                          background: "var(--ifm-color-primary)",
                          color: "#000",
                        }}
                      >
                        <div style={{ width: 18, height: 18 }}>
                          {displayedIndustry.icon}
                        </div>
                      </div>
                      <span
                        className="font-semibold"
                        style={{ color: isDarkMode ? "#fff" : "#000", fontSize: "16px" }}
                      >
                        <Translate id={displayedIndustry.labelId}>{displayedIndustry.label}</Translate>
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: isDarkMode ? "#999" : "#666" }}
                    >
                      <Translate id={displayedIndustry.descriptionId}>{displayedIndustry.description}</Translate>
                    </p>
                    <button
                      className="w-full py-2 px-3 font-medium text-sm"
                      style={{
                        background: "var(--ifm-color-primary)",
                        color: "#000",
                        border: "none",
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                    >
                      <Translate id="orbitindustries.button">Learn More</Translate>
                    </button>
                  </>
                )}
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

            {industries.map((industry) => {
              const positions = calculatePositions(industry.angle);
              const { iconX, iconY, lineStartX, lineStartY, lineEndX, lineEndY } = positions;
              const isHovered = hoveredId === industry.id;
              const isSelected = selectedId === industry.id;

              return (
                <g key={industry.id}>
                  {!isMobile && (
                    <line
                      x1={lineStartX}
                      y1={lineStartY}
                      x2={lineEndX}
                      y2={lineEndY}
                      stroke="var(--ifm-color-primary)"
                      strokeWidth="1.5"
                      style={{
                        opacity: isSelected ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  <g
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => !isMobile && setHoveredId(industry.id)}
                    onMouseLeave={() => !isMobile && setHoveredId(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIconClick(industry.id);
                    }}
                  >
                    <circle
                      cx={iconX}
                      cy={iconY}
                      r={CONFIG.iconSize / 2}
                      fill={(!isMobile && isHovered) || isSelected ? "var(--ifm-color-primary)" : isDarkMode ? "#2a2a2a" : "#e0e0e0"}
                      style={{
                        transition: "all 0.3s ease",
                        filter: (!isMobile && isHovered) || isSelected
                          ? isDarkMode
                            ? "drop-shadow(0 10px 25px rgba(0, 255, 209, 0.3))"
                            : "drop-shadow(0 10px 25px rgba(0, 168, 138, 0.3))"
                          : isDarkMode
                            ? "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))"
                            : "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
                        transform: (!isMobile && isHovered) || isSelected ? "scale(1.05)" : "scale(1)",
                        transformOrigin: `${iconX}px ${iconY}px`,
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
                        {!isMobile && isHovered && !isSelected ? (
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#000",
                              textAlign: "center",
                              lineHeight: 1.1,
                            }}
                          >
                            Click<br />Me
                          </div>
                        ) : (
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              color: isSelected ? "#000" : isDarkMode ? "#555" : "#666",
                              transition: "color 0.3s ease",
                            }}
                          >
                            {industry.icon}
                          </div>
                        )}
                      </div>
                    </foreignObject>
                  </g>
                </g>
              );
            })}

            {!isMobile && industries.map((industry) => {
              const positions = calculatePositions(industry.angle);
              const { cardX, cardY } = positions;
              const isSelected = selectedId === industry.id;

              return (
                <foreignObject
                  key={`card-${industry.id}`}
                  x={cardX - CONFIG.cardWidth / 2}
                  y={cardY - 80}
                  width={CONFIG.cardWidth}
                  height={170}
                  style={{
                    overflow: "visible",
                    pointerEvents: isSelected ? "auto" : "none",
                    opacity: isSelected ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      transform: isSelected ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
                      transition: "transform 0.3s ease",
                    }}
                  >
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
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: isDarkMode ? "#999" : "#666" }}
                      >
                        <Translate id={industry.descriptionId}>{industry.description}</Translate>
                      </p>
                      <button
                        className="w-full py-2 px-3 font-medium text-sm"
                        style={{
                          background: "var(--ifm-color-primary)",
                          color: "#000",
                          border: "none",
                          cursor: "pointer",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                      >
                        <Translate id="orbitindustries.button">Learn More</Translate>
                      </button>
                    </div>
                  </div>
                </foreignObject>
              );
            })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
